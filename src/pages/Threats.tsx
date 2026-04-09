import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { Crosshair, ShieldAlert, Skull, Globe, AlertCircle } from "lucide-react";

const threatFeed = [
  { id: "TH-0892", name: "APT-29 变种攻击", level: "严重", scope: "192.168.1.0/24", status: "进行中", time: "14:32" },
  { id: "TH-0891", name: "勒索软件传播", level: "高危", scope: "10.0.0.0/8", status: "已遏制", time: "14:28" },
  { id: "TH-0890", name: "供应链攻击", level: "高危", scope: "172.16.0.0/16", status: "调查中", time: "14:15" },
  { id: "TH-0889", name: "零日漏洞利用", level: "严重", scope: "全网", status: "修复中", time: "13:58" },
  { id: "TH-0888", name: "内部威胁检测", level: "中危", scope: "10.0.1.0/24", status: "已关闭", time: "13:42" },
  { id: "TH-0887", name: "钓鱼邮件攻击", level: "中危", scope: "邮件网关", status: "已拦截", time: "13:30" },
  { id: "TH-0886", name: "C2通信检测", level: "高危", scope: "DMZ区域", status: "处理中", time: "13:15" },
  { id: "TH-0885", name: "横向移动行为", level: "严重", scope: "内网全段", status: "调查中", time: "12:50" },
];

const levelColors: Record<string, string> = {
  "严重": "text-cyber-pink border-cyber-pink/30 bg-cyber-pink/10",
  "高危": "text-cyber-red border-cyber-red/30 bg-cyber-red/10",
  "中危": "text-cyber-orange border-cyber-orange/30 bg-cyber-orange/10",
  "低危": "text-cyber-green border-cyber-green/30 bg-cyber-green/10",
};

const statusColors: Record<string, string> = {
  "进行中": "text-cyber-cyan",
  "已遏制": "text-cyber-green",
  "调查中": "text-cyber-orange",
  "修复中": "text-cyber-blue",
  "已关闭": "text-muted-foreground",
  "已拦截": "text-cyber-green",
  "处理中": "text-cyber-cyan",
};

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

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">威胁监测中心</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="活跃威胁" value="47" icon={Skull} trend={{ value: 15, up: true }} color="from-cyber-red to-cyber-pink" />
        <StatCard title="今日新增" value="12" icon={ShieldAlert} trend={{ value: 8, up: true }} color="from-cyber-orange to-cyber-red" />
        <StatCard title="已处置" value="35" icon={Crosshair} trend={{ value: 22, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="威胁来源国" value="23" icon={Globe} color="from-cyber-blue to-cyber-purple" />
      </div>

      {/* 核心区域：左侧实时威胁Feed + 右侧图表堆叠 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 左侧：实时威胁信息流 */}
        <GlassCard className="col-span-5 !p-0 overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-border/30 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse" />
              实时威胁信息流
            </h3>
            <span className="text-xs text-muted-foreground">共 {threatFeed.length} 条</span>
          </div>
          <div className="divide-y divide-border/20 max-h-[520px] overflow-y-auto">
            {threatFeed.map((t) => (
              <div key={t.id} className="px-5 py-3.5 hover:bg-secondary/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground font-mono">{t.id}</span>
                  <span className="text-xs text-muted-foreground">{t.time}</span>
                </div>
                <div className="font-semibold text-sm text-foreground mb-2">{t.name}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded border ${levelColors[t.level] || ""}`}>{t.level}</span>
                  <span className="text-xs text-muted-foreground">影响：{t.scope}</span>
                  <span className={`text-xs ml-auto font-medium ${statusColors[t.status] || ""}`}>
                    <AlertCircle className="w-3 h-3 inline mr-1" />{t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 右侧：图表垂直堆叠 */}
        <div className="col-span-7 flex flex-col gap-4">
          <GlassCard>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">威胁等级趋势</h3>
            <CyberChart option={severityLine} height="230px" />
          </GlassCard>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">本周攻击类型</h3>
              <CyberChart option={attackTimeline} height="220px" />
            </GlassCard>
            <GlassCard>
              <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">攻击来源分布</h3>
              <CyberChart option={geoOption} height="220px" />
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threats;
