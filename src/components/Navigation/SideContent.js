import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./styles.scss"
import "./bootstap.scss"
import { Menu, MenuItem, SidebarContent, SubMenu } from "react-pro-sidebar"
import { withRouter } from "react-router"
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"
import HomeIcon from "@mui/icons-material/Home"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import StoreMallDirectorySharpIcon from "@mui/icons-material/StoreMallDirectorySharp"
import BusinessIcon from "@mui/icons-material/Business"
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded"
import { BiTrip } from "react-icons/bi"
import ReceiptIcon from "@mui/icons-material/Receipt"
import AssessmentSharpIcon from "@mui/icons-material/AssessmentSharp"
import PaymentsIcon from "@mui/icons-material/Payments"
import InventorySharpIcon from "@mui/icons-material/InventorySharp"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp"

import { ROUTES } from "../../utils/constants"

const SideContent = (props) => {
  const menuItems = [
    {
      icon: <HomeIcon />,
      title: "Home",
      link: ROUTES.HOME,
    },
    {
      icon: <ReceiptIcon />,
      title: "Receipt",
      link: ROUTES.RECEIPT,
    },
    {
      icon: <DirectionsBusIcon />,
      title: "Vehicles",
      subMenu: [
        {
          title: "Documents",
          link: ROUTES.DOCUMENTS,
          icon: <ArticleRoundedIcon />,
        },
        {
          title: "Trips",
          link: ROUTES.TRIPS,
          icon: <BiTrip style={{ fontSize: "28px" }} />,
        },
        {
          title: "Vouchers",
          link: ROUTES.VOUCHERS,
          icon: <PaymentsIcon />,
        },
      ],
    },
    {
      icon: <LocalGasStationIcon />,
      title: "Diesels",
      subMenu: [
        {
          title: "Pump Diesels",
          link: ROUTES.DIESELS,
          icon: <LocalGasStationIcon />,
        },
        {
          title: "Owner",
          link: ROUTES.VEHICLES_OWNER,
          icon: <DirectionsBusIcon />,
        },
      ],
    },
    {
      icon: <AccountBalanceWalletIcon />,
      title: "Expenses",
      subMenu: [
        {
          title: "Office",
          link: ROUTES.OFFICE_EXPENSE,
          icon: <BusinessIcon />,
        },
        {
          title: "Vehicles",
          link: ROUTES.VEHICLES_EXPENSE,
          icon: <DirectionsBusIcon />,
        },
      ],
    },
    {
      icon: <StoreMallDirectorySharpIcon />,
      title: "Store",
      subMenu: [
        {
          title: "Products",
          link: ROUTES.PRODUCT,
          icon: <InventorySharpIcon />,
        },
        {
          title: "Logistics",
          link: ROUTES.LOGISTIC,
          icon: <ShoppingCartSharpIcon />,
        },
        {
          title: "Bills",
          link: ROUTES.HARDWARE_SHOP_BILL,
          icon: <ReceiptIcon />,
        },
      ],
    },
    {
      icon: <AssessmentSharpIcon />,
      title: "Reports",
      link: ROUTES.REPORTS,
    },
  ]

  return (
    <SidebarContent>
      <Menu iconShape="circle">
        {menuItems.map((item, index) => {
          if (item.subMenu) {
            return (
              <SubMenu
                title={item.title}
                icon={item.icon}
                key={index}
                active={item.active}
              >
                {item.subMenu.map((sub, ind) => {
                  return (
                    <MenuItem
                      key={ind}
                      icon={sub.icon}
                      onClick={props.handleToggleSidebar}
                    >
                      <Link to={sub.link}>{sub.title}</Link>
                    </MenuItem>
                  )
                })}
              </SubMenu>
            )
          } else
            return (
              <MenuItem
                icon={item.icon}
                key={index}
                active={item.active}
                onClick={props.handleToggleSidebar}
              >
                <Link to={item.link}>{item.title}</Link>
              </MenuItem>
            )
        })}
      </Menu>
    </SidebarContent>
  )
}

const mapStateToProps = (state) => {
  return {}
}

export default withRouter(connect(mapStateToProps)(SideContent))
