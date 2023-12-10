/** @format */

import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AssetsChart from "../components/chart/AssetsChart";
import {  Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AssetDetail() {
  const userRole = "advisor";
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  const stockData = {
    name: "Amazon",
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Stock Name:", stockData.name);
    console.log("Quantity:", quantity);
    console.log("Date:", date);

    if (userRole === "advisor") {
      console.log("Selected User:", selectedUser);
    }

    // Close the modal after submission
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Title>Amazon</Title>
              <Typography component="p" variant="h4">
                $250
              </Typography>
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 240,
              }}
            >
              <AssetsChart />
            </Paper>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} md={6}>
            <Button
              // onClick={() => navigate(`/app/dashboard`)}
              onClick={handleOpen}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 0 }}
            >
              Add Asset
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                  {stockData.name}
                </Typography>

                <TextField
                  id="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                {userRole === "advisor" && (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="user-select-label">User</InputLabel>
                    <Select
                      labelId="user-select-label"
                      id="user-select"
                      value={selectedUser}
                      label="User"
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{ mt: 2 }}
                >
                  Confirm
                </Button>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              // onClick={() => navigate(`/app/dashboard`)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 0 }}
            >
              Sell Asset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AssetDetail;
