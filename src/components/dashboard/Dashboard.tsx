import { motion } from 'motion/react';
import { UserProfile, DailyStats } from '../../types';
import { Card, StatCard } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Target, Zap, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { MOTIVATION_MESSAGES } from '../../constants';
import { formatNumber } from '../../lib/utils';

export function Dashboard({ profile, stats, setStats }: { profile: UserProfile, stats: DailyStats[], setStats: any }) {
  const today = stats[stats.length - 1];
  const calorieGoal = 2800; // Simplified for MVP
  const proteinGoal = 130; 
  const waterGoal = 2.5;

  const chartData = stats.slice(-7).map(s => ({
    name: s.date.split('-').slice(1).join('.'),
    weight: s.weight
  }));

  const streak = stats.filter(s => s.workoutDone).length;
  const progressPercent = Math.round(((profile.weight - 62) / (profile.goalWeight - 62)) * 100) || 0;

  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight uppercase border-l-2 border-white pl-3">Твой Прогресс</h1>
        <p className="text-[#888888] text-xs font-medium mt-1 uppercase tracking-widest pl-3">Привет, Атлет</p>
      </header>

      {/* Motivational Toast */}
      <Card className="bg-[#111] border-white/5">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center flex-shrink-0">
            <Sparkles size={20} className="text-yellow-400" />
          </div>
          <p className="text-sm font-medium leading-normal text-white/90 italic">
            "{MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)]}"
          </p>
        </div>
      </Card>

      {/* Main Rings Section */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard 
          label="Калории" 
          value={`${formatNumber(today.calories)}`} 
          subValue={`Цель: ${calorieGoal}`}
          icon={Flame}
          color="text-orange-500"
        />
        <StatCard 
          label="Белок" 
          value={`${today.protein} г`} 
          subValue={`Цель: ${proteinGoal}`}
          icon={Zap}
          color="text-yellow-400"
        />
      </div>

      {/* Daily Progress */}
      <Card className="space-y-6">
        <ProgressBar 
          label="Еда (калории)" 
          value={today.calories} 
          max={calorieGoal} 
          color="bg-orange-500" 
        />
        <ProgressBar 
          label="Белок" 
          value={today.protein} 
          max={proteinGoal} 
          color="bg-yellow-400" 
        />
        <ProgressBar 
          label="Вода" 
          value={today.water} 
          max={waterGoal} 
          color="bg-blue-400" 
        />
      </Card>

      {/* Weight Chart */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold tracking-tight">Динамика веса</h2>
          <div className="flex items-center gap-1 text-[#888888] text-xs">
            <TrendingUp size={14} />
            <span className="uppercase tracking-widest">Неделя</span>
          </div>
        </div>
        <Card className="h-48 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#fff" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#18181b', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Habits / Streaks */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Card className="flex flex-col items-center justify-center py-6 gap-2">
          <Calendar className="text-[#666]" size={20} />
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold">{streak}</p>
            <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold">Стрик (дней)</p>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center py-6 gap-2">
          <Target className="text-[#666]" size={20} />
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold">{progressPercent}%</p>
            <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold">До Цели</p>
          </div>
        </Card>
      </div>

      <div className="h-10" />
    </div>
  );
}
