import type { AppNames, AppCategories, Teams } from '@/constants/apps'

export interface AppInfo {
  name: AppNames
  creator: Teams
  logo: string
  banner: string
  description: string
  category: AppCategories
  href: {
    internal: string
    external: string
  }
}
