/** @format */

import React from "react"
import {
	IgrCategoryChart,
	IgrCategoryChartModule,
	IgrColumnSeries,
} from "igniteui-react-charts"

IgrCategoryChartModule.register()

const InvestmentBarChart = ({ totalInvested, currentWorth }) => {
	const data = [
		{
			category: "Total Invested",
			totalInvested: totalInvested,
			currentWorth: 0,
		},
		{ category: "Current Worth", totalInvested: 0, currentWorth: currentWorth },
	]

	return (
		<IgrCategoryChart
			width='300px'
			height='268px'
			chartType='Column'
			dataSource={data}
			yAxisTitle='Amount'>
			<IgrColumnSeries
				name='totalInvested'
				title='Total Invested'
				valueMemberPath='totalInvested'
			/>
			<IgrColumnSeries
				name='currentWorth'
				title='Current Worth'
				valueMemberPath='currentWorth'
			/>
		</IgrCategoryChart>
	)
}

export default InvestmentBarChart
