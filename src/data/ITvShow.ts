export interface TvShow {
  id: number,
  name: string,
  language: string,
  type: string,
  genres: string[],
  premiered: string,
  ended?: string,
  network: {
    id: number,
    name: string,
    country: {
      name: string
    }
  },
  image: {
    medium: string,
    original: string
  },
  summary: string,
  status: string,
  url: string
}