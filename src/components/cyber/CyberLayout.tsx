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

      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6">
        <div className="flex items-center gap-3 mr-8">
          <Shield className="w-7 h-7 text-primary" />
          <h1 className="font-display text-2xl font-black tracking-widest glow-text text-primary">
            网络安全监控平台
          </h1>
        </div>

        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 ml-4">
          <button className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-4 h-4 text-background" />
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-8 px-6">{children}</main>
    </div>
  );
};
