import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PricePoint } from '../types';

interface MarketChartProps {
  data: PricePoint[];
  color: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-futuro-card border border-futuro-border p-3 rounded-lg shadow-2xl text-xs">
        <p className="text-futuro-muted mb-1">{new Date(label).toLocaleDateString('pt-BR')} {new Date(label).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        <p className="text-futuro-text font-bold text-sm">
          {`Probabilidade: ${(payload[0].value * 100).toFixed(0)}%`}
        </p>
      </div>
    );
  }
  return null;
};

export const MarketChart: React.FC<MarketChartProps> = ({ data, color }) => {
  return (
    <div className="w-full h-80 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="timestamp" 
            hide={true} 
          />
          <YAxis 
            domain={[0, 1]} 
            hide={true} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <ReferenceLine y={0.5} stroke="#475569" strokeDasharray="3 3" opacity={0.5} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={3}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};