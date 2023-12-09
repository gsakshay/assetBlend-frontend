/** @format */
import React, { useState } from 'react';
import { IgrFinancialChart, IgrFinancialChartModule } from 'igniteui-react-charts';
import useStocksHistory from './StocksHistory';
IgrFinancialChartModule.register();

const IndividualChart = () => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [searchedStockSymbol, setSearchedStockSymbol] = useState('');
    const stocks = useStocksHistory(selectedOption, searchedStockSymbol);
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      setSearchedStockSymbol(''); // Reset search symbol when changing option
    };
  
    const handleSearch = () => {
      // Implement search logic here if needed
      // For example: setSearchedStockSymbol('AAPL'); // AAPL is just an example, replace with actual user input
    };
  
    return (
      <div className="container-fluid">
        {/* <h1 className="text-center mb-4">Stock Chart</h1> */}
        <div className="row justify-content-center">

          {/* Add below div to implement Options in chart like search...   */}
          {/* <div className="col-lg-8 mb-3">
            <label className="form-label">Select Option:</label>
            <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
              <option value="All">All</option>
              <option value="Search">Search</option>
            </select>
          </div> */}
          {selectedOption === 'Search' ? (
            <div className="col-lg-8 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter stock symbol"
                value={searchedStockSymbol}
                onChange={(e) => setSearchedStockSymbol(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleSearch}>
                Search
              </button>
            </div>
          ) : null}
          {stocks.length > 0 ? (
            <div className="col-lg-8">
              <IgrFinancialChart
                width="100%"
                height="500px"
                chartType="Line"
                thickness={1}
                chartTitle="Stock Price History"
                subtitle="Historical data between selected dates"
                yAxisMode="PercentChange"
                yAxisTitle="Percent Changed"
                xAxisInterval = {1}
                dataSource={stocks}
              />
            </div>
          ) : (
            <p className="text-center">Loading stock data...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default IndividualChart;

