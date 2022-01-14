import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({
  data = [],
  labels,
  height = 380,
  width = 500,
  title = "",
  subTitle = "",
}) => {
  const state = {
    series: [
      {
        data: data,
      },
    ],
    options: {
      title: {
        text: title,
        align: "center",
        floating: true,
      },
      subtitle: {
        text: subTitle,
        align: "center",
      },
      chart: {
        type: "bar",
        height: height,
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          vertical: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: [
        "#e6194b",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#46f0f0",
        "#f032e6",
        "#bcf60c",
        "#fabebe",
        "#008080",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#ffd8b1",
        "#000075",
        "#808080",
        "#ffffff",
        "#000000",
      ],
      xaxis: {
        categories: labels,
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "middle",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val;
          //return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        theme: "dark",
        y: {
          show: false,
        },
        x: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    },
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width={width}
      height={height}
    />
  );
};

export default BarChart;
