import { Outlet } from "react-router-dom";
// import Analytics from "./Analytics";

import inventoryLogo from "../assets/inventory.svg";
import analyticsLogo from "../assets/analytics.svg";
import pullout from "../assets/pullout.svg";
import history from "../assets/history.svg";
import webposLogo from "../assets/webpos.svg";
import logo from "../assets/logo.png";
import { Avatar, Link } from "@mui/material";
import { useState } from "react";
import { logoutAccount } from "../api/api";
import { useCookies } from "react-cookie";
import ProductDetailModal from "../components/charts/ProductDetailModal";
import { useSelector } from "react-redux";
import AddStockModal from "../components/AddStockModal";
// import DoughnutChart from "../components/charts/Doughnut";

export default function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const currentURL = window.location.href.split("/").pop();
  const [selectedTab, setSelectedTab] = useState(currentURL);

  // console.log(selectedTab);

  if (selectedTab === "dashboard" || selectedTab === "") {
    window.location.href = "/dashboard/analytics";
  }

  const handleLogout = () => {
    logoutAccount(cookies.accessToken);
    removeCookie("accessToken");
    window.location.href = "/";
  };

  const updateModal = useSelector((state) => state.updateModal);
  const addstockModal = useSelector((state) => state.addstockModal);

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <img
          src={logo}
          alt="logo"
          style={{ width: "75px" }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <div className="dashboard-navs">
          <img
            src={analyticsLogo}
            alt="analytics logo"
            style={{
              filter:
                selectedTab === "analytics"
                  ? " brightness(0) saturate(100%) invert(66%) sepia(15%) saturate(2088%) hue-rotate(81deg) brightness(92%) contrast(88%)"
                  : "gray",
            }}
            onClick={() => {
              window.location.href = "/dashboard/analytics";
            }}
          />
          <img
            src={inventoryLogo}
            alt="analytics logo"
            style={{
              filter:
                selectedTab === "inventory"
                  ? " brightness(0) saturate(100%) invert(66%) sepia(15%) saturate(2088%) hue-rotate(81deg) brightness(92%) contrast(88%)"
                  : "gray",
            }}
            onClick={() => {
              window.location.href = "/dashboard/inventory";
            }}
          />
          <img
            src={history}
            alt="analytics logo"
            style={{
              filter:
                selectedTab === "history"
                  ? " brightness(0) saturate(100%) invert(66%) sepia(15%) saturate(2088%) hue-rotate(81deg) brightness(92%) contrast(88%)"
                  : "gray",
            }}
            onClick={() => {
              window.location.href = "/dashboard/history";
            }}
          />
          <img
            src={webposLogo}
            alt="analytics logo"
            style={{
              filter:
                selectedTab === "webpos"
                  ? " brightness(0) saturate(100%) invert(66%) sepia(15%) saturate(2088%) hue-rotate(81deg) brightness(92%) contrast(88%)"
                  : "gray",
            }}
            onClick={() => {
              window.location.href = "/dashboard/webpos";
            }}
          />
        </div>
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Avatar style={{ color: "green" }} />
          <Link style={{ cursor: "pointer" }} onClick={handleLogout}>
            {" "}
            Logout
          </Link>
        </div>
      </div>
      <div className="dashboard-main">
        <Outlet />
      </div>
      {updateModal.activate ? (
        <ProductDetailModal data={updateModal.data} />
      ) : null}
      {addstockModal.activate ? (
        <AddStockModal data={addstockModal.data} />
      ) : null}
    </div>
  );
}
