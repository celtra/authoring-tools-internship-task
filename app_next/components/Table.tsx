import { City } from "@/types/City"
import { UserLocation } from "@/types/UserLocation"

interface TableProps {
    randomCities: City[];
    userLocation: UserLocation;
    setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | undefined>>
    distances: number[],
    distancesAI: number[]
}

const Table: React.FC<TableProps> = ({randomCities, userLocation, setUserLocation, distances, distancesAI}) => {

    const onCityPress = (lat:number, lng:number) => {
        setUserLocation({
            lat: lat,
            lng: lng
        })
    }

    return (
        <section className="w-full flex flex-col items-center justify-center">

            <div className="rounded-lg sm:w-11/12 w-full overflow-hidden border border-gray-600 mb-12 shadow-lg h-[600px]">
                <table className="table-auto w-full">
                    <thead className="bg-gray-100 block w-full">
                    <tr className="w-full flex">
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:w-1/2">City name</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Country name</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Country code</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Coords</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:w-1/2">Distance</th>
                        <th className="sm:text-base text-xs text-start py-2 sm:p-2 border-b-1 w-1/6 max-[400px]:hidden">Distance AI</th>
                    </tr>
                    </thead>

                    <tbody className="block overflow-y-scroll h-[550px] w-full">
                    {randomCities.map((city, index) => (
                        <tr key={index} className={`flex w-full ${userLocation?.lat === city.lat && userLocation?.lng === city.lng ? "bg-gray-200 font-bold text-gray-600" : ""}`}>
                            <td 
                                className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:w-1/2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                onClick={() => onCityPress(city.lat, city.lng)}
                            >
                                {city.name} 
                            </td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{city.country_name}</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{city.country}</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">
                                <p>{city.lat}</p>
                                <p>{city.lng}</p>
                            </td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:w-1/2">{distances[index]} km</td>
                            <td className="sm:text-base text-xs py-2 sm:p-2 border-b border-gray-300 w-1/6 max-[400px]:hidden">{distancesAI[index]} km</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Table