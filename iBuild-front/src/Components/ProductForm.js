import {
    AppProvider, Card,
    FormLayout, Layout,
    Modal, Page,
    PageActions, Select,
    TextContainer, TextField
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import { Redirect } from 'react-router';
import { addProduct, deleteUserProduct, editProduct, findProductBySKU } from "../actions/productActions";
import Sidebar from "./Sidebar";

function AddProduct(props) {
    const productAlert = useAlert();

    const [user, setUser] = useState(localStorage.getItem("user"));
    const [operation, setOperation] = useState();
    const [pageTitle, setPageTitle] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [pastPrice, setPastPrice] = useState(0);
    const [costPerItem, setCostPerItem] = useState(0);
    const [status, setStatus] = useState("draft");
    const [sku, setSku] = useState("");
    const [pastSku, setPastSku] = useState(""); //Used when updating a product
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("");
    const [vendor, setVendor] = useState("");
    const [active, setActive] = useState(false); //Used to show or hide modal for delete choice

    const titleChange = useCallback((newValue) => setTitle(newValue), []);
    const descriptionChange = useCallback((newValue) => setDescription(newValue), []);
    const priceChange = useCallback((newValue) => setPrice(newValue), []);
    const pastPriceChange = useCallback((newValue) => setPastPrice(newValue), []);
    const costPerItemChange = useCallback((newValue) => setCostPerItem(newValue), []);
    const statusChange = useCallback((newValue) => setStatus(newValue), []);
    const skuChange = useCallback((newValue) => setSku(newValue), []);
    const quantityChange = useCallback((newValue) => setQuantity(newValue), []);
    const typeChange = useCallback((newValue) => setType(newValue), []);
    const vendorChange = useCallback((newValue) => setVendor(newValue), []);
    const activeChange = useCallback(() => setActive(!active), [active]); //Used for delete modal


    //Options for dropdown of product status
    const options = [
        { label: "Draft", value: "draft" },
        { label: "Active", value: "active" },
    ]

    useEffect(() => {
        if (props.location.state.operation === "add") {
            setPageTitle("New Product");
            setOperation("Add")
        }
        else if (props.location.state.operation === "edit") {
            setPageTitle("Edit Product");
            setOperation("Edit")

            console.log(props.location.state.product);

            setTitle(props.location.state.product.title);
            setDescription(props.location.state.product.description);
            setPrice(props.location.state.product.price);
            setPastPrice(props.location.state.product.past_price);
            setCostPerItem(props.location.state.product.cost_per_item);
            setStatus(props.location.state.product.status);
            setSku(props.location.state.product.sku);
            setPastSku(props.location.state.product.sku);
            setVendor(props.location.state.product.vendor);
            setQuantity(props.location.state.product.quantity);
            setType(props.location.state.product.type);

        }
    }, [])

    function saveProduct() {
        if (title.length === 0 || sku.length === 0 || price === 0) {
            productAlert.error("Please make sure to fill all required fields!");
        }
        else {
            let data = {
                user: user,
                product_title: title,
                product_description: description,
                product_price: price,
                past_price: pastPrice,
                cost_per_item: costPerItem,
                product_status: status,
                product_sku: sku,
                product_quantity: quantity,
                product_type: type,
                product_vendor: vendor,
            }
            if (props.location.state.operation === "add") {
                let obj = {
                    user: data.user,
                    sku: data.product_sku,
                }

                findProductBySKU(obj).then(res => {
                    if (res.message === "error") {
                        addProduct({ data }).then(response => {
                            if (response === null) {
                                productAlert.error("An error occured while trying to save the product");
                            }
                            else {
                                if (response.message === "success") {
                                    productAlert.success("Product successfully saved");
                                    props.history.push("/Products/All");
                                }
                            }
                        });
                    }
                    else {
                        productAlert.error("Make sure to enter a unique SKU!");
                    }

                })

            }
            else {
                //Add id to data object
                data.id = props.location.state.product._id;
                
                editProduct(data).then(response => {
                    if (response.message === "success") {
                        productAlert.success("Product successfully saved");
                        props.history.push("/Products/All");
                    }
                    else {
                        productAlert.error("An error occured while trying to save the product");
                    }
                })
            }
        }
    }

    function deleteProduct() {
        if(props.location.state.operation === "add"){
            props.history.push("/Products/All");
        }
        else{
            activeChange();
        }       
    }

    function confirmDeletion() {
        let product = {
            user: user,
            sku: sku,
        }
        deleteUserProduct(product).then(response => {
            if (response.message === "success") {
                productAlert.success("Product deleted successfully!");
                props.history.push("/Products/All");
            }
            else {
                productAlert.error("An error occured while deleting the product");
            }
        })
        activeChange();
    }

    if (user !== null) {
        return (
            <AppProvider>
                <Sidebar props={props} />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@shopify/polaris@6.0.1/dist/styles.css"
                />
                <Page title={pageTitle}>
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                                <FormLayout>
                                    <TextField label="Title" value={title} onChange={titleChange} error={"Title is required"} />
                                    <TextField label="Description" value={description} onChange={descriptionChange} multiline={4} />
                                </FormLayout>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card sectioned title="Product Status">
                                <FormLayout>
                                    <Select options={options} value={status} onChange={statusChange} />
                                </FormLayout>
                            </Card>
                        </Layout.Section>
                        <Layout.Section>
                            <Card sectioned title="Organization">
                                <TextField label="Product type" type="text" value={type} placeholder="e.g shirts" onChange={typeChange} />
                                <TextField label="Vendor" type="text" value={vendor} placeholder="e.g Nike" onChange={vendorChange} />
                            </Card>
                        </Layout.Section>
                        <Layout.Section>
                            <Card sectioned title="Pricing">
                                <Card.Section>
                                    <FormLayout>
                                        <FormLayout.Group condensed>
                                            <TextField label="Price" type="currency" error={"Price is required"} value={price} onChange={priceChange} placeholder={0} prefix="LBP" />
                                            <TextField label="Compare At Price" value={pastPrice} onChange={pastPriceChange} placeholder={0}
                                                helpText="To show a decreased price, enter a lower price in the price input" prefix="LBP" />
                                        </FormLayout.Group>
                                    </FormLayout>
                                </Card.Section>
                                <Card.Section>
                                    <TextField label="Cost per item" value={costPerItem} onChange={costPerItemChange} placeholder={0}
                                        helpText="This won't appear to the client. Only for the business owner" prefix="LBP" />
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section>
                            <Card sectioned title="Inventory">
                                <Card.Section>
                                    <FormLayout>
                                        <TextField label="SKU (Stock Keeping Unit)" disabled={operation === "Edit"} value={sku} onChange={skuChange} error={"SKU is required"} />
                                    </FormLayout>
                                </Card.Section>
                                <Card.Section title="Quantity">
                                    <TextField label="Available" type="number" value={quantity} onChange={quantityChange} min={0} />
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section>
                            <PageActions primaryAction={{
                                content: "Save",
                                onAction: saveProduct,
                            }} secondaryActions={[
                                {
                                    content: "Delete",
                                    destructive: true,
                                    onAction: deleteProduct,
                                }
                            ]} />

                            <Modal
                                open={active}
                                title="Delete product?"
                                onClose={activeChange}
                                primaryAction={{
                                    content: "Delete product",
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
                                        <p>Are you sure you want to delete the product? <b>This can't be undone</b></p>
                                    </TextContainer>
                                </Modal.Section>
                            </Modal>
                        </Layout.Section>
                    </Layout>
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

export default AddProduct
