import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import MaterialTable from "material-table";
import { AppProvider, Button } from "@shopify/polaris";
import { getUserProducts, deleteUserProduct, findProductBySKU, getProductByID } from "../actions/productActions";
import "../css/Page.css";
import { Redirect } from 'react-router';

function Products(props) {

    const data = [];
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        await getUserProducts({ user }).then((response) => {
            response.forEach(product => {
                data.push({
                    id: product._id,
                    title: product.title,
                    status: product.status,
                    quantity: product.quantity,
                    type: product.type,
                    sku: product.sku,
                })
            });
            setProducts(data);
        })
    }

    const columns = [
        {
            title: "Product",
            field: "title",
            sorting: false,
            filtering: true,
        },
        {
            title: "Status",
            field: "status",
            sorting: false,
            lookup: { "draft": "Draft", "active": "Active" }
        },
        {
            title: "Inventory",
            field: "quantity",
            type: "numeric",
        },
        {
            title: "Type",
            field: "type",
            sorting: false,
        },
        {
            title: "SKU",
            field: "sku",
            sorting: false,
        }
    ]

    function deleteProduct(event, data) {
        event.preventDefault();

        let product = {};

        data.forEach((item) => {
            product = {
                user: user,
                sku: item.sku,
            }

            deleteUserProduct(product).then(() => {
                getProducts();
            })
        })
    }

    function addProduct(event) {
        event.preventDefault();
        props.history.push("/ProductForm", {
            operation: "add",
        });
    }

    function rowClicked(event, data) {
        event.preventDefault();

        let obj = {
            user: user,
            id: data.id,
        }

        getProductByID(obj).then(response => {
            props.history.push("/ProductForm", {
                operation: "edit",
                product: response.product,
            })
        })
    }

    if (user !== null) {
        return (
            <div>
                <Sidebar props={props} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <AppProvider><Button primary onClick={(e) => addProduct(e)}>Add product</Button></AppProvider>

                <MaterialTable title="Products" columns={columns} data={products}
                    onRowClick={(event, data) => rowClicked(event, data)}
                    style={{
                        marginLeft: "250px",
                        marginTop: "50px", marginRight: "250px"
                    }}
                    options={{
                        search: true, exportButton: true, selection: true,
                        sorting: true, paging: true, draggable: false, filtering: true
                    }}
                    actions={[{
                        tooltip: "Remove all selected products", icon: "delete",
                        onClick: (event, data) => deleteProduct(event, data)
                    }]} />

            </div>
        )
    }
    else {
        return (
            <Redirect to='/' />
        );
    }
}

export default Products
