import {
    AppProvider, Button,
    Card, Frame,
    Heading, Label, Layout, Page,
    Stack
} from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Redirect } from 'react-router';
import { getAverageOrder, getDates, getPrices, getTotal, getTotalOrders } from '../actions/orderActions';
import Sidebar from "./Sidebar";

function Analytics(props) {

    const [username, setUsername] = useState(localStorage.getItem("user"));
    const [popoverActive, setPopoverActive] = useState(false);
    const [dates, setDates] = useState([]);
    const [prices, setPrices] = useState([]);
    const [totalSales, setTotal] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalAverage, setTotalAverage] = useState(0);
    const [averageOrder, setAverage] = useState([]);
    const [averageOrderNumber, setAverageOrderNumber] = useState([]);

    const datesData = [];
    const priceData = [];
    const averageData = [];
    const averageNumber = [];
    //let total = 0;

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            Today
        </Button>
    );

    // let date = moment(new Date()).format("DD-MM-YYYY");

    const info = {
        user: username,
    }

    useEffect(() => {
        getDates(info)
            .then((response) => {
                response.map((date) => {
                    datesData.push(date);
                })
                setDates(datesData);

                info.dates = datesData;

                getPrices(info)
                    .then((response) => {
                        response.map((price) => {
                            priceData.push(price);
                        })
                        setPrices(priceData);
                    });

                getAverageOrder(info)
                    .then((response) => {
                        setAverage(response.averages);
                        setAverageOrderNumber(response.numberOfOrders);
                    });
            });

        getTotal(info).then((response) => {
            setTotal(response.total);
        })

        getTotalOrders(info).then((response) => {
            setTotalOrders(response.total);
            setTotalAverage(response.average);
        })
    }, []);

    const state = {
        labels: dates,

        datasets: [
            {
                label: 'prices',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: prices
            }
        ]


    }

    const averageOrderGraph = {
        labels: dates,

        datasets: [
            {
                label: 'averages',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: averageOrder
            }
        ]
    }

    const averageNumberGraph = {
        labels: dates,

        datasets: [
            {
                label: 'averages',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: averageOrderNumber
            }
        ]
    }

    if (username !== null) {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/@shopify/polaris@6.0.1/dist/styles.css"
                />
                <Sidebar props={props} />
                <AppProvider>
                    <Frame>
                        <Page title="Overview dashboard" >
                            <Layout>
                                <Layout.Section oneHalf>
                                    <Card sectioned>
                                        <Card.Section>
                                            <Stack vertical spacing="tight">
                                                <Stack.Item>
                                                    <Heading>
                                                        Sales
                                                </Heading>
                                                    <Heading>
                                                        {`${totalSales}LL`}
                                                    </Heading>
                                                    <Line
                                                        data={state}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Total sales over time',
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </Stack.Item>
                                            </Stack>
                                        </Card.Section>
                                    </Card>
                                </Layout.Section>
                                <Layout.Section oneHalf>
                                    <Card sectioned>
                                        <Card.Section>
                                            <Stack vertical spacing="tight">
                                                <Stack.Item>
                                                    <Heading>
                                                        Total Average
                                                </Heading>
                                                    <Heading>
                                                        {`${totalAverage}LL`}
                                                    </Heading>
                                                    <Line
                                                        data={averageOrderGraph}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Average order value',
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </Stack.Item>
                                            </Stack>
                                        </Card.Section>
                                    </Card>
                                </Layout.Section>
                                <Layout.Section oneHalf>
                                    <Card sectioned>
                                        <Card.Section>
                                            <Stack vertical spacing="tight">
                                                <Stack.Item>
                                                    <Heading>
                                                        Total Orders
                                                </Heading>
                                                    <Heading>
                                                        {`${totalOrders}`}
                                                    </Heading>
                                                    <Line
                                                        data={averageNumberGraph}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Orders over time',
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </Stack.Item>
                                            </Stack>
                                        </Card.Section>
                                    </Card>
                                </Layout.Section>
                                <Layout.Section oneHalf>
                                    <Card sectioned>
                                        <Card.Section>
                                            <Label>Subscribe to unlock more features</Label>
                                        </Card.Section>
                                    </Card>
                                </Layout.Section>
                            </Layout>
                        </Page>
                    </Frame>
                </AppProvider>
            </div>
        )
    }
    else {
        return (
            <Redirect to='/' />
        );
    }
}

export default Analytics
