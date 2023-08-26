import { Button, TextField } from "@mui/material";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import ImageUploader from "../components/ImageUploader";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { getProduct, addProduct } from "../api/api";
import { toast } from "react-toastify";
// import { Outlet } from "react-router-dom";

export default function Inventory() {
  const [cookies] = useCookies(["user"]);
  const [reloadUploader, setReloadUploader] = useState(false);
  const [imgsrc, setImgsrc] = useState("");

  // FORM DATA VARIABLES
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const skuRef = useRef(null);
  const barcodeRef = useRef(null);

  // SEND POST DATA VIA SUBMIT
  const handleProductSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    const newProduct = {
      image: imgsrc,
      sku: skuRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      barcode: barcodeRef.current.value,
      stock: 0,
      price: parseInt(priceRef.current.value).toFixed(2),
    };
    console.log(imgsrc);
    Object.keys(newProduct).forEach((key) => {
      if (!(imgsrc === "" && key === "image")) {
        newFormData.append(key, newProduct[key]);
      }
      if(newProduct[key] === ""){
        newFormData.delete(key)
      }
    });

    addProduct(cookies.accessToken, newFormData).then((res) => {
      if (res.ok) {
        setImgsrc("");
        skuRef.current.value = "";
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        barcodeRef.current.value = "";
        priceRef.current.value = "";
        toast.success("Product Successfully Added!");
        setReloadUploader(!reloadUploader);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // toast.error("sample error");
        // console.log(res.errors);
        Object.keys(res.errors).forEach((key) => {
          res.errors[key].map((err) => {
            return toast.error(err);
          });
        });
      }
    });
  };

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProduct(cookies.accessToken).then((res) => {
      // console.log(res.data);
      if (res.ok) {
        setProductList(res.data);
      } else {
        toast.error("something went wrong");
      }
    });
  }, [cookies.accessToken]);

  const [myFilter, setMyFilter] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let sample = productList;
    myFilter.forEach((term) => {
      sample = sample.filter((product) => {
        return (
          product.name.includes(term.name) ||
          product.price.includes(term.name) ||
          product.description.includes(term.name) ||
          product.sku.includes(term.name) ||
          product.barcode.includes(term.name)
        );
      });
    });
    setFilteredProducts(sample);
  }, [myFilter, productList]);
  // console.log("products", productList);
  // console.log("filter", filteredProducts);

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <SearchFilter myFilter={myFilter} setMyFilter={setMyFilter} />
      <div className="inventory-main">
        <div className="product-container">
          {(myFilter.length > 0 ? filteredProducts : productList).map(
            (item) => {
              return <ProductCard key={item.id} data={item} />;
            }
          )}
        </div>
        <div className="inventory-aside">
          <div>
            <ImageUploader
              setImageData={setImgsrc}
              imgsrc={imgsrc}
              key={reloadUploader}
            />
          </div>
          <form onSubmit={handleProductSubmit}>
            <TextField
              variant="outlined"
              label="Product Name"
              inputRef={nameRef}
              required
            />
            <TextField
              variant="outlined"
              label="Product Description"
              inputRef={descriptionRef}
              required
            />
            <TextField
              variant="outlined"
              label="Product Price"
              type="number"
              inputRef={priceRef}
              required
            />
            <TextField
              variant="outlined"
              label="Product sku (OPTIONAL)"
              inputRef={skuRef}
            />
            <TextField
              variant="outlined"
              label="Product Barcode"
              inputRef={barcodeRef}
            />
            <Button variant="contained" color="success" type="submit">
              Register Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
