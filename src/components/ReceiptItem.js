// import { useState } from "react";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

export default function ReceiptItem(props) {
  // const [inputValue, setInputValue] = useState(props.quantity);

  const increment = () => {
    const newData = props.cartData.map((obj) => {
      if (obj.id === props.id) {
        return { ...obj, quantity: obj.quantity + 1 };
      } else {
        return obj;
      }
    });
    props.setCartData(newData);
  };

  const decrement = () => {
    let tobeDeleted;
    const newData = props.cartData.map((obj) => {
      if (obj.id === props.id) {
        if (obj.quantity <= 1) {
          tobeDeleted = obj.id;
        }
        return { ...obj, quantity: obj.quantity - 1 };
      } else {
        return obj;
      }
    });
    if (tobeDeleted) {
      removedItem();
    } else {
      props.setCartData(newData);
    }
  };

  const handleOnchange = (e) => {
    if (e.target.value === "") {
      // setInputValue(1);
      const newData = props.cartData.map((obj) => {
        if (obj.id === props.id) {
          return { ...obj, quantity: 1 };
        }
        return obj;
      });
      props.setCartData(newData);
    } else if (!isNaN(e.target.value)) {
      const newData = props.cartData.map((obj) => {
        if (obj.id === props.id) {
          return { ...obj, quantity: parseInt(e.target.value) };
        }
        return obj;
      });
      props.setCartData(newData);
    }
  };

  const removedItem = () => {
    console.log("removedItem");
    const newData = props.cartData.filter((obj) => obj.id !== props.id);
    props.setCartData(newData);
    console.log(props.cartData);
  };

  return (
    <tr style={{ textAlign: "center" }}>
      <td
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span onClick={decrement}>
            <IndeterminateCheckBoxOutlinedIcon />
          </span>
          <input
            type="text"
            style={{
              width: "20px",
              outline: "none",
              border: "0",
              textAlign: "center",
              marginBottom: "5px",
            }}
            value={props.quantity}
            onChange={handleOnchange}
          />
          <span onClick={increment}>
            <AddBoxOutlinedIcon />
          </span>
        </div>
      </td>
      <td>{props.sku}</td>
      <td>{props.price}</td>
      <td>{parseInt(props.price) * parseInt(props.quantity)}</td>
    </tr>
  );
}
