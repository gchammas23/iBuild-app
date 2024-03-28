import {
    AppProvider,
    Layout,
    Page,
    Card,
    FormLayout,
    Select,
    ResourceList,
    TextField,
    Modal,
    PageActions,
    TextContainer,
    TextStyle,
    Stack,
    ResourceItem,
    Button
} from '@shopify/polaris';

import React, { useCallback, useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { getProductNames, findProductBySKU, updateInventory } from "../actions/productActions";
import { getCustomersNames } from "../actions/customerActions";
import { deleteOrder, insertOrder, updateOrder } from "../actions/orderActions";
import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";

import "react-datepicker/dist/react-datepicker.css";

function OrderForm(props) {
    const orderAlert = useAlert();

    const [pageTitle, setPageTitle] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("Select Customer");
    const [selectedProduct, setSelectedProduct] = useState("Select Product"); //Represents products shown in picker
    const [orderProducts, setOrderProducts] = useState([]); //Represents products in order
    const [totalPrice, setTotalPrice] = useState(0);
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("pending");
    const [active, setActive] = useState(false); //Used to show or hide modal for delete choice
    const [orderDate, setOrderDate] = useState(new Date());
    const maxDate = new Date().setDate(new Date().getDate() + 5);

    let subTotalLabel = (totalPrice === 0 ? " -" : totalPrice.toString());
    let taxesLabel = (totalPrice === 0 ? "-" : (totalPrice * 0.1).toString());
    let totalLabel = (totalPrice === 0 ? "-" : (parseInt(subTotalLabel) + parseInt(taxesLabel)).toString());

    const statusOptions = [
        { label: "Select status", value: "select", disabled: true },
        { label: "Settled", value: "settled" },
        { label: "Pending", value: "pending" },
    ]


    const selectedProductChange = useCallback((newValue) => setSelectedProduct(newValue), []);
    const customerChange = useCallback((newValue) => setSelectedCustomer(newValue), []);
    const noteChange = useCallback((newValue) => setNote(newValue), []);
    const statusChange = useCallback((newValue) => setStatus(newValue), []);
    const activeChange = useCallback(() => setActive(!active), [active]); //Used for delete modal
    const dateChange = useCallback((newValue) => setOrderDate(newValue), []);


    function selectedChange(newValue) {
        selectedProductChange(newValue);
        getProductDetails(newValue);
    }

    function saveOrder() {
        if (selectedCustomer === "Select Customer") {
            orderAlert.error("Please pick a customer!");
        }
        else {
            if (orderProducts.length === 0) {
                orderAlert.error("Please add more products!");
            }
            else {
                let data = {
                    user: user,
                    customer: selectedCustomer,
                    products: orderProducts,
                    notes: note,
                    totalPrice: parseInt(totalLabel),
                    date: orderDate,
                    orderStatus: status,
                }

                //Update product quantities if order is settled
                updateInventory(data).then(response => {
                    console.log(response);
                })

                if(props.location.state.operation === "add") {
                    insertOrder(data).then(response => {
                        if (response === null) {
                            orderAlert.error("Error while adding order!");
                        }
                        else {
                            if (response.message === "success") {
                                orderAlert.success("Order added successfully");
                                props.history.push("/Orders");
                            }
                        }
                    })
                }
                else if (props.location.state.operation === "edit") {
                    data.id = props.location.state.data._id;
                    updateOrder({data}).then(response => {
                        if(response.message === "success"){
                            orderAlert.success("Order updated successfully!");
                            props.history.push("/Orders");
                        }
                    })
                }
                

            }
        }
    }

    function clearButtonClicked() {
        setNote("");
    }

    function removeOrder() {
        if (props.location.state.operation === "edit") {
            activeChange();
        }
        else {
            props.history.push("/Orders");
        }

    }

    function confirmDeletion() {
        let order = {
            id: props.location.state.data._id,
            user: user,
        }

        deleteOrder(order).then((response) => {
            if(response.message === "success"){
                orderAlert.success("Order deleted!");
                props.history.push("/Orders");
            }
            else{
                orderAlert.error("Error while deleting order");
            }
            
        })
    }

    async function getProducts() {
        await getProductNames({ user }).then(response => {
            setProducts(response.array);
        })
    }

    async function getNames() {
        await getCustomersNames({ user }).then(response => {
            setCustomers(response.array);
        })
    }

    async function getProductDetails(sku) {
        await findProductBySKU({ user, sku }).then(response => {
            let details = response.array[0];
            let product = {};

            product.title = details.title;
            product.price = details.price;
            product.quantity = details.quantity;
            product.orderedQuantity = 1;
            product.sku = details.sku

            setOrderProducts([...orderProducts, product]);
            setTotalPrice(totalPrice + product.price);


        })
    }

    function updateProductQuantity (value, sku) {
        //Find product in orders array
        let index;
        for(let i = 0; i < orderProducts.length; i++){
            if(orderProducts[i].sku === sku){
                index = i;
                break;
            }
        }

        //Update quantity of product at index i
        let product = orderProducts[index];

        if(value > product.quantity || value < 1){
            if(value > product.quantity){
                value = product.quantity;
            }
            else{
                value = 1;
            }
        }
        //Update total price and tax
        if(value < product.orderedQuantity){
            setTotalPrice(totalPrice - product.price * (product.orderedQuantity - value));
        }

        else{
            setTotalPrice(totalPrice + product.price * (value - product.orderedQuantity));
        }
        
        product.orderedQuantity = value;
        setOrderProducts(orderProducts);
        }
      

    useEffect(() => {
        getProducts();
        getNames();

        if (props.location.state.operation === "add") {
            setPageTitle("New Order");
        }
        else {
            setPageTitle("Edit Order");
            setSelectedCustomer(props.location.state.data.customer);
            setOrderProducts(props.location.state.data.products);

            //Compute taxes to deduce from total price
            let taxes = 0;
            props.location.state.data.products.forEach(element => {
                taxes += (element.orderedQuantity * (element.price * 0.1));
            })

            setTotalPrice(props.location.state.data.totalPrice - taxes);
            setNote(props.location.state.data.notes);
            setStatus(props.location.state.data.status);
            setOrderDate(new Date(props.location.state.data.date));
        }
    }, []);


    if (user !== null) {
        return (
            <AppProvider>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@shopify/polaris@6.0.1/dist/styles.css"
                />
                <Sidebar props={props} />
                <Page title={pageTitle}>
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                                <Card.Section>
                                    <FormLayout>
                                        <Select options={products} value={selectedProduct} onChange={selectedChange}
                                            helpText="Products shown are active and have a quantity greater than 0" />
                                    </FormLayout>
                                </Card.Section>
                                <Card.Section>
                                    <ResourceList
                                        resourceName={{ singular: "Product", plural: "Products" }}
                                        items={orderProducts}
                                        renderItem={(item => {
                                            const { title, price, orderedQuantity, quantity, sku } = item;
                                            return (
                                                <ResourceItem>
                                                    <Stack spacing="extraLoose" alignment="fill">
                                                        <TextStyle variation="strong">{title}</TextStyle>
                                                        <TextStyle variation="subdued">LBP&nbsp;{price}</TextStyle>

                                                        <NumericInput style={{input: {height: 40}}} min={1} max={quantity} value={orderedQuantity} onChange={(valueAsNumber, sku) => updateProductQuantity(valueAsNumber, item.sku)}/>

                                                        <Button destructive onClick={() => {
                                                            let itemIndex = orderProducts.indexOf(item);
                                                            setTotalPrice(totalPrice - (parseInt(price) * orderedQuantity));

                                                            setOrderProducts(orderProducts.filter(function(value, index, arr){
                                                                return index !== itemIndex;
                                                            }));

                                                            setSelectedProduct("Select Product")

                                                        }}>Delete</Button>

                                                        <TextStyle variation="subdued">{`Quantity should be between 1 and ${quantity}`}</TextStyle>

                                                    </Stack>
                                                </ResourceItem>
                                            )
                                        })}
                                    >

                                    </ResourceList>
                                </Card.Section>

                                <Card.Section>
                                    <TextField
                                        label={"Notes"}
                                        placeholder={"Enter notes here"}
                                        clearButton
                                        value={note}
                                        onChange={noteChange}
                                        multiline={4}
                                        onClearButtonClick={clearButtonClicked} />
                                &nbsp;
                                <Stack spacing="extraLoose" distribution="equalSpacing">
                                        <TextStyle variation="subdued">SubTotal</TextStyle>
                                        <TextStyle>LBP&nbsp;{subTotalLabel}</TextStyle>
                                    </Stack>
                                    <Stack spacing="extraLoose" distribution="equalSpacing">
                                        <TextStyle variation="subdued">Taxes</TextStyle>
                                        <TextStyle>LBP&nbsp;&nbsp;{taxesLabel}</TextStyle>
                                    </Stack>
                                    <Stack spacing="extraLoose" distribution="equalSpacing">
                                        <TextStyle variation="strong">Total</TextStyle>
                                        <TextStyle>LBP&nbsp;&nbsp;{totalLabel}</TextStyle>
                                    </Stack>

                                </Card.Section>

                                <Card.Section title="Set order date">
                                    <DatePicker 
                                        startDate={orderDate}
                                        maxDate={maxDate}
                                        onChange={dateChange}
                                        inline
                                        />
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card sectioned title="Customer">
                                <Card.Section>
                                    <Select error="Customer is required" options={customers} value={selectedCustomer} onChange={customerChange} helpText="Choose the customer's name" />
                                </Card.Section>

                                <Card.Section>
                                    <Select options={statusOptions} value={status} onChange={statusChange} helpText="Set order status" />
                                </Card.Section>

                            </Card>
                        </Layout.Section>
                    </Layout>

                    <PageActions primaryAction={{
                        content: "Save",
                        onAction: saveOrder,
                    }} secondaryActions={[
                        {
                            content: "Delete",
                            destructive: true,
                            onAction: removeOrder,
                        }
                    ]} />

                    <Modal
                        open={active}
                        title="Delete order?"
                        onClose={activeChange}
                        primaryAction={{
                            content: "Delete order",
                            destructive: true,
                            onAction: confirmDeletion,
                        }}
                        secondaryActions={[
                            {
                                content: "Cancel",
                                onAction: activeChange,
                            }
                        ]}>
                        <Modal.Section>
                            <TextContainer>
                                <p>Are you sure you want to delete the order? <b>This can't be undone</b></p>
                            </TextContainer>
                        </Modal.Section>
                    </Modal>
                </Page>
            </AppProvider>
        )
    }
    else {
        return (
            <Redirect to='/' />
        );
    }
}

export default OrderForm;