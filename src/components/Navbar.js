import { memo, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { slideFromTop } from "../gsapAnimations/animations";
// import IsLoggedIn from "../validations/IsLoggedIn";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useCookies } from "react-cookie";
import { logoutAccount } from "../api/api";

function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navRef = useRef(null);
  // console.log(props.userInfo);
  //MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const navi = navRef.current;

    slideFromTop(navi);
  }, []);

  // console.log(props);

  const gotoHome = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    logoutAccount(cookies.accessToken);
    removeCookie("accessToken");
    window.location.href = "/";
  };
  return (
    <nav className="navbar" ref={navRef}>
      <img src={logo} alt="logo" className="img-logo" onClick={gotoHome} />
      {!props.isLoggedIn ? (
        <div className="nav-item-container">
          <Button variant="outlined" onClick={props.handleLoginActive}>
            Login
          </Button>
          <Button variant="outlined" onClick={props.handleSignupActive}>
            Signup
          </Button>
        </div>
      ) : (
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Typography variant="h6">Welcome! {props.userInfo.name}</Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <ManageAccountsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                window.location.href = "/dashboard/analytics";
              }}
            >
              <DashboardIcon style={{ marginRight: "10px" }} /> My Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/dashboard/webpos";
              }}
            >
              <PointOfSaleIcon style={{ marginRight: "10px" }} /> WEBPOS
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
