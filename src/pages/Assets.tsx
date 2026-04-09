import { GlassCard, StatCard, StatusIndicator } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { Server, Monitor, HardDrive, Cpu } from "lucide-react";

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

  const osDistribution = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "category" as const, data: ["CentOS", "Ubuntu", "Windows", "Debian", "RHEL", "其他"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [{ type: "bar", data: [280, 220, 180, 120, 95, 55], barWidth: "50%", itemStyle: { borderRadius: [4, 4, 0, 0] } }],
  };

  const assetTable = [
    ["SRV-WEB-01", "Web服务器", "CentOS 8", "192.168.1.10", "在线", "低"],
    ["SRV-DB-01", "数据库", "Ubuntu 22", "192.168.1.20", "在线", "中"],
    ["FW-MAIN-01", "防火墙", "FortiOS", "192.168.1.1", "在线", "低"],
    ["SW-CORE-01", "核心交换机", "Cisco IOS", "192.168.1.2", "在线", "低"],
    ["SRV-APP-02", "应用服务器", "Windows 2022", "192.168.1.30", "离线", "高"],
    ["IOT-CAM-05", "监控摄像头", "Linux ARM", "192.168.2.50", "在线", "中"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">资产管理中心</h2>
        <div className="flex gap-3">
          <StatusIndicator status="online" label="1,180 在线" />
          <StatusIndicator status="offline" label="104 离线" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="资产总数" value="1,284" icon={Server} color="from-cyber-cyan to-cyber-blue" />
        <StatCard title="在线设备" value="1,180" icon={Monitor} trend={{ value: 2, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="存储容量" value="128 TB" icon={HardDrive} color="from-cyber-purple to-cyber-blue" />
        <StatCard title="CPU均值" value="42%" icon={Cpu} color="from-cyber-orange to-cyber-red" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">资产分类</h3>
          <CyberChart option={assetCategory} height="300px" />
        </GlassCard>
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">资产健康度</h3>
          <CyberChart option={assetHealth} height="300px" />
        </GlassCard>
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">操作系统分布</h3>
          <CyberChart option={osDistribution} height="300px" />
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">资产清单</h3>
        <DataTable columns={["资产编号", "类型", "操作系统", "IP地址", "状态", "风险"]} data={assetTable} />
      </GlassCard>
    </div>
  );
};

export default Assets;
