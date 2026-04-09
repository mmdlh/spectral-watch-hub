import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

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

const getThemeColors = () => {
  if (typeof window === "undefined") {
    return {
      textColor: "rgba(255,255,255,0.8)",
      tooltipTextColor: "rgba(255,255,255,0.92)",
      tooltipBackground: "rgba(10,18,36,0.92)",
      tooltipBorder: "rgba(0,229,255,0.2)",
    };
  }

  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  const lightness = Number(background.split(/\s+/)[2]?.replace("%", "")) || 0;
  const isDark = lightness < 50;

  return {
    textColor: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
    tooltipTextColor: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.86)",
    tooltipBackground: isDark ? "rgba(10,18,36,0.92)" : "rgba(255,255,255,0.92)",
    tooltipBorder: isDark ? "rgba(0,229,255,0.2)" : "rgba(0,0,0,0.12)",
  };
};

const normalizeByArray = <T,>(value: T | T[] | undefined, mapper: (item: T) => T) => {
  if (!value) return value;
  return Array.isArray(value) ? value.map(mapper) : mapper(value);
};

const normalizeAxis = (axis: any, textColor: string) =>
  normalizeByArray(axis, (item) => ({
    ...item,
    axisLabel: {
      ...(item?.axisLabel ?? {}),
      color: textColor,
    },
    nameTextStyle: {
      ...(item?.nameTextStyle ?? {}),
      color: textColor,
    },
  }));

const normalizeLegend = (legend: any, textColor: string) =>
  normalizeByArray(legend, (item) => ({
    ...item,
    textStyle: {
      ...(item?.textStyle ?? {}),
      color: textColor,
    },
  }));

const normalizeTitle = (title: any, textColor: string) =>
  normalizeByArray(title, (item) => ({
    ...item,
    textStyle: {
      ...(item?.textStyle ?? {}),
      color: textColor,
    },
    subtextStyle: {
      ...(item?.subtextStyle ?? {}),
      color: textColor,
    },
  }));

const normalizeRadar = (radar: any, textColor: string) =>
  normalizeByArray(radar, (item) => ({
    ...item,
    axisName: {
      ...(typeof item?.axisName === "object" ? item.axisName : {}),
      color: textColor,
    },
  }));

const normalizeSeries = (series: any, textColor: string) =>
  normalizeByArray(series, (item) => {
    if (!item || typeof item !== "object") return item;

    const shouldApplyLabelColor =
      Boolean(item.label) || ["pie", "radar", "funnel", "treemap", "sunburst"].includes(item.type);

    return {
      ...item,
      ...(shouldApplyLabelColor
        ? {
            label: {
              ...(item.label ?? {}),
              color: textColor,
            },
          }
        : {}),
    };
  });

const normalizeDataZoom = (dataZoom: any, textColor: string) =>
  normalizeByArray(dataZoom, (item) => ({
    ...item,
    textStyle: {
      ...(item?.textStyle ?? {}),
      color: textColor,
    },
  }));

export const CyberChart = ({ option, height = "300px", className = "" }: CyberChartProps) => {
  const mergedOption = useMemo(() => {
    const themeColors = getThemeColors();

    const baseOption: Record<string, any> = {
      backgroundColor: "transparent",
      textStyle: {
        color: themeColors.textColor,
        fontFamily: "Rajdhani",
      },
      color: gradientColors as any,
      grid: { left: "3%", right: "4%", bottom: "3%", top: "15%", containLabel: true },
      tooltip: {
        trigger: "axis",
        backgroundColor: themeColors.tooltipBackground,
        borderColor: themeColors.tooltipBorder,
        textStyle: {
          fontFamily: "Rajdhani",
          color: themeColors.tooltipTextColor,
        },
      },
      ...option,
    };

    return {
      ...baseOption,
      title: normalizeTitle(baseOption.title, themeColors.textColor),
      legend: normalizeLegend(baseOption.legend, themeColors.textColor),
      xAxis: normalizeAxis(baseOption.xAxis, themeColors.textColor),
      yAxis: normalizeAxis(baseOption.yAxis, themeColors.textColor),
      angleAxis: normalizeAxis(baseOption.angleAxis, themeColors.textColor),
      radiusAxis: normalizeAxis(baseOption.radiusAxis, themeColors.textColor),
      singleAxis: normalizeAxis(baseOption.singleAxis, themeColors.textColor),
      radar: normalizeRadar(baseOption.radar, themeColors.textColor),
      series: normalizeSeries(baseOption.series, themeColors.textColor),
      dataZoom: normalizeDataZoom(baseOption.dataZoom, themeColors.textColor),
      tooltip: {
        ...(baseOption.tooltip ?? {}),
        backgroundColor: themeColors.tooltipBackground,
        borderColor: themeColors.tooltipBorder,
        textStyle: {
          fontFamily: "Rajdhani",
          ...(baseOption.tooltip?.textStyle ?? {}),
          color: themeColors.tooltipTextColor,
        },
      },
    } as EChartsOption;
  }, [option]);

  return <ReactECharts option={mergedOption} style={{ height }} className={className} />;
};

export { gradientColors };
