import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts'
import { BarChart2 } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const score = payload[0]?.value
  const color = score > 0.5 ? '#ef4444' : '#22c55e'
  return (
    <div className="glass px-3 py-2 text-xs">
      <p className="text-white/50 mb-1">Frame {label} ({(label / 30).toFixed(2)}s)</p>
      <p className="font-semibold" style={{ color }}>
        {score > 0.5 ? 'FAKE' : 'REAL'} — {Math.round(score * 100)}%
      </p>
    </div>
  )
}

export default function TimelineGraph({ timeline }) {
  if (!timeline?.length) return null

  const data = timeline.map((t) => ({
    frame: t.frame,
    score: t.score,
    ts: t.timestamp,
  }))

  const avgScore = data.reduce((s, d) => s + d.score, 0) / data.length
  const peakFake = data.reduce((m, d) => d.score > m.score ? d : m, data[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-cyan-400" />
          <span className="text-sm font-semibold text-white">Frame-by-Frame Analysis</span>
        </div>
        <div className="flex gap-4 text-xs text-white/40">
          <span>{data.length} frames</span>
          <span>Avg: {Math.round(avgScore * 100)}%</span>
          <span>Peak: {Math.round(peakFake.score * 100)}% @ f{peakFake.frame}</span>
        </div>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fakeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="frame"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={0.5}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="4 4"
              label={{ value: 'Threshold', fill: 'rgba(255,255,255,0.25)', fontSize: 10, position: 'right' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#fakeGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#ef4444', stroke: '#050510', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded" style={{ background: '#ef4444' }} />
          <span className="text-white/40">Fake confidence score per frame</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-px rounded border-t border-dashed" style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
          <span className="text-white/40">Decision threshold (50%)</span>
        </div>
      </div>
    </motion.div>
  )
}
