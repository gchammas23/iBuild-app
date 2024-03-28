import MaterialTable from "material-table";
import React from 'react';
import Sidebar from "./Sidebar";
import { AppProvider, Button } from "@shopify/polaris"
import { getOrders, deleteOrder } from "../actions/orderActions";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import {getOrderById} from "../actions/orderActions"


function Orders(props) {

    const data = [];

    const [user, setUser] = useState(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersDetails();
    }, []);

    async function getOrdersDetails() {
        await getOrders({ user }).then(response => {
            response.forEach(element => {
                data.push({
                    id: element._id,
                    date: element.date,
                    customer: element.customer,
                    status: element.status,
                    totalPrice: element.totalPrice,
                })
            })

            setOrders(data);

        })
    }

    const columns = [
        {
            title: "Date",
            field: "date",
        },
        {
            title: "Customer",
            field: "customer",
            sorting: false,
        },
        {
            title: "Status",
            field: "status",
            sorting: false,
            lookup: { "pending": "Pending", "settled": "Settled" }
        },
        {
            title: "Total",
            field: "totalPrice",
            type: "currency",
            sorting: true,
            render: element => "LBP " + element.totalPrice
        }
    ]



    function rowClicked(event, data) {
        event.preventDefault();

        //Get the id of the order
        let id = data.id;
        let order = {};
        getOrderById({id, user: user}).then(response => {
            order = response.order;
            props.history.push("/OrderForm", {
                operation: "edit",
                data: order,
            })
        })
    }

    function deleteRecord(event, data) {
        event.preventDefault();

        let order = {};

        data.forEach((item) => {
            let id = item.id;

            order = {
                id: id,
                user: user,
            }

            deleteOrder(order).then(() => {
                getOrdersDetails();
            })
        })
    }


    function addOrder(event) {
        event.preventDefault();
        props.history.push("/OrderForm", {
            operation: "add",
        });
    }

    if (user !== null) {
        return (
            <div>
                <Sidebar props={props} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <AppProvider><Button primary onClick={(e) => addOrder(e)}>Add Order</Button></AppProvider>

                <MaterialTable title="Orders" columns={columns} data={orders}
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
                        onClick: (event, data) => deleteRecord(event, data)
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

export default Orders
