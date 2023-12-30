export interface Person {
  person: {
    id: number,
    name: string,
    country: {
      name: string
    },
    birthday: string,
    deathday?: string,
    gender: string,
    image: {
      medium: string
    }
  }
}