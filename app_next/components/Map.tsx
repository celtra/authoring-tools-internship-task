import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { City } from '@/types/City';
import { UserLocation } from '@/types/UserLocation';

const marker = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [20, 24],
    iconAnchor: [10,24],
    popupAnchor: [0, -32],
});

const yourLocationMarker = new L.Icon({
    iconUrl: '/yourLocationMarker.png',
    iconSize: [20, 24],
    iconAnchor: [10,24],
    popupAnchor: [0, -32],
});

interface MapProps {
    randomCities: City[];
    userLocation: UserLocation | undefined;
    setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | undefined>>;
    distances: number[];
}

const Map: React.FC<MapProps> = ({randomCities, userLocation, setUserLocation, distances}) => {

    const handlePress = (lat:number, lng:number) => {
        setUserLocation({
            lat: lat,
            lng: lng
        })
    }

    return (
        <section className='w-full flex flex-col items-center mb-12 rounded-lg overflow-hidden'>
            <div className='w-full sm:w-11/12 rounded-xl overflow-hidden'>
                <MapContainer center={[46.049909, 14.468954]} zoom={4} scrollWheelZoom={false} style={{width: "100%", height: 600}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        randomCities.map((city, index) => (
                            <Marker key={index} position={[city.lat, city.lng]} icon={marker}>
                                <Popup>
                                    <p className='font-bold'>{city.name}</p>
                                    <p>Distance {distances[index]} km</p>
                                    <button onClick={() => handlePress(city.lat, city.lng)} className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-300">Select this location</button>
                                </Popup>
                            </Marker>
                        ))
                    }
                    {userLocation && 
                        <Marker position={[userLocation.lat, userLocation.lng]} icon={yourLocationMarker}>
                            <Popup>
                                <p className='font-bold'>Your location</p>
                                <p>lat: {userLocation.lat}</p>
                                <p>lng: {userLocation.lng}</p>
                            </Popup>
                        </Marker>
                    }
                </MapContainer>
            </div>
        </section>
    )
}

export default Map