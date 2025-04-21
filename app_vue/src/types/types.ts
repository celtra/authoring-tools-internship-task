export interface UserLocation {
    lat: number | undefined
    lng: number | undefined
}

export interface City {
    id: string
    country: string
    country_name: string
    name: string
    lat: number
    lng: number
    weather: number
}
