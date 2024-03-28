import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { Button, AppProvider } from "@shopify/polaris";
import MaterialTable from "material-table";
import { useAlert } from "react-alert";
import { getInventory, updateQuantity, deleteUserProduct } from "../actions/productActions";
import { Redirect } from 'react-router';

function Inventory(props) {
    let data = [];

    const alert = useAlert();

    const [username, setUsername] = useState(localStorage.getItem("user"));
    const [products, setProducts] = useState([]);

    useEffect(() => {
        retrieveInventory();
    }, [])

    const columnns = [
        {
            title: "Product",
            field: "title",
            sorting: false,
            filtering: true,
            editable: 'never',
        },
        {
            title: "SKU",
            field: "sku",
            sorting: false,
            filtering: true,
            editable: 'never',
        },
        {
            title: "Quantity",
            field: "quantity",
            sorting: true,
            filtering: true,
            type: "numeric",
        }
    ]

    async function retrieveInventory() {
        await getInventory({ username }).then(response => {
            console.log(response);
            response.products.forEach(element => {
                data.push({
                    title: element.title,
                    sku: element.sku,
                    quantity: element.quantity,
                })
            })
            setProducts(data);
        })
    }

    function viewProducts(event) {
        event.preventDefault();
        props.history.push('/Products/All');
    }

    function deleteSelected(event, data) {
        event.preventDefault();

        let product = {};

        data.forEach((item) => {
            product = {
                user: username,
                sku: item.sku,
            }

            deleteUserProduct(product).then(() => {
                retrieveInventory();
            })
        })
    }

    if (username !== null) {
        return (
            <div className="App">
                <Sidebar props={props} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <AppProvider><Button primary onClick={(e) => viewProducts(e)}>View products</Button></AppProvider>
                <MaterialTable title="Inventory details" data={products} columns={columnns} style={{
                    marginLeft: "250px", marginTop: "50px", marginRight: "250px"
                }} options={{
                    search: true, filtering: true, exportButton: true, paging: true, selection: true
                }}
                    actions={[{
                        tooltip: "Remove all selected products", icon: "delete",
                        onClick: (event, data) => deleteSelected(event, data)
                    }]} editable={{ isEditable: columnDef => columnDef.field === "quantity" }}
                    cellEditable={{
                        cellStyle: {},
                        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                            return new Promise((resolve, reject) => {

                                if (oldValue != newValue) {
                                    //Only call axios function if changes are made
                                    let data = {
                                        sku: rowData.sku,
                                        user: username,
                                        newValue: newValue,
                                    }

                                    updateQuantity(data).then(() => {
                                        retrieveInventory();
                                    })
                                }
                                else {
                                    alert.info("No changes were made");
                                }

                                setTimeout(resolve, 2000);
                            })
                        }
                    }} />
            </div>
        )
    }
    else {
        return (
            <Redirect to='/' />
        );
    }
}

export default Inventory
