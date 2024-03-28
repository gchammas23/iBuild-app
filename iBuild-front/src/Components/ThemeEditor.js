import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs/dist/grapes.min.js";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js";
import "grapesjs-lory-slider/dist/grapesjs-lory-slider.min.js";
import "grapesjs-plugin-forms/dist/grapesjs-plugin-forms.min.js";
import { Redirect } from "react-router";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import "../css/Theme.css";

const styles = `<style>* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
*{
  box-sizing:border-box;
}
body{
  margin-top:0px;
  margin-right:0px;
  margin-bottom:0px;
  margin-left:0px;
}
.clearfix{
  clear:both;
}
.header-banner{
  padding-top:35px;
  padding-bottom:100px;
  color:rgb(255, 255, 255);
  font-family:Helvetica, serif;
  font-weight:100;
  background-position-x:left, center;
  background-position-y:top, center;
  background-repeat-x:no-repeat, no-repeat;
  background-repeat-y:repeat, no-repeat;
  border:solid #013b3d;
  background-color:#013b3d;
}
.container-width{
  width:90%;
  max-width:1150px;
  margin-top:0px;
  margin-right:auto;
  margin-bottom:0px;
  margin-left:auto;
}
.logo-container{
  float:left;
  width:50%;
}
.logo{
  background-color:rgb(255, 255, 255);
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  width:130px;
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  min-height:30px;
  text-align:center;
  line-height:30px;
  color:rgb(77, 17, 79);
  font-size:23px;
}
.menu{
  float:right;
  width:50%;
}
.menu-item{
  float:right;
  font-size:15px;
  color:rgb(238, 238, 238);
  width:130px;
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  min-height:50px;
  text-align:center;
  line-height:30px;
  font-weight:400;
}
.lead-title{
  margin-top:150px;
  margin-right:0px;
  margin-bottom:30px;
  margin-left:0px;
  font-size:40px;
}
.sub-lead-title{
  max-width:650px;
  line-height:30px;
  margin-bottom:30px;
  color:rgb(198, 198, 198);
}
.lead-btn{
  margin-top:15px;
  padding-top:10px;
  padding-right:10px;
  padding-bottom:10px;
  padding-left:10px;
  width:190px;
  min-height:30px;
  font-size:20px;
  text-align:center;
  letter-spacing:3px;
  line-height:30px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  transition-duration:0.5s;
  transition-timing-function:ease;
  transition-delay:0s;
  transition-property:all;
  cursor:pointer;
  border:solid #ffffff;
  background-color:#fafafa;
  color:#000000;
}
.lead-btn:hover{
  background-color:rgb(255, 255, 255);
  color:rgb(76, 17, 78);
}
.lead-btn:active{
  color:rgb(255, 255, 255);
  background-color:#303c35;
}
.flex-sect{
  background-color:rgb(250, 250, 250);
  padding-top:100px;
  padding-right:0px;
  padding-bottom:100px;
  padding-left:0px;
  font-family:Helvetica, serif;
}
.flex-title{
  margin-bottom:15px;
  font-size:2em;
  text-align:center;
  font-weight:700;
  color:rgb(85, 85, 85);
  padding-top:5px;
  padding-right:5px;
  padding-bottom:5px;
  padding-left:5px;
}
.flex-desc{
  margin-bottom:55px;
  font-size:1em;
  color:rgba(0, 0, 0, 0.5);
  text-align:center;
  padding-top:5px;
  padding-right:5px;
  padding-bottom:5px;
  padding-left:5px;
}
.cards{
  padding-top:20px;
  padding-right:0px;
  padding-bottom:20px;
  padding-left:0px;
  display:flex;
  justify-content:space-around;
  flex-direction:initial;
  flex-wrap:wrap;
}
.card{
  background-color:white;
  height:300px;
  width:300px;
  margin-bottom:30px;
  box-shadow:0 0 1px 2px 0px;
  border-top-left-radius:2px;
  border-top-right-radius:2px;
  border-bottom-right-radius:2px;
  border-bottom-left-radius:2px;
  transition-duration:0.5s;
  transition-timing-function:ease;
  transition-delay:0s;
  transition-property:all;
  font-weight:100;
  overflow-x:hidden;
  overflow-y:hidden;
}
.card:hover{
  margin-top:-5px;
  box-shadow:rgba(0, 0, 0, 0.2) 0px 20px 30px 0px;
}
.card-header{
  height:155px;
  background-image:url("https://placehold.it/350x250/78c5d6/fff/image1.jpg");
  background-size:cover;
  background-position-x:center;
  background-position-y:center;
}
.card-header.ch2{
  background-image:url("https://placehold.it/350x250/459ba8/fff/image2.jpg");
}
.card-header.ch3{
  background-image:url("https://placehold.it/350x250/79c267/fff/image3.jpg");
}
.card-header.ch4{
  background-image:url("https://placehold.it/350x250/c5d647/fff/image4.jpg");
}
.card-header.ch5{
  background-image:url("https://placehold.it/350x250/f28c33/fff/image5.jpg");
}
.card-header.ch6{
  background-image:url("https://placehold.it/350x250/e868a2/fff/image6.jpg");
}
.card-body{
  padding-top:15px;
  padding-right:15px;
  padding-bottom:5px;
  padding-left:15px;
  color:rgb(85, 85, 85);
}
.card-title{
  font-size:1.4em;
  margin-bottom:5px;
}
.card-sub-title{
  color:rgb(179, 179, 179);
  font-size:1em;
  margin-bottom:15px;
}
.card-desc{
  font-size:0.85rem;
  line-height:17px;
}
.am-sect{
  padding-top:100px;
  padding-bottom:100px;
  font-family:Helvetica, serif;
}
.am-container{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-around;
}
.am-content{
  float:left;
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  padding-left:7px;
  width:490px;
  color:rgb(68, 68, 68);
  font-weight:100;
  margin-top:50px;
}
.am-pre{
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  padding-left:7px;
  color:rgb(177, 177, 177);
  font-size:15px;
}
.am-title{
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  padding-left:7px;
  font-size:25px;
  font-weight:400;
}
.am-desc{
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  padding-left:7px;
  font-size:17px;
  line-height:25px;
}
.blk-sect{
  padding-top:100px;
  padding-bottom:100px;
  font-family:Helvetica, serif;
  background-color:#fafafa;
}
.blk-title{
  font-size:25px;
  text-align:center;
  margin-bottom:15px;
  color:#000000;
}
.price-cards{
  margin-top:70px;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-around;
}
.price-card-cont{
  width:300px;
  padding-top:7px;
  padding-right:7px;
  padding-bottom:7px;
  padding-left:7px;
  float:left;
  background-color:#013b3d;
  height:480px;
}
.price-card{
  margin-top:0px;
  margin-right:auto;
  margin-bottom:0px;
  margin-left:auto;
  min-height:350px;
  background-color:rgb(217, 131, 166);
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  font-weight:100;
  color:rgb(255, 255, 255);
  width:90%;
}
.pc-title{
  font-weight:100;
  letter-spacing:3px;
  text-align:center;
  font-size:25px;
  padding-top:20px;
  padding-right:20px;
  padding-bottom:20px;
  padding-left:20px;
  background-color:#013b3d;
}
.pc-desc{
  padding-top:75px;
  padding-right:0px;
  padding-bottom:75px;
  padding-left:0px;
  text-align:center;
  color:#000000;
  background-color:#ffffff;
}
.pc-feature{
  color:rgba(255, 255, 255, 0.5);
  letter-spacing:2px;
  font-size:15px;
  padding-top:10px;
  padding-right:20px;
  padding-bottom:10px;
  padding-left:20px;
  background-color:#ffffff;
}
.pc-feature:nth-of-type(2n){
  background-color:transparent;
}
.pc-amount{
  background-color:rgba(0, 0, 0, 0.1);
  font-size:35px;
  text-align:center;
  padding-top:35px;
  padding-right:0px;
  padding-bottom:35px;
  padding-left:0px;
}
.pc-regular{
  background-color:rgb(218, 120, 160);
}
.pc-enterprise{
  background-color:rgb(214, 106, 150);
}
.footer-under{
  padding-bottom:100px;
  padding-top:100px;
  min-height:500px;
  color:rgb(238, 238, 238);
  position:relative;
  font-weight:100;
  font-family:Helvetica, serif;
  background-color:#000000;
}
.footer-container{
  display:flex;
  flex-wrap:wrap;
  align-items:stretch;
  justify-content:space-around;
}
.foot-list{
  float:left;
  width:200px;
}
.foot-list-title{
  font-weight:400;
  margin-bottom:10px;
  padding-top:0.5em;
  padding-right:0px;
  padding-bottom:0.5em;
  padding-left:0px;
}
.foot-list-item{
  color:rgba(238, 238, 238, 0.8);
  font-size:0.8em;
  padding-top:0.5em;
  padding-right:0px;
  padding-bottom:0.5em;
  padding-left:0px;
}
.foot-list-item:hover{
  color:rgb(238, 238, 238);
}
.foot-form-cont{
  width:300px;
  float:right;
}
.foot-form-title{
  color:rgba(255, 255, 255, 0.75);
  font-weight:400;
  margin-bottom:10px;
  padding-top:0.5em;
  padding-right:0px;
  padding-bottom:0.5em;
  padding-left:0px;
  text-align:right;
  font-size:2em;
}
.foot-form-desc{
  font-size:0.8em;
  color:rgba(255, 255, 255, 0.55);
  line-height:20px;
  text-align:right;
  margin-bottom:15px;
}
.sub-input{
  width:100%;
  margin-bottom:15px;
  padding-top:7px;
  padding-right:10px;
  padding-bottom:7px;
  padding-left:10px;
  border-top-left-radius:2px;
  border-top-right-radius:2px;
  border-bottom-right-radius:2px;
  border-bottom-left-radius:2px;
  color:black;
  border-top-width:initial;
  border-right-width:initial;
  border-bottom-width:initial;
  border-left-width:initial;
  border-top-style:none;
  border-right-style:none;
  border-bottom-style:none;
  border-left-style:none;
  border-top-color:initial;
  border-right-color:initial;
  border-bottom-color:initial;
  border-left-color:initial;
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  background-color:#fafafa;
}
.sub-btn{
  width:100%;
  margin-top:15px;
  margin-right:0px;
  margin-bottom:15px;
  margin-left:0px;
  background-color:#013b3d;
  border-top-width:initial;
  border-right-width:initial;
  border-bottom-width:initial;
  border-left-width:initial;
  border-top-style:none;
  border-right-style:none;
  border-bottom-style:none;
  border-left-style:none;
  border-top-color:initial;
  border-right-color:initial;
  border-bottom-color:initial;
  border-left-color:initial;
  border-image-source:initial;
  border-image-slice:initial;
  border-image-width:initial;
  border-image-outset:initial;
  border-image-repeat:initial;
  color:rgb(255, 255, 255);
  border-top-left-radius:2px;
  border-top-right-radius:2px;
  border-bottom-right-radius:2px;
  border-bottom-left-radius:2px;
  padding-top:7px;
  padding-right:10px;
  padding-bottom:7px;
  padding-left:10px;
  font-size:1em;
  cursor:pointer;
}
.sub-btn:hover{
  background-color:#013b3d;
}
.sub-btn:active{
  background-color:#554c57;
}
.pc-feature.odd-feat{
  background-color:#000000;
}
.pc-amount.odd-feat{
  background-color:#ffffff;
  color:#000000;
}
#ipp24i{
  color:black;
  width:181px;
  height:187px;
}
@media (max-width: 768px){
  .foot-form-cont{
    width:400px;
  }
}
@media (max-width: 480px){
  .foot-lists{
    display:none;
  }
}
</style>`

function ThemeEditor(props) {
  const themeAlert = useAlert();

  const [user, setUser] = useState(localStorage.getItem("user"));

  let editor;

  useEffect(() => {
    editor = grapesjs.init({
      container: '#gjs',
      storageManager: {
        id: 'gjs-',
        type: 'remote',
        setpsBeforeSave: 1,
        autosave: true,
        autoload: true,
        urlStore: `http://localhost:3001/api/templates/saveTemplate/${user}`,
        urlLoad: `http://localhost:3001/api/templates/getTemplate/${user}`,
      }
    });

    themeAlert.info("Theme is being autosaved");

    var blockManager = editor.BlockManager;

    blockManager.add('Button', {
      label: `<div>
            <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
            <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
          </svg>
          Custom Button
              </div>`,
      content: `<div class="lead-btn">Hover me</div>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                ${model.get('label')}
              </div>`,
    });

    blockManager.add('Form', {
      label: `<div> <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,5.5 C22,5.2 21.5,5 20.75,5 L3.25,5 C2.5,5 2,5.2 2,5.5 L2,8.5 C2,8.8 2.5,9 3.25,9 L20.75,9 C21.5,9 22,8.8 22,8.5 L22,5.5 Z M21,8 L3,8 L3,6 L21,6 L21,8 Z" fill-rule="nonzero"></path>
            <path class="gjs-block-svg-path" d="M22,10.5 C22,10.2 21.5,10 20.75,10 L3.25,10 C2.5,10 2,10.2 2,10.5 L2,13.5 C2,13.8 2.5,14 3.25,14 L20.75,14 C21.5,14 22,13.8 22,13.5 L22,10.5 Z M21,13 L3,13 L3,11 L21,11 L21,13 Z" fill-rule="nonzero"></path>
            <rect class="gjs-block-svg-path" x="2" y="15" width="10" height="3" rx="0.5"></rect>
          </svg>
                <div class="my-label-block">Custom Form</div>
              </div>`,
      content: `<div class="foot-form-title">Subscribe</div>
            <div class="foot-form-desc">Subscribe to our newsletter to receive exclusive offers and the latest news </div>
            <input name="name" placeholder="Name" class="sub-input"/>
            <input name="email" placeholder="Email" class="sub-input"/>
            <button type="button" class="sub-btn">Submit</button>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                ${model.get('label')}
              </div>`,
    });

    blockManager.add('Box', {
      label: `<div class="gjs-fonts gjs-f-b1  gjs-one-bg gjs-four-color-h">
                     Box component</div>`,
      content: `<div class="price-cards"><div class="price-card-cont"> 
             <div class="price-card"><div class="pc-title">Starter</div>
             <div class="pc-desc">Some random list</div>
             <div class="pc-feature odd-feat">+ Starter feature 1</div>
             <div class="pc-feature odd-feat">+ Starter feature 2 </div>
             <div class="pc-amount odd-feat">$ 9,90/mo</div></div></div>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                ${model.get('label')}
              </div>`,
    });

    blockManager.add('Image', {
      label: `<div class="gjs-fonts gjs-f-image gjs-one-bg gjs-four-color-h" title="Image" draggable="true">
            <div class="gjs-block-label">Image</div>`,
      content: `<img id="i42boj" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"/>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                ${model.get('label')}
              </div>`,
    });

    blockManager.add('Text', {
      label: `<div class="gjs-fonts gjs-f-text gjs-one-bg gjs-four-color-h" title="Text" draggable="true">
            <div class="gjs-block-label">Text</div>
          </div>`,
      content: ` <div id="i2du7y">Insert your text here
            </div>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                         ${model.get('label')}
                       </div>`,
    });

    blockManager.add('textSection', {
      label: `<div class="gjs-fonts gjs-f-h1p gjs-one-bg gjs-four-color-h" title="Text section" draggable="true">
              <div class="gjs-block-label">Text section</div>
              </div>`,
      content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here
      </h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </p>
      </section>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                     ${model.get('label')}
                   </div>`,
    });

    blockManager.add('navbar', {
      label: `<div class="gjs-block-label">
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
        <rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect>
        <rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
      </svg>
      <div class="gjs-block-label">Navbar</div></div>`,
      content: `<div data-gjs="navbar" class="navbar">
      <div class="navbar-container">
        <a href="/" class="navbar-brand"></a>
        <div id="i0ek46" class="navbar-burger">
          <div class="navbar-burger-line">
          </div>
          <div class="navbar-burger-line">
          </div>
          <div class="navbar-burger-line">
          </div>
        </div>
        <div data-gjs="navbar-items" class="navbar-items-c">
          <nav data-gjs="navbar-menu" class="navbar-menu">
            <a href="#" class="navbar-menu-link">Home</a>
            <a href="#" class="navbar-menu-link">About</a>
            <a href="#" class="navbar-menu-link">Contact</a>
          </nav>
        </div>
      </div>
    </div>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                     ${model.get('label')}
                   </div>`,
    });

    blockManager.add('header', {
      label: `<div class="gjs-block-label">
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">Header</div></div>`,
      content: `<header class="header-banner">
      <div class="container-width">
        <div class="logo-container">
          <div class="logo">iBuild
          </div>
        </div>
        <nav class="menu">
          <div class="menu-item">Link 3
          </div>
          <div class="menu-item">Link 2
          </div>
          <div class="menu-item">Link 1
          </div>
        </nav>
        <div class="clearfix">
        </div> 
        <div class="lead-title">Build your templates without coding
        </div>
        <div class="sub-lead-title">All text blocks could be edited easily with double clicking on it. You can create new text blocks with the command from the left panel
        </div>
        <div class="lead-btn">Hover me
        </div>
      </div>
    </header>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                     ${model.get('label')}
                   </div>`,
    });

    blockManager.add('section', {
      label: `<div class="gjs-fonts gjs-f-b1  gjs-one-bg gjs-four-color-h">
      Section</div>`,
      content: `<section class="flex-sect">
      <div class="container-width">
        <div class="flex-title">Build Card Components with flexbox
        </div>
        <div class="flex-desc">Build complex layouts easily and with free responsivity
        </div>
        <div class="cards">
          <div class="card">
            <div class="card-header">
            </div>
            <div class="card-body">
              <div class="card-title">Title one
              </div>
              <div class="card-sub-title">Subtitle one
              </div>
              <div class="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header ch2">
            </div>
            <div class="card-body">
              <div class="card-title">Title two
              </div>
              <div class="card-sub-title">Subtitle two
              </div>
              <div class="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header ch3">
            </div>
            <div class="card-body">
              <div class="card-title">Title three
              </div>
              <div class="card-sub-title">Subtitle three
              </div>
              <div class="card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
    ${model.get('label')}
  </div>`,

    })
    blockManager.add('footer', {
      label: `<div class="gjs-block-label">
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
      </svg>
      <div class="gjs-block-label">Footer</div></div>`,
      content: `<footer class="footer-under">
      <div class="container-width">
        <div class="footer-container">
          <div class="foot-lists">
            <div class="foot-list">
              <div class="foot-list-title">About us
              </div>
              <div class="foot-list-item">Contact
              </div>
              <div class="foot-list-item">Events
              </div>
              <div class="foot-list-item">Company
              </div>
              <div class="foot-list-item">Jobs
              </div>
              <div class="foot-list-item">Blog
              </div>
            </div>
            <div class="foot-list">
              <div class="foot-list-title">Services
              </div>
              <div class="foot-list-item">Education
              </div>
              <div class="foot-list-item">Partner
              </div>
              <div class="foot-list-item">Community
              </div>
              <div class="foot-list-item">Forum
              </div>
              <div class="foot-list-item">Download
              </div>
              <div class="foot-list-item">Upgrade
              </div>
            </div>
            <div class="clearfix">
            </div>
          </div>
          <div class="form-sub">
            <div class="foot-form-cont">
              <div class="foot-form-title">Subscribe
              </div>
              <div class="foot-form-desc">Subscribe to our newsletter to receive exclusive offers and the latest news
              </div>
              <input name="name" placeholder="Name" class="sub-input"/>
              <input name="email" placeholder="Email" class="sub-input"/>
              <button type="button" class="sub-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </footer>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                         ${model.get('label')}
                       </div>`,
    });

    blockManager.add('Label', {
      label: `<div class="gjs-block-label">
      <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,11.875 C22,11.35 21.5,11 20.75,11 L3.25,11 C2.5,11 2,11.35 2,11.875 L2,17.125 C2,17.65 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.65 22,17.125 L22,11.875 Z M21,17 L3,17 L3,12 L21,12 L21,17 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="2" y="5" width="14" height="5" rx="0.5"></rect>
        <polygon class="gjs-block-svg-path" fill-rule="nonzero" points="4 13 5 13 5 16 4 16"></polygon>
      </svg>
      <div class="gjs-block-label">Label</div></div>`,
      content: `<label class="label">Label</label>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
      ${model.get('label')}
    </div>`,
    });

    blockManager.add('Countdown', {
      label: `<div class="fa fa-clock-o" title="Countdown" draggable="true">
      <div class="gjs-block-label">Countdown</div>
    </div>`,
      content: `<div id="idsi5l" class="countdown">
      <span data-js="countdown" class="countdown-cont"><div class="countdown-block">
        <div data-js="countdown-day" class="countdown-digit">
        </div>
        <div class="countdown-label">days
        </div>
        </div><div class="countdown-block">
        <div data-js="countdown-hour" class="countdown-digit">
        </div>
        <div class="countdown-label">hours
        </div>
        </div><div class="countdown-block">
        <div data-js="countdown-minute" class="countdown-digit">
        </div>
        <div class="countdown-label">minutes
        </div>
        </div><div class="countdown-block">
        <div data-js="countdown-second" class="countdown-digit">
        </div>
        <div class="countdown-label">seconds
        </div>
        </div></span>
      <span data-js="countdown-endtext" class="countdown-endtext"></span>
    </div>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
      ${model.get('label')}
    </div>`,
    });

    blockManager.add('Link', {
      label: `<div class="fa fa-link gjs-four-color-h" title="Link Block" draggable="true">
            <div class="gjs-block-label">Link</div>
          </div>`,
      content: ` <a id="ivdjdn">Link</a>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                         ${model.get('label')}
                       </div>`,
    });

    blockManager.add('Map', {
      label: `<div class="fa fa-map-o gjs-one-bg gjs-four-color-h" title="Map" draggable="true">
            <div class="gjs-block-label">Map</div>
          </div>`,
      content: `<iframe frameborder="0" id="i7viuw" src="https://maps.google.com/maps?&z=1&t=q&output=embed"></iframe>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                         ${model.get('label')}
                       </div>`,
    });

    blockManager.add('Video', {
      label: `<div class="fa fa-youtube-play gjs-one-bg gjs-four-color-h" title="Video" draggable="true">
            <div class="gjs-block-label">Video</div>
          </div>`,
      content: `<video allowfullscreen="allowfullscreen" id="in376x" src="img/video2.webm" controls="controls">
            </video>${styles}`,
      render: ({ model, className }) => `<div class="${className}__my-wrap">
                         ${model.get('label')}
                       </div>`,
    });

    editor.load(res => {
      if (res.message !== "success") themeAlert.error("No previously Saved template")
      else {
        editor.setComponents(res.template['gjs-components']);
        editor.setStyle(res.template['gjs-styles']);
      }
    })

    //Function called when component will be unmounted
    return () => {
      if (editor.getDirtyCount() > 0) {
        editor.store();
      }
    }

  }, [])


  if (user !== null) {
    return (
      <div>
        <Sidebar props={props} />
        <div id="gjs">
        </div>
      </div>
    )
  }
  else {
    return (
      <Redirect to='/' />
    );
  }
}

export default ThemeEditor;