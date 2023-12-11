import { Grid } from "@mui/material"
import React from "react"
import { useState } from 'react';
import Paper from "@mui/material/Paper"
import Title from "../Title"
import {    
	Typography,
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; // Import Button component
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle component
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent component
import TextField from '@mui/material/TextField'; // Import TextField component

function ShowAdvisorDetail() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddAdvisorClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
   
	return (
		<Grid container spacing={3}>
            <Grid item xs={12} md={6}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							// height: 240,
						}}>
						<Typography component='p' variant='h4'>
							John Patel
						</Typography>
						<Typography color='text.secondary' sx={{ flex: 1 }}>
							+1 393-394-8998
						</Typography>
                        <Typography color='text.secondary' sx={{ flex: 1 }}>
							john@gmail.com
						</Typography>
					</Paper>
			</Grid>

            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 1,
                        }}>
                        <Title>Want to change Advisor?</Title>
                        <Button variant="outlined" onClick={handleAddAdvisorClick}>
                        <AddIcon/> Choose New Advisor
                        </Button>
                </Paper>
			</Grid>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} align="center" style={{ verticalAlign: 'middle' }}>
                        <DialogTitle>Add New Advisor</DialogTitle>
                        <DialogContent>
                        {/* customize the content of the dialog here */}
                        <TextField label="Search Advisor" fullWidth style={{ marginTop: '5px' }}/>
                        {/* Add other components as needed */}
                        <Button variant="contained" color="primary" style={{ marginTop: '12px' }}>
                            Change
                        </Button>
                        </DialogContent>
                    </Dialog>
		</Grid>
	)
}

export default ShowAdvisorDetail