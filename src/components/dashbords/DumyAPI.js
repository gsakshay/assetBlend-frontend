// dummyAPI.js
const stockList = [
    "Amazon",
    "Apple",
    "Microsoft",
    "Google",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    "Facebook",
    // Add more stock names as needed
  ];
  
  export const searchStocks = (query) => {
    const searchTerm = query.toLowerCase();
    return stockList.filter((stock) => stock.toLowerCase().includes(searchTerm));
  };
  