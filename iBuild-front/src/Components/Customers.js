import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import MaterialTable from "material-table";
import { getCustomersUser, deleteCustomer, updateCustomer } from "../actions/customerActions";
import { Button, AppProvider } from '@shopify/polaris';
import "../css/Page.css";
import { Redirect } from 'react-router';
import { useAlert } from 'react-alert';

function Customers(props) {

    const [username, setUsername] = useState(localStorage.getItem("user"))

    function addCustomer(event) {
        event.preventDefault();
        props.history.push("/addCustomer");
    }

    const data = [];
    const [values, setValues] = useState([]);
    const customerAlert = useAlert();

    const info = {
        user: username
    }

    useEffect(() => {
        retrieve();
    }, []);

    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Lastname",
            field: "lastname",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Phone",
            field: "phone",
        },
        {
            title: "Address",
            field: "address",
        },
        {
            title: "Building",
            field: "building",
        },
        {
            title: "Notes",
            field: "notes",
        },
    ];

    async function retrieve() {
        await getCustomersUser(info)
            .then((response) => {
                response.map((customer) => {
                    data.push({
                        name: customer.name,
                        lastname: customer.lastname,
                        email: customer.email,
                        phone: customer.phone,
                        address: customer.address,
                        building: customer.building,
                        notes: customer.notes,
                    });
                })
                setValues(data);
            })
    }

    function deleteSelected(event, data) {
        event.preventDefault();

        var customer = {};

        data.forEach((item, key) => {
            console.log(item);

            customer = {
                user: username,
                name: item.name,
                lastname: item.lastname,
                email: item.email,
                phone: item.phone,
                address: item.address,
                building: item.building,
                notes: item.notes,
            }
            deleteCustomer(customer).then(() => {
                retrieve();
            });
        });
    }

    if (username !== null) {
        return (
            <div className="App">
                <Sidebar props={props} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <AppProvider><Button primary onClick={(e) => addCustomer(e)}>Add customer</Button></AppProvider>
                <MaterialTable title="Customer details" data={values} columns={columns} style={{
                    marginLeft: "250px",
                    marginTop: "50px", marginRight: "250px"
                }} options={{ search: true, paging: false, filtering: true, exportButton: true, selection: true }}
                    actions={[{
                        tooltip: "Remove all selected customers", icon: "delete",
                        onClick: (event, data) => deleteSelected(event, data)
                    }]} cellEditable={{
                        cellStyle: {},
                        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                            return new Promise((resolve, reject) => {
                                console.log('newValue: ' + newValue);
                                console.log(rowData)

                                const customer = {
                                    user: username,
                                    name: rowData.name,
                                    field: columnDef.field,
                                    newValue: newValue
                                }
                                updateCustomer(customer).then((response) => {
                                    if (response.result) {
                                        customerAlert.success("Customer updated successfully!");
                                        retrieve();
                                    }
                                    else {
                                        customerAlert.error(response.message);
                                    }
                                }).catch((error) => {
                                    customerAlert.error(error);
                                });
                                setTimeout(resolve, 400);
                            });
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

export default Customers
