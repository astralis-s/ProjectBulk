import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, DailyStats, WorkoutSession } from '../../types';
import { Card } from '../ui/Card';
import { WEEKDAY_WORKOUT, WEEKEND_WORKOUT, WORKOUT_EXERCISES } from '../../constants';
import { ShieldCheck, Play, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Workout({ profile, stats, setStats }: { profile: UserProfile, stats: DailyStats[], setStats: any }) {
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const todayIndex = stats.length - 1;
  const today = stats[todayIndex];

  const isWeekend = [0, 6].includes(new Date().getDay());
  const currentSession = isWeekend ? WEEKEND_WORKOUT : WEEKDAY_WORKOUT;

  const toggleExercise = (id: string) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const finishWorkout = () => {
    const newStats = [...stats];
    newStats[todayIndex] = { ...today, workoutDone: true };
    setStats(newStats);
    setActiveSession(null);
    setCompletedExercises([]);
  };

  if (activeSession) {
    return (
      <div className="p-6 pb-32 min-h-screen bg-[#050505] flex flex-col">
        <header className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight uppercase border-l-2 border-white pl-3">{activeSession.name}</h1>
            <p className="text-[#888888] text-xs font-medium mt-1 uppercase tracking-widest pl-3">Фокус: Техника и суставы</p>
          </div>
          <button 
            onClick={() => setActiveSession(null)}
            className="text-[#888888] hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold"
          >
            Выйти
          </button>
        </header>

        <div className="space-y-4 flex-1">
          {activeSession.exercises.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <button 
                onClick={() => toggleExercise(ex.id)}
                className={cn(
                  "w-full text-left p-6 rounded-[32px] border transition-all duration-300",
                  completedExercises.includes(ex.id) 
                    ? "bg-white/5 border-white/10 opacity-50" 
                    : "bg-[#111] border-white/5"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className={cn("font-semibold text-lg", completedExercises.includes(ex.id) && "line-through")}>
                      {ex.name}
                    </h3>
                    <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold mt-1">
                      {ex.reps ? `${ex.reps} повторений` : ex.duration} • {ex.target || 'Разминка'}
                    </p>
                  </div>
                  {completedExercises.includes(ex.id) ? (
                    <CheckCircle2 className="text-white" size={24} />
                  ) : (
                    <div className="w-6 h-6 border-2 border-[#333] rounded-full" />
                  )}
                </div>
                {!completedExercises.includes(ex.id) && (
                  <p className="mt-4 text-xs text-[#888888] leading-relaxed border-l-2 border-[#333] pl-3">
                    {ex.description}
                  </p>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-12 left-6 right-6">
          <button
            onClick={finishWorkout}
            disabled={completedExercises.length < activeSession.exercises.length}
            className={cn(
               "w-full py-4 rounded-full font-semibold transition-all hover:bg-[#ddd]",
               completedExercises.length === activeSession.exercises.length 
                 ? "bg-white text-black" 
                 : "bg-[#222] text-[#666] cursor-not-allowed border border-white/5"
            )}
          >
            Завершить тренировку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight uppercase border-l-2 border-white pl-3">Тренировки</h1>
        <p className="text-[#888888] text-xs font-medium mt-1 uppercase tracking-widest pl-3">Дома. Без инвентаря. Без суеты.</p>
      </header>

      {/* Joint Protection Banner */}
      <div className="bg-[#111] border border-white/5 rounded-[32px] p-6">
        <div className="flex gap-4">
          <ShieldCheck className="text-white flex-shrink-0 opacity-80" size={24} />
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-[#F5F5F5]">Защита суставов активна</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Мы начинаем с отжиманий от стены, чтобы твои кисти и локти адаптировались без боли.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Workout */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">План на сегодня</h2>
        <Card className="p-6 sm:p-8 space-y-6 bg-[#111] border-white/10 rounded-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z"/>
            </svg>
          </div>
          <div className="space-y-2 relative">
            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-white/50 mb-2">Актуально</span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-light mb-2">{currentSession.name}</h3>
                <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold mt-1">
                  {currentSession.durationMinutes} МИН • {currentSession.exercises.length} УПРАЖНЕНИЙ
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 relative">
            {currentSession.exercises.slice(0, 3).map(ex => (
              <div key={ex.id} className="flex items-center gap-3 text-sm text-[#888888]">
                <div className="w-1.5 h-1.5 bg-[#333] rounded-full" />
                <span>{ex.name}</span>
              </div>
            ))}
            {currentSession.exercises.length > 3 && (
              <p className="text-[10px] text-[#666] font-bold uppercase tracking-widest pl-4">+ еще {currentSession.exercises.length - 3}</p>
            )}
          </div>

          <div className="relative mt-8 pt-4">
            {today.workoutDone ? (
              <div className="w-full py-4 bg-white/5 border border-white/5 text-white rounded-full font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                Готово
              </div>
            ) : (
              <button
                onClick={() => setActiveSession(currentSession)}
                className="w-full py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#ddd] transition-colors"
              >
                Начать тренировку
              </button>
            )}
          </div>
        </Card>
      </div>

      <div className="h-10" />
    </div>
  );
}
