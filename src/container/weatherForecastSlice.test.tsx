import { store } from "../store/store";
import { CurrentWeather } from "../props/types";
import weatherReducer, {
  WeatherState,
  Toast,
  fetchCityAsync,
  fetchWeatherCityAsync,
} from "./weatherForecastSlice";
import axios from "axios";
jest.mock("axios");
describe("weather reducer", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should handle initial state", () => {
    expect(weatherReducer(undefined, { type: "unknown" })).toEqual({
      cities: [],
      status: "idle",
      weatherDayList: [],
      currentWeather: {} as CurrentWeather,
      error: {} as Toast,
    });
  });
  it("fetchCityAsync - should return data if status code equals 200", async () => {
    const dispatch = jest.fn();
    const result = {
      status: 200,
      data: [
        {
          title: "San Francisco",
          location_type: "City",
          woeid: 2487956,
          latt_long: "37.777119, -122.41964",
        },
        {
          title: "San Diego",
          location_type: "City",
          woeid: 2487889,
          latt_long: "32.715691,-117.161720",
        },
        {
          title: "San Jose",
          location_type: "City",
          woeid: 2488042,
          latt_long: "37.338581,-121.885567",
        },
      ],
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      result
    );
    let state = store.getState().weatherForecast;

    await store.dispatch(fetchCityAsync("San"));
    expect(axios.get).toBeCalledWith("http://localhost:8080/search/query=San");
    expect(axios.get).toHaveBeenCalledTimes(1);
    state = store.getState().weatherForecast;
    expect(state.cities).toEqual([
      {
        text: "San Francisco",
        id: 2487956,
      },
      {
        text: "San Diego",
        id: 2487889,
      },
      {
        text: "San Jose",
        id: 2488042,
      },
    ]);
  });

  it("fetchCityAsync - should set error state with type = fetchCityAsync if status code equals 400", async () => {
    const result = {
      status: 400,
      data: {},
      error: "throw new error",
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      result
    );
    let state = store.getState().weatherForecast;
    await store.dispatch(fetchCityAsync("San"));
    expect(axios.get).toBeCalledWith("http://localhost:8080/search/query=San");
    expect(axios.get).toHaveBeenCalledTimes(1);
    state = store.getState().weatherForecast;
    expect(state.error).toEqual({
      message: "Can't get information of cities",
      type: "error",
      id: "0-0-0-0-0-0-0-0-0-0",
    });
  });
  it("fetchWeatherCityAsync - should return data if status code equals 200", async () => {
    const dispatch = jest.fn();
    const result = {
      status: 200,
      data: {
        consolidated_weather: [
          {
            id: 5772758689513472,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.744346Z",
            applicable_date: "2021-10-10",
            min_temp: 9.48,
            max_temp: 18.245,
            the_temp: 17.585,
            wind_speed: 4.237372847474748,
            wind_direction: 337.5,
            air_pressure: 1029.0,
            humidity: 76,
            visibility: 7.234624791219279,
            predictability: 71,
          },
          {
            id: 6333209240403968,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.726738Z",
            applicable_date: "2021-10-11",
            min_temp: 8.705,
            max_temp: 15.280000000000001,
            the_temp: 14.615,
            wind_speed: 5.231475879914632,
            wind_direction: 335.4999238267924,
            air_pressure: 1030.0,
            humidity: 65,
            visibility: 12.027882168138074,
            predictability: 71,
          },
          {
            id: 6003681565605888,
            weather_state_name: "Showers",
            weather_state_abbr: "s",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:00.975630Z",
            applicable_date: "2021-10-12",
            min_temp: 9.23,
            max_temp: 14.809999999999999,
            the_temp: 15.055,
            wind_speed: 5.431529242607174,
            wind_direction: 336.833541216718,
            air_pressure: 1026.5,
            humidity: 71,
            visibility: 13.307906824146981,
            predictability: 73,
          },
          {
            id: 5036846804369408,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.954429Z",
            applicable_date: "2021-10-13",
            min_temp: 6.545,
            max_temp: 14.27,
            the_temp: 13.855,
            wind_speed: 3.8906443670988096,
            wind_direction: 336.2597228133059,
            air_pressure: 1029.0,
            humidity: 69,
            visibility: 14.248352123598186,
            predictability: 71,
          },
          {
            id: 4925834356850688,
            weather_state_name: "Light Cloud",
            weather_state_abbr: "lc",
            wind_direction_compass: "W",
            created: "2021-10-10T06:59:02.053874Z",
            applicable_date: "2021-10-14",
            min_temp: 7.775,
            max_temp: 16.52,
            the_temp: 15.15,
            wind_speed: 5.188478246088178,
            wind_direction: 264.66717930710007,
            air_pressure: 1029.5,
            humidity: 72,
            visibility: 13.964074803149606,
            predictability: 70,
          },
          {
            id: 4698047301812224,
            weather_state_name: "Light Rain",
            weather_state_abbr: "lr",
            wind_direction_compass: "WNW",
            created: "2021-10-10T06:59:04.226579Z",
            applicable_date: "2021-10-15",
            min_temp: 9.255,
            max_temp: 15.545,
            the_temp: 14.88,
            wind_speed: 4.658909766960948,
            wind_direction: 287.0,
            air_pressure: 1024.0,
            humidity: 80,
            visibility: 9.999726596675416,
            predictability: 75,
          },
        ],
        time: "2021-10-10T08:41:25.865112+01:00",
        sun_rise: "2021-10-10T07:16:15.642373+01:00",
        sun_set: "2021-10-10T18:17:44.241747+01:00",
        timezone_name: "LMT",
        parent: {
          title: "England",
          location_type: "Region / State / Province",
          woeid: 24554868,
          latt_long: "52.883560,-1.974060",
        },
        sources: [
          {
            title: "BBC",
            slug: "bbc",
            url: "http://www.bbc.co.uk/weather/",
            crawl_rate: 360,
          },
          {
            title: "Forecast.io",
            slug: "forecast-io",
            url: "http://forecast.io/",
            crawl_rate: 480,
          },
          {
            title: "HAMweather",
            slug: "hamweather",
            url: "http://www.hamweather.com/",
            crawl_rate: 360,
          },
          {
            title: "Met Office",
            slug: "met-office",
            url: "http://www.metoffice.gov.uk/",
            crawl_rate: 180,
          },
          {
            title: "OpenWeatherMap",
            slug: "openweathermap",
            url: "http://openweathermap.org/",
            crawl_rate: 360,
          },
          {
            title: "Weather Underground",
            slug: "wunderground",
            url: "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
            crawl_rate: 720,
          },
          {
            title: "World Weather Online",
            slug: "world-weather-online",
            url: "http://www.worldweatheronline.com/",
            crawl_rate: 360,
          },
        ],
        title: "London",
        location_type: "City",
        woeid: 44418,
        latt_long: "51.506321,-0.12714",
        timezone: "Europe/London",
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      result
    );
    let state = store.getState().weatherForecast;

    await store.dispatch(fetchWeatherCityAsync(2487956));
    expect(axios.get).toBeCalledWith("http://localhost:8080/location/2487956");
    state = store.getState().weatherForecast;
    expect(state.weatherDayList).toEqual([
      {
        air_pressure: 1029,
        applicable_date: "2021-10-10",
        created: "2021-10-10T06:59:01.744346Z",
        humidity: 76,
        id: 5772758689513472,
        max_temp: 18.245,
        min_temp: 9.48,
        predictability: 71,
        the_temp: 17.585,
        visibility: 7.234624791219279,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 337.5,
        wind_direction_compass: "NNW",
        wind_speed: 4.237372847474748,
      },
      {
        air_pressure: 1030,
        applicable_date: "2021-10-11",
        created: "2021-10-10T06:59:01.726738Z",
        humidity: 65,
        id: 6333209240403968,
        max_temp: 15.280000000000001,
        min_temp: 8.705,
        predictability: 71,
        the_temp: 14.615,
        visibility: 12.027882168138074,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 335.4999238267924,
        wind_direction_compass: "NNW",
        wind_speed: 5.231475879914632,
      },
      {
        air_pressure: 1026.5,
        applicable_date: "2021-10-12",
        created: "2021-10-10T06:59:00.975630Z",
        humidity: 71,
        id: 6003681565605888,
        max_temp: 14.809999999999999,
        min_temp: 9.23,
        predictability: 73,
        the_temp: 15.055,
        visibility: 13.307906824146981,
        weather_state_abbr: "s",
        weather_state_name: "Showers",
        wind_direction: 336.833541216718,
        wind_direction_compass: "NNW",
        wind_speed: 5.431529242607174,
      },
      {
        air_pressure: 1029,
        applicable_date: "2021-10-13",
        created: "2021-10-10T06:59:01.954429Z",
        humidity: 69,
        id: 5036846804369408,
        max_temp: 14.27,
        min_temp: 6.545,
        predictability: 71,
        the_temp: 13.855,
        visibility: 14.248352123598186,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 336.2597228133059,
        wind_direction_compass: "NNW",
        wind_speed: 3.8906443670988096,
      },
      {
        air_pressure: 1029.5,
        applicable_date: "2021-10-14",
        created: "2021-10-10T06:59:02.053874Z",
        humidity: 72,
        id: 4925834356850688,
        max_temp: 16.52,
        min_temp: 7.775,
        predictability: 70,
        the_temp: 15.15,
        visibility: 13.964074803149606,
        weather_state_abbr: "lc",
        weather_state_name: "Light Cloud",
        wind_direction: 264.66717930710007,
        wind_direction_compass: "W",
        wind_speed: 5.188478246088178,
      },
      {
        air_pressure: 1024,
        applicable_date: "2021-10-15",
        created: "2021-10-10T06:59:04.226579Z",
        humidity: 80,
        id: 4698047301812224,
        max_temp: 15.545,
        min_temp: 9.255,
        predictability: 75,
        the_temp: 14.88,
        visibility: 9.999726596675416,
        weather_state_abbr: "lr",
        weather_state_name: "Light Rain",
        wind_direction: 287,
        wind_direction_compass: "WNW",
        wind_speed: 4.658909766960948,
      },
    ]);
    expect(state.currentWeather).toEqual({
      data: {
        air_pressure: 1029,
        applicable_date: "2021-10-10",
        created: "2021-10-10T06:59:01.744346Z",
        humidity: 76,
        id: 5772758689513472,
        max_temp: 18.245,
        min_temp: 9.48,
        predictability: 71,
        the_temp: 17.585,
        visibility: 7.234624791219279,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 337.5,
        wind_direction_compass: "NNW",
        wind_speed: 4.237372847474748,
      },
      location_type: "City",
      sun_rise: "2021-10-10T07:16:15.642373+01:00",
      sun_set: "2021-10-10T18:17:44.241747+01:00",
      time: "2021-10-10T08:41:25.865112+01:00",
      title: "London",
    });
  });
  it("fetchWeatherCityAsync - should return data if status code equals 200 and just get 7 item when weather day length > 7 ", async () => {
    const result = {
      status: 200,
      data: {
        consolidated_weather: [
          {
            id: 5772758689513472,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.744346Z",
            applicable_date: "2021-10-10",
            min_temp: 9.48,
            max_temp: 18.245,
            the_temp: 17.585,
            wind_speed: 4.237372847474748,
            wind_direction: 337.5,
            air_pressure: 1029.0,
            humidity: 76,
            visibility: 7.234624791219279,
            predictability: 71,
          },
          {
            id: 6333209240403968,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.726738Z",
            applicable_date: "2021-10-11",
            min_temp: 8.705,
            max_temp: 15.280000000000001,
            the_temp: 14.615,
            wind_speed: 5.231475879914632,
            wind_direction: 335.4999238267924,
            air_pressure: 1030.0,
            humidity: 65,
            visibility: 12.027882168138074,
            predictability: 71,
          },
          {
            id: 6003681565605888,
            weather_state_name: "Showers",
            weather_state_abbr: "s",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:00.975630Z",
            applicable_date: "2021-10-12",
            min_temp: 9.23,
            max_temp: 14.809999999999999,
            the_temp: 15.055,
            wind_speed: 5.431529242607174,
            wind_direction: 336.833541216718,
            air_pressure: 1026.5,
            humidity: 71,
            visibility: 13.307906824146981,
            predictability: 73,
          },
          {
            id: 5036846804369408,
            weather_state_name: "Heavy Cloud",
            weather_state_abbr: "hc",
            wind_direction_compass: "NNW",
            created: "2021-10-10T06:59:01.954429Z",
            applicable_date: "2021-10-13",
            min_temp: 6.545,
            max_temp: 14.27,
            the_temp: 13.855,
            wind_speed: 3.8906443670988096,
            wind_direction: 336.2597228133059,
            air_pressure: 1029.0,
            humidity: 69,
            visibility: 14.248352123598186,
            predictability: 71,
          },
          {
            id: 4925834356850688,
            weather_state_name: "Light Cloud",
            weather_state_abbr: "lc",
            wind_direction_compass: "W",
            created: "2021-10-10T06:59:02.053874Z",
            applicable_date: "2021-10-14",
            min_temp: 7.775,
            max_temp: 16.52,
            the_temp: 15.15,
            wind_speed: 5.188478246088178,
            wind_direction: 264.66717930710007,
            air_pressure: 1029.5,
            humidity: 72,
            visibility: 13.964074803149606,
            predictability: 70,
          },
          {
            id: 4698047301812224,
            weather_state_name: "Light Rain",
            weather_state_abbr: "lr",
            wind_direction_compass: "WNW",
            created: "2021-10-10T06:59:04.226579Z",
            applicable_date: "2021-10-15",
            min_temp: 9.255,
            max_temp: 15.545,
            the_temp: 14.88,
            wind_speed: 4.658909766960948,
            wind_direction: 287.0,
            air_pressure: 1024.0,
            humidity: 80,
            visibility: 9.999726596675416,
            predictability: 75,
          },
          {
            id: 4698047301812224,
            weather_state_name: "Light Rain",
            weather_state_abbr: "lr",
            wind_direction_compass: "WNW",
            created: "2021-10-10T06:59:04.226579Z",
            applicable_date: "2021-10-16",
            min_temp: 9.255,
            max_temp: 15.545,
            the_temp: 14.88,
            wind_speed: 4.658909766960948,
            wind_direction: 287.0,
            air_pressure: 1024.0,
            humidity: 80,
            visibility: 9.999726596675416,
            predictability: 75,
          },
          {
            id: 4698047301812224,
            weather_state_name: "Light Rain",
            weather_state_abbr: "lr",
            wind_direction_compass: "WNW",
            created: "2021-10-10T06:59:04.226579Z",
            applicable_date: "2021-10-17",
            min_temp: 9.255,
            max_temp: 15.545,
            the_temp: 14.88,
            wind_speed: 4.658909766960948,
            wind_direction: 287.0,
            air_pressure: 1024.0,
            humidity: 80,
            visibility: 9.999726596675416,
            predictability: 75,
          },
        ],
        time: "2021-10-10T08:41:25.865112+01:00",
        sun_rise: "2021-10-10T07:16:15.642373+01:00",
        sun_set: "2021-10-10T18:17:44.241747+01:00",
        timezone_name: "LMT",
        parent: {
          title: "England",
          location_type: "Region / State / Province",
          woeid: 24554868,
          latt_long: "52.883560,-1.974060",
        },
        sources: [
          {
            title: "BBC",
            slug: "bbc",
            url: "http://www.bbc.co.uk/weather/",
            crawl_rate: 360,
          },
          {
            title: "Forecast.io",
            slug: "forecast-io",
            url: "http://forecast.io/",
            crawl_rate: 480,
          },
          {
            title: "HAMweather",
            slug: "hamweather",
            url: "http://www.hamweather.com/",
            crawl_rate: 360,
          },
          {
            title: "Met Office",
            slug: "met-office",
            url: "http://www.metoffice.gov.uk/",
            crawl_rate: 180,
          },
          {
            title: "OpenWeatherMap",
            slug: "openweathermap",
            url: "http://openweathermap.org/",
            crawl_rate: 360,
          },
          {
            title: "Weather Underground",
            slug: "wunderground",
            url: "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
            crawl_rate: 720,
          },
          {
            title: "World Weather Online",
            slug: "world-weather-online",
            url: "http://www.worldweatheronline.com/",
            crawl_rate: 360,
          },
        ],
        title: "London",
        location_type: "City",
        woeid: 44418,
        latt_long: "51.506321,-0.12714",
        timezone: "Europe/London",
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      result
    );
    let state = store.getState().weatherForecast;

    await store.dispatch(fetchWeatherCityAsync(2487956));
    expect(axios.get).toBeCalledWith("http://localhost:8080/location/2487956");
    state = store.getState().weatherForecast;
    expect(state.weatherDayList).toEqual([
      {
        air_pressure: 1029,
        applicable_date: "2021-10-10",
        created: "2021-10-10T06:59:01.744346Z",
        humidity: 76,
        id: 5772758689513472,
        max_temp: 18.245,
        min_temp: 9.48,
        predictability: 71,
        the_temp: 17.585,
        visibility: 7.234624791219279,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 337.5,
        wind_direction_compass: "NNW",
        wind_speed: 4.237372847474748,
      },
      {
        air_pressure: 1030,
        applicable_date: "2021-10-11",
        created: "2021-10-10T06:59:01.726738Z",
        humidity: 65,
        id: 6333209240403968,
        max_temp: 15.280000000000001,
        min_temp: 8.705,
        predictability: 71,
        the_temp: 14.615,
        visibility: 12.027882168138074,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 335.4999238267924,
        wind_direction_compass: "NNW",
        wind_speed: 5.231475879914632,
      },
      {
        air_pressure: 1026.5,
        applicable_date: "2021-10-12",
        created: "2021-10-10T06:59:00.975630Z",
        humidity: 71,
        id: 6003681565605888,
        max_temp: 14.809999999999999,
        min_temp: 9.23,
        predictability: 73,
        the_temp: 15.055,
        visibility: 13.307906824146981,
        weather_state_abbr: "s",
        weather_state_name: "Showers",
        wind_direction: 336.833541216718,
        wind_direction_compass: "NNW",
        wind_speed: 5.431529242607174,
      },
      {
        air_pressure: 1029,
        applicable_date: "2021-10-13",
        created: "2021-10-10T06:59:01.954429Z",
        humidity: 69,
        id: 5036846804369408,
        max_temp: 14.27,
        min_temp: 6.545,
        predictability: 71,
        the_temp: 13.855,
        visibility: 14.248352123598186,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 336.2597228133059,
        wind_direction_compass: "NNW",
        wind_speed: 3.8906443670988096,
      },
      {
        air_pressure: 1029.5,
        applicable_date: "2021-10-14",
        created: "2021-10-10T06:59:02.053874Z",
        humidity: 72,
        id: 4925834356850688,
        max_temp: 16.52,
        min_temp: 7.775,
        predictability: 70,
        the_temp: 15.15,
        visibility: 13.964074803149606,
        weather_state_abbr: "lc",
        weather_state_name: "Light Cloud",
        wind_direction: 264.66717930710007,
        wind_direction_compass: "W",
        wind_speed: 5.188478246088178,
      },
      {
        air_pressure: 1024,
        applicable_date: "2021-10-15",
        created: "2021-10-10T06:59:04.226579Z",
        humidity: 80,
        id: 4698047301812224,
        max_temp: 15.545,
        min_temp: 9.255,
        predictability: 75,
        the_temp: 14.88,
        visibility: 9.999726596675416,
        weather_state_abbr: "lr",
        weather_state_name: "Light Rain",
        wind_direction: 287,
        wind_direction_compass: "WNW",
        wind_speed: 4.658909766960948,
      },
      {
        air_pressure: 1024,
        applicable_date: "2021-10-16",
        created: "2021-10-10T06:59:04.226579Z",
        humidity: 80,
        id: 4698047301812224,
        max_temp: 15.545,
        min_temp: 9.255,
        predictability: 75,
        the_temp: 14.88,
        visibility: 9.999726596675416,
        weather_state_abbr: "lr",
        weather_state_name: "Light Rain",
        wind_direction: 287,
        wind_direction_compass: "WNW",
        wind_speed: 4.658909766960948,
      },
    ]);
    expect(state.currentWeather).toEqual({
      data: {
        air_pressure: 1029,
        applicable_date: "2021-10-10",
        created: "2021-10-10T06:59:01.744346Z",
        humidity: 76,
        id: 5772758689513472,
        max_temp: 18.245,
        min_temp: 9.48,
        predictability: 71,
        the_temp: 17.585,
        visibility: 7.234624791219279,
        weather_state_abbr: "hc",
        weather_state_name: "Heavy Cloud",
        wind_direction: 337.5,
        wind_direction_compass: "NNW",
        wind_speed: 4.237372847474748,
      },
      location_type: "City",
      sun_rise: "2021-10-10T07:16:15.642373+01:00",
      sun_set: "2021-10-10T18:17:44.241747+01:00",
      time: "2021-10-10T08:41:25.865112+01:00",
      title: "London",
    });
  });
  it("fetchWeatherCityAsync - should set error state with type = fetchCityAsync if status code equals 400", async () => {
    let state = store.getState().weatherForecast;

    const result = {
      status: 400,
      data: {},
      error: "throw new error",
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      result
    );

    await store.dispatch(fetchWeatherCityAsync(2487956));
    expect(axios.get).toBeCalledWith("http://localhost:8080/location/2487956");
    state = store.getState().weatherForecast;
    expect(state.error).toEqual({
      message: "Can't get information of city weather",
      type: "error",
      id: "0-0-0-0-0-0-0-0-0-0",
    });
  });
});
