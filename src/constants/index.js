export const svg = '/sprite.svg'

export const filters = {
        'A to Z': { direction: 'asc' },
        'Z to A': { direction: 'desc' },
        'Less than 10$': { priceLess: 10 },
        'Greater than 10$': { priceGreater: 10 },
        'Popular': { sortBy: 'rating', direction: 'desc' },
        'Not popular': { sortBy: 'rating', direction: 'asc' },
        'Show all': {}
    }