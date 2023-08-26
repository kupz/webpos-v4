import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRef, useState } from "react";

export default function SearchFilter({ myFilter, setMyFilter }) {
  const searchRef = useRef(null);

  function generateTimestampId() {
    return Date.now().toString();
  }

  const timestampId = generateTimestampId();

  // const [filterWords, setFilterWords] = useState([]);
  //   console.log(filterWords);

  const handleKeyPressEnter = (e) => {
    if (e.keyCode === 13) {
      setMyFilter([
        ...myFilter,
        { id: timestampId, name: searchRef.current.value },
      ]);
      searchRef.current.value = "";
    }
  };

  const handleClick = () => {
    searchRef.current.focus();
  };
  return (
    <div className="search-filter" onClick={handleClick}>
      <div>
        <div className="word-filter">
          {myFilter.map((item) => {
            return (
              <div key={item.id}>
                <h6 style={{ whiteSpace: "nowrap" }}>{item.name}</h6>
                <CancelIcon
                  style={{ cursor: "pointer", fontSize: "15px" }}
                  onClick={() => {
                    setMyFilter(myFilter.filter((rm) => rm.id !== item.id));
                  }}
                />
              </div>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Search..."
          style={{ height: "100%" }}
          ref={searchRef}
          onKeyDown={handleKeyPressEnter}
        />
      </div>
      <SearchIcon />
    </div>
  );
}
