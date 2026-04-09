import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { Bell, BellOff, CheckCircle, XCircle } from "lucide-react";

const Alerts = () => {
  const alertTrend = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["严重", "高危", "中危", "低危"], top: 0 },
    xAxis: { type: "category" as const, data: Array.from({ length: 30 }, (_, i) => `${i + 1}日`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    dataZoom: [{ type: "inside", start: 60, end: 100 }],
    series: [
      { name: "严重", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10 + 2)) },
      { name: "高危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20 + 5)) },
      { name: "中危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30 + 10)) },
      { name: "低危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40 + 15)) },
    ],
  };

  const responseTime = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "category" as const, data: ["<1分钟", "1-5分钟", "5-15分钟", "15-60分钟", ">1小时"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [{ type: "bar", data: [45, 32, 18, 8, 3], barWidth: "45%", itemStyle: { borderRadius: [4, 4, 0, 0] } }],
  };

  const alertSource = {
    tooltip: { trigger: "item" as const },
    series: [{
      type: "pie", radius: ["40%", "70%"],
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      label: { color: "#8fa4bf" },
      data: [
        { value: 35, name: "IDS/IPS" }, { value: 25, name: "WAF" },
        { value: 20, name: "防火墙" }, { value: 12, name: "终端防护" },
        { value: 8, name: "日志分析" },
      ],
    }],
  };

  const alertTable = [
    ["ALT-28847", "疑似APT攻击", "严重", "IDS", "2024-03-15 14:32", "未处理"],
    ["ALT-28846", "异常DNS查询", "高危", "防火墙", "2024-03-15 14:28", "处理中"],
    ["ALT-28845", "SQL注入尝试", "高危", "WAF", "2024-03-15 14:15", "已处理"],
    ["ALT-28844", "暴力破解告警", "中危", "IDS", "2024-03-15 13:58", "已处理"],
    ["ALT-28843", "异常流量峰值", "中危", "流量分析", "2024-03-15 13:42", "处理中"],
    ["ALT-28842", "证书即将过期", "低危", "监控系统", "2024-03-15 13:30", "未处理"],
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">告警中心</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日告警" value="156" icon={Bell} trend={{ value: 22, up: true }} color="from-cyber-red to-cyber-orange" />
        <StatCard title="未处理" value="38" icon={XCircle} color="from-cyber-orange to-cyber-red" />
        <StatCard title="已处理" value="118" icon={CheckCircle} trend={{ value: 15, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="已忽略" value="12" icon={BellOff} color="from-cyber-blue to-cyber-purple" />
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">30天告警趋势</h3>
        <CyberChart option={alertTrend} height="300px" />
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">响应时间分布</h3>
          <CyberChart option={responseTime} height="260px" />
        </GlassCard>
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">告警来源</h3>
          <CyberChart option={alertSource} height="260px" />
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">告警列表</h3>
        <DataTable columns={["告警ID", "描述", "等级", "来源", "时间", "状态"]} data={alertTable} />
      </GlassCard>
    </div>
  );
};

export default Alerts;
