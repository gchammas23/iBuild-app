import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function insertOrder(data) {
    const url = `${baseURLApi}/orders/addOrder`;
    return await axios.post(url, data).then(response => response.data);
}

async function getOrders(user) {
    const url = `${baseURLApi}/orders/getOrders`;
    return await axios.post(url, user).then(response => response.data);
}

async function deleteOrder(data) {
    const url = `${baseURLApi}/orders/deleteOrder`;
    return await axios.post(url, data).then(response => response.data);
}

async function getDates(data) {
    const url = `${baseURLApi}/orders/getDates`;
    return await axios.post(url, data).then(response => response.data);
}

async function getPrices(data) {
    const url = `${baseURLApi}/orders/getPrices`;
    return await axios.post(url, data).then(response => response.data);
}

async function getTotal(data) {
    const url = `${baseURLApi}/orders/getTotal`;
    return await axios.post(url, data).then(response => response.data);
}

async function getAverageOrder(data) {
    const url = `${baseURLApi}/orders/getAverageOrder`;
    return await axios.post(url, data).then(response => response.data);
}

async function getTotalOrders(data) {
    const url = `${baseURLApi}/orders/getTotalOrders`;
    return await axios.post(url, data).then(response => response.data);
}

async function getOrderById(id) {
    const url = `${baseURLApi}/orders/findOrderById`;
    return await axios.post(url, id).then(response => response.data);
}

async function updateOrder(data) {
    const url = `${baseURLApi}/orders/updateOrder`;
    return await axios.post(url, data).then(response => response.data);
}

export {
    getDates,
    getPrices,
    getTotal,
    getTotalOrders,
    insertOrder,
    getOrders,
    deleteOrder,
    getAverageOrder,
    getOrderById,
    updateOrder,
};