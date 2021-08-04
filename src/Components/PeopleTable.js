import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import Pagination from "@material-ui/core/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
// import { collapseClasses } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "20px",
    width: "1310px",
  },
  bottom: {
    marginLeft: "20px",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
  },
}));
export default function PeopleTable(props) {
  const classes = useStyles();
  const { url } = props;
  const [rowData, setRowData] = React.useState([]);
  const [filterRowData, setFilterRowData] = React.useState([]);
  const [column, setColumn] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(`https://swapi.dev/api/${url}/?page=${page}`)
      .then((res) => {
        // console.log(res.data.results);
        setRowData(res.data.results);
        setColumn(Object.keys(res.data.results[0]));
        setTotalCount(res.data.count);
        setCount(Math.ceil(res.data.count / 10));
        setPageSize(res.data.results.length);
      })
      .catch((err) => console.log(err));
  }, [page, url]);

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
        <div className="search">
          <input
            id="filled-basic"
            // label="Filled"
            className="form-control"
            variant="filled"
            type="text"
            placeholder="Search by any name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
          Total number of {totalCount} trials.
        </Typography>
      </div>
    </>
  );
}
