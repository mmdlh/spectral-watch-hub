import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { FileText, Search, AlertTriangle, Database } from "lucide-react";

const logEntries = [
  { time: "14:32:15", type: "安全", typeColor: "bg-cyber-red/20 text-cyber-red", event: "root用户SSH登录", source: "192.168.1.1", status: "正常" },
  { time: "14:30:22", type: "安全", typeColor: "bg-cyber-red/20 text-cyber-red", event: "失败登录尝试(5次)", source: "10.0.0.55", status: "异常" },
  { time: "14:28:10", type: "应用", typeColor: "bg-cyber-blue/20 text-cyber-blue", event: "数据库备份完成", source: "DB-Server-01", status: "正常" },
  { time: "14:25:33", type: "网络", typeColor: "bg-cyber-purple/20 text-cyber-purple", event: "防火墙规则变更", source: "FW-01", status: "告警" },
  { time: "14:22:18", type: "安全", typeColor: "bg-cyber-red/20 text-cyber-red", event: "敏感文件访问", source: "172.16.0.33", status: "告警" },
  { time: "14:20:05", type: "系统", typeColor: "bg-cyber-green/20 text-cyber-green", event: "服务重启：nginx", source: "Web-03", status: "正常" },
  { time: "14:18:42", type: "应用", typeColor: "bg-cyber-blue/20 text-cyber-blue", event: "API调用频率超限", source: "App-02", status: "告警" },
  { time: "14:15:30", type: "系统", typeColor: "bg-cyber-green/20 text-cyber-green", event: "磁盘空间告警", source: "SRV-05", status: "告警" },
  { time: "14:12:11", type: "网络", typeColor: "bg-cyber-purple/20 text-cyber-purple", event: "VPN连接断开", source: "VPN-GW", status: "异常" },
  { time: "14:10:05", type: "安全", typeColor: "bg-cyber-red/20 text-cyber-red", event: "恶意IP访问拦截", source: "WAF-01", status: "正常" },
];

const statusDot: Record<string, string> = {
  "正常": "bg-cyber-green",
  "异常": "bg-cyber-red",
  "告警": "bg-cyber-orange",
};

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

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">日志审计平台</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="今日日志量" value="284万" icon={FileText} trend={{ value: 8, up: true }} color="from-cyber-cyan to-cyber-blue" />
        <StatCard title="审计规则" value="128" icon={Search} color="from-cyber-purple to-cyber-blue" />
        <StatCard title="异常事件" value="47" icon={AlertTriangle} trend={{ value: 15, up: true }} color="from-cyber-orange to-cyber-red" />
        <StatCard title="存储用量" value="2.8 TB" icon={Database} color="from-cyber-green to-cyber-cyan" />
      </div>

      {/* 核心：左侧日志表格为主 + 右侧小图表 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 日志实时流 - 表格主体 */}
        <GlassCard className="col-span-8 !p-0 overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-border/30 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">实时审计日志</h3>
            <span className="text-xs text-muted-foreground">2024-03-15</span>
          </div>
          <div className="divide-y divide-border/15">
            {logEntries.map((log, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/20 transition-colors text-sm">
                <span className="text-xs text-muted-foreground font-mono w-16 shrink-0">{log.time}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${log.typeColor} w-12 text-center shrink-0`}>{log.type}</span>
                <span className="flex-1 text-foreground truncate">{log.event}</span>
                <span className="text-xs text-muted-foreground w-24 shrink-0 text-right">{log.source}</span>
                <span className="flex items-center gap-1.5 w-14 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[log.status]}`} />
                  <span className="text-xs text-muted-foreground">{log.status}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 右侧：图表侧边栏 */}
        <div className="col-span-4 flex flex-col gap-4">
          <GlassCard>
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">事件类型</h3>
            <CyberChart option={eventType} height="220px" />
          </GlassCard>
          <GlassCard className="flex-1">
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">日志量趋势</h3>
            <CyberChart option={logVolume} height="220px" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Logs;
