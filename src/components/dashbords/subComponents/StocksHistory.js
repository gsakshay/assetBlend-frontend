




import { useEffect, useState } from 'react';

const useStocksHistory = () => {
  const [stocks, setStocks] = useState([]);

  const fetchStockData = async () => {
    const dataSources = await Promise.all([
      fetchStock('Amazon', 'https://static.infragistics.com/xplatform/data/stocks/stockAmazon.json'),
      fetchStock('Tesla', 'https://static.infragistics.com/xplatform/data/stocks/stockTesla.json'),
      fetchStock('Microsoft', 'https://static.infragistics.com/xplatform/data/stocks/stockMicrosoft.json'),
      fetchStock('Google', 'https://static.infragistics.com/xplatform/data/stocks/stockGoogle.json'),
    ]);

    setStocks(dataSources);
  };

  const fetchStock = async (symbol, url) => {
    const response = await fetch(url);
    const jsonData = await response.json();
    const stockData = convertData(jsonData);
    stockData.__dataIntents = {
      close: [`SeriesTitle/${symbol}`],
    };

    return stockData;
  };

  const convertData = (jsonData) => {
    return jsonData.map((json) => {
      const parts = json.date.split("-");
      const date = new Date(parts[0], parts[1] - 1, parts[2]); // Adjust month (subtract 1 as months are zero-indexed)
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
  
  

  useEffect(() => {
    fetchStockData();
  }, []);

  return stocks;
};

export default useStocksHistory;



// import { useEffect, useState } from 'react';

// const useStocksHistory = (selectedOption, searchedStockSymbol) => {
//   const [stocks, setStocks] = useState([]);

//   const fetchStockData = async () => {
//     try {
//       const dataSources = await Promise.all([
//         fetchStock('AAPL'),
//         fetchStock('GOOGL'),
//         fetchStock('MSFT'),
//         // Add other stock symbols as needed
//       ]);
  
//       console.log('Fetched Data:', dataSources);
//       setStocks(dataSources);
//     } catch (error) {
//       console.error('Error fetching stock data:', error);
//     }
//   };
  

//   const fetchStock = async (symbol) => {
//     const apiKey = 'fb208543d231b4b60e4d4ac7fcd4b91d'; // Replace with your API key
//     const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`;
  
//     try {
//       const response = await fetch(url);
//       const jsonData = await response.json();
//       console.log(`Response for ${symbol}:`, jsonData); // Log the response data
  
//       const stockData = convertData(jsonData.historical);
//       stockData.__dataIntents = {
//         close: [`SeriesTitle/${symbol}`],
//       };
  
//       return stockData;
//     } catch (error) {
//       console.error(`Error fetching data for ${symbol}:`, error);
//       return [];
//     }
//   };
  

//   const convertData = (jsonData) => {
//     try {
//       return jsonData.map((json) => {
//         const date = new Date(json.date);
//         return {
//           date: date.getTime(),
//           open: json.open,
//           high: json.high,
//           low: json.low,
//           close: json.close,
//           volume: json.volume,
//         };
//       });
//     } catch (error) {
//       console.error('Error converting data:', error);
//       console.log('jsonData:', jsonData); // Log the jsonData to inspect its structure
//       return [];
//     }
//   };
  


//   useEffect(() => {
//     console.log("Any:"+stocks);
//     fetchStockData();
//   }, [selectedOption, searchedStockSymbol]);

//   return stocks;
// };

// export default useStocksHistory;