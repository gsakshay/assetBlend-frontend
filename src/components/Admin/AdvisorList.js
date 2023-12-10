import React, { useState } from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, 
  Typography, List, ListItem, IconButton, 
  Modal, Box, Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

function AdvisorUserPage() {
  const initialAdvisors = {
    'Advisor A': ['User 1', 'User 3', 'User 5'],
    'Advisor B': ['User 2', 'User 4'],
    // ... other advisors
  };

  const [advisors, setAdvisors] = useState(initialAdvisors);
  const [open, setOpen] = useState(false); // State to control the modal
  const [selectedAdvisor, setSelectedAdvisor] = useState(null); // State to track selected advisor for deletion

  const handleOpen = (advisorName) => {
    setOpen(true);
    setSelectedAdvisor(advisorName);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAdvisor(null);
  };

  const deleteAdvisor = () => {
    const updatedAdvisors = { ...advisors };
    delete updatedAdvisors[selectedAdvisor];
    setAdvisors(updatedAdvisors);
    handleClose();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Typography variant="h4" sx={{ margin: 2 }}>
        Advisor List
      </Typography>

      {Object.entries(advisors).map(([advisor, users], index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel$}{index}a-header`}
          >
          <Typography>{advisor}</Typography>
          <IconButton
            onClick={() => handleOpen(advisor)}
            edge="end"
            size="small"
            style={{ marginLeft: 'auto' }}
          >
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
          </IconButton>
        </AccordionSummary><AccordionDetails>
            <List>
              {users.map((user, idx) => (
                <ListItem key={idx}>{user}</ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}


      {/* Confirmation Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete {selectedAdvisor}?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button sx={{ mr: 1 }} onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={deleteAdvisor}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdvisorUserPage;