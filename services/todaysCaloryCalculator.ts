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
        totals.carbs+= item.fats ?? 0
        return totals
      },
      { protein: 0, carbs: 0, fats: 0 }
    )
};

export const calculateCalories = (totals: {
  protein: number
  carb: number
  fat: number
}) => {
  return Math.round(totals.protein * 4 + totals.carb * 4 + totals.fat * 9)
}