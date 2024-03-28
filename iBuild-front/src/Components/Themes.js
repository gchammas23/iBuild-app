import { AppProvider, Button, Label, TextField, Card, TextStyle } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import Sidebar from "./Sidebar";

function Themes() {

    const [input, setInput] = useState("");
    const inputChange = useCallback((newValue) => setInput(newValue));

    function buttonClick(event) {
        event.preventDefault();
        console.log("Button clicked!");
    }

    const theme = {
        content: {
            body: [
                {
                    id: "0",
                    component: "Navbar",
                    items: [
                        {
                            title: "Home",
                            url: "",
                        },
                        {
                            title: "Catalog",
                            url: "",
                        }
                    ],
                    bg: "white"
                },

                {
                    id: "1",
                    component: "image",
                    imgSrc: "https://elements-cover-images-0.imgix.net/e1e28a5c-22ea-4c45-a9f4-fad7cf2a8678?auto=compress%2Cformat&fit=max&w=2038&s=f5a17a80497365393d18c8d01f7b04ba",
                    style: {
                        width: "100%",
                        height: "100%",
                    }
                },

                {
                    id: "2",
                    component: "Text",
                    content: "Insert here",
                    style: {
                        width: "500px",
                        height: "20px",
                        position: "center",
                    }
                },
                {
                    id: "3",
                    component: "Input",
                    placeholder: "Enter text",
                    style: {
                        width: "300px",
                        height: "50px",
                    }
                },
                
                {
                    id: "4",
                    component: "Button",
                    text: "Submit",
                    primary: true,
                    style: {
                        width: "100px",
                        height :"40px",
                    }
                },

                {
                    id: "5",
                    component: "Media-card",
                    title: "Product",
                    description: "Description goes here",
                    mediaSrc: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081",
                    style: {
                        width: "200px",
                        height: "200px",
                        marginTop: "0px",
                    }
                },

                {
                    id: "6",
                    component: "Media-card",
                    title: "Product",
                    description: "Description goes here",
                    mediaSrc: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081",
                    style: {
                        width: "200px",
                        height: "200px",
                        marginTop: "50px",
                    }
                },
            ]
        }
    }

    function Components(block) {
        if (block.component === "Input") {
            return (<div style={{width: block.style.width, height: block.style.height}}>
                <TextField value={input} onChange={inputChange} placeholder={block.placeholder}></TextField>
            </div>)
        }
        else if (block.component === "Text") {
            return (<div style={{width: block.style.width, height: block.style.height, textAlign: block.style.position}}>
                <Label>{block.content}</Label> 
            </div>)
        }
        else if (block.component === "image") {
            return (<div>
                <img src={block.imgSrc} style={{width: block.style.width, height: block.style.height}}></img>
            </div>)
        }
        else if (block.component === "Button") {
            return (<div style={{height: block.style.height, width: block.style.width}}>
                <Button onClick={(e) => buttonClick(e)} primary={block.primary}>{block.text}</Button>
            </div>
            )
        }
        else if (block.component === "Media-card") {
            return ( <div style={{width: block.style.width, height: block.style.height, marginTop: block.style.marginTop}}>
                <Card>
                    <img src={block.mediaSrc} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                    <TextStyle variation="strong">{block.title}</TextStyle> <br />
                    <TextStyle>{block.description}</TextStyle>
                </Card>
                </div>
            )
        }
    }
    return (
        <div>
            <AppProvider>
            <link
                rel="stylesheet"
                href="https://unpkg.com/@shopify/polaris@6.0.1/dist/styles.css"
            />
            <Sidebar />
            {theme.content.body.map(block => Components(block))}
            </AppProvider>
        </div>
    )
}

export default Themes
