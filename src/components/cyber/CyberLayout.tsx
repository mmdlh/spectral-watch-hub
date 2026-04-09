import { Link, useLocation } from "react-router-dom";
import { Shield, Activity, Bug, Network, FileText, Server, Bell, Settings, Search, User } from "lucide-react";
import { ReactNode } from "react";
import cyberBg from "@/assets/cyber-bg.jpg";

const navItems = [
  { label: "态势总览", path: "/", icon: Shield },
  { label: "威胁监测", path: "/threats", icon: Activity },
  { label: "漏洞扫描", path: "/vulnerabilities", icon: Bug },
  { label: "流量分析", path: "/traffic", icon: Network },
  { label: "日志审计", path: "/logs", icon: FileText },
  { label: "资产管理", path: "/assets", icon: Server },
  { label: "告警中心", path: "/alerts", icon: Bell },
  { label: "系统设置", path: "/settings", icon: Settings },
];

export const CyberLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${cyberBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="fixed inset-0 z-0 bg-background/40" />

      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6">
        {/* 品牌 */}
        <div className="flex items-center gap-3 mr-6 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Shield className="w-5 h-5 text-background" />
          </div>
          <h1 className="font-display text-xl font-black tracking-widest glow-text text-primary">
            网络安全监控平台
          </h1>
        </div>

        {/* 分隔线 */}
        <div className="w-px h-7 bg-border/40 mr-4 shrink-0" />

        {/* 导航菜单 */}
        <div className="flex-1 flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group relative"
              >
                <div
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {/* 激活态背景光效 */}
                  {active && (
                    <div className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20 shadow-[inset_0_1px_0_0_rgba(0,229,255,0.1),0_0_12px_rgba(0,229,255,0.08)]" />
                  )}
                  {/* hover背景 */}
                  {!active && (
                    <div className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-secondary/40 transition-colors duration-300" />
                  )}
                  <item.icon className={`relative z-10 w-4 h-4 transition-all duration-300 ${active ? "drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]" : "group-hover:scale-110"}`} />
                  <span className="relative z-10">{item.label}</span>
                </div>
                {/* 底部激活指示条 */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300 ${
                    active ? "w-3/4 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-40"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* 分隔线 */}
        <div className="w-px h-7 bg-border/40 mx-4 shrink-0" />

        {/* 右侧操作 */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,229,255,0.1)]">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative w-9 h-9 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,229,255,0.1)]">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyber-red text-[10px] font-bold flex items-center justify-center text-foreground shadow-lg shadow-cyber-red/30">3</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
            <User className="w-4 h-4 text-background" />
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-8 px-6">{children}</main>
    </div>
  );
};
