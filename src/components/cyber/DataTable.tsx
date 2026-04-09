interface DataTableProps {
  columns: string[];
  data: (string | number)[][];
  maxRows?: number;
}

const riskColors: Record<string, string> = {
  "高危": "text-cyber-red",
  "中危": "text-cyber-orange",
  "低危": "text-cyber-green",
  "严重": "text-cyber-pink",
  "正常": "text-cyber-green",
  "异常": "text-cyber-red",
  "告警": "text-cyber-orange",
  "在线": "text-cyber-green",
  "离线": "text-muted-foreground",
};

export const DataTable = ({ columns, data, maxRows = 6 }: DataTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border/50">
          {columns.map((col) => (
            <th key={col} className="text-left py-3 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, maxRows).map((row, i) => (
          <tr key={i} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`py-2.5 px-3 ${riskColors[String(cell)] || ""}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
