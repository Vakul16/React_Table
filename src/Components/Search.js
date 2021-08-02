import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
const Search = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(result);
  return (
    <>
      <div className="searchForm">
        <Toolbar>
          {/* <label>Search: </label> */}
          <TextField
            id="filled-basic"
            // label="Filled"
            variant="filled"
            type="text"
            placeholder="Search any trial"
            // value={this.state.data}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {result
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            })
            .map((val) => {
              return (
                <div className="user">
                  <li>{val.name}</li>
                </div>
              );
            })}
        </Toolbar>
      </div>
    </>
  );
};

export default Search;
