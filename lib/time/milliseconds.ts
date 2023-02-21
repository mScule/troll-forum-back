const fromSeconds = (seconds: number): number => 1000 * seconds
const fromMinutes = (minutes: number): number => fromSeconds(60) * minutes
const fromHours = (hours: number): number => fromMinutes(60) * hours
const fromDays = (days: number): number => fromHours(24) * days
const fromWeeks = (weeks: number): number => fromDays(7) * weeks

export default {
  fromSeconds,
  fromMinutes,
  fromHours,
  fromDays,
  fromWeeks
}
