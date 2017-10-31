enum BasicOptions {
    'echo',
    'json',
    'bar'
}
enum ListingType {
    'buy',
    'rent'
}
enum Sort {
    'relevancy',
    'bedroom_lowhigh',
    'bedroom_highlow',
    'price_lowhigh',
    'price_highlow',
    'newest',
    'oldest',
    'random',
    'distance'
}

export interface RequestOptions {
    action: BasicOptions.echo,
    encoding: BasicOptions.json,
    foo: BasicOptions.bar,
    place_name: string,
    listing_type: ListingType,
    price_min: number,
    price_max: number,
    room_min: number,
    room_max: number,
    size_min: number,
    size_max: number,
    number_of_results: number,
    sort: Sort
}
