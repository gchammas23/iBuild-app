import React, { useState, useCallback } from 'react';
import {
    Page,
    Card,
    AppProvider,
    Layout,
    Form,
    FormLayout,
    TextField,
    PageActions,
    Modal,
    TextContainer
} from "@shopify/polaris";
import { checkCustomer, addCustomer } from "../actions/customerActions";
import Sidebar from "./Sidebar";
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';

function AddCustomer(props) {

    const [user, setUser] = useState(localStorage.getItem("user"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("+961");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [building, setBuilding] = useState("");
    const [notes, setNotes] = useState("");
    const [active, setActive] = useState(false); //Used to show or hide modal for delete choice

    const firstNameChange = useCallback((newValue) => setFirstName(newValue), []);
    const lastNameChange = useCallback((newValue) => setLastName(newValue), []);
    const emailChange = useCallback((newValue) => setEmail(newValue), []);
    const phoneChange = useCallback((newValue) => setPhone(newValue), []);
    const addressChange = useCallback((newValue) => setAddress(newValue), []);
    const cityChange = useCallback((newValue) => setCity(newValue), []);
    const buildingChange = useCallback((newValue) => setBuilding(newValue), []);
    const notesChange = useCallback((newValue) => setNotes(newValue), []);
    const activeChange = useCallback(() => setActive(!active), [active]); //Used for delete modal

    const customerAlert = useAlert();

    function handleSubmit() {
        const data = {
            user: user,
            name: firstName,
            lastname: lastName,
            email: email,
            phone: phoneNumber,
            address: address,
            building: building,
            notes: notes,
        }

        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "")
            customerAlert.error("Required fields cannot be empty !");

        else checkCustomer(data).then(res => {
            if (res.result === null) {
                addCustomer(data).then((response) => {
                    if (response.result) {
                        customerAlert.success("Customer created successfully!");
                        props.history.push("/Customers");
                    }
                    else {
                        customerAlert.error(response.message);
                    }
                }).catch((error) => {
                    customerAlert.error(error);
                });
            } else {
                customerAlert.error("Customer already exists!");
            }
        });
    };

    function deleteCustomer() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setBuilding("");
        setNotes("");
        activeChange();
    }

    function confirmDeletion() {
        activeChange();
    }

    if (user !== null) {
        return (
            <AppProvider>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@shopify/polaris@6.0.1/dist/styles.css"
                />
                <Sidebar props={props} />
                <Page title="New Customer">
                    <Layout>
                        <Layout.AnnotatedSection
                            title="Customer overview"
                            description="Customer personal information"
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <FormLayout.Group condensed>
                                        <TextField label="First Name" value={firstName} onChange={firstNameChange}
                                            error="Name is required" />
                                        <TextField label="Last Name" value={lastName} onChange={lastNameChange}
                                            error="Last name is required" />
                                    </FormLayout.Group>
                                    <TextField type="email" label="Account email" value={email} onChange={emailChange}
                                        error="Email is required" />
                                    <TextField label="Phone number" value={phoneNumber} onChange={phoneChange}
                                        error="Phone number is required" />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            title="Address"
                            description="The primary address of this customer"
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <TextField label="Address" value={address} onChange={addressChange} />
                                    <TextField label="Building" value={building} onChange={buildingChange} />
                                    <TextField label="City" value={city} onChange={cityChange} />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            title="Address"
                            description="The primary address of this customer"
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <TextField label="Notes" value={notes} onChange={notesChange} />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.Section>
                            <PageActions
                                primaryAction={{
                                    content: 'Save',
                                    onAction: handleSubmit
                                }} secondaryActions={[
                                    {
                                        content: "Delete",
                                        destructive: true,
                                        onAction: deleteCustomer,
                                    }
                                ]} />

                            <Modal
                                open={active}
                                title="Delete customer?"
                                onClose={activeChange}
                                primaryAction={{
                                    content: "Delete customer",
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
                                        <p>Are you sure you want to delete the customer? <b>This can't be undone</b></p>
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

export default AddCustomer
