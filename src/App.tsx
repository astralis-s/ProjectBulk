import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserProfile, DailyStats } from './types';
import { Onboarding } from './components/onboarding/Onboarding';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';
import { Nutrition } from './components/nutrition/Nutrition';
import { Workout } from './components/workout/Workout';
import { Profile } from './components/profile/Profile';

const INITIAL_PROFILE: UserProfile = {
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
};

const INITIAL_STATS: DailyStats[] = [
  {
    date: new Date().toISOString().split('T')[0],
    weight: 62,
    calories: 0,
    protein: 0,
    water: 0,
    sleep: 7,
    workoutDone: false,
    appetiteLevel: 2,
    confidenceLevel: 2
  }
];

export default function App() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('bulk_profile', INITIAL_PROFILE);
  const [stats, setStats] = useLocalStorage<DailyStats[]>('bulk_stats', INITIAL_STATS);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!profile.isInitialOnboardingComplete) {
    return <Onboarding onComplete={setProfile} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard profile={profile} stats={stats} setStats={setStats} />;
      case 'nutrition': return <Nutrition profile={profile} stats={stats} setStats={setStats} />;
      case 'workout': return <Workout profile={profile} stats={stats} setStats={setStats} />;
      case 'profile': return <Profile profile={profile} setProfile={setProfile} stats={stats} />;
      default: return <Dashboard profile={profile} stats={stats} setStats={setStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-white/20 selection:text-white">
      <main className="max-w-md mx-auto min-h-screen pb-32">
        {renderContent()}
      </main>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
