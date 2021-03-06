import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import FolderShared from "@material-ui/icons/FolderShared";
import Straighten from "@material-ui/icons/Straighten";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tabs from "components/CustomTabs/CustomTabs.js";
import PatientsList from "./PatientsList.js";
import Measures from "./Measures";

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

export default function Patients() {
  


  //return (JSON.stringify(patients));

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          title="Patients:"
          headerColor="primary"
          tabs={[
            {
              tabName: "List",
              tabIcon: FolderShared,
              tabContent: (
                <PatientsList
                />
              )
			},
			{
				tabName: "Measures",
				tabIcon: Straighten,
				tabContent: (
				  <Measures
				  />
				)
			  },
            
          ]}
        />
      </GridItem>
    </GridContainer>
  );
}
