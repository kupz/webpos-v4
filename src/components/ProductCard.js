import { memo } from "react";
import productDefault from "../assets/productDefault.png";
import { useDispatch } from "react-redux";
import { activate } from "../redux/updateModalSlice";
import { activateUpdate } from "../redux/addstockModalSlice";
// import { useSelector } from "react-redux";
// import ProductDetailModal from "./charts/ProductDetailModal";

function ProductCard(props) {
  const dispatch = useDispatch();
  //   const data = props.data;
  const IMG_URL = "https://api.webpos.kupz.wazzhop.com/storage/uploads/";

  const productIMG = props.data.extension
    ? `${IMG_URL}${props.data.id}.${props.data.extension}`
    : null;

  // console.log(props.data.extension);
  // console.log(productIMG);

  // const [detailModal, setDetailModal] = useState(false);

  const handleDetailModal = () => {
    dispatch(activate(props.data));
  };

  const handleUpdateModal = () => {
    dispatch(activateUpdate(props.data));
  };

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={productIMG ?? productDefault} alt="product" />
        <p>{props.data.name}</p>
      </div>
      <div className="desc">
        <p>Price: {props.data.price} </p>
        <p>Stock: {props.data.stock}</p>
      </div>
      <div className="productcard-btn">
        <button onClick={handleUpdateModal}>Add Stocks</button>
        <button onClick={handleDetailModal}>Product Details</button>
      </div>
    </div>
  );
}
export default memo(ProductCard);
