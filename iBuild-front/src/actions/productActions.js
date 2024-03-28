import axios from 'axios';

const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://localhost";
const portApi = process.env.NODE_ENV === "development" ? 3001 : 3001;

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

async function addProduct(data) {
    const url = `${baseURLApi}/products/addProduct`;
    return await axios.post(url, data).then(response => response.data);
}

async function getUserProducts(user){
    const url= `${baseURLApi}/products/getUserProducts`;
    return await axios.post(url, user).then(response => response.data);
}

async function deleteUserProduct(data){
    const url= `${baseURLApi}/products/deleteUserProduct`;
    return await axios.post(url, data).then(response => response.data);
}

async function findProductBySKU(data){
    const url= `${baseURLApi}/products/findProductBySKU`;
    return await axios.post(url, data).then(response => response.data);
}

async function editProduct(data){
    const url= `${baseURLApi}/products/editProduct`;
    return await axios.post(url, data).then(response => response.data);
}

async function getProductNames(data){
    const url= `${baseURLApi}/products/getProductNames`;
    return await axios.post(url, data).then(response => response.data);
}

async function getProductPrice(data){
    const url= `${baseURLApi}/products/getProductPrice`;
    return await axios.post(url, data).then(response => response.data);
}

async function getInventory(data){
    const url= `${baseURLApi}/products/getInventory`;
    return await axios.post(url, data).then(response => response.data);
}

async function updateQuantity(data){
    const url= `${baseURLApi}/products/updateQuantity`;
    return await axios.post(url, data).then(response => response.data);
}

async function updateInventory(data){
    const url= `${baseURLApi}/products/deduceQuantities`;
    return await axios.post(url, data).then(response => response.data);
}

async function getProductByID(data){
    const url= `${baseURLApi}/products/findProductByID`;
    return await axios.post(url, data).then(response => response.data);
}

export {
    addProduct,
    getUserProducts,
    deleteUserProduct,
    findProductBySKU,
    editProduct,
    getProductNames,
    getProductPrice,
    getInventory,
    updateQuantity,
    updateInventory,
    getProductByID,
};