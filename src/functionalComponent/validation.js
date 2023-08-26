// import { getProduct } from "../api";
import { toast } from "react-toastify";

export const validate_pullout = (productData, cartData) => {
  //   console.log("wew : ", productData);
  if (cartData.length === 0) {
    toast.error("add some item before you submit");
    return false;
  }
  for (const cartItem of cartData) {
    const productItem = productData.find((obj) => obj.id === cartItem.id);

    if (parseInt(productItem.stock) < parseInt(cartItem.quantity)) {
      toast.error("Not enough Stocks of " + cartItem.sku);
      return false;
    }
  }
  return true;
};

export const validate_invoice = (productData, cartData) => {
  //   console.log("wew : ", productData);
  if (cartData.length === 0) {
    toast.error("add some item before you submit");
    return false;
  }
  for (const cartItem of cartData) {
    const productItem = productData.find((obj) => obj.id === cartItem.id);

    if (parseInt(productItem.stock) < parseInt(cartItem.quantity)) {
      toast.error("Not enough Stocks of " + cartItem.sku);
      return false;
    }
  }
  return true;
};

export const validate_receive = (cartData) => {
  //   console.log("wew : ", productData);
  if (cartData.length === 0) {
    toast.error("add some item before you submit");
    return false;
  }

  return true;
};

export const validate_void = (transData, InvData) => {
  // console.log("transData", transData);
  // console.log("invData", InvData);
  let response = true;
  if (transData.type === 2) {
    transData.products.forEach((product) => {
      const invProduct = InvData.find((item) => item.id === product.id);

      if (product.pivot.quantity > parseInt(invProduct.stock)) {
        console.log(product.pivot.quantity);
        console.log(parseInt(invProduct.stock));
        response = false;
      }
    });
  }
  // console.log(response);
  return response;
};
