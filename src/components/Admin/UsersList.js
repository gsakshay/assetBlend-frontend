import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function AdminPage() {
  // Sample data - replace this with your actual data
  const users = [
    { id: 1, name: "1. Firstname | Lastname | Email", stockCount: 15, advisor: "Advisor A" },
    { id: 2, name: "2. Firstname | Lastname | Email", stockCount: 20, advisor: "Advisor B" },
    { id: 3, name: "3. Firstname | Lastname | Email", stockCount: 12, advisor: "Advisor C" },
    { id: 4, name: "4. Firstname | Lastname | Email", stockCount: 8, advisor: "Advisor D" },
    { id: 5, name: "5. Firstname | Lastname | Email", stockCount: 10, advisor: "Advisor E" },
    { id: 6, name: "6. Firstname | Lastname | Email", stockCount: 5, advisor: "Advisor A" },
    { id: 7, name: "7. Firstname | Lastname | Email", stockCount: 18, advisor: "Advisor B" },
    { id: 8, name: "8. Firstname | Lastname | Email", stockCount: 22, advisor: "Advisor C" },
    { id: 9, name: "9. Firstname | Lastname | Email", stockCount: 9, advisor: "Advisor D" },
    { id: 10, name: "10. Firstname | Lastname | Email", stockCount: 7, advisor: "Advisor F" },
    { id: 11, name: "11. Firstname | Lastname | Email", stockCount: 13, advisor: "Advisor K" },
    { id: 12, name: "12. Firstname | Lastname | Email", stockCount: 19, advisor: "Advisor L" },
    { id: 13, name: "13. Firstname | Lastname | Email", stockCount: 11, advisor: "Advisor M" },
    { id: 14, name: "14. Firstname | Lastname | Email", stockCount: 14, advisor: "Advisor N" },
    { id: 15, name: "15. Firstname | Lastname | Email", stockCount: 6, advisor: "Advisor O" },
    { id: 16, name: "16. Firstname | Lastname | Email", stockCount: 21, advisor: "Advisor P" },
    { id: 17, name: "17. Firstname | Lastname | Email", stockCount: 17, advisor: "Advisor Q" },
    { id: 18, name: "18. Firstname | Lastname | Email", stockCount: 4, advisor: "Advisor R" },
    { id: 19, name: "19. Firstname | Lastname | Email", stockCount: 3, advisor: "Advisor S" },
    { id: 20, name: "20. Firstname | Lastname | Email", stockCount: 16, advisor: "Advisor T" },
  ];

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AdminPage;
