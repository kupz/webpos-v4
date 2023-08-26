import { toast } from "react-toastify";
import productDefault from "../assets/productDefault.png";
export default function WebposCard(props) {
  const handleProductClick = () => {
    // console.log("click");
    const data = {
      id: props.id,
      sku: props.sku,
      price: props.price,
      quantity: 1,
    };
    if (!props.cartData.some((obj) => obj.id === props.id)) {
      props.addtocart(data);
    } else {
      toast.warning("Item already Exist");
    }
  };
  return (
    <div className="product-card" onClick={handleProductClick}>
      <span>{props.name}</span>
      <img src={!props.img ? productDefault : props.img} alt="product" />
      <span>Price : {props.price}</span>
      <span style={{ color: props.stock < 1 ? "red" : "white" }}>
        Stock : {props.stock}
      </span>
      <span>{props.description}</span>
    </div>
  );
}
