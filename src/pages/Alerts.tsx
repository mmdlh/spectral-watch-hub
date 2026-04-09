import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { Bell, BellOff, CheckCircle, XCircle, Clock } from "lucide-react";

const alerts = [
  { id: "ALT-28847", desc: "疑似APT攻击", level: "严重", source: "IDS", time: "14:32", status: "未处理" },
  { id: "ALT-28846", desc: "异常DNS查询", level: "高危", source: "防火墙", time: "14:28", status: "处理中" },
  { id: "ALT-28845", desc: "SQL注入尝试", level: "高危", source: "WAF", time: "14:15", status: "已处理" },
  { id: "ALT-28844", desc: "暴力破解告警", level: "中危", source: "IDS", time: "13:58", status: "已处理" },
  { id: "ALT-28843", desc: "异常流量峰值", level: "中危", source: "流量分析", time: "13:42", status: "处理中" },
  { id: "ALT-28842", desc: "证书即将过期", level: "低危", source: "监控系统", time: "13:30", status: "未处理" },
  { id: "ALT-28841", desc: "特权账号登录", level: "高危", source: "SIEM", time: "13:15", status: "已处理" },
  { id: "ALT-28840", desc: "数据外传检测", level: "严重", source: "DLP", time: "12:58", status: "处理中" },
];

const levelIcon: Record<string, string> = {
  "严重": "bg-cyber-pink/20 border-cyber-pink/40 text-cyber-pink",
  "高危": "bg-cyber-red/20 border-cyber-red/40 text-cyber-red",
  "中危": "bg-cyber-orange/20 border-cyber-orange/40 text-cyber-orange",
  "低危": "bg-cyber-green/20 border-cyber-green/40 text-cyber-green",
};
const statusStyle: Record<string, string> = {
  "未处理": "bg-cyber-red/15 text-cyber-red border-cyber-red/30",
  "处理中": "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/30",
  "已处理": "bg-cyber-green/15 text-cyber-green border-cyber-green/30",
};

const Alerts = () => {
  const alertTrend = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["严重", "高危", "中危", "低危"], top: 0 },
    xAxis: { type: "category" as const, data: Array.from({ length: 14 }, (_, i) => `${i + 1}日`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { name: "严重", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: [3, 5, 2, 8, 4, 6, 3, 7, 5, 9, 4, 6, 3, 5] },
      { name: "高危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: [8, 12, 9, 15, 11, 18, 13, 20, 14, 22, 10, 16, 12, 14] },
      { name: "中危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: [15, 20, 18, 25, 22, 30, 20, 28, 24, 35, 18, 26, 20, 22] },
      { name: "低危", type: "line", stack: "total", areaStyle: { opacity: 0.3 }, smooth: true, data: [20, 25, 22, 30, 28, 35, 25, 32, 28, 40, 24, 30, 26, 28] },
    ],
  };

  const alertSource = {
    tooltip: { trigger: "item" as const },
    series: [{
      type: "pie", radius: ["40%", "70%"],
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      data: [
        { value: 35, name: "IDS/IPS" }, { value: 25, name: "WAF" },
        { value: 20, name: "防火墙" }, { value: 12, name: "终端防护" },
        { value: 8, name: "日志分析" },
      ],
    }],
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">告警中心</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日告警" value="156" icon={Bell} trend={{ value: 22, up: true }} color="from-cyber-red to-cyber-orange" />
        <StatCard title="未处理" value="38" icon={XCircle} color="from-cyber-orange to-cyber-red" />
        <StatCard title="已处理" value="118" icon={CheckCircle} trend={{ value: 15, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="已忽略" value="12" icon={BellOff} color="from-cyber-blue to-cyber-purple" />
      </div>

      {/* 核心：时间线布局 + 侧边图表 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 左侧：告警时间线 */}
        <div className="col-span-7 space-y-0">
          <GlassCard className="!p-0 overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-border/30">
              <h3 className="font-display text-sm font-semibold tracking-wider text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                告警时间线
              </h3>
            </div>
            <div className="relative">
              {/* 时间轴竖线 */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border/30" />
              {alerts.map((a, i) => (
                <div key={a.id} className="relative flex items-start gap-4 px-5 py-4 hover:bg-secondary/15 transition-colors">
                  {/* 时间轴圆点 */}
                  <div className="relative z-10 mt-1.5">
                    <div className={`w-3 h-3 rounded-full border-2 ${levelIcon[a.level]?.split(" ").slice(1).join(" ") || "border-muted"} bg-background`} />
                  </div>
                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded border ${levelIcon[a.level]}`}>{a.level}</span>
                      <span className="font-semibold text-sm text-foreground">{a.desc}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ml-auto ${statusStyle[a.status]}`}>{a.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{a.id}</span>
                      <span>来源：{a.source}</span>
                      <span>{a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* 右侧：图表堆叠 */}
        <div className="col-span-5 flex flex-col gap-4">
          <GlassCard>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">14天告警趋势</h3>
            <CyberChart option={alertTrend} height="260px" />
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">告警来源分布</h3>
            <CyberChart option={alertSource} height="240px" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
