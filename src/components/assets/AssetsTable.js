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
import dayjs from "dayjs"

const columns = [
	{
		label: "Asset",
		dataKey: "ticker",
	},
	{
		label: "Quantity",
		dataKey: "quantity",
		numeric: true,
	},
	{
		label: "Purchased On",
		dataKey: "purchasedDate",
		numeric: true,
	},
	{
		label: "Amount Invested",
		dataKey: "amountOnPurchase",
		numeric: true,
	},
]

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

export default function AssetsTable({ data, sell }) {
	const formattedData = data?.map((d) => ({
		...d,
		purchasedDate: dayjs(d?.purchasedDate).format("MM-DD-YYYY"),
	}))

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
					<Button onClick={() => sell(row?._id)} color='secondary'>
						Sell
					</Button>
				</TableCell>
			</React.Fragment>
		)
	}

	return (
		<Paper style={{ height: 400, width: "100%" }}>
			<TableVirtuoso
				data={formattedData}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	)
}
