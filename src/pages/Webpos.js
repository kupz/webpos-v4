import logo from "../assets/logo.png";
// import MenuIcon from "@mui/icons-material/Menu";
import WebposCard from "../components/WebposCard";
import { Button, TextField } from "@mui/material";
import ReceiptItem from "../components/ReceiptItem";
import { useCookies } from "react-cookie";
import { addTransaction, getProduct, logoutAccount } from "../api/api";

import SearchFilter from "../components/SearchFilter";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { validate_invoice } from "../functionalComponent/validation";
import { toast } from "react-toastify";
import $ from "jquery";

export default function Webpos() {
  const IMG_URL = "https://api.webpos.kupz.wazzhop.com/storage/uploads/";
  const [cookies, removeCookies] = useCookies(["user"]);
  const [printData, setPrintData] = useState({});

  const [isPrintActive, setIsPrintActive] = useState(false);

  const handleLogout = () => {
    logoutAccount(cookies.accessToken);
    removeCookies("accessToken");
    window.location.href = "/";
  };

  const [products, setProducts] = useState([]);
  // API
  useEffect(() => {
    getProduct(cookies.accessToken).then((res) => {
      // console.log(res.data);
      setProducts(res.data);
      setProductDisplay(res.data);
    });
  }, [cookies.accessToken]);

  const [cartData, setCartData] = useState([]);

  const addToCart = (data) => {
    setCartData([data, ...cartData]);
    // console.log(cartData);
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [barcodeMode, setBarcodeMode] = useState(false);

  const handleOnblur = () => {
    if (barcodeMode) {
      $("#barcodeInput").trigger("focus");
    }
  };
  const handleCashOnclick = () => {
    setBarcodeMode(false);
    $("#cashinput").trigger("focus");
  };
  const handleScan = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") {
      const selectedProduct = products.find(
        (item) => item.barcode === e.target.value
      );
      if (selectedProduct) {
        selectedProduct.quantity = 1;

        if (cartData.some((item) => item.id === selectedProduct.id)) {
          setCartData(() => {
            const update = cartData.map((item) => {
              if (item.id === selectedProduct.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            return update;
          });
          $("#barcodeInput").val("");
        } else {
          addToCart(selectedProduct);
          $("#barcodeInput").val("");
        }
      } else {
        toast.error("Product not found!");
        $("#barcodeInput").val("");
      }
    }
  };

  useEffect(() => {
    const sumOfPrice = cartData.reduce((accumulator, currentObj) => {
      return (
        parseInt(accumulator) +
        parseInt(currentObj.price * parseInt(currentObj.quantity))
      );
    }, 0);

    setTotalPrice(sumOfPrice);
  }, [cartData]);

  const handleProceed = () => {
    const data = cartData.map((obj) => {
      return { product: obj.id, quantity: obj.quantity };
    });
    if (validate_invoice(products, cartData)) {
      addTransaction(cookies.accessToken, { type: 1, cart: data }).then(
        (res) => {
          if (res.ok) {
            setPrintData(res.data);
            toast.success("Transaction Success");
            setCartData([]);
            setCash(0);
            setIsPrintActive(!isPrintActive);
          } else {
            toast.error("something went wrong!");
          }
        }
      );
    }
  };

  const [cash, setCash] = useState(0);
  const [changeValue, setChangeValue] = useState(0);
  const handleCashOnChange = (e) => {
    if (e.target.value === "") {
      setCash(0);
    } else if (!isNaN(e.target.value)) {
      setCash(e.target.value);
    }
  };

  useEffect(() => {
    const change = parseInt(cash) - parseInt(totalPrice);
    setChangeValue(change);
  }, [cash, totalPrice]);

  const [searchInput, setSearchInput] = useState("");
  const [productDisplay, setProductDisplay] = useState([]);

  useEffect(() => {
    // console.log(searchInput);
    const filteredValue = products.filter(
      (obj) =>
        obj?.sku?.toLowerCase().includes(searchInput.toLowerCase()) ||
        obj.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        obj.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        obj?.barcode?.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (searchInput === "") {
      setProductDisplay(products);
    }
    setProductDisplay(filteredValue);
    // console.log(filteredValue);
  }, [searchInput, products]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    // console.log(searchInput);
  };

  const [myFilter, setMyFilter] = useState([]);
  const [filteredTrans, setFilteredTrans] = useState([]);

  useEffect(() => {
    let sample = products;
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
          <h1>Welcome to WEBPOS</h1>
          <SearchFilter myFilter={myFilter} setMyFilter={setMyFilter} />
        </div>
        <div className="webpos-header-right"></div>
      </div>
      <div className="webpos-main">
        {/* Products Here */}
        <div className="webpos-product">
          {productDisplay.map((item) => {
            return (
              <WebposCard
                key={item.id}
                id={item.id}
                name={item.name}
                sku={item.sku}
                description={item.description}
                barcode={item.barcode}
                price={item.price}
                stock={item.stock}
                img={
                  item.extension
                    ? `${IMG_URL}${item.id}.${item.extension}`
                    : null
                }
                addtocart={addToCart}
                cartData={cartData}
              />
            );
          })}
        </div>

        <div className="webpos-receipt">
          <h3
            style={{
              padding: "12.5px",
              backgroundColor: "rgb(0, 167, 111)",
              color: "white",
            }}
          >
            Receipt
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "10px",
              overflowY: "scroll",
            }}
          >
            <table id="resibo">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>SKU</th>
                  <th>SRP</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* sample data */}
                {cartData.map((obj) => {
                  return (
                    <ReceiptItem
                      price={obj.price}
                      sku={obj.sku}
                      id={obj.id}
                      key={obj.id}
                      quantity={obj.quantity}
                      setCartData={setCartData}
                      cartData={cartData}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              backgroundColor: " rgb(0, 167, 111)",
              color: "whitesmoke",
              gap: "10px",
              boxShadow: "0 0 5px  rgb(0, 167, 111)",
              borderRadius: "10px",
            }}
          >
            <h3>TOTAL : {totalPrice}</h3>
            <TextField
              id="cashinput"
              label="CASH"
              variant="filled"
              color="error"
              value={cash}
              onChange={handleCashOnChange}
              onClick={handleCashOnclick}
            />
            <h3>CHANGE : {changeValue}</h3>
            <Button variant="contained" onClick={handleProceed}>
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
