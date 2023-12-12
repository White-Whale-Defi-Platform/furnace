export * from './asset'
export * from './api'
export * from './execute'
export * from './explorer'
export * from './format'
export * from './validate'

export const calculateProgress = (startTime: number, endTime: number, currentTime: number): number => {
  if (currentTime <= startTime) return 0
  else if (currentTime >= endTime) return 100
  else return ((currentTime - startTime) / (endTime - startTime)) * 100
}
