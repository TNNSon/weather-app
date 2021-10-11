import axios from "axios";
import { LocationDetail, LocationProps } from "../props/types";

// A mock function to mimic making an async request for data
export async function fetchCityByText(textSearch = "") {
  try {
    const response = await axios.get<LocationProps[]>(
      `http://localhost:3001/search/query=${textSearch}`
    );
    return response.data;
  } catch (error) {
    // throw error to show to UI
    throw error;
  }
}

// A mock function to mimic making an async request for data
export async function fetchWeatherCityById(cityId: number) {
  try {
    const response = await axios.get<LocationDetail>(
      `http://localhost:3001/location/${cityId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
