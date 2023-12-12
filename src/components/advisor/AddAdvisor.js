/** @format */

import { Grid } from "@mui/material"
import React from "react"
import { useState } from "react"
import Paper from "@mui/material/Paper"
import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button" // Import Button component
import Dialog from "@mui/material/Dialog" // Import Dialog component
import DialogTitle from "@mui/material/DialogTitle" // Import DialogTitle component
import DialogContent from "@mui/material/DialogContent" // Import DialogContent component
import TextField from "@mui/material/TextField" // Import TextField component
import Title from "../Title"

import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	List,
	ListItem,
	ListItemText,
} from "@mui/material"

const advisorsList = [
	"Advisor 1",
	"Advisor 2",
	"Advisor 3",
	"Advisor 4",
	"Advisor 5",
	"Advisor 6",
	// Add more advisors as needed
]

const NoAdvisorFoundPage = () => {
	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>No Advisor Found</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant='h4' align='center' style={{ marginTop: "50px" }}>
					No advisor found.
				</Typography>
				{/* Add your content here */}
			</Container>
		</div>
	)
}

function AddAdvisor() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const [searchTerm, setSearchTerm] = useState("")
	const [visibleAdvisors, setVisibleAdvisors] = useState(5)

	const filteredAdvisors = advisorsList.filter((advisor) =>
		advisor.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value)
		setVisibleAdvisors(5) // Reset visible advisors when search term changes
	}
	return (
		<Grid container spacing={3}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>No Advisor Found</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<TextField
					label='Search Advisor'
					variant='outlined'
					fullWidth
					margin='normal'
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<List>
					{filteredAdvisors.slice(0, visibleAdvisors).map((advisor, index) => (
						<ListItem key={index}>
							<ListItemText primary={advisor} />
						</ListItem>
					))}
				</List>
				{visibleAdvisors < filteredAdvisors?.length && (
					<Typography
						variant='body2'
						color='textSecondary'
						align='center'
						style={{ cursor: "pointer" }}
						onClick={() => setVisibleAdvisors((prev) => prev + 5)}>
						Show More
					</Typography>
				)}
				{filteredAdvisors.length === 0 && (
					<Typography variant='h6' align='center' style={{ marginTop: "20px" }}>
						No matching advisors found.
					</Typography>
				)}
			</Container>
		</Grid>
	)
}

export default AddAdvisor
