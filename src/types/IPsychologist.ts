export type Review = {
    reviewer: string
    comment: string
    rating: number
}

export interface IPsychologist {
    specialization: string
    experience: string
    price_per_hour: number
    license: string
    about: string
    avatar_url: string
    initial_consultation: string
    rating: number
    name: string
    reviews: Review[]
    lastVisibleDoc: string
    id: string
}