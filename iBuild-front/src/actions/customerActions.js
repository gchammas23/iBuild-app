import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function authenticateUser(data) {
    const url = `${baseURLApi}/users/authenticateUser`;
    return await axios.post(url, data).then(response => response.data);
}

async function registerUser(data) {
    const url = `${baseURLApi}/users/register`;
    return await axios.post(url, data).then(response => response.data);
}

async function authenticate(data) {
    const url = `${baseURLApi}/users/authenticate`;
    return await axios.post(url, data).then(response => response.data);
}

async function getCustomers() {
    const url = `${baseURLApi}/customer/customers`;
    return await axios.get(url).then(response => response.data.data);
}

async function getCustomersUser(data) {
    const url = `${baseURLApi}/customer/user`;
    return await axios.post(url, data).then(response => response.data);
}

async function addCustomer(data) {
    const url = `${baseURLApi}/customer/add`;
    return await axios.post(url, data).then(response => response.data);
}

async function checkCustomer(data) {
    const url = `${baseURLApi}/customer/authenticate`;
    return await axios.post(url, data).then(response => response.data);
}

async function deleteCustomer(data) {
    const url = `${baseURLApi}/customer/delete`;
    return await axios.post(url, data).then(response => response.data);
}

async function updateCustomer(data) {
    const url = `${baseURLApi}/customer/update`;
    return await axios.post(url, data).then(response => response.data);
}

async function getCustomersNames(data) {
    const url = `${baseURLApi}/customer/getNames`;
    return await axios.post(url, data).then(response => response.data);
}

async function getTemplate() {
    const url = `${baseURLApi}/customer/getTemplate`;
    return await axios.get(url).then(response => response.data.data);
}

async function postTemplate(data) {
    const url = `${baseURLApi}/customer/postTemplate`;
    return await axios.post(url, data).then(response => response.data);
}

export {
    authenticateUser,
    registerUser,
    authenticate,
    getCustomers,
    getCustomersUser,
    addCustomer,
    checkCustomer,
    deleteCustomer,
    updateCustomer,
    getCustomersNames,
    getTemplate,
    postTemplate
};