"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

interface TrendData {
  quarter: string;
  revenue: number;
  opIncome: number;
  netIncome: number;
  debtRatio: number;
  roe: number;
}

interface FinTrendChartProps {
  data: TrendData[];
}

export function FinTrendChart({ data }: FinTrendChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="fin-trend-container" style={{ margin: "20px 0" }}>
      {/* 1. 매출, 영업이익, 순이익 */}
      <div style={{ marginBottom: 40, background: "rgba(0,0,0,0.02)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: 14, color: "var(--text-secondary)" }}>매출 / 이익 추세</h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (v > 1000 ? `${(v/1000).toFixed(0)}k` : v)} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="revenue" name="매출액" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} opacity={0.6} />
              <Line yAxisId="left" type="monotone" dataKey="opIncome" name="영업이익" stroke="var(--accent-cyan)" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="netIncome" name="순이익" stroke="var(--accent-green)" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. 부채비율, ROE */}
      <div style={{ background: "rgba(0,0,0,0.02)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: 14, color: "var(--text-secondary)" }}>비율 추세 (%)</h4>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="debtRatio" name="부채비율(%)" fill="var(--accent-purple)" stroke="none" opacity={0.15} />
              <Line yAxisId="left" type="monotone" dataKey="debtRatio" name="부채비율(%)" stroke="var(--accent-purple)" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="roe" name="ROE(%)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
