import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { motion, useReducedMotion } from "motion/react";
import { TrendingDown } from "lucide-react";

// Mock ApoB trend (mg/dL) parsed from years of lab reports — trending down.
const data = [
  { label: "'21", value: 118 },
  { label: "'22", value: 109 },
  { label: "Q1", value: 104 },
  { label: "Q2", value: 96 },
  { label: "Q3", value: 91 },
  { label: "Q4", value: 84 },
  { label: "Now", value: 77 },
];

/**
 * A phone-framed biomarker trend chart — the "single line" the hero promises.
 * The line draws itself in on mount for a subtle, techy first impression.
 */
export function BiomarkerChart() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30, rotate: reduceMotion ? 0 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[340px]"
    >
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-veyns-royal/10 bg-white p-3 shadow-[0_30px_60px_-20px_rgba(27,75,155,0.35)] ring-1 ring-black/5">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-veyns-sky-soft/60 to-white">
          {/* status row */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-veyns-royal/60">ApoB</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-veyns-royal/10 px-2 py-0.5 text-[0.7rem] text-veyns-royal">
              <TrendingDown className="h-3 w-3" /> -35%
            </span>
          </div>
          <div className="px-2 pb-2">
            <div className="text-veyns-charcoal px-3 text-[2rem] leading-none">
              77 <span className="text-[0.9rem] text-veyns-charcoal/50">mg/dL</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
                  <CartesianGrid stroke="#1B4B9B" strokeOpacity={0.08} vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#1B4B9B", fontSize: 10, opacity: 0.5 }}
                  />
                  <YAxis hide domain={[65, 125]} />
                  <Tooltip
                    cursor={{ stroke: "#1B4B9B", strokeOpacity: 0.2 }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgba(27,75,155,0.15)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1B4B9B"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#1B4B9B", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#1B4B9B" }}
                    isAnimationActive={!reduceMotion}
                    animationDuration={1600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* sources footer */}
          <div className="flex items-center gap-2 border-t border-veyns-royal/10 px-5 py-3 text-[0.7rem] text-veyns-charcoal/50">
            <span className="h-1.5 w-1.5 rounded-full bg-veyns-royal" />
            Labcorp · Quest · Whoop · Apple Health
          </div>
        </div>
      </div>
    </motion.div>
  );
}
