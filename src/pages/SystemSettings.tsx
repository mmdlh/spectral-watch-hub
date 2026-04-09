import { GlassCard } from "@/components/cyber/GlassCard";
import { Shield, Users, Database, Bell, Lock, Globe, Monitor, Cpu } from "lucide-react";

const settingGroups = [
  {
    title: "安全策略",
    icon: Shield,
    items: [
      { label: "防火墙规则", desc: "配置入站/出站规则", status: "已启用" },
      { label: "入侵检测", desc: "IDS/IPS策略配置", status: "已启用" },
      { label: "WAF规则", desc: "Web应用防火墙规则", status: "已启用" },
    ],
  },
  {
    title: "用户管理",
    icon: Users,
    items: [
      { label: "用户账户", desc: "管理系统用户和权限", status: "32个用户" },
      { label: "角色权限", desc: "RBAC角色配置", status: "5个角色" },
      { label: "登录策略", desc: "密码和MFA策略", status: "已启用" },
    ],
  },
  {
    title: "数据管理",
    icon: Database,
    items: [
      { label: "数据备份", desc: "自动备份策略", status: "每日" },
      { label: "数据保留", desc: "日志保留周期", status: "90天" },
      { label: "数据加密", desc: "传输和存储加密", status: "AES-256" },
    ],
  },
  {
    title: "告警配置",
    icon: Bell,
    items: [
      { label: "通知渠道", desc: "邮件/短信/钉钉", status: "3个渠道" },
      { label: "告警规则", desc: "自定义告警条件", status: "48条规则" },
      { label: "升级策略", desc: "告警升级和转发", status: "已配置" },
    ],
  },
];

const systemInfo = [
  { icon: Lock, label: "SSL证书", value: "有效期至 2025-06-15" },
  { icon: Globe, label: "网络接口", value: "4个活跃" },
  { icon: Monitor, label: "系统版本", value: "CyberGuard v3.2.1" },
  { icon: Cpu, label: "授权信息", value: "企业版 · 1000节点" },
];

const SystemSettings = () => (
  <div className="space-y-6">
    <h2 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">系统设置</h2>

    <div className="grid grid-cols-4 gap-4">
      {systemInfo.map((info) => (
        <GlassCard key={info.label} flowBorder>
          <div className="flex items-center gap-3">
            <info.icon className="w-8 h-8 text-primary opacity-70" />
            <div>
              <div className="text-xs text-muted-foreground">{info.label}</div>
              <div className="text-sm font-semibold text-foreground">{info.value}</div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-6">
      {settingGroups.map((group) => (
        <GlassCard key={group.title}>
          <div className="flex items-center gap-2 mb-4">
            <group.icon className="w-5 h-5 text-primary" />
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">{group.title}</h3>
          </div>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{item.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

export default SystemSettings;
