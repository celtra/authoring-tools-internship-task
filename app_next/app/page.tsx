"use client"

import { useState, useEffect } from "react"
import { City } from "@/types/City"
import { UserLocation } from "@/types/UserLocation"
import countries from "../functions/countries"
import Table from "@/components/Table"
import myHaversineDistance from "@/functions/myHaversineDistance";
import AIHaversineDistance from "@/functions/AIHaversineDistance";

import dynamic from 'next/dynamic';

// remove serverside rendering for MapView
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const Page = () => {

  const [randomCities, setRandomCities] = useState<City[]>([]);
  const [initialUserLocation, setInitialUserLocation] = useState<UserLocation>();
  const [userLocation, setUserLocation] = useState<UserLocation>();
  const [distances, setDistances] = useState<number[]>([]);
  const [distancesAI, setDistancesAI] = useState<number[]>([]);
  
  const success = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
    setInitialUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const error = () => {
    alert("Sorry, no position available.");
  }

  useEffect(() => {
    const distanceArray: number[] = [];
    const distanceAIArray: number[] = [];
    for(const city of randomCities) {
        const lat1 = city.lat;
        const lng1 = city.lng;
        const lat2 = userLocation?.lat;
        const lng2 = userLocation?.lng;
        const myDistance = myHaversineDistance(lat1, lat2!, lng1, lng2!);
        const AIDistance = AIHaversineDistance(lat1, lng1, lat2!, lng2!);
        
        distanceArray.push(myDistance);
        distanceAIArray.push(AIDistance);
    }

    setDistances(distanceArray);
    setDistancesAI(distanceAIArray);


}, [userLocation, randomCities])


  useEffect(() => {

    const getData = async (randomCountries:string[]) => {
      try {
        const randomCitiesArray = [];

        // Replace with Promise.all!!!
        for (const country of randomCountries) {
          const response = await fetch(`http://localhost:3002/cities?country=${country}`)
          const cities = await response.json(); 
          
          const randomIndex: number = Math.floor(Math.random() * cities?.length);
          const parsedCity: City = {
            id: cities[randomIndex]?.id,
            country: cities[randomIndex]?.country,
            country_name: cities[randomIndex]?.country_name,
            name: cities[randomIndex]?.name,
            altnames: cities[randomIndex]?.altnames,
            lat: parseFloat(cities[randomIndex]?.lat),
            lng: parseFloat(cities[randomIndex]?.lng),
          }
          randomCitiesArray.push(parsedCity);
        }

        setRandomCities(randomCitiesArray);
      } catch (error) {
        console.error(error);
      }
    }

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);

      const numberOfCountries: number = countries.length;
      const randomCountries: string[] = [];
  
      for(let i=0; i<25; i++) {
        const randomIndex = Math.floor(Math.random() * numberOfCountries);
        const randomCountry = countries[randomIndex];
        randomCountries.push(randomCountry)
      }
  
      getData(randomCountries)
    }

  }, [])

  const handleResetToInitialLocation = () => {
    setUserLocation(initialUserLocation);
  }

  return (
    <main className="w-full flex flex-col items-center">
      {
        randomCities.length === 25 && userLocation &&
        <>
          <div className="my-8 flex flex-col items-center">
              <h3 className="font-bold">Your coordinates:</h3>
              <p className="mt-2">lat: {userLocation?.lat}</p>
              <p>lng: {userLocation?.lng}</p>
              <button onClick={handleResetToInitialLocation} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-300">Reset to initial user location</button>
          </div>
          <Table
            randomCities={randomCities}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            distances={distances}
            distancesAI={distancesAI}
          />
          <Map
            randomCities={randomCities}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            distances={distances}
          />
        </>
      }
    </main>
  )
}

export default Page