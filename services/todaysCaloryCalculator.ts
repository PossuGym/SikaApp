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
        totals.calories += item.calories ?? 0
        totals.fat += item.fats ?? 0
        return totals
      },
      { protein: 0, calories: 0, fat: 0 }
    )
};

export const calculateCalories = (totals: {
  protein: number
  carbs: number
  fats: number
}) => {
  return Math.round(totals.protein * 4 + totals.carbs * 4 + totals.fats * 9)
}