/** @format */

// AssetsChart.js
import React, { useState } from "react"
import {
	IgrFinancialChart,
	IgrFinancialChartModule,
} from "igniteui-react-charts"
import TempStocksHistory from "./TempStocksHistory"
import { useSelector } from "react-redux"

IgrFinancialChartModule.register()

const AssetsChart = ({ jsonData }) => {
	const stocks = TempStocksHistory(jsonData)

	return (
		<div className='container-fluid'>
			<div className='row justify-content-center'>
				{stocks?.length > 0 ? (
					<div className='col-lg-8'>
						<IgrFinancialChart
							width='100%'
							height='500px'
							chartType='Line'
							thickness={1}
							chartTitle='Stock Price History'
							subtitle='Historical data between selected dates'
							yAxisMode='PercentChange'
							yAxisTitle='Percent Changed'
							xAxisInterval={1}
							dataSource={stocks}
						/>
					</div>
				) : (
					<p className='text-center'>Loading asset data...</p>
				)}
			</div>
		</div>
	)
}

export default AssetsChart

// /** @format */
// import React, { useState } from "react"
// import {
// 	IgrFinancialChart,
// 	IgrFinancialChartModule,
// } from "igniteui-react-charts"
// import useStocksHistory from "./TempStocksHistory"
// IgrFinancialChartModule.register()

// const AssetsChart = () => {
// 	const [selectedOption, setSelectedOption] = useState("All")
// 	const [searchedStockSymbol, setSearchedStockSymbol] = useState("")
// 	const stocks = useStocksHistory(selectedOption, searchedStockSymbol)

// 	return (
// 		<div className='container-fluid'>
// 			<div className='row justify-content-center'>
// 				{stocks?.length > 0 ? (
// 					<div className='col-lg-8'>
// 						<IgrFinancialChart
// 							width='100%'
// 							height='500px'
// 							chartType='Line'
// 							thickness={1}
// 							chartTitle='Stock Price History'
// 							subtitle='Historical data between selected dates'
// 							yAxisMode='PercentChange'
// 							yAxisTitle='Percent Changed'
// 							xAxisInterval={1}
// 							dataSource={stocks}
// 						/>
// 					</div>
// 				) : (
// 					<p className='text-center'>Loading asset data...</p>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default AssetsChart
