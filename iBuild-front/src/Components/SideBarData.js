import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
    {
        title: "Home",
        path: "/HomePage",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "Products",
        icon: <FaIcons.FaTag />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "All Products",
                path: "/Products/All",
            },
            {
                title: "Inventory",
                path: "/Products/Inventory",
            },
        ],
    },
    {
        title: "Customers",
        path: "/Customers",
        icon: <BsIcons.BsPersonFill />,
    },
    {
        title: "Orders",
        path: "/Orders",
        icon: <HiIcons.HiInboxIn />,
    },
    {
        title: "Analytics",
        path: "/Analytics",
        icon: <BsIcons.BsFillBarChartFill />,
    },
    {
        title: "Builder",
        path: "/Editor",
        icon: <BsIcons.BsHammer />
    },
];
