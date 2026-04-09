import { Shield, AlertTriangle, Bug, Globe, Server, Activity, Eye, Zap } from "lucide-react";
import { GlassCard, StatCard, StatusIndicator } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";

const Overview = () => {
  const threatTrend = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["攻击次数", "拦截次数", "告警数"], top: 0 },
    xAxis: { type: "category" as const, data: ["01:00", "04:00", "07:00", "10:00", "13:00", "16:00", "19:00", "22:00"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } }, axisLine: { lineStyle: { color: "#1e3a5f" } } },
    series: [
      { name: "攻击次数", type: "line", smooth: true, data: [120, 200, 150, 380, 290, 430, 320, 180], areaStyle: { opacity: 0.15 } },
      { name: "拦截次数", type: "line", smooth: true, data: [110, 190, 140, 370, 280, 420, 310, 170], areaStyle: { opacity: 0.15 } },
      { name: "告警数", type: "line", smooth: true, data: [30, 50, 40, 80, 60, 90, 70, 45], areaStyle: { opacity: 0.15 } },
    ],
  };

  const attackTypes = {
    tooltip: { trigger: "item" as const },
    legend: { orient: "vertical" as const, right: "5%", top: "center" },
    series: [{
      type: "pie", radius: ["40%", "70%"], center: ["35%", "50%"],
      itemStyle: { borderRadius: 8, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 335, name: "DDoS攻击" }, { value: 234, name: "SQL注入" },
        { value: 154, name: "XSS攻击" }, { value: 135, name: "暴力破解" },
        { value: 98, name: "端口扫描" }, { value: 72, name: "其他" },
      ],
    }],
  };

  const radarOption = {
    radar: {
      indicator: [
        { name: "网络安全", max: 100 }, { name: "主机安全", max: 100 },
        { name: "应用安全", max: 100 }, { name: "数据安全", max: 100 },
        { name: "终端安全", max: 100 }, { name: "物理安全", max: 100 },
      ],
      axisLine: { lineStyle: { color: "#1e3a5f55" } },
      splitLine: { lineStyle: { color: "#1e3a5f33" } },
      splitArea: { areaStyle: { color: ["transparent"] } },
    },
    series: [{
      type: "radar",
      data: [{ value: [85, 90, 72, 68, 88, 95], name: "安全评分", areaStyle: { opacity: 0.2 } }],
    }],
  };

  const recentAlerts = [
    ["2024-03-15 14:32", "192.168.1.105", "SQL注入攻击", "高危", "已拦截"],
    ["2024-03-15 14:28", "10.0.0.55", "异常端口扫描", "中危", "告警"],
    ["2024-03-15 14:15", "172.16.0.33", "DDoS攻击", "严重", "处理中"],
    ["2024-03-15 13:58", "192.168.2.88", "暴力破解SSH", "高危", "已拦截"],
    ["2024-03-15 13:42", "10.0.1.12", "恶意文件上传", "中危", "已拦截"],
  ];

  return (
    <div className="space-y-6">
      {/* 顶部：安全评分大卡 + 状态 + 统计 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 左侧：安全评分中心 */}
        <GlassCard className="col-span-4 flex flex-col items-center justify-center py-8" flowBorder>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">综合安全评分</div>
          <div className="text-7xl font-display font-black stat-value mb-2">87</div>
          <div className="flex gap-4 mt-2">
            <StatusIndicator status="online" label="防火墙" />
            <StatusIndicator status="online" label="IDS" />
            <StatusIndicator status="warning" label="WAF" />
          </div>
        </GlassCard>

        {/* 右侧：统计卡片 2x2 */}
        <div className="col-span-8 grid grid-cols-2 grid-rows-2 gap-4">
          <StatCard title="今日攻击总数" value="2,847" icon={AlertTriangle} trend={{ value: 12.5, up: true }} color="from-cyber-red to-cyber-orange" />
          <StatCard title="成功拦截" value="2,791" icon={Shield} trend={{ value: 8.3, up: true }} color="from-cyber-cyan to-cyber-blue" />
          <StatCard title="活跃漏洞" value="156" icon={Bug} trend={{ value: 3.2, up: false }} color="from-cyber-purple to-cyber-pink" />
          <StatCard title="在线设备" value="1,284" icon={Server} trend={{ value: 1.5, up: true }} color="from-cyber-green to-cyber-cyan" />
        </div>
      </div>

      {/* 中部：趋势大图 */}
      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">24小时威胁趋势</h3>
          <span className="text-xs text-muted-foreground">最后更新：2024-03-15 14:35:22</span>
        </div>
        <CyberChart option={threatTrend} height="260px" />
      </GlassCard>

      {/* 下部：三栏 */}
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-3">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">安全雷达</h3>
          <CyberChart option={radarOption} height="240px" />
        </GlassCard>
        <GlassCard className="col-span-3">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">攻击类型</h3>
          <CyberChart option={attackTypes} height="240px" />
        </GlassCard>
        <GlassCard className="col-span-6">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">最新安全事件</h3>
          <DataTable columns={["时间", "来源IP", "事件类型", "风险等级", "状态"]} data={recentAlerts} />
        </GlassCard>
      </div>

      {/* 底部快捷信息条 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Globe, label: "全球威胁情报", value: "12,847", sub: "来自156个国家" },
          { icon: Activity, label: "网络流量", value: "847 GB", sub: "今日总流量" },
          { icon: Eye, label: "实时监控", value: "324", sub: "活跃会话" },
          { icon: Zap, label: "响应时间", value: "< 50ms", sub: "平均响应" },
        ].map((item) => (
          <GlassCard key={item.label} flowBorder>
            <div className="flex items-center gap-3">
              <item.icon className="w-8 h-8 text-primary opacity-70" />
              <div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="stat-value text-xl">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Overview;
