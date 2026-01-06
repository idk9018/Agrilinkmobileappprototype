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
        let mounted = true;

        const loadWeatherData = async (lat: number, lon: number, name?: string) => {
            try {
                const [weatherData, fetchedName] = await Promise.all([
                    fetchWeather(lat, lon),
                    name ? Promise.resolve(name) : fetchLocationName(lat, lon)
                ]);

                if (mounted) {
                    setWeather(weatherData);
                    setLocationName(fetchedName);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError('Failed to fetch weather data');
                    setLoading(false);
                }
            }
        };

        const handleLocationSuccess = (position: GeolocationPosition) => {
            loadWeatherData(position.coords.latitude, position.coords.longitude);
        };

        const handleLocationError = async () => {
            console.log('Geolocation failed, falling back to IP location...');
            try {
                // Determine module to import dynamically or just use the service we wrote
                const { fetchLocationByIP } = await import('../services/weather');
                const fallback = await fetchLocationByIP();
                if (mounted) {
                    loadWeatherData(fallback.lat, fallback.lon, fallback.name);
                }
            } catch (e) {
                if (mounted) {
                    setError('Unable to retrieve location');
                    setLoading(false);
                }
            }
        };

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError,
                { timeout: 7000 } // Add timeout to trigger fallback faster
            );
        } else {
            handleLocationError();
        }

        return () => {
            mounted = false;
        };
    }, []);

    return { weather, loading, error, locationName };
}
