import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

export function Card({ children, className, delay = 0, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "bg-[#111] border border-white/5 rounded-[32px] p-5 sm:p-6 shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ label, value, subValue, icon: Icon, color = "text-blue-400" }: any) {
  return (
    <Card className="flex flex-col gap-2 p-4 sm:p-5">
      <div className="flex justify-between items-start">
        <span className="text-[#888888] text-[10px] font-semibold uppercase tracking-widest">{label}</span>
        <Icon size={16} className={color} />
      </div>
      <div className="mt-1">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{value}</h3>
        {subValue && <p className="text-[#666] text-[10px] mt-1">{subValue}</p>}
      </div>
    </Card>
  );
}
