import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({
  data = [],
  labels,
  width = 380,
  height = 320,
  title = "",
  subTitle = "",
}) => {
  const state = {
    series: data,
    options: {
      chart: {
        width: width,
        type: "pie",
      },
      title: {
        text: title,
        align: "center",
        floating: true,
      },
      subtitle: {
        text: subTitle,
        align: "center",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="pie"
      width={width}
      height={height}
    />
  );
};

export default PieChart;
