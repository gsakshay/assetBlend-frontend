import { Grid } from "@mui/material"
import React from "react"
import { useState } from 'react';
import Paper from "@mui/material/Paper"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; // Import Button component
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle component
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent component
import TextField from '@mui/material/TextField'; // Import TextField component
import Title from "../Title"

function AddAdvisor() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddAdvisorClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
	return (
		<Grid container spacing={3}>
            <Grid item xs={12} md={12} align="center" style={{ verticalAlign: 'middle' }}>
                        <Paper
                        sx={{
                            p: 1,
                        }}
                        >
                            <Title>No Advisor Found</Title>
                            <Button variant="outlined" onClick={handleAddAdvisorClick}>
                               <AddIcon/> Choose Advisor
                            </Button>
                        
                        </Paper>
                    </Grid>

                    <Dialog open={isDialogOpen} onClose={handleCloseDialog} align="center" style={{ verticalAlign: 'middle' }}>
                        <DialogTitle>Add Advisor</DialogTitle>
                        <DialogContent>
                        {/* customize the content of the dialog here */}
                        <TextField label="Search Advisor" fullWidth style={{ marginTop: '5px' }}/>
                        {/* Add other components as needed */}
                        <Button variant="contained" color="primary" style={{ marginTop: '12px' }}>
                            Add
                        </Button>
                        </DialogContent>
                    </Dialog>
		</Grid>
	)
}

export default AddAdvisor