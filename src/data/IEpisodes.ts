export interface IEpisodes {
  name: string,
  url: string;
  season: number,
  number: number,
  airdate: string,
  rating: {
    average: string
  },
  image: {
    medium: string,
    original: string
  },
  summary: string
}