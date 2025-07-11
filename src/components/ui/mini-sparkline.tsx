import { motion } from 'framer-motion';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function MiniSparkline({ 
  data, 
  color = '#00E6B8', 
  width = 60, 
  height = 20 
}: MiniSparklineProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  if (range === 0) return null;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const pathD = `M ${points}`;

  return (
    <div className="inline-block">
      <svg width={width} height={height} className="overflow-visible">
        <motion.polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Gradient fill */}
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        <motion.polygon
          fill={`url(#gradient-${color.replace('#', '')})`}
          points={`0,${height} ${points} ${width},${height}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Last point indicator */}
        <motion.circle
          cx={data.length > 1 ? ((data.length - 1) / (data.length - 1)) * width : 0}
          cy={data.length > 1 ? height - ((data[data.length - 1] - min) / range) * height : height / 2}
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
      </svg>
    </div>
  );
}