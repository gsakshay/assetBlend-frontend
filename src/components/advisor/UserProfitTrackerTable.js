import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const columns = [
  { label: 'User Name', dataKey: 'userName', width: 150 },
  { label: 'Total Investment', dataKey: 'totalInvestment', width: 150 },
  { label: 'Current Amount', dataKey: 'currentAmount', width: 150 },
  { label: 'Difference', dataKey: 'difference', width: 150 },
];

const data = [
  { userId: 1, userName: 'Akshay', totalInvestment: 800, currentAmount: 700, difference: 100 },
  { userId: 2, userName: 'Shubham', totalInvestment: 1000, currentAmount: 800, difference: 200 },
  { userId: 3, userName: 'Deep', totalInvestment: 1500, currentAmount: 1200, difference: -300 },
  { userId: 4, userName: 'Shukrut', totalInvestment: 1500, currentAmount: 1200, difference: -300 },
  // Add more data as needed
];

// Sort data alphabetically by user name
data.sort((a, b) => a.userName.localeCompare(b.userName));

const getDifferenceCellStyle = (difference) => {
  return {
    display: 'flex',
    alignItems: 'center',
    color: difference >= 0 ? 'green' : 'red',
    fontWeight: 'bold',
  };
};

const smallArrowStyles = {
  fontSize: 16, // Adjust the font size as needed
};

const UserProfitTrackerTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                <strong>{column.label}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.dataKey}>
                  {column.dataKey === 'difference' ? (
                    <Box style={getDifferenceCellStyle(row[column.dataKey])}>
                      {Math.abs(row[column.dataKey])} {row[column.dataKey] >= 0 ? <ArrowUpwardIcon sx={smallArrowStyles} /> : <ArrowDownwardIcon sx={smallArrowStyles} />}
                    </Box>
                  ) : (
                    column.dataKey !== 'userId' ? row[column.dataKey] : null
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProfitTrackerTable;
