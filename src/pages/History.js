import { useEffect, useState } from "react";
import { getProduct, getTransaction } from "../api/api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import CustomTable from "../components/CustomTable";
import SearchFilter from "../components/SearchFilter";

export default function History() {
  const [cookies] = useCookies(["user"]);
  const [transactionData, setTransactionData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    getTransaction(cookies.accessToken).then((res) => {
      if (res.ok) {
        // console.log('res.data',res.data)
        const jsonKeys = Object.keys(res.data)
        console.log(jsonKeys)
        // console.log(res.data['15'])
        const convertedData = jsonKeys.map((obj) => {
          // console.log(res.data[obj])
          return res.data[obj]
        })
        // convertedData.reverse()
        // console.log(convertedData)
        
        setTransactionData(convertedData);
      } else {
        toast.error("Failed to fetch Transaction Data");
      }
    });

    getProduct(cookies.accessToken).then((res) => {
      if (res.ok) {
        setInventoryData(res.data);
      } else {
        toast.error("Failed to fetch Product Data");
      }
    });
  }, [cookies.accessToken]);

  const [activatePrint, setActivatePrint] = useState(null);

  const [myFilter, setMyFilter] = useState([]);
  const [filteredTrans, setFilteredTrans] = useState([]);

  useEffect(() => {
    let sample = transactionData;
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
  }, [myFilter, transactionData]);

  // console.log("transactionData", transactionData);
  // console.log('transactionData Length', transactionData.length)
  // console.log('sample array', [{wew: 'w'}, {wew: 'aw'}])

  return (
    <div className="history">
      <div
        className="inventory-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   height: "50px",
          gap: "5rem",
        }}
      >
        <h2 style={{ whiteSpace: "nowrap" }}>Transaction History</h2>
        <SearchFilter myFilter={myFilter} setMyFilter={setMyFilter} />
      </div>
      {/* <CustomTable
        setActivatePrint={setActivatePrint}
        inventoryData={inventoryData}
        setTransactionData={setTransactionData}
        transactionData={
          filteredTrans.length < 1 ? transactionData : filteredTrans
        }
      /> */}

      {transactionData.length > 0 ? (
        <CustomTable
          setActivatePrint={setActivatePrint}
          inventoryData={inventoryData}
          setTransactionData={setTransactionData}
          transactionData={
            filteredTrans.length < 1 ? transactionData : filteredTrans
          }
        />
      ) : (
        <p>Loading or no data available</p>
      )}

      {activatePrint}
    </div>
  );
}
