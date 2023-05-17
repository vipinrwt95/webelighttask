import React, { memo, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ActivityChart = ({ commits }) => {
  const [chartOptions, setChartOptions] = useState(null);
  console.log(commits);
  useEffect(() => {
    if (commits.length > 0) {
      const weeks = commits.map(item => item.week);
      const days = commits.map(item => item.days);

      
      const processedData = [];

      days.forEach((weekDays, index) => {
        weekDays.forEach((day, dayIndex) => {
          const weekDate = weeks[index] * 1000; 
          const dayDate = weekDate + dayIndex * 24 * 60 * 60 * 1000; 
          processedData.push([dayDate, day]);
        });
      });

      processedData.sort((a, b) => a[0] - b[0]);

    setChartOptions({
        chart: {
          type: "line"
        },
        title: {
          text: "Commit Activity"
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: "Commits"
          }
        },
        series: [
          {
            name: "Commits",
            data: processedData
          }
        ]
      });
    }
  }, [commits]);

  return chartOptions ? (
    <div id="chartContainer">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  ) : null;
};

export default memo(ActivityChart);



