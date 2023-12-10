import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdvisorUserPage() {
  // Example data structure for advisors and their users
  const advisors = {
    'Advisor A': ['User 1', 'User 3', 'User 5'],
    'Advisor B': ['User 2', 'User 4'],
    // ... other advisors
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
            id={`panel${index}a-header`}
          >
            <Typography>{advisor}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {users.map((user, idx) => (
                <ListItem key={idx}>{user}</ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AdvisorUserPage;
