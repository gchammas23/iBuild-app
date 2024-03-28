import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router, Route, HashRouter, BrowserRouter, } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Products from "./Components/Products";
import Inventory from "./Components/Inventory";
import Customers from "./Components/Customers";
import Orders from "./Components/Orders";
import Analytics from "./Components/Analytics";
import Themes from "./Components/Themes";
import AddCustomer from "./Components/AddCustomer";
import ProductForm from "./Components/ProductForm";
import OrderForm from "./Components/OrderForm";
import ThemeEditor from "./Components/ThemeEditor";

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '10px',
  transition: 'scale'
}

class RouterNavigationSample extends React.Component {

  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={props => <Login {...props} />} />
            <div>
              <Route path="/HomePage" render={props => <HomePage {...props} />} />
              <Route path="/Products/All" render={props => <Products {...props} />} />
              <Route path="/Products/Inventory" render={props => <Inventory {...props} />} />
              <Route path="/Customers" render={props => <Customers {...props} />} />
              <Route path="/Orders" render={props => <Orders {...props} />} />
              <Route path="/Analytics" render={props => <Analytics {...props} />} />
              <Route path="/Themes" render={props => <Themes {...props} />} />
              <Route path="/AddCustomer" render={props => <AddCustomer {...props} />} />
              <Route path="/ProductForm" render={props => <ProductForm {...props} />} />
              <Route path="/OrderForm" render={props => <OrderForm {...props} />} />
              <Route path="/Editor" render={props => <ThemeEditor {...props} />} />
            </div>
          </div>
        </Router>
      </AlertProvider >
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RouterNavigationSample />, rootElement);