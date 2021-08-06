import React from "react";
import { makeStyles } from "@material-ui/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
const useStyles = makeStyles((theme) => ({
  selectRoot: {
    marginLeft: "30px",
    display: "flex",
    alignItems: "center",
    border: "none",
  },
  formControl: {
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    height: 45,
    border: "none",
  },
  select: {
    height: 45,
    width: 150,
    border: "none",
  },
}));
export default function DropDown({ names, setNames }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setNames(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.selectRoot}>
      <h4>PROPERTIES:</h4>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          value={names}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"people"}>People</MenuItem>
          <MenuItem value={"planets"}>Planets</MenuItem>
          <MenuItem value={"films"}>Films</MenuItem>
          <MenuItem value={"species"}>Species</MenuItem>
          <MenuItem value={"vehicles"}>Vehicles</MenuItem>
          <MenuItem value={"starships"}>Starships</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
