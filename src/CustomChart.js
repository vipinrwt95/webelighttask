import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CustomChart = ({ data }) => {
    let flag=false;
    let options={};
    console.log(data);
    if(data.length>0)
    {    flag=true;
         options = {
            chart: {
              type: 'line',
            },
            title: {
              text: 'Weekly Commit Activity',
            },
            xAxis: {
              type: 'category',
              labels: {
                rotation: -45,
                style: {
                  fontSize: '10px',
                  fontFamily: 'Verdana, sans-serif',
                },
              },
            },
            yAxis: {
              title: {
                text: 'Number of Changes',
              },
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            tooltip: {
              shared: true,
              formatter: function () {
                let tooltip = `<strong>${this.x}</strong><br/>`;
                this.points.forEach((point) => {
                  tooltip += `<span style="color:${point.color}">\u25CF</span> ${
                    point.series.name
                  }: <strong>${point.y}</strong><br/>`;
                });
                return tooltip;
              },
            },
            series: data,
          };
}
  let content;
 if(!flag) content=<div></div>  
 else content=<div><HighchartsReact highcharts={Highcharts} options={options} /></div>

  return (content);
};

export default CustomChart;
