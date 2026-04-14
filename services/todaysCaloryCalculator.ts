import { Nutrition } from '../types/types'
import { getDayStartAndEnd } from '../services/todayService'

export const calculateDailyMacrosTotal = (
  items: Nutrition[],
  dayTimestamp: number = Date.now()
) => {
  const { start, end } = getDayStartAndEnd(dayTimestamp);

  return items
    .filter((item) => item.date >= start && item.date <= end)
    .reduce(
      (totals, item) => {
        totals.protein += item.protein ?? 0
        totals.fats += item.fats ?? 0
        totals.carbs += item.carbs ?? 0
        return totals
      },
      { protein: 0, carbs: 0, fats: 0 }
    )
};

export const calculateCalories = (totals: {
  protein: number
  carbs: number
  fats: number
}) => {
  return Math.round(totals.protein * 4 + totals.carbs * 4 + totals.fats * 9)
}

export const calculateDailyProgressPercentage = (
  dayCalories: number,
  caloriesGoal: number
) => {
  if (caloriesGoal <= 0) return 0

  const percentage = (dayCalories / caloriesGoal) * 100
  return Math.round(Math.min(100, Math.max(0, percentage)))
}

