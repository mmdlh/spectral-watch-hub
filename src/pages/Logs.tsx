import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { FileText, Search, AlertTriangle, Database } from "lucide-react";

const Logs = () => {
  const logVolume = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["系统日志", "安全日志", "应用日志", "网络日志"], top: 0 },
    xAxis: { type: "category" as const, data: Array.from({ length: 7 }, (_, i) => `03/${9 + i}`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, name: "万条", splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { name: "系统日志", type: "bar", data: [120, 132, 101, 134, 90, 230, 210], barWidth: "15%" },
      { name: "安全日志", type: "bar", data: [220, 182, 191, 234, 290, 330, 310] },
      { name: "应用日志", type: "bar", data: [150, 232, 201, 154, 190, 330, 410] },
      { name: "网络日志", type: "bar", data: [98, 77, 101, 99, 40, 188, 160] },
    ],
  };

  const eventType = {
    tooltip: { trigger: "item" as const },
    series: [{
      type: "pie", radius: "65%",
      itemStyle: { borderRadius: 4, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      data: [
        { value: 1048, name: "登录事件" }, { value: 735, name: "权限变更" },
        { value: 580, name: "文件操作" }, { value: 484, name: "网络访问" },
        { value: 300, name: "配置修改" },
      ],
    }],
  };

  const anomalyLine = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "category" as const, data: Array.from({ length: 12 }, (_, i) => `${i * 2}:00`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { type: "line", smooth: true, data: [10, 15, 8, 25, 18, 35, 22, 12, 28, 14, 20, 9], areaStyle: { opacity: 0.2 }, lineStyle: { width: 3 }, markLine: { data: [{ type: "average", name: "平均值" }], lineStyle: { color: "#ef4444" } } },
    ],
  };

  const logTable = [
    ["2024-03-15 14:32:15", "系统", "root用户SSH登录", "192.168.1.1", "正常"],
    ["2024-03-15 14:30:22", "安全", "失败登录尝试(5次)", "10.0.0.55", "异常"],
    ["2024-03-15 14:28:10", "应用", "数据库备份完成", "DB-Server-01", "正常"],
    ["2024-03-15 14:25:33", "网络", "防火墙规则变更", "FW-01", "告警"],
    ["2024-03-15 14:22:18", "安全", "敏感文件访问", "172.16.0.33", "告警"],
    ["2024-03-15 14:20:05", "系统", "服务重启：nginx", "Web-Server-03", "正常"],
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">日志审计平台</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日日志量" value="284万" icon={FileText} trend={{ value: 8, up: true }} color="from-cyber-cyan to-cyber-blue" />
        <StatCard title="审计规则" value="128" icon={Search} color="from-cyber-purple to-cyber-blue" />
        <StatCard title="异常事件" value="47" icon={AlertTriangle} trend={{ value: 15, up: true }} color="from-cyber-orange to-cyber-red" />
        <StatCard title="存储用量" value="2.8 TB" icon={Database} color="from-cyber-green to-cyber-cyan" />
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">日志采集量趋势（近7天）</h3>
        <CyberChart option={logVolume} height="300px" />
      </GlassCard>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">事件类型分布</h3>
          <CyberChart option={eventType} height="280px" />
        </GlassCard>
        <GlassCard className="col-span-2">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">异常行为检测趋势</h3>
          <CyberChart option={anomalyLine} height="280px" />
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">最近审计日志</h3>
        <DataTable columns={["时间", "类型", "事件描述", "来源", "状态"]} data={logTable} />
      </GlassCard>
    </div>
  );
};

export default Logs;
