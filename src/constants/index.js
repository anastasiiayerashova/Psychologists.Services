export const svg = '/sprite.svg'

export const filters = {
        'A to Z': { sortBy: 'name', direction: 'asc' },
        'Z to A': { sortBy: 'name', direction: 'desc' },
        'Less than 10$': { priceLess: 10, sortBy: 'price_per_hour', direction: 'asc' },
        'Greater than 10$': { priceGreater: 10, sortBy: 'price_per_hour', direction: 'asc' },
        'Popular': { sortBy: 'rating', direction: 'desc' },
        'Not popular': { sortBy: 'rating', direction: 'asc' },
        'Show all': { sortBy: 'name', direction: 'asc', isDefault: true }
    }