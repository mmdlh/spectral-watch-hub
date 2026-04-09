import { GlassCard, StatCard } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { Network, ArrowUpDown, Wifi, Globe } from "lucide-react";

const Traffic = () => {
  const bandwidthChart = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["入站流量", "出站流量"], top: 0 },
    xAxis: { type: "category" as const, data: Array.from({ length: 24 }, (_, i) => `${i}:00`), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    grid: { left: "2%", right: "2%", bottom: "3%", top: "12%", containLabel: true },
    series: [
      { name: "入站流量", type: "line", smooth: true, data: [320,302,301,334,390,330,320,420,500,480,450,520,580,620,590,540,480,420,380,350,330,310,290,300], areaStyle: { opacity: 0.15 }, lineStyle: { width: 2 } },
      { name: "出站流量", type: "line", smooth: true, data: [220,182,191,234,290,230,220,320,400,380,350,420,480,520,490,440,380,320,280,250,230,210,190,200], areaStyle: { opacity: 0.15 }, lineStyle: { width: 2 } },
    ],
  };

  const protocolPie = {
    tooltip: { trigger: "item" as const },
    legend: { orient: "vertical" as const, right: "5%", top: "center" },
    series: [{
      type: "pie", radius: ["35%", "65%"], center: ["35%", "50%"],
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 45, name: "HTTPS" }, { value: 20, name: "HTTP" },
        { value: 15, name: "DNS" }, { value: 10, name: "SSH" },
        { value: 5, name: "FTP" }, { value: 5, name: "其他" },
      ],
    }],
  };

  const topIPs = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    yAxis: { type: "category" as const, data: ["192.168.1.10", "10.0.0.55", "172.16.0.88", "192.168.2.33", "10.0.1.22"].reverse(), axisLine: { lineStyle: { color: "#1e3a5f" } } },
    series: [{ type: "bar", data: [2847, 2234, 1876, 1543, 1298], barWidth: "45%", itemStyle: { borderRadius: [0, 4, 4, 0] } }],
  };

  const packetSize = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "category" as const, data: ["<64B", "64-128B", "128-256B", "256-512B", "512-1024B", ">1024B"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, name: "万个", splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [{ type: "bar", data: [320, 580, 420, 280, 180, 90], barWidth: "45%", itemStyle: { borderRadius: [4, 4, 0, 0] } }],
  };

  const connTable = [
    ["192.168.1.105", "8.8.8.8", "HTTPS", "1.2 GB", "正常", "活跃"],
    ["10.0.0.55", "104.16.0.1", "HTTP", "856 MB", "异常", "监控中"],
    ["172.16.0.33", "185.0.0.1", "SSH", "234 MB", "正常", "活跃"],
    ["192.168.2.88", "45.33.32.1", "DNS", "128 MB", "正常", "活跃"],
    ["10.0.1.12", "unknown", "未知", "67 MB", "异常", "已阻断"],
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">流量分析中心</h2>

      {/* 全宽大趋势图 + 右侧统计叠放 */}
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-9">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">24小时带宽趋势</h3>
          <CyberChart option={bandwidthChart} height="300px" />
        </GlassCard>
        <div className="col-span-3 flex flex-col gap-4">
          <StatCard title="实时带宽" value="582 Mbps" icon={Network} color="from-cyber-cyan to-cyber-blue" />
          <StatCard title="今日总流量" value="847 GB" icon={ArrowUpDown} trend={{ value: 5.2, up: true }} color="from-cyber-green to-cyber-cyan" />
          <StatCard title="活跃连接" value="12,847" icon={Wifi} trend={{ value: 3.1, up: true }} color="from-cyber-purple to-cyber-pink" />
          <StatCard title="异常连接" value="23" icon={Globe} trend={{ value: 12, up: true }} color="from-cyber-red to-cyber-orange" />
        </div>
      </div>

      {/* Bento Grid：三块不等分 */}
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-4">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">协议分布</h3>
          <CyberChart option={protocolPie} height="240px" />
        </GlassCard>
        <GlassCard className="col-span-4">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">Top IP排名</h3>
          <CyberChart option={topIPs} height="240px" />
        </GlassCard>
        <GlassCard className="col-span-4">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">数据包大小分布</h3>
          <CyberChart option={packetSize} height="240px" />
        </GlassCard>
      </div>

      {/* 底部全宽表格 */}
      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">连接详情</h3>
        <DataTable columns={["源IP", "目标IP", "协议", "流量", "状态", "操作"]} data={connTable} />
      </GlassCard>
    </div>
  );
};

export default Traffic;
