/** @format */

import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { TableVirtuoso } from "react-virtuoso"
import { Button } from "@mui/material"

const sample = [["Apple", 100, "01-01-2023", 100]]

function createData(
	id,
	asset,
	quantity,
	purchased_on,
	purchase_date_value,
	sell
) {
	console.log(
		"create data",
		asset,
		quantity,
		purchased_on,
		purchase_date_value,
		sell
	)
	return { id, asset, quantity, purchased_on, purchase_date_value, sell }
}

const columns = [
	{
		width: 150,
		label: "Asset",
		dataKey: "asset",
	},
	{
		width: 90,
		label: "Quantity",
		dataKey: "quantity",
		numeric: true,
	},
	{
		width: 90,
		label: "Purchased On",
		dataKey: "purchased_on",
		numeric: true,
	},
	{
		width: 90,
		label: "Amount Invested",
		dataKey: "purchase_date_value",
		numeric: true,
	},
]

const rows = Array.from({ length: 200 }, (_, index) => {
	const randomSelection = sample[Math.floor(Math.random() * sample?.length)]
	return createData(index, ...randomSelection)
})

const VirtuosoTableComponents = {
	Scroller: React.forwardRef((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => (
		<Table
			{...props}
			sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
		/>
	),
	TableHead,
	TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
	TableBody: React.forwardRef((props, ref) => (
		<TableBody {...props} ref={ref} />
	)),
}

function fixedHeaderContent() {
	return (
		<TableRow>
			{columns.map((column) => (
				<TableCell
					key={column.dataKey}
					variant='head'
					align={column.numeric || false ? "right" : "left"}
					style={{ width: column.width }}
					sx={{
						backgroundColor: "background.paper",
					}}>
					<strong>{column.label}</strong>
				</TableCell>
			))}
			<TableCell
				key={columns?.length}
				variant='head'
				align='center'
				style={{ width: 90 }}
				sx={{
					backgroundColor: "background.paper",
				}}>
				<strong>Sell</strong>
			</TableCell>
		</TableRow>
	)
}

function rowContent(_index, row) {
	return (
		<React.Fragment>
			{columns.map((column) => (
				<TableCell
					key={column.dataKey}
					align={column.numeric || false ? "right" : "left"}>
					{row[column.dataKey]}
				</TableCell>
			))}
			<TableCell key={columns.length} align='center'>
				<Button color='secondary'>Sell</Button>
			</TableCell>
		</React.Fragment>
	)
}

export default function AssetsTable({ data, sell }) {
	return (
		<Paper style={{ height: 400, width: "100%" }}>
			<TableVirtuoso
				data={rows}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	)
}
