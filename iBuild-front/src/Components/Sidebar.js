import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { HiLogout } from "react-icons/hi";

const Nav = styled.div` 
background: #013b3d; 
width: 100%;
height: 60px; 
display: flex; 
justify-content: flex-start; 
align-items: center; 
`;

const NavIcon = styled(Link)` 
margin-left: 2rem; 
font-size: 2rem; 
maxHeight: 60px; 
display: flex; 
justify-content: flex-start; 
align-items: center; 
`;

const SidebarNav = styled.nav` 
background: #013b3d; 
width: 250px; 
height: 100vh; 
display: flex; 
justify-content: center; 
position: fixed; 
top: 0; 
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")}; 
transition: 350ms; 
z-index: 10; 
`;

const SidebarWrap = styled.div` 
width: 100%; 
`;

const Sidebar = ({ props }) => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    function Logout(event) {
        event.preventDefault();
        console.log("Logged out");
        localStorage.removeItem("user");
        props.history.push('/');
    }

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} size='30' />
                    </NavIcon>
                    <p
                        style={{
                            textAlign: "center",
                            marginLeft: "40%",
                            color: "white",
                            fontSize: 35
                        }}
                    >
                        iBuild
		</p>
                    <p onClick={(e) => Logout(e)} style={{ marginLeft: '40%', textAlign: 'center', color: 'white', fontSize: 25, cursor: 'pointer' }}> Log out</p>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
