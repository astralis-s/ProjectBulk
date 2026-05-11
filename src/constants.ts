import { Meal, WorkoutExercise, WorkoutSession } from './types';

export const CHEAP_FOODS: Meal[] = [
  {
    id: 'm1',
    name: 'Овсянка на молоке с бананом',
    calories: 450,
    protein: 15,
    priceEstimate: 40,
    isLazy: true,
    ingredients: ['Овсяные хлопья', 'Молоко', 'Банан']
  },
  {
    id: 'm2',
    name: 'Гречка с яйцами и маслом',
    calories: 550,
    protein: 22,
    priceEstimate: 50,
    isLazy: false,
    ingredients: ['Гречка', '2 яйца', 'Сливочное масло']
  },
  {
    id: 'm3',
    name: 'Макароны с сыром и творогом',
    calories: 600,
    protein: 25,
    priceEstimate: 60,
    isLazy: true,
    ingredients: ['Макароны', 'Сыр', 'Творог']
  },
  {
    id: 'm4',
    name: 'Творог с кефиром и сахаром',
    calories: 400,
    protein: 30,
    priceEstimate: 70,
    isLazy: true,
    ingredients: ['Творог 5-9%', 'Кефир', 'Немного сахара или варенья']
  },
  {
    id: 'm5',
    name: 'Куриная грудка с картофелем',
    calories: 650,
    protein: 35,
    priceEstimate: 120,
    isLazy: false,
    ingredients: ['Курица', 'Картофель', 'Масло']
  },
  {
    id: 'm6',
    name: 'Бутерброды с арахисовой пастой',
    calories: 400,
    protein: 12,
    priceEstimate: 45,
    isLazy: true,
    ingredients: ['Хлеб', 'Арахисовая паста']
  }
];

export const WORKOUT_EXERCISES: Record<string, WorkoutExercise> = {
  wall_pushups: {
    id: 'wall_pushups',
    name: 'Отжимания от стены',
    reps: '10-15',
    target: 'Грудь, Трицепс',
    description: 'Самый легкий вариант для разгрузки суставов кисти.',
    isLowEnergy: true
  },
  knee_pushups: {
    id: 'knee_pushups',
    name: 'Отжимания с колен',
    reps: '8-12',
    target: 'Грудь, Плечи',
    description: 'Переходный этап к полноценным отжиманиям.'
  },
  plank: {
    id: 'plank',
    name: 'Планка',
    duration: '20-40 сек',
    target: 'Кори, Пресс',
    description: 'Укрепляет глубокие мышцы живота без лишних движений.',
    isLowEnergy: true
  },
  squats: {
    id: 'squats',
    name: 'Приседания',
    reps: '15-20',
    target: 'Ноги, Ягодицы',
    description: 'Классическое упражнение для базы.'
  },
  dead_bug: {
    id: 'dead_bug',
    name: 'Мертвый жук',
    reps: '10 на каждую сторону',
    target: 'Пресс',
    description: 'Безопасное и эффективное укрепление пресса.'
  },
  wrist_warmup: {
    id: 'wrist_warmup',
    name: 'Разминка кистей',
    duration: '2 мин',
    description: 'Крайне важно для предотвращения болей в костях.',
    isLowEnergy: true
  }
};

export const WEEKDAY_WORKOUT: WorkoutSession = {
  id: 'weekday_short',
  name: 'Будний день (Экспресс)',
  durationMinutes: 15,
  intensity: 'low',
  exercises: [
    WORKOUT_EXERCISES.wrist_warmup,
    WORKOUT_EXERCISES.wall_pushups,
    WORKOUT_EXERCISES.dead_bug,
    WORKOUT_EXERCISES.plank
  ]
};

export const WEEKEND_WORKOUT: WorkoutSession = {
  id: 'weekend_main',
  name: 'Выходной (База)',
  durationMinutes: 25,
  intensity: 'medium',
  exercises: [
    WORKOUT_EXERCISES.wrist_warmup,
    WORKOUT_EXERCISES.wall_pushups,
    WORKOUT_EXERCISES.knee_pushups,
    WORKOUT_EXERCISES.squats,
    WORKOUT_EXERCISES.dead_bug
  ]
};

export const MOTIVATION_MESSAGES = [
  "Маленький прогресс — это все равно прогресс.",
  "Твое тело скажет тебе спасибо за эти 15 минут.",
  "Сегодня ты сильнее, чем вчера, даже если это просто одна лишняя ложка еды.",
  "Дисциплина важнее мотивации. Просто начни.",
  "Ты не один в этом пути. Мы адаптируемся постепенно."
];

export const SKINNY_ADVICE = [
  {
    title: "Как есть больше, если нет аппетита?",
    content: "Попробуй добавлять жидкие калории (смузи, кефир) и ешь чаще, но маленькими порциями. Не заставляй себя до тошноты."
  },
  {
    title: "Боль в запястьях?",
    content: "Это нормально для новичка. Делай отжимания от стены, пока связки не привыкнут. Не игнорируй разминку!"
  },
  {
    title: "Страшно идти в зал?",
    content: "Мы начнем дома. Твое тело — твой инструмент. Когда окрепнешь, страх уйдет сам собой."
  }
];
