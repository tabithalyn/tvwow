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
    },
    url: string
  }
}

export interface SinglePerson {
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
  },
  url: string,
  _embedded: {
    castcredits: {
      _links: {
        show: {
          href: string
        },
        character: {
          href: string
        }
      }
    }[]
  }
}