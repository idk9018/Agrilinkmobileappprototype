export interface WeatherData {
    current: {
        temp: number;
        condition: string;
        humidity: number;
        windSpeed: number;
    };
    forecast: {
        day: string;
        tempMax: number;
        tempMin: number;
        condition: string;
    }[];
}

const WMO_CODES: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        return {
            current: {
                temp: Math.round(data.current.temperature_2m),
                condition: WMO_CODES[data.current.weather_code] || 'Unknown',
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
            },
            forecast: data.daily.time.map((time: string, index: number) => ({
                day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
                tempMax: Math.round(data.daily.temperature_2m_max[index]),
                tempMin: Math.round(data.daily.temperature_2m_min[index]),
                condition: WMO_CODES[data.daily.weather_code[index]] || 'Unknown',
            })).slice(0, 5), // Next 5 days
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}

export async function fetchLocationName(lat: number, lon: number): Promise<string> {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`
        );

        if (!response.ok) return `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;

        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const location = data.results[0];
            return `${location.name}, ${location.country_code.toUpperCase()}`;
        }

        return `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
    } catch (error) {
        console.error('Error fetching location name:', error);
        return `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
    }
}

export const DEFAULT_LOCATION = {
    lat: 6.5244, // Lagos
    lon: 3.3792,
    name: 'Lagos, NG'
};

export async function fetchLocationByIP(): Promise<{ lat: number; lon: number; name: string }> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('IP Geolocation failed');

        const data = await response.json();
        return {
            lat: data.latitude,
            lon: data.longitude,
            name: `${data.city}, ${data.country_code}`
        };
    } catch (error) {
        console.warn('IP Geolocation failed, using default:', error);
        return DEFAULT_LOCATION;
    }
}
