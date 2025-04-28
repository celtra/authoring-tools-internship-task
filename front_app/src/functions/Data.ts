import {
  type City,
  type ApiResponse,
  type Magnet,
} from "../types/ExternalData";

export const fetchCities = async (): Promise<City[]> => {
  try {
    const response = await fetch("http://localhost:3210/api/random");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData: ApiResponse<City> = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchMagnets = async (): Promise<Magnet[]> => {
  try {
    const response = await fetch("https://api.nyanspruk.com");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData: ApiResponse<Magnet> = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
