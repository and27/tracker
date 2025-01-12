export const lightTheme = {
  textColor: "#333333",
  fontSize: 12,
  axis: {
    domain: { line: { stroke: "#777777", strokeWidth: 1 } },
    ticks: {
      line: { stroke: "#777777", strokeWidth: 1 },
      text: { fill: "#333333" },
    },
  },
  grid: { line: { stroke: "#dddddd", strokeWidth: 1 } },
};

export const darkTheme = {
  textColor: "#eeeeee",
  fontSize: 12,
  axis: {
    domain: { line: { stroke: "#bbbbbb", strokeWidth: 1 } },
    ticks: {
      line: { stroke: "#bbbbbb", strokeWidth: 1 },
      text: { fill: "#eeeeee" },
    },
    legend: { text: { fill: "#eeeeee" } },
  },
  grid: { line: { stroke: "#444444", strokeWidth: 1 } },
};
