import { motion } from 'motion/react';
import { LayoutDashboard, Utensils, Dumbbell, User, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: any) => void }) {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Главная' },
    { id: 'nutrition', icon: Utensils, label: 'Питание' },
    { id: 'workout', icon: Dumbbell, label: 'Тренировки' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-white/5 px-4 pb-[env(safe-area-inset-bottom,32px)] pt-3 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors relative",
              activeTab === tab.id ? "text-white" : "text-[#888888] hover:text-white"
            )}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wide uppercase">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-3 w-1 h-1 bg-white rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
