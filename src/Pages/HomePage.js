import React from "react";
import PeopleTable from "../Components/PeopleTable";
const HomePage = () => {
  return (
    <div style={{ width: "100%" }}>
      <PeopleTable url="people" />
    </div>
  );
};

export default HomePage;
