import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  className?: string;
  showDetails?: boolean;
}

export function ProgressBar({ 
  value, 
  max, 
  label, 
  color = "bg-white", 
  className,
  showDetails = true 
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider">
        <span className="text-[#888888]">{label}</span>
        {showDetails && <span className="text-[#666]">{value} / {max}</span>}
      </div>
      <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={cn("h-full rounded-full transition-all duration-500", color)}
        />
      </div>
    </div>
  );
}
