// TempStocksHistory.js
import { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';

const TempStocksHistory = (jsonData) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (jsonData) {
      const stockData = convertData(jsonData);
      setStocks(stockData);
    }
  }, [jsonData]);

  const convertData = (jsonData) => {
    return jsonData.map((json) => {
      const parts = json.date.split("-");
      const date = parseISO(json.date);
      return {
        date,
        open: json.open,
        high: json.high,
        low: json.low,
        close: json.close,
        volume: json.volume,
      };
    });
  };

  return stocks;
};

export default TempStocksHistory;

// import { useEffect, useState } from 'react';

// const TempStocksHistory = () => {
//   const [stocks, setStocks] = useState([]);

//   const fetchStockData = async () => {
//     const dataSources = await Promise.all([
//       fetchStock('Amazon', 'https://static.infragistics.com/xplatform/data/stocks/stockAmazon.json'),
//     ]);

//     setStocks(dataSources);
//   };

//   const fetchStock = async (symbol, url) => {
//     const response = await fetch(url);
//     const jsonData = await response.json();
//     const stockData = convertData(jsonData);
//     stockData.__dataIntents = {
//       close: [`SeriesTitle/${symbol}`],
//     };

//     return stockData;
//   };

//   const convertData = (jsonData) => {
//     return jsonData.map((json) => {
//       const parts = json.date.split("-");
//       const date = new Date(parts[0], parts[1] - 1, parts[2]); // Adjust month (subtract 1 as months are zero-indexed)
//       return {
//         date,
//         open: json.open,
//         high: json.high,
//         low: json.low,
//         close: json.close,
//         volume: json.volume,
//       };
//     });
//   };
  
  

//   useEffect(() => {
//     fetchStockData();
//   }, []);

//   return stocks;
// };

// export default TempStocksHistory;