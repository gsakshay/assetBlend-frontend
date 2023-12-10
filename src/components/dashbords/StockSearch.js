// StockSearch.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const StockSearch = ({ onSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    // Implement logic to fetch stock suggestions from DumyAPI based on searchText which we will
    // replace with axios for API requests.

  
    const stockSuggestions = await getStockSuggestions(searchText);
    setSuggestions(stockSuggestions);
  };

  return (
    <div>
      <TextField
        label="Search Asset"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginTop: '5px' }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '12px' }}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.name}
        onChange={(_, newValue) => onSelect(newValue)}
        renderInput={(params) => <TextField {...params} label="Select Asset" />}
      />
    </div>
  );
};

export default StockSearch;
