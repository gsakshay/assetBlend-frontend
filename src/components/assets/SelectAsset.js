/** @format */

import { useCallback, useState } from "react"
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import { Link } from "react-router-dom"

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
	border: "1px solid black",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}))

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	border: "1px solid grey",
}))

export const SelectAssets = ({ assetName }) => {
	return (
		<Card>
			<CardHeader
				subheader={`Choose your next ${assetName}`}
				title={assetName}
			/>
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder={`Search ${assetName}`}
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Box>
			</CardContent>
			<Divider />
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>
					<Stack spacing={2}>
						<Link to='app/assets/1'>
							<Item>Item 1</Item>
						</Link>
						<Link to='app/assets/1'>
							<Item>Item 1</Item>
						</Link>
						<Link to='app/assets/1'>
							<Item>Item 1</Item>
						</Link>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	)
}
