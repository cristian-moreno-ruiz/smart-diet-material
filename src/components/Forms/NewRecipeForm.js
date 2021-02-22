import React, { useState } from "react";

import CustomInput from "../CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { Macros, Units } from "../../variables/enums.js";
import Button from "components/CustomButtons/Button.js";

export const NewRecipeForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [composition, setComposition] = useState([]);

  const customInput = macro => (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          labelText={macro}
          formControlProps={{ fullWidth: true }}
          inputProps={{
            defaultValue: name,
            onChange: e => setName(e.target.value)
          }}
          value={name}
        />
      </GridItem>
    </GridContainer>
  );
  const structure = {
    name: "",
    quantity: 200,
    unit: "g",
    type: "CARB"
  };

  const addElement = () => {
    setComposition([...composition, structure]);
  };

  const onChange = (e, idx, accessor) => {
    debugger;
    const newArr = [...composition];
    newArr[idx][accessor] = e.target.value;
    setComposition(newArr);
  };

  const submit = () => {
    const body = {
      name,
      composition
    };
    if (onSubmit === "new") {
      alert(onSubmit + " :" + JSON.stringify(body));
    } else {
      alert(onSubmit + " :" + JSON.stringify(body));
    }
  };

  const compositionSection = () => {
    debugger;
    const components = composition.map((c, idx) => {
      // <GridItem xs={1}> </GridItem>
      return (
        <GridContainer xs={12} sm={12} md={12} key={idx}>
          <GridItem xs={1}></GridItem>
          <GridItem xs={11} sm={11} md={11} key={idx}>
            <CustomInput
              labelText={"Name"}
              formControlProps={{ fullWidth: true }}
              inputProps={{
                defaultValue: c.name,
                onChange: e => onChange(e, idx, "name")
              }}
            />
          </GridItem>
          <GridItem xs={1}></GridItem>
          <GridItem xs={2} sm={2} md={2} key={idx}>
            <CustomInput
              labelText={"Qty"}
              formControlProps={{ fullWidth: true }}
              inputProps={{
                defaultValue: c.quantity,
                onChange: e => onChange(e, idx, "quantity")
              }}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4} key={idx}>
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Units</InputLabel>
              <Select
                native
                value={c.unit}
                onChange={e => onChange(e, idx, "unit")}
                inputProps={{
                  name: "unit",
                  id: "unit-native-simple"
                }}
              >
                {Object.values(Units).map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={4} key={idx}>
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Type</InputLabel>
              <Select
                native
                value={c.type}
                onChange={e => onChange(e, idx, "type")}
                inputProps={{
                  name: "type",
                  id: "type-native-simple"
                }}
              >
                {Object.values(Macros).map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={12} key={idx}>
            <Autocomplete
              size="small"
              id="combo-box-demo"
              value="test"
              options={macros}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />
          </GridItem> */}
        </GridContainer>
      );
    });
    return components;
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <CustomInput
          labelText={"Name"}
          formControlProps={{ fullWidth: true }}
          inputProps={{
            defaultValue: name,
            onChange: e => setName(e.target.value)
          }}
          // value={name}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        {"  ______________   "}
      </GridItem>
      <GridItem xs={8} sm={8} md={8}>
        Composition
      </GridItem>
      <GridItem>
        <Button color="info" onClick={addElement} size="sm">
          Add Element
        </Button>
      </GridItem>
      {compositionSection()}
      <Grid container alignItems="center" justify="center">
        <Button color="primary" onClick={submit} size="lg">
          Add Recipe
        </Button>
      </Grid>
    </GridContainer>
  );
};
export default NewRecipeForm;
