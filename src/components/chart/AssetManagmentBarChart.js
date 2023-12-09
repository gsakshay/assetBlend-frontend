import React from 'react';
import { IgrCategoryChart, IgrCategoryChartModule, IgrColumnSeries } from 'igniteui-react-charts';

IgrCategoryChartModule.register();

const AssetManagmentBarChart = ({ assets, clients }) => {
  const data = [
    { category: 'Assets', assets: assets, clients: 0 },
    { category: 'Clients', totalInvested: 0, clients: clients },
  ];

  return (
    <IgrCategoryChart
      width="300px"
      height="268px"
      chartType="Column"
      dataSource={data}
      yAxisTitle="Total Number"
    >
      <IgrColumnSeries name="totalInvested" title="Total Invested" valueMemberPath="totalInvested" />
      <IgrColumnSeries name="currentWorth" title="Current Worth" valueMemberPath="currentWorth" />
    </IgrCategoryChart>
  );
};

export default AssetManagmentBarChart;
