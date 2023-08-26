import dayjs from "dayjs";
// import SettingsIcon from "@mui/icons-material/Settings";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

import PrintReceipt from "./PrintReceipt";
import { toast } from "react-toastify";
import { validate_void } from "../functionalComponent/validation";
import { voidTransaction } from "../api/api";
import { useCookies } from "react-cookie";
// import { memo } from "react";

function CustomTable(props) {
  const [cookies] = useCookies(["user"]);
  // console.log(props.transactionData);

  const transactionData = props.transactionData || [];

  return (
    <div className="custom-table">
      <div className="custom-header">
        <div className="custom-data">Transaction #</div>
        <div className="custom-data">Type</div>
        <div className="custom-data">Total Qty</div>
        <div className="custom-data">Total Price</div>
        <div className="custom-data">Date & Time</div>
        <div className="custom-data">Action</div>
      </div>
      {transactionData.map((trans) => {
        // console.log(trans);

        return (
          <div
            className="custom-row"
            key={trans.id}
            style={{ backgroundColor: trans.void ? "#e67575" : "#84db65" }}
          >
            <div className="custom-data">{trans.id}</div>
            <div className="custom-data">
              {trans.type === 1
                ? "Invoice"
                : trans.type === 2
                ? "Receive"
                : trans.type === 3
                ? "Pullout"
                : "not found"}
            </div>
            <div className="custom-data">{trans.total_quantity}</div>
            <div className="custom-data">{trans.total_price}</div>
            <div className="custom-data">
              {dayjs(trans.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            <div
              className="custom-data"
              style={{ display: "flex", gap: "1rem" }}
            >
              <Tooltip title="View Transaction">
                <VisibilityIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.setActivatePrint(
                      <PrintReceipt
                        data={trans}
                        redirectTo={"dashboard/history"}
                      />
                    );
                  }}
                />
              </Tooltip>
              <Tooltip title="Void / Unvoid">
                <BlockIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // console.log("item", item);
                    // console.log("inventory", inventoryData);
                    if (validate_void(trans, props.inventoryData)) {
                      voidTransaction(cookies.accessToken, trans.id).then(
                        (res) => {
                          if (res.ok) {
                            toast.success(res.message);
                            const tempTrans = props.transactionData.map(
                              (obj) => {
                                if (obj.id === res.data.id) {
                                  return res.data;
                                } else {
                                  return obj;
                                }
                              }
                            );
                            props.setTransactionData(tempTrans);
                          } else {
                            toast.error("something went wrong");
                          }
                        }
                      );
                    } else {
                      toast.error(
                        "There's a conflict on your data , you can't use void function when your product is already been consumed!"
                      );
                    }
                  }}
                />
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CustomTable;
