// my implementation of distance (Haversine) function 

const myHaversineDistance = (lat1: number, lat2: number, lng1: number, lng2: number) => {
    const earthRadius: number = 6371 // km

    const alpha1: number = (lat1 * Math.PI) / 180
    const alpha2: number = (lat2 * Math.PI) / 180

    const beta: number = ((lat2 - lat1) * Math.PI) / 180
    const gamma: number = ((lng2 - lng1) * Math.PI) / 180

    const a: number =
        Math.sin(beta / 2) * Math.sin(beta / 2) +
        Math.cos(alpha1) * Math.cos(alpha2) * Math.sin(gamma / 2) * Math.sin(gamma / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = parseFloat((earthRadius * c).toFixed(2)) //km

    return distance
}

export default myHaversineDistance
