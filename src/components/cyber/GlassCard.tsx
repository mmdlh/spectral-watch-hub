import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  flowBorder?: boolean;
}

export const GlassCard = ({ children, className = "", flowBorder }: GlassCardProps) => (
  <div className={`glass-card p-5 ${flowBorder ? "flow-border" : ""} ${className}`}>
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; up: boolean };
  color?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, color = "from-cyber-cyan to-cyber-blue" }: StatCardProps) => (
  <div className="glass-card p-5 group">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-muted-foreground font-medium">{title}</span>
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
        <Icon className="w-5 h-5 text-background" />
      </div>
    </div>
    <div className="stat-value text-3xl mb-1">{value}</div>
    {trend && (
      <span className={`text-xs font-medium ${trend.up ? "text-cyber-green" : "text-cyber-red"}`}>
        {trend.up ? "↑" : "↓"} {Math.abs(trend.value)}% 较昨日
      </span>
    )}
  </div>
);

interface StatusIndicatorProps {
  status: "online" | "warning" | "danger" | "offline";
  label: string;
  size?: "sm" | "md";
}

const statusColors = {
  online: "bg-cyber-green",
  warning: "bg-cyber-orange",
  danger: "bg-cyber-red",
  offline: "bg-muted-foreground",
};

export const StatusIndicator = ({ status, label, size = "md" }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <span className={`status-pulse inline-block rounded-full ${statusColors[status]} ${size === "sm" ? "w-2 h-2" : "w-3 h-3"}`} />
    <span className={`${size === "sm" ? "text-xs" : "text-sm"} text-muted-foreground`}>{label}</span>
  </div>
);
