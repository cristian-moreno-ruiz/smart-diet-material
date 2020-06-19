import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import swal from "sweetalert";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from "@material-ui/core/Grid";
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

export default function Recipes() {
  const [recipesData, setRecipesData] = useState([]);
  const [desired, setDesired] = useState({
    CARB: 1,
    FAT: 1,
    LOW_FAT_PROT: 1,
    MED_FAT_PROT: 1,
    HIGH_FAT_PROT: 1,
    VEG: 1,
    FRUIT: 1,
    LACT: 1
  });

  async function fetchData() {
    console.log("fetching data from smart-diet-api");
    //debugger;
    const res = await fetch(`${process.env.REACT_APP_API_URI}/recipes`);
    const result = await res.json();
    result.forEach(r => {
      r.composition = r.composition.map(c => c.type + ", ");
      r.composition = _.uniq(r.composition);
    });
    setRecipesData(result);
    console.log(result);
    //debugger;
  }

  function changeDesired(e, element) {
    // console.log("target: " + e.target.value);
    // const newElement = recipesData.filter(r => r._id === id);
    // setRecipesData(...recipesData, newElement);
    // const newData = recipesData;
    // newData[idx] = { ...newData[idx], carb: +e.target.value };
    // setRecipesData(newData);
    // console.log(recipesData);
    const newObj = { ...desired };
    newObj[element] = +e.target.value;
    setDesired(newObj);
  }

  async function copyRecipe(r) {
    // alert("id" + id + "comp " + comp);
    // alert(id);
    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/recipe/print/${r._id}?carb=${desired.CARB}&fat=${desired.FAT}
	  &low_fat_prot=${desired.LOW_FAT_PROT}&med_fat_prot=${desired.MED_FAT_PROT}&high_fat_prot=${desired.HIGH_FAT_PROT}
	  &veg=${desired.VEG}&fruit=${desired.FRUIT}&lact=${desired.LACT}`
    );
    const result = await res.json();
    console.log(result);
    swal({
      title: result.Nombre,
      text: result.Preparacion,
      // type: "input",
      buttons: ["Cancelar", "Copiar Receta"]
    }).then(value => {
      if (value) {
        navigator.clipboard.writeText(result.Preparacion);
      }
    });
  }

  /* 	
	FAT: 'FAT',
	  CARB: 'CARB',
	  LOW_FAT_PROT: 'LOW-FAT-PROT',
	  MED_FAT_PROT: 'MED-FAT-PROT',
	  HIGH_FAT_PROT: 'HIGH-FAT-PROT',
	  VEG: 'VEG',
	  FRUIT: 'FRUIT',
	  LACT: 'LACT',
	   */

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      minWidth: 150
    },
    {
      Header: "Composition",
      accessor: "composition",
      minWidth: 80
    },

    {
      Header: "Action",
      accessor: "action",
      minWidth: 30
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const classes = useStyles();

  //return (JSON.stringify(patients));

  const customInput = macro => (
    <GridItem xs={1} sm={1} md={1}>
      <CustomInput
        labelText={macro}
        formControlProps={{ fullWidth: true }}
        inputProps={{
          defaultValue: desired[macro],
          onChange: e => changeDesired(e, macro)
        }}
        value={desired.CARB}
      />
    </GridItem>
  );

  //const macro = 'CARB';

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Recipes</h4>
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
          <Grid
            container
            alignItems="center"
            justify="center"
            xs={12}
            sm={12}
            md={12}
          >
            {customInput("CARB")}
            {customInput("FAT")}
            {customInput("LOW_FAT_PROT")}
            {customInput("MED_FAT_PROT")}
            {customInput("HIGH_FAT_PROT")}
            {customInput("VEG")}
            {customInput("FRUIT")}
            {customInput("LACT")}
          </Grid>
          <CardBody>
            <ReactTable
              data={recipesData.map((r, idx) => {
                r.idx = idx;
                // r.composition = 17;
                r.action = (
                  <button onClick={() => copyRecipe(r, desired)}>
                    Click me
                  </button>
                );
                return r;
              })}
              columns={columns}
              pageSizeOptions={[1, 5, 10]}
              filterable
              defaultPageSize={3} // Fix pageSize not working properly
              showPaginationBottom={true}
              className="ReactTable"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
