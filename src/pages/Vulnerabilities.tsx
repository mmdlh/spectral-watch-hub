import { GlassCard, StatCard, StatusIndicator } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { Bug, ShieldCheck, Clock, AlertCircle } from "lucide-react";

const vulnList = [
  { cve: "CVE-2024-1234", name: "Apache Log4j RCE", level: "严重", asset: "Web服务器", status: "未修复", cvss: 9.8 },
  { cve: "CVE-2024-2345", name: "OpenSSL缓冲区溢出", level: "高危", asset: "API网关", status: "修复中", cvss: 8.5 },
  { cve: "CVE-2024-3456", name: "MySQL权限提升", level: "高危", asset: "数据库", status: "已修复", cvss: 7.8 },
  { cve: "CVE-2024-4567", name: "Nginx信息泄露", level: "中危", asset: "反向代理", status: "未修复", cvss: 5.3 },
  { cve: "CVE-2024-5678", name: "Redis未授权访问", level: "高危", asset: "缓存服务", status: "修复中", cvss: 8.1 },
  { cve: "CVE-2024-6789", name: "Docker逃逸漏洞", level: "严重", asset: "容器平台", status: "未修复", cvss: 9.1 },
];

const levelBg: Record<string, string> = {
  "严重": "from-cyber-pink/20 to-cyber-red/20 border-cyber-pink/30",
  "高危": "from-cyber-red/20 to-cyber-orange/20 border-cyber-red/30",
  "中危": "from-cyber-orange/20 to-cyber-orange/10 border-cyber-orange/30",
  "低危": "from-cyber-green/20 to-cyber-cyan/10 border-cyber-green/30",
};

const statusText: Record<string, string> = {
  "未修复": "text-cyber-red",
  "修复中": "text-cyber-orange",
  "已修复": "text-cyber-green",
};

const Vulnerabilities = () => {
  const vulnByType = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    yAxis: { type: "category" as const, data: ["远程代码执行", "权限提升", "信息泄露", "拒绝服务", "跨站脚本", "SQL注入", "文件包含", "命令注入"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    series: [{ type: "bar", data: [45, 38, 32, 28, 25, 22, 18, 15], barWidth: "50%", itemStyle: { borderRadius: [0, 4, 4, 0] } }],
  };

  const vulnTrend = {
    tooltip: { trigger: "axis" as const },
    legend: { data: ["新增漏洞", "已修复"], top: 0 },
    xAxis: { type: "category" as const, data: ["1月", "2月", "3月", "4月", "5月", "6月"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    yAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    series: [
      { name: "新增漏洞", type: "line", smooth: true, data: [65, 78, 52, 91, 68, 45], areaStyle: { opacity: 0.12 }, lineStyle: { width: 3 } },
      { name: "已修复", type: "line", smooth: true, data: [50, 62, 48, 75, 80, 60], areaStyle: { opacity: 0.12 }, lineStyle: { width: 3 } },
    ],
  };

  const severityGauge = {
    series: [{
      type: "gauge", startAngle: 200, endAngle: -20, min: 0, max: 100,
      pointer: { show: false },
      progress: { show: true, overlap: false, roundCap: true, clip: false, width: 12 },
      axisLine: { lineStyle: { width: 12, color: [[1, "#1e3a5f33"]] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { fontSize: 12, color: "rgba(255,255,255,0.6)", offsetCenter: [0, "70%"] },
      detail: { fontSize: 28, fontFamily: "Orbitron", fontWeight: "bold", offsetCenter: [0, "30%"], valueAnimation: true,
        color: "auto",
      },
      data: [{ value: 62.8, name: "修复率 %", title: { color: "rgba(255,255,255,0.6)" },
        detail: { color: "#00e5ff" },
        itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#00e5ff" }, { offset: 1, color: "#a855f7" }] } }
      }],
    }],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">漏洞扫描管理</h2>
        <div className="flex gap-3">
          <StatusIndicator status="online" label="扫描引擎正常" />
          <StatusIndicator status="warning" label="2个任务排队中" />
        </div>
      </div>

      {/* 顶部：统计 + 仪表盘 */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <StatCard title="漏洞总数" value="156" icon={Bug} color="from-cyber-orange to-cyber-red" />
          <StatCard title="已修复" value="98" icon={ShieldCheck} trend={{ value: 15, up: true }} color="from-cyber-green to-cyber-cyan" />
        </div>
        <GlassCard className="col-span-3 flex flex-col items-center justify-center" flowBorder>
          <CyberChart option={severityGauge} height="200px" />
        </GlassCard>
        <div className="col-span-3 flex flex-col gap-4">
          <StatCard title="待修复" value="58" icon={AlertCircle} color="from-cyber-red to-cyber-pink" />
          <StatCard title="平均修复时间" value="4.2天" icon={Clock} trend={{ value: 8, up: false }} color="from-cyber-blue to-cyber-purple" />
        </div>
        <GlassCard className="col-span-3">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">漏洞趋势</h3>
          <CyberChart option={vulnTrend} height="185px" />
        </GlassCard>
      </div>

      {/* 中部大横条：漏洞类型 */}
      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">漏洞类型分布</h3>
        <CyberChart option={vulnByType} height="280px" />
      </GlassCard>

      {/* 底部：漏洞卡片网格 */}
      <div>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">高危漏洞清单</h3>
        <div className="grid grid-cols-3 gap-4">
          {vulnList.map((v) => (
            <div key={v.cve} className={`glass-card p-4 border bg-gradient-to-br ${levelBg[v.level] || ""}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground">{v.cve}</span>
                <span className="font-display text-lg font-bold stat-value">{v.cvss}</span>
              </div>
              <div className="font-semibold text-sm text-foreground mb-1">{v.name}</div>
              <div className="text-xs text-muted-foreground mb-3">影响资产：{v.asset}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{v.level}</span>
                <span className={`text-xs font-semibold ${statusText[v.status] || ""}`}>{v.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vulnerabilities;
