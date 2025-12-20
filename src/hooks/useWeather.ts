import { useState, useEffect } from 'react';
import { fetchWeather, fetchLocationName, WeatherData } from '../services/weather';

interface UseWeatherResult {
    weather: WeatherData | null;
    loading: boolean;
    error: string | null;
    locationName: string;
}

export function useWeather(): UseWeatherResult {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [locationName, setLocationName] = useState('Locating...');

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Fetch weather data and location name in parallel
                    const [weatherData, location] = await Promise.all([
                        fetchWeather(latitude, longitude),
                        fetchLocationName(latitude, longitude)
                    ]);

                    setWeather(weatherData);
                    setLocationName(location);

                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch weather data');
                    setLoading(false);
                }
            },
            (err) => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    }, []);

    return { weather, loading, error, locationName };
}
