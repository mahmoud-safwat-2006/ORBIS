import {useMemo} from 'react'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'

export const interests = [
  'animals',
  'art',
  'books',
  'comedy',
  'comics',
  'culture',
  'dev',
  'education',
  'finance',
  'food',
  'gaming',
  'journalism',
  'movies',
  'music',
  'nature',
  'news',
  'pets',
  'photography',
  'politics',
  'science',
  'sports',
  'tech',
  'tv',
  'writers',
] as const
export type Interest = (typeof interests)[number]

// most popular selected interests
export const popularInterests = [
  'art',
  'gaming',
  'sports',
  'comics',
  'music',
  'politics',
  'photography',
  'science',
  'news',
] satisfies Interest[]

export function useInterestsDisplayNames() {
  const {_} = useLingui()

  return useMemo<Record<string, string>>(() => {
    return {
      animals: "حيوانات",
      art: "فنون",
      books: "كتب",
      comedy: "كوميديا",
      comics: "قصص مصورة",
      culture: "ثقافة",
      dev: "برمجة وتطوير",
      education: "تعليم",
      finance: "اقتصاد ومال",
      food: "طعام وطبخ",
      gaming: "ألعاب فيديو",
      journalism: "صحافة",
      movies: "أفلام",
      music: "موسيقى",
      nature: "طبيعة",
      news: "أخبار",
      pets: "حيوانات أليفة",
      photography: "تصوير",
      politics: "سياسة",
      science: "علوم",
      sports: "رياضة",
      tech: "تقنية",
      tv: "تلفزيون وسينما",
      writers: "كتاب ومؤلفون",
    } satisfies Record<Interest, string>
  }, [_])
}
