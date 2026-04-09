import { GlassCard, StatCard, StatusIndicator } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { Server, Monitor, HardDrive, Cpu } from "lucide-react";

const assetItems = [
  { name: "SRV-WEB-01", type: "Web服务器", os: "CentOS 8", ip: "192.168.1.10", cpu: 35, mem: 62, status: "online" as const, risk: "低" },
  { name: "SRV-DB-01", type: "数据库", os: "Ubuntu 22", ip: "192.168.1.20", cpu: 78, mem: 85, status: "online" as const, risk: "中" },
  { name: "FW-MAIN-01", type: "防火墙", os: "FortiOS", ip: "192.168.1.1", cpu: 22, mem: 45, status: "online" as const, risk: "低" },
  { name: "SW-CORE-01", type: "核心交换机", os: "Cisco IOS", ip: "192.168.1.2", cpu: 18, mem: 38, status: "online" as const, risk: "低" },
  { name: "SRV-APP-02", type: "应用服务器", os: "Windows 2022", ip: "192.168.1.30", cpu: 0, mem: 0, status: "offline" as const, risk: "高" },
  { name: "IOT-CAM-05", type: "监控摄像头", os: "Linux ARM", ip: "192.168.2.50", cpu: 45, mem: 60, status: "online" as const, risk: "中" },
  { name: "SRV-MAIL-01", type: "邮件服务器", os: "CentOS 7", ip: "192.168.1.40", cpu: 55, mem: 72, status: "warning" as const, risk: "中" },
  { name: "LB-NGINX-01", type: "负载均衡", os: "Ubuntu 20", ip: "192.168.1.5", cpu: 28, mem: 42, status: "online" as const, risk: "低" },
];

const riskBorder: Record<string, string> = {
  "低": "border-cyber-green/30",
  "中": "border-cyber-orange/30",
  "高": "border-cyber-red/30",
};
const riskText: Record<string, string> = { "低": "text-cyber-green", "中": "text-cyber-orange", "高": "text-cyber-red" };

const Assets = () => {
  const assetCategory = {
    tooltip: { trigger: "item" as const },
    legend: { bottom: 0 },
    series: [{
      type: "pie", radius: ["30%", "55%"], roseType: "radius",
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      data: [
        { value: 320, name: "服务器" }, { value: 240, name: "网络设备" },
        { value: 180, name: "终端设备" }, { value: 150, name: "安全设备" },
        { value: 120, name: "IoT设备" }, { value: 80, name: "数据库" },
      ],
    }],
  };

  const assetHealth = {
    radar: {
      indicator: [
        { name: "可用性", max: 100 }, { name: "性能", max: 100 },
        { name: "安全性", max: 100 }, { name: "合规性", max: 100 },
        { name: "更新状态", max: 100 },
      ],
      axisLine: { lineStyle: { color: "#1e3a5f55" } },
      splitLine: { lineStyle: { color: "#1e3a5f33" } },
      splitArea: { areaStyle: { color: ["transparent"] } },
    },
    series: [{
      type: "radar",
      data: [
        { value: [92, 85, 78, 88, 72], name: "服务器", areaStyle: { opacity: 0.15 } },
        { value: [88, 90, 82, 75, 85], name: "网络设备", areaStyle: { opacity: 0.15 } },
      ],
    }],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">资产管理中心</h2>
        <div className="flex gap-3">
          <StatusIndicator status="online" label="1,180 在线" />
          <StatusIndicator status="offline" label="104 离线" />
        </div>
      </div>

      {/* 顶部横条统计 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="资产总数" value="1,284" icon={Server} color="from-cyber-cyan to-cyber-blue" />
        <StatCard title="在线设备" value="1,180" icon={Monitor} trend={{ value: 2, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="存储容量" value="128 TB" icon={HardDrive} color="from-cyber-purple to-cyber-blue" />
        <StatCard title="CPU均值" value="42%" icon={Cpu} color="from-cyber-orange to-cyber-red" />
      </div>

      {/* 中部：资产卡片目录 */}
      <div className="grid grid-cols-4 gap-4">
        {assetItems.map((a) => (
          <div key={a.name} className={`glass-card p-4 border ${riskBorder[a.risk]}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StatusIndicator status={a.status} label="" size="sm" />
                <span className="font-display text-xs font-bold tracking-wider text-foreground">{a.name}</span>
              </div>
              <span className={`text-xs font-semibold ${riskText[a.risk]}`}>{a.risk}风险</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">{a.type} · {a.os}</div>
            <div className="text-xs text-muted-foreground mb-3 font-mono">{a.ip}</div>
            {a.status !== "offline" && (
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>CPU</span><span>{a.cpu}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${a.cpu > 70 ? "bg-gradient-to-r from-cyber-orange to-cyber-red" : "bg-gradient-to-r from-cyber-cyan to-cyber-blue"}`} style={{ width: `${a.cpu}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>内存</span><span>{a.mem}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${a.mem > 70 ? "bg-gradient-to-r from-cyber-orange to-cyber-red" : "bg-gradient-to-r from-cyber-purple to-cyber-blue"}`} style={{ width: `${a.mem}%` }} />
                  </div>
                </div>
              </div>
            )}
            {a.status === "offline" && (
              <div className="text-xs text-muted-foreground italic">设备离线</div>
            )}
          </div>
        ))}
      </div>

      {/* 底部：两列图表 */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">资产分类</h3>
          <CyberChart option={assetCategory} height="280px" />
        </GlassCard>
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">资产健康度</h3>
          <CyberChart option={assetHealth} height="280px" />
        </GlassCard>
      </div>
    </div>
  );
};

export default Assets;
