import { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, DailyStats, Meal } from '../../types';
import { Card } from '../ui/Card';
import { CHEAP_FOODS, SKINNY_ADVICE } from '../../constants';
import { Plus, Coffee, Info, Zap, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Nutrition({ profile, stats, setStats }: { profile: UserProfile, stats: DailyStats[], setStats: any }) {
  const todayIndex = stats.length - 1;
  const today = stats[todayIndex];
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const addMeal = (meal: Meal) => {
    const newStats = [...stats];
    newStats[todayIndex] = {
      ...today,
      calories: today.calories + meal.calories,
      protein: today.protein + meal.protein
    };
    setStats(newStats);
  };

  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight uppercase border-l-2 border-white pl-3">Питание</h1>
        <p className="text-[#888888] text-xs font-medium mt-1 uppercase tracking-widest pl-3">Бюджетно. Сытно. Просто.</p>
      </header>

      {/* Manual Input (Simplified) */}
      <Card className="flex items-center justify-between p-4 bg-[#111] border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <Plus className="text-orange-500" size={20} />
          </div>
          <div>
            <p className="font-semibold text-sm">Быстрый ввод</p>
            <p className="text-xs text-[#888888]">Добавить калории вручную</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[200, 500].map(val => (
            <button 
              key={val}
              onClick={() => addMeal({ id: 'custom', name: 'Custom', calories: val, protein: Math.round(val/20), priceEstimate: 0, isLazy: true, ingredients: [] })}
              className="px-4 py-1.5 bg-[#222] rounded-full text-xs font-medium hover:bg-[#333] transition-colors border border-white/5"
            >
              +{val}
            </button>
          ))}
        </div>
      </Card>

      {/* Skinny Mode Advice */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <Info size={18} className="text-[#888888]" />
          Skinny Guy Mode
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {SKINNY_ADVICE.map((adv, i) => (
            <div key={i} className="min-w-[280px] p-5 space-y-2 border border-white/5 rounded-[32px] bg-[#111]">
              <h3 className="font-semibold text-sm text-[#F5F5F5]">{adv.title}</h3>
              <p className="text-xs text-[#888888] leading-relaxed">{adv.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cheap Bulk Meals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold tracking-tight">Бюджетный Булк</h2>
          <span className="text-[#888888] text-xs font-semibold uppercase tracking-widest">Меню студента</span>
        </div>
        <div className="space-y-3">
          {CHEAP_FOODS.map((meal) => (
            <div 
              key={meal.id} 
              className="p-5 bg-[#111] border border-white/5 rounded-[32px] hover:bg-[#161616] transition-all group active:scale-[0.98]"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{meal.name}</h3>
                    {meal.isLazy && <Clock size={12} className="text-[#666]" />}
                  </div>
                  <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold">
                    {meal.calories} ККАЛ • {meal.protein}Г БЕЛКА
                  </p>
                </div>
                <button 
                  onClick={() => addMeal(meal)}
                  className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:translate-x-2 sm:group-hover:translate-x-0 active:scale-95"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {meal.ingredients.slice(0, 3).map(ing => (
                  <span key={ing} className="text-[10px] uppercase font-medium bg-[#222] px-3 py-1 rounded-full text-[#888888]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}
