import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";

import _ from "lodash";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function PatientsList() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [patientsData, setPatientsData] = useState([]);

  async function fetchData() {
    console.log("fetching data from smart-diet-api");
    //debugger;
    const res = await fetch("http://localhost:3000/patients");
    const result = await res.json();
    setPatientsData(result);
    console.log(result);
    //debugger;
  }

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      minWidth: 150
    },
    {
      Header: "Surnames",
      accessor: "surnames"
    },
    {
      Header: "Gender",
      accessor: "gender"
    }
  ];

  useEffect(() => {
    fetchData();
    // console.log(patientsData);
  }, []);

  const classes = useStyles();

  //return (JSON.stringify(patients));

  return (
    <GridContainer>
      <GridItem xs={4} sm={4} md={4}>
        <Card color="transparent">
          <CardHeader color="white">
		  <CardIcon color="primary">

				<Icon color="white">person</Icon>
              </CardIcon>
            <GridItem xs={12} sm={12} md={12}>
              <h4>
                <FormControl>
                  <InputLabel
                    htmlFor="age-native-simple"
                    defaultValue={selectedPatient}
                  >
                    Select a patient
                  </InputLabel>
                  <Select
                    native
                    value={selectedPatient}
                    onChange={e => setSelectedPatient(e.target.value)}
                    inputProps={{
                      name: "unit",
                      id: "unit-native-simple",
                      defaultValue: setSelectedPatient
                    }}
                  >
                    <option key={0} value=""></option>
                    {patientsData.map((u, i) => (
                      <option key={i} value={u.name + u.surnames}>
                        {u.name + " " + u.surnames}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </h4>
            </GridItem>

            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <ReactTable
          data={patientsData}
          columns={columns}
          pageSizeOptions={[1, 5, 10]}
          filterable
          defaultPageSize={3} // Fix pageSize not working properly
          showPaginationBottom={true}
          className="ReactTable"
        />
      </GridItem>
    </GridContainer>
  );
}
