import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import Pagination from "@material-ui/core/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import DropDown from "./DropDown";
// import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow:
    //   "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19)",
    width: "96%",
  },
  searchIconStyle: {
    height: "45px",
    width: "45px",
    backgroundColor: "#9098aa",
    borderRadius: "5px 10px 10px 5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  searchIcon: {
    color: "#fff",
    // backgroundColor: "pink",
  },
  bottom: {
    marginLeft: "20px",
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 35,
    color: "#8F95A3",
    // marginRight: 55,
  },
  bottomText: {
    paddingLeft: 40,
    // color: "#8F95A3",
  },
}));
export default function Table(props) {
  const classes = useStyles();
  // const { url } = props;
  const [rowData, setRowData] = React.useState([]);
  const [filterRowData, setFilterRowData] = React.useState([]);
  const [column, setColumn] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = React.useState(0);
  const [names, setNames] = React.useState("people");
  React.useEffect(() => {
    axios
      .get(`https://swapi.dev/api/${names}/?page=${page}`)
      .then((res) => {
        // console.log(res.data.results);
        setRowData(res.data.results);
        setColumn(Object.keys(res.data.results[0]));
        setTotalCount(res.data.count);
        setCount(Math.ceil(res.data.count / 10));
        setPageSize(res.data.results.length);
      })
      .catch((err) => console.log(err));
  }, [page, names]);

  function arrayToObject(arr) {
    let newArr = [];
    for (let i = 0; i < 7; i++) {
      newArr.push({ field: arr[i], headerName: arr[i], width: 160 });
    }
    // console.log(newArr);
    return newArr;
  }

  function addRowId(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ ...arr[i], id: i });
    }
    // console.log(newArr);
    return newArr;
  }
  function handleChange(e, page) {
    setPage(page);
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const newRowData = rowData.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        console.log(val);
        return val;
      }
      return false;
    });
    setFilterRowData(newRowData);
  }, [searchTerm, rowData]);
  // console.log(rowData);
  return (
    <>
      <div className={classes.root}>
        <div className="inner-container">
          <h4>SEARCH:</h4>
          <input
            id="filled-basic"
            // label="Filled"
            className="form-control"
            variant="filled"
            type="text"
            placeholder="Search by any Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className={classes.searchIconStyle}>
            <SearchIcon className={classes.searchIcon} />
          </div>
          <DropDown names={names} setNames={setNames} />
        </div>
        <DataGrid
          autoHeight={true}
          rows={addRowId(filterRowData)}
          columns={arrayToObject(column)}
          pageSize={pageSize}
          checkboxSelection
          disableSelectionOnClick
          // hideFooterPagination={true}
          hideFooter={true}
        />
      </div>
      <div className={classes.bottom}>
        <Pagination
          count={count}
          variant="outlined"
          shape="circular"
          onChange={handleChange}
        />
        <Typography className={classes.bottomText}>
          Total number of {totalCount} names
        </Typography>
      </div>
    </>
  );
}
