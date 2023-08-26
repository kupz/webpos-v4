import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintReceipt(props) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleCloseBtn = () => {
    window.location.href = `/${props.redirectTo}`;
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        flexDirection: "column",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      {/* Component to print */}
      <div
        ref={componentRef}
        style={{
          backgroundColor: "white",
          width: "400px",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>WEBPOS RECEIPT</h1>
        <h5 style={{ textAlign: "center" }}>
          This receipt is System Generated.
        </h5>
        <table style={{ padding: "10px", width: "100%" }}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>SRP</th>
              <th>QTY</th>
              <th>subTotal</th>
            </tr>
          </thead>
          <tbody>
            {props.data.products.map((obj) => {
              return (
                <tr key={obj.id}>
                  <td>{obj.sku}</td>
                  <td>{obj.price}</td>
                  <td>{Math.abs(obj.pivot.quantity)}</td>
                  <td>{Math.abs(obj.pivot.quantity) * parseInt(obj.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h4>Total : {props.data.total_price} </h4>
          <h4>Number of items : {props.data.total_quantity} </h4>
          <h4>
            Transaction Type:{" "}
            {props.data.type === 1
              ? "Invoice"
              : props.data.type === 2
              ? "Receive"
              : "Pullout"}{" "}
          </h4>
        </div>
        <div>
          <h4>Ref. number : #{props.data.id} </h4>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="contained" color="error" onClick={handleCloseBtn}>
          Close
        </Button>
      </div>
      {/* <Button>Save</Button> */}
    </div>
  );
}
