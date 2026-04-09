import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { Crosshair, ShieldAlert, Skull, Globe } from "lucide-react";

const Threats = () => {
  const attackTimeline = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["DDoS", "注入攻击", "恶意软件", "钓鱼攻击"], top: 0 },
    xAxis: { type: "category" as const, data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { name: "DDoS", type: "bar", stack: "total", data: [120, 200, 150, 80, 70, 110, 130], barWidth: "40%" },
      { name: "注入攻击", type: "bar", stack: "total", data: [60, 80, 70, 50, 40, 55, 65] },
      { name: "恶意软件", type: "bar", stack: "total", data: [30, 45, 35, 25, 20, 28, 38] },
      { name: "钓鱼攻击", type: "bar", stack: "total", data: [20, 30, 25, 15, 12, 18, 22] },
    ],
  };

  const geoOption = {
    tooltip: { trigger: "item" as const },
    legend: { bottom: 0 },
    series: [{
      type: "pie", radius: ["25%", "60%"], roseType: "area",
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      data: [
        { value: 40, name: "美国" }, { value: 38, name: "俄罗斯" },
        { value: 32, name: "中国" }, { value: 30, name: "朝鲜" },
        { value: 28, name: "伊朗" }, { value: 22, name: "其他" },
      ],
    }],
  };

  const severityLine = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["严重", "高危", "中危", "低危"], top: 0 },
    xAxis: { type: "category" as const, data: Array.from({ length: 12 }, (_, i) => `${i * 2}:00`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { name: "严重", type: "line", smooth: true, data: [5, 8, 3, 12, 7, 15, 9, 4, 11, 6, 8, 3], lineStyle: { width: 3 } },
      { name: "高危", type: "line", smooth: true, data: [15, 22, 18, 30, 25, 35, 28, 20, 32, 18, 24, 14] },
      { name: "中危", type: "line", smooth: true, data: [30, 40, 35, 55, 45, 60, 50, 38, 52, 35, 42, 28] },
      { name: "低危", type: "line", smooth: true, data: [50, 65, 55, 80, 70, 90, 75, 60, 82, 58, 68, 45] },
    ],
  };

  const threatData = [
    ["TH-2024-0892", "APT-29 变种攻击", "严重", "192.168.1.0/24", "进行中", "2024-03-15"],
    ["TH-2024-0891", "勒索软件传播", "高危", "10.0.0.0/8", "已遏制", "2024-03-15"],
    ["TH-2024-0890", "供应链攻击", "高危", "172.16.0.0/16", "调查中", "2024-03-14"],
    ["TH-2024-0889", "零日漏洞利用", "严重", "全网", "修复中", "2024-03-14"],
    ["TH-2024-0888", "内部威胁", "中危", "10.0.1.0/24", "已关闭", "2024-03-13"],
    ["TH-2024-0887", "钓鱼邮件攻击", "中危", "邮件网关", "已拦截", "2024-03-13"],
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">威胁监测中心</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="活跃威胁" value="47" icon={Skull} trend={{ value: 15, up: true }} color="from-cyber-red to-cyber-pink" />
        <StatCard title="今日新增" value="12" icon={ShieldAlert} trend={{ value: 8, up: true }} color="from-cyber-orange to-cyber-red" />
        <StatCard title="已处置" value="35" icon={Crosshair} trend={{ value: 22, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="威胁来源国" value="23" icon={Globe} color="from-cyber-blue to-cyber-purple" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">本周攻击类型统计</h3>
          <CyberChart option={attackTimeline} height="300px" />
        </GlassCard>
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">威胁等级趋势</h3>
          <CyberChart option={severityLine} height="300px" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">攻击来源分布</h3>
          <CyberChart option={geoOption} height="280px" />
        </GlassCard>
        <GlassCard className="col-span-2">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">威胁情报列表</h3>
          <DataTable columns={["编号", "威胁名称", "等级", "影响范围", "状态", "发现时间"]} data={threatData} />
        </GlassCard>
      </div>
    </div>
  );
};

export default Threats;
