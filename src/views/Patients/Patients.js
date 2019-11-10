import React, { useState, useEffect } from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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

	const [patientsData, setPatientsData] = useState([]);

	async function fetchData () {
		console.log('fetching data from smart-diet-api');
		//debugger;
		const res = await fetch('http://localhost:3000/patients');
		const result = await res.json();
		setPatientsData(result);
		console.log(result);
		//debugger;
	}


	const columns = [{
		Header: 'Name',
		accessor: 'name',
		minWidth: 150,
	},
	{
		Header: 'Surnames',
		accessor: 'surnames',
	},
	{
		Header: 'Gender',
		accessor: 'gender',
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
			<GridItem xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>List of Patients</h4>
						<p className={classes.cardCategoryWhite}>
            			</p>
					</CardHeader>
					<CardBody>
					<ReactTable
							data={patientsData}
							columns={columns}
							pageSizeOptions={[1, 5, 10]}
							className="-striped -highlight"
							filterable
							pageSize={patientsData.length}
							showPaginationBottom={true}
							className="-striped -highlight"
						/>
					</CardBody>
				</Card>
			</GridItem>
		</GridContainer>
	);
}
