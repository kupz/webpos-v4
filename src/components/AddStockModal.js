import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deactivateUpdate } from "../redux/addstockModalSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { addTransaction } from "../api/api";
// import { validate_receive } from "../functionalComponent/validation";

export default function AddStockModal(props) {
  const dispatch = useDispatch();

  const [cookies] = useCookies(["user"]);

  // const [cartData, setCartData] = useState([]);

  const handleClose = () => {
    dispatch(deactivateUpdate());
  };

  const [quantity, setQuantity] = useState(0);
  const handleChange = (e) => {
    if (e.target.value === "") {
      setQuantity(0);
    } else {
      setQuantity(e.target.value);
    }
  };

  const handleAddTrans = () => {
    const transactionData = {};
    // console.log(cartData);

    transactionData.type = 2;

    const cart = [{ product: props.data.id, quantity: quantity }];

    transactionData.cart = cart;
    // console.log(transactionData);

    if (quantity >= 1) {
      addTransaction(cookies.accessToken, transactionData).then((res) => {
        // console.log(res);
        if (res.ok) {
          toast.success("Product Successfully Received!");
          handleClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  return (
    <div className="addproduct-modal">
      <div className="addproduct-modal-main">
        <h1>Add Stocks </h1>
        <span>
          Product name: <p>{props.data.name}</p>
        </span>
        <span>
          description: <p>{props.data.description}</p>
        </span>
        <span>
          SKU: <p>{props.data.sku}</p>
        </span>
        <span>
          Price: <p>{props.data.price}</p>
        </span>
        <span>
          Barcode: <p>{props.data.barcode}</p>
        </span>
        <span>
          Current Stock: <p>{props.data.stock}</p>
        </span>
        <span>
          Stock After :
          <p>
            {/* {!isNaN(
              new Intl.NumberFormat("en-US").format(
                parseInt(props.data.stock) + parseInt(quantity)
              )
            )
              ? new Intl.NumberFormat("en-US").format(
                  parseInt(props.data.stock) + parseInt(quantity)
                )
              : 0} */}
            {new Intl.NumberFormat("en-US").format(
              parseInt(props.data.stock) + parseInt(quantity)
            )}
          </p>
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            variant="outlined"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleChange}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddTrans}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
