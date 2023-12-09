/** @format */

/** @format */
import * as React from "react"
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Title from "../Title"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; // Import Button component
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle component
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent component
import TextField from '@mui/material/TextField'; // Import TextField component


function createData(id, name, data1, data2) {
	return { id, name, data1, data2 }
}

const rows = [
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
	createData(0, "Denn", 20.3, 100.1),
]

const assets = [
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
	createData(0, "Amazon"),
]


function AdminDashboard() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAssetClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

const [assetManagmentData, setAssetManagmentData] = useState({ assets: 22, clients: 32 });
	return (
		<div>
			<Grid container spacing={3}>	
                <Grid item xs={12} md={6}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							// height: 240,
						}}>
						<Title>Total Number of Users</Title>
						<Typography component='p' variant='h4'>
							3,024
						</Typography>
					</Paper>
				</Grid>		

                <Grid item xs={12} md={6}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							// height: 240,
						}}>
						<Title>Total Number of Assets</Title>
						<Typography component='p' variant='h4'>
							394
						</Typography>
					</Paper>
				</Grid>

                <Grid item xs={12} md={12} align="center" style={{ verticalAlign: 'middle' }}>
                        <Paper
                        sx={{
                            p: 1,
                        }}
                        >
                            <Button variant="outlined" onClick={handleAddAssetClick}>
                               <AddIcon/> Add Asset
                            </Button>
                        
                        </Paper>
                    </Grid>

                    <Dialog open={isDialogOpen} onClose={handleCloseDialog} align="center" style={{ verticalAlign: 'middle' }}>
                        <DialogTitle>Add Asset</DialogTitle>
                        <DialogContent>
                        {/* customize the content of the dialog here */}
                        <TextField label="Search Asset" fullWidth style={{ marginTop: '5px' }}/>
                        {/* Add other components as needed */}
                        <Button variant="contained" color="primary" style={{ marginTop: '12px' }}>
                            Add
                        </Button>
                        </DialogContent>
                    </Dialog>


                <Grid item md={6} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column"}}>
						<Title>Advisor Request</Title>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell >Name</TableCell>
									<TableCell align="center" style={{ verticalAlign: 'middle' }}>Approve</TableCell>
									<TableCell align="center" style={{ verticalAlign: 'middle' }}>Reject</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.id}>
										<TableCell >{row.name}</TableCell>
										<TableCell align="center" style={{ verticalAlign: 'middle' }}>
                                           <CheckCircleIcon/>
                                        </TableCell>
                                        <TableCell align="center" style={{ verticalAlign: 'middle' }}>
                                           <CancelIcon/>
                                        </TableCell>
										
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>

                <Grid item md={6} xs={12}>
					<Paper sx={{ p: 2, display: "flex", flexDirection: "column"}}>
						<Title>Main Page Assets</Title>
						<Table size='small'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align="center" style={{ verticalAlign: 'middle' }}>Remove</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{assets.map((row) => (
									<TableRow key={row.id}>
										<TableCell>{row.name}</TableCell>
										<TableCell align="center" style={{ verticalAlign: 'middle' }}>
                                           <DeleteIcon/>
                                        </TableCell>
										
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
                
			</Grid>
		</div>
	)
}

export default AdminDashboard
