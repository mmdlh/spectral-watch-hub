import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

const darkTheme = {
  backgroundColor: "transparent",
  textStyle: { color: "#8fa4bf", fontFamily: "Rajdhani" },
  legend: { textStyle: { color: "#8fa4bf" } },
};

const gradientColors = [
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#00e5ff" }, { offset: 1, color: "#0077ff" }] },
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#a855f7" }, { offset: 1, color: "#6366f1" }] },
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#0ea5e9" }] },
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#fb923c" }, { offset: 1, color: "#ef4444" }] },
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#34d399" }, { offset: 1, color: "#06b6d4" }] },
  { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#f472b6" }, { offset: 1, color: "#a855f7" }] },
];

interface CyberChartProps {
  option: Record<string, any>;
  height?: string;
  className?: string;
}

export const CyberChart = ({ option, height = "300px", className = "" }: CyberChartProps) => {
  const mergedOption: EChartsOption = {
    ...darkTheme,
    color: gradientColors as any,
    grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(10, 18, 36, 0.9)",
      borderColor: "rgba(0, 229, 255, 0.2)",
      textStyle: { color: "#c8daf0", fontFamily: "Rajdhani" },
    },
    ...option,
  };
  return <ReactECharts option={mergedOption} style={{ height }} className={className} />;
};

export { gradientColors };
