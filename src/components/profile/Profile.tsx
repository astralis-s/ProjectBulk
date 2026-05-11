import { motion } from 'motion/react';
import { UserProfile, DailyStats } from '../../types';
import { Card } from '../ui/Card';
import { User, Award, Ruler, Weight, History, Settings, LogOut } from 'lucide-react';

export function Profile({ profile, setProfile, stats }: { profile: UserProfile, setProfile: (p: any) => void, stats: DailyStats[] }) {
  const achievements = [
    { title: "Первый шаг", desc: "Завершил онбординг", icon: Award, unlocked: true },
    { title: "Регулярность", desc: "3 дня тренировок подряд", icon: History, unlocked: stats.filter(s => s.workoutDone).length >= 3 },
    { title: "Мастер Булка", desc: "Набрал первые 2 кг", icon: Weight, unlocked: profile.weight > 64 },
  ];

  const resetProfile = () => {
    if (confirm("Ты уверен, что хочешь сбросить весь прогресс?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight uppercase border-l-2 border-white pl-3">Профиль</h1>
          <p className="text-[#888888] text-xs font-medium mt-1 uppercase tracking-widest pl-3">Студент • Начальный уровень</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#333] to-[#555] border border-white/20 flex items-center justify-center shadow-lg">
          <User size={24} className="text-white" />
        </div>
      </header>

      {/* Body Model Visualization (Abstract) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Твои Метрики</h2>
        <Card className="grid grid-cols-2 gap-6 py-8 bg-[#111] border-white/5 shadow-2xl">
          <div className="flex flex-col items-center gap-2 border-r border-[#333]">
            <Ruler className="text-[#888888]" size={20} />
            <p className="text-2xl font-semibold font-mono">{profile.height} см</p>
            <p className="text-[10px] text-[#888888] uppercase font-bold tracking-widest">Рост</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Weight className="text-[#888888]" size={20} />
            <p className="text-2xl font-semibold font-mono">{profile.weight} кг</p>
            <p className="text-[10px] text-[#888888] uppercase font-bold tracking-widest">Вес сейчас</p>
          </div>
        </Card>
      </div>

      {/* Achievements Roll */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Достижения</h2>
        <div className="space-y-3">
          {achievements.map((ach) => (
            <div key={ach.title} className={cn(
              "p-5 bg-[#111] border rounded-[32px] flex gap-4 items-center transition-all",
              ach.unlocked ? "border-white/10" : "border-white/5 opacity-40 grayscale"
            )}>
              <div className="w-12 h-12 rounded-full bg-[#161616] flex items-center justify-center flex-shrink-0">
                <ach.icon size={22} className={ach.unlocked ? "text-yellow-500" : "text-[#666]"} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{ach.title}</h4>
                <p className="text-[10px] text-[#888888] uppercase font-bold tracking-wider">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings / Danger Zone */}
      <div className="space-y-3 pt-4">
        <button className="w-full p-5 bg-[#111] border border-white/5 rounded-[32px] flex items-center justify-between group active:bg-[#161616] transition-colors">
          <div className="flex items-center gap-4">
            <Settings size={20} className="text-[#888888]" />
            <span className="font-semibold text-sm">Настройки плана</span>
          </div>
          <ChevronRight size={18} className="text-[#666] group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={resetProfile}
          className="w-full p-5 bg-red-900/10 border border-red-500/20 rounded-[32px] flex items-center gap-4 text-red-500 group active:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Удалить все данные</span>
        </button>
      </div>

      <div className="h-10" />
    </div>
  );
}

import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';
