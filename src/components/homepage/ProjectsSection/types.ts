import type { Media } from '@/types/content'

export interface ProjectItem {
  id: number
  year: string
  title: string
  description: string
  category: string
  thumbnail: Media | null
  link: string | null
}
