import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../../types';
import { Card } from '../ui/Card';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserProfile>({
    height: 182,
    weight: 62,
    age: 19,
    goalWeight: 75,
    appetite: 'low',
    budget: 'low',
    trainingTimeMinutes: 15,
    sleepHours: 7,
    confidence: 2,
    isInitialOnboardingComplete: false
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const steps = [
    {
      title: "Добро пожаловать в Project Bulk",
      description: "Давай создадим твой персональный план трансформации. Это займет всего 2 минуты.",
      fields: (
        <div className="space-y-6 mt-8">
          <div className="space-y-4">
            <label className="text-[#888888] text-[10px] uppercase tracking-widest font-bold">Твой рост (см)</label>
            <input 
              type="number" 
              value={data.height} 
              onChange={e => setData({...data, height: +e.target.value})}
              className="w-full bg-[#111] border-b border-white/5 py-4 px-2 text-3xl font-light focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[#888888] text-[10px] uppercase tracking-widest font-bold">Твой текущий вес (кг)</label>
            <input 
              type="number" 
              value={data.weight} 
              onChange={e => setData({...data, weight: +e.target.value})}
              className="w-full bg-[#111] border-b border-white/5 py-4 px-2 text-3xl font-light focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>
      )
    },
    {
      title: "Твои ресурсы",
      description: "Мы адаптируем план под твой кошелек и график студента.",
      fields: (
        <div className="space-y-8 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setData({...data, budget: 'low'})}
              className={`p-4 rounded-[28px] border text-sm transition-all ${data.budget === 'low' ? 'bg-white text-black border-white' : 'bg-[#111] border-white/5 text-[#888888]'}`}
            >
              Ограниченный бюджет
            </button>
            <button 
              onClick={() => setData({...data, budget: 'medium'})}
              className={`p-4 rounded-[28px] border text-sm transition-all ${data.budget === 'medium' ? 'bg-white text-black border-white' : 'bg-[#111] border-white/5 text-[#888888]'}`}
            >
              Нормальный бюджет
            </button>
          </div>
          <div className="space-y-4">
            <label className="text-[#888888] text-[10px] uppercase tracking-widest font-bold">Время на тренировку (мин)</label>
            <input 
              type="range" 
              min="5" 
              max="60" 
              step="5"
              value={data.trainingTimeMinutes} 
              onChange={e => setData({...data, trainingTimeMinutes: +e.target.value})}
              className="w-full accent-white"
            />
            <p className="text-right text-lg font-light">{data.trainingTimeMinutes} мин</p>
          </div>
        </div>
      )
    },
    {
      title: "Аппетит и Состояние",
      description: "Для худощавого телосложения важно понимать твои пищевые привычки.",
      fields: (
        <div className="space-y-8 mt-8">
          <div className="space-y-4">
            <label className="text-[#888888] text-[10px] uppercase tracking-widest font-bold">Твой аппетит</label>
            <div className="flex flex-col gap-3">
              {['Низкий (ем 1-2 раза в день)', 'Средний', 'Хороший'].map((label, i) => (
                <button 
                  key={label}
                  onClick={() => setData({...data, appetite: i === 0 ? 'low' : i === 1 ? 'moderate' : 'high'})}
                  className={`p-5 rounded-[32px] border text-left text-sm transition-all ${((i === 0 && data.appetite === 'low') || (i === 1 && data.appetite === 'moderate') || (i === 2 && data.appetite === 'high')) ? 'bg-white text-black border-white' : 'bg-[#111] border-white/5 text-[#888888]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[#888888] text-[10px] uppercase tracking-widest font-bold">Уверенность в теле (1-5)</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  onClick={() => setData({...data, confidence: v as any})}
                  className={`flex-1 aspect-square rounded-[24px] border flex items-center justify-center font-bold text-lg transition-all ${data.confidence === v ? 'bg-white text-black border-white' : 'bg-[#111] border-white/5 text-[#888888]'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[step];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] p-6 pb-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center text-[#666] mb-8">
              {step > 0 ? (
                <button onClick={prev} className="hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </button>
              ) : <div className="w-5" />}
              <span className="text-[10px] font-bold uppercase tracking-widest">Шаг {step + 1} из {steps.length}</span>
              <div className="w-5" />
            </div>

            <h1 className="text-3xl font-light tracking-tight leading-tight">{currentStepData.title}</h1>
            <p className="text-[#888888] leading-relaxed">{currentStepData.description}</p>
            
            {currentStepData.fields}
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-12 left-6 right-6 max-w-md mx-auto">
          <button
            onClick={step === steps.length - 1 ? () => onComplete({...data, isInitialOnboardingComplete: true}) : next}
            className="w-full bg-white text-black py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#ddd] transition-colors shadow-2xl active:scale-[0.98]"
          >
            {step === steps.length - 1 ? "Создать профиль" : "Далее"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
