import { Button, TextField } from "@mui/material";
import ImageUploader from "../ImageUploader";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch } from "react-redux";
import { deactivate } from "../../redux/updateModalSlice";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { updateProduct } from "../../api/api";
// import { useSelector } from "react-redux";

export default function ProductDetailModal(props) {
  const IMG_URL = "https://api.webpos.kupz.wazzhop.com/storage/uploads/";

  const [cookies] = useCookies(["user"]);
  //   const [reloadImageUploader] = useState(false);

  //   const [imgSource, setImgSource] = useState(
  //     `${IMG_URL}${props.data.id}.${props.data.extension}`
  //   );

  //   useEffect(() => {
  //     console.log("imgChange");
  //   }, [imgSource]);

  //   console.log(imgSource);
  //   console.log(`${IMG_URL}${props.data.id}.${props.data.extension}`);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const skuRef = useRef(null);
  const barcodeRef = useRef(null);
  const priceRef = useRef(null);

  //   console.log(props.data);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(deactivate());
  };

  useEffect(() => {
    nameRef.current.value = props.data.name;
    descriptionRef.current.value = props.data.description;
    skuRef.current.value = props.data.sku;
    barcodeRef.current.value = props.data.barcode;
    priceRef.current.value = props.data.price;
  }, []);

  const stock = props.data.stock;
  const total = parseInt(props.data.price) * parseInt(props.data.stock);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // console.log(imgsrc);

    const newFormData = new FormData();
    const newProduct = {
      //   image: imgSource,
      sku: skuRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      barcode: barcodeRef.current.value,
      stock: 0,
      price: parseInt(priceRef.current.value).toFixed(2),
    };
    Object.keys(newProduct).forEach((key) => {
      newFormData.append(key, newProduct[key]);
    });

    updateProduct(cookies.accessToken, newFormData, props.data.id).then(
      (res) => {
        console.log(res);
        if (res.ok) {
          toast.success("Product Successfully Edited!");
          //   setReloadUploader(!reloadUploader);
          window.location.reload();
        } else {
          // toast.error("sample error");
          // console.log(res.errors);
          Object.keys(res.errors).forEach((key) => {
            res.errors[key].map((err) => {
              return toast.error(err);
            });
          });
        }
      }
    );
  };

  return (
    <div className="product-detail-modal">
      <div className="product-detail-modal-main">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <BorderColorIcon onClick={handleEdit} />
        </div>
        {/* <ImageUploader
          setImageData={setImgSource}
          imgsrc={imgSource}
          key={reloadImageUploader}
        /> */}
        <form onSubmit={handleProductSubmit}>
          <TextField
            variant="outlined"
            label="Product Name"
            required
            inputRef={nameRef}
            disabled={!editMode}
          />
          <TextField
            variant="outlined"
            label=" Description"
            required
            inputRef={descriptionRef}
            disabled={!editMode}
          />
          <TextField
            variant="outlined"
            label=" SKU (OPTIONAL)"
            inputRef={skuRef}
            disabled={!editMode}
          />
          <TextField
            variant="outlined"
            label=" Barcode (OPTIONAL)"
            inputRef={barcodeRef}
            disabled={!editMode}
          />
          <TextField
            variant="outlined"
            label=" Price"
            required
            inputRef={priceRef}
            disabled={!editMode}
          />
          <h4>Stocks : {new Intl.NumberFormat("en-US").format(stock)} </h4>
          <h4>
            Total Amount : {new Intl.NumberFormat("en-US").format(total)}{" "}
          </h4>
          <div>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
