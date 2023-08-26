import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { getProduct, getTransaction } from "../api/api";
import ProductCard2 from "../components/WebposCard";
import { Switch } from "@mui/material";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function Webpos(props) {
  const [cookies] = useCookies(["user"]);
  const [transactionData, setTransactionData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const [transactionType, setTransactionType] = useState('INVOICE')

  useEffect(() => {
    getTransaction(cookies.accessToken).then((res) => {
      if (res.ok) {
        setTransactionData(res.data);
      } else {
        toast.error("Failed to fetch Transaction Data");
      }
    });

    getProduct(cookies.accessToken).then((res) => {
      if (res.ok) {
        setInventoryData(res.data);
      } else {
        toast.error("Failed to fetch Product Data");
      }
    });
  }, [cookies.accessToken]);
  const [myFilter, setMyFilter] = useState([]);
  const [filteredTrans, setFilteredTrans] = useState([]);

  useEffect(() => {
    let sample = transactionData;
    myFilter.forEach((term) => {
      sample = sample.filter((transaction) => {
        return (
          transaction.id.toString().includes(term.name) ||
          transaction.created_at.includes(term.name) ||
          transaction.total_price.toString().includes(term.name) ||
          transaction.total_quantity.toString().includes(term.name) ||
          (transaction.type === 1
            ? "invoice"
            : transaction.type === 2
            ? "received"
            : "pullout"
          ).includes(term.name.toLowerCase())
        );
      });
    });
    setFilteredTrans(sample);
  }, [myFilter]);

  return (
    <div className="webpos">
      <div className="webpos-header">
        <div className="webpos-title">
          <h1>WEBPOS SYSTEM</h1>
          <SearchFilter myFilter={myFilter} setMyFilter={setMyFilter} />
        </div>
        <div className="webpos-header-right">
          <div>
            Barcode Mode : ON <Switch />
          </div>
          <div>
            Transaction Type :
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    {transactionType}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={()=>{setTransactionType('INVOICE')}}>INVOICE</MenuItem>
                    <MenuItem onClick={()=>{setTransactionType('RECEIVE')}}>RECEIVE</MenuItem>
                    <MenuItem onClick={()=>{setTransactionType('PULLOUT')}}>PULLOUT</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>
      </div>
      <div className="webpos-main">
        <div className="webpos-product">
          <ProductCard2 />
        </div>
        <div className="webpos-receipt"></div>
      </div>
    </div>
  );
}