import { GlassCard, StatCard, StatusIndicator } from "@/components/cyber/GlassCard";
import { CyberChart } from "@/components/cyber/CyberChart";
import { DataTable } from "@/components/cyber/DataTable";
import { Bug, ShieldCheck, Clock, AlertCircle } from "lucide-react";

const Vulnerabilities = () => {
  const vulnByType = {
    tooltip: { trigger: "axis" as const },
    xAxis: { type: "value" as const, splitLine: { lineStyle: { color: "#1e3a5f33" } } },
    yAxis: { type: "category" as const, data: ["远程代码执行", "权限提升", "信息泄露", "拒绝服务", "跨站脚本", "SQL注入", "文件包含", "命令注入"], axisLine: { lineStyle: { color: "#1e3a5f" } } },
    series: [
      { type: "bar", data: [45, 38, 32, 28, 25, 22, 18, 15], barWidth: "50%", itemStyle: { borderRadius: [0, 4, 4, 0] } },
    ],
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

  const severityPie = {
    tooltip: { trigger: "item" as const },
    series: [{
      type: "pie", radius: ["45%", "72%"],
      label: { color: "#8fa4bf", fontSize: 11 },
      itemStyle: { borderRadius: 6, borderColor: "rgba(10,18,36,0.8)", borderWidth: 2 },
      data: [
        { value: 18, name: "严重" }, { value: 45, name: "高危" },
        { value: 62, name: "中危" }, { value: 31, name: "低危" },
      ],
    }],
  };

  const vulnTable = [
    ["CVE-2024-1234", "Apache Log4j RCE", "严重", "Web服务器", "未修复", "2024-03-10"],
    ["CVE-2024-2345", "OpenSSL缓冲区溢出", "高危", "API网关", "修复中", "2024-03-12"],
    ["CVE-2024-3456", "MySQL权限提升", "高危", "数据库", "已修复", "2024-03-08"],
    ["CVE-2024-4567", "Nginx信息泄露", "中危", "反向代理", "未修复", "2024-03-14"],
    ["CVE-2024-5678", "Redis未授权访问", "高危", "缓存服务", "修复中", "2024-03-11"],
    ["CVE-2024-6789", "Docker逃逸", "严重", "容器平台", "未修复", "2024-03-15"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">漏洞扫描管理</h2>
        <div className="flex gap-3">
          <StatusIndicator status="online" label="扫描引擎正常" />
          <StatusIndicator status="warning" label="2个任务排队中" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="漏洞总数" value="156" icon={Bug} color="from-cyber-orange to-cyber-red" />
        <StatCard title="已修复" value="98" icon={ShieldCheck} trend={{ value: 15, up: true }} color="from-cyber-green to-cyber-cyan" />
        <StatCard title="待修复" value="58" icon={AlertCircle} color="from-cyber-red to-cyber-pink" />
        <StatCard title="平均修复时间" value="4.2天" icon={Clock} trend={{ value: 8, up: false }} color="from-cyber-blue to-cyber-purple" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <GlassCard className="col-span-3">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">漏洞类型分布</h3>
          <CyberChart option={vulnByType} height="320px" />
        </GlassCard>
        <GlassCard className="col-span-2">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">风险等级占比</h3>
          <CyberChart option={severityPie} height="320px" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <GlassCard>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-2">漏洞趋势（近6个月）</h3>
          <CyberChart option={vulnTrend} height="250px" />
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">漏洞详情列表</h3>
        <DataTable columns={["CVE编号", "漏洞名称", "等级", "影响资产", "状态", "发现时间"]} data={vulnTable} />
      </GlassCard>
    </div>
  );
};

export default Vulnerabilities;
