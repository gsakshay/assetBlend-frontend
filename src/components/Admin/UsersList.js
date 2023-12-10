import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPage() {
  const initialUsers = [
    { id: 1, name: "User 1", stockCount: 15, advisor: "Advisor A" },
    { id: 2, name: "User 2", stockCount: 20, advisor: "Advisor B" },
    { id: 3, name: "User 3", stockCount: 12, advisor: "Advisor C" },
    { id: 4, name: "User 4", stockCount: 8, advisor: "Advisor D" },
    { id: 5, name: "User 5", stockCount: 10, advisor: "Advisor E" },
    { id: 6, name: "User 6", stockCount: 5, advisor: "Advisor A" },
    { id: 7, name: "User 7", stockCount: 18, advisor: "Advisor B" },
    { id: 8, name: "User 8", stockCount: 22, advisor: "Advisor C" },
    { id: 9, name: "User 9", stockCount: 9, advisor: "Advisor D" },
    { id: 10, name: "User 10", stockCount: 7, advisor: "Advisor F" },
    { id: 11, name: "User 11", stockCount: 13, advisor: "Advisor K" },
    { id: 12, name: "User 12", stockCount: 19, advisor: "Advisor L" },
    { id: 13, name: "User 13", stockCount: 11, advisor: "Advisor M" },
    { id: 14, name: "User 14", stockCount: 14, advisor: "Advisor N" },
    { id: 15, name: "User 15", stockCount: 6, advisor: "Advisor O" },
    { id: 16, name: "User 16", stockCount: 21, advisor: "Advisor P" },
    { id: 17, name: "User 17", stockCount: 17, advisor: "Advisor Q" },
    { id: 18, name: "User 18", stockCount: 4, advisor: "Advisor R" },
    { id: 19, name: "User 19", stockCount: 3, advisor: "Advisor S" },
    { id: 20, name: "User 20", stockCount: 16, advisor: "Advisor T" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpen = (userId) => {
    setOpen(true);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUserId);
    setUsers(updatedUsers);
    handleClose();
  };

  const modalStyle = {
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Admin Dashboard
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="right">Number of Stocks</TableCell>
              <TableCell align="right">Advisor</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover role="checkbox" tabIndex={-1}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.stockCount}</TableCell>
                <TableCell align="right">{user.advisor}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleOpen(user.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="delete-confirmation-title"
            variant="h6"
            component="h2"
          >
            Confirm Deletion
          </Typography>
          <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button sx={{ mr: 1 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteUser}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}

export default AdminPage;