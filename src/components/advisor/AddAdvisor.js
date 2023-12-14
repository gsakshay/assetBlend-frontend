/** @format */

import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdvisor, assignAdvisor } from "../../services/user";
import { setAllAdvisor } from "../../store/userReducer";
import { useNavigate } from "react-router";

function AddAdvisor() {
	const navigate = useNavigate()
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const details = await getAllAdvisor();
      dispatch(setAllAdvisor(details));
    } catch (e) {
      console.log("Could not load profile details", e);
    }
  }

  const listOfAllAdvisors = useSelector((state) => state?.userReducer?.allAdvisors);

  const handleAssignAdvisor = async (advisorId) => {
    try {
      await assignAdvisor(advisorId);
	  window.location.reload();

    } catch (e) {
      console.log("Could not assign Advisor", e);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleAdvisors, setVisibleAdvisors] = useState(5);

  const filteredAdvisors = listOfAllAdvisors.filter((advisor) =>
    (advisor.firstName + ' ' + advisor.lastName).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleAdvisors(5); // Reset visible advisors when search term changes
  };

  return (
    <Grid container spacing={3}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>No Advisor Found!</Typography>
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
            <ListItem key={index} button onClick={() => handleAssignAdvisor(advisor._id)}>
              <ListItemText primary={`${advisor.firstName} ${advisor.lastName}`} />
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
  );
}

export default AddAdvisor;
