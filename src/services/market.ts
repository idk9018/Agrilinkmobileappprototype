import { supabase } from '../lib/supabase';

export interface MarketPrice {
    id: string;
    name: string;
    price: number;
    unit: string;
    change_percentage: number;
    best_time: string;
}

const MOCK_MARKET_DATA: MarketPrice[] = [
    {
        id: '1',
        name: 'Maize',
        price: 750000,
        unit: 'per ton',
        change_percentage: 12,
        best_time: 'November - January'
    },
    {
        id: '2',
        name: 'Rice (Paddy)',
        price: 1200000,
        unit: 'per ton',
        change_percentage: 15,
        best_time: 'September - November'
    },
    {
        id: '3',
        name: 'Cassava',
        price: 160000,
        unit: 'per ton',
        change_percentage: 8,
        best_time: 'December - February'
    },
    {
        id: '4',
        name: 'Yam',
        price: 550000,
        unit: 'per ton',
        change_percentage: 25,
        best_time: 'August - October'
    },
    {
        id: '5',
        name: 'Tomatoes',
        price: 15000,
        unit: 'per basket',
        change_percentage: -40,
        best_time: 'March - May'
    },
    {
        id: '6',
        name: 'Pepper',
        price: 12000,
        unit: 'per basket',
        change_percentage: 10,
        best_time: 'Year-round (Peak: Dec-Feb)'
    }
];

export async function fetchMarketPrices(): Promise<MarketPrice[]> {
    try {
        const { data, error } = await supabase
            .from('market_prices')
            .select('*')
            .order('name');

        if (error) {
            console.warn('Supabase error, falling back to mock data:', error);
            return MOCK_MARKET_DATA;
        }

        if (!data || data.length === 0) {
            return MOCK_MARKET_DATA;
        }

        return data;
    } catch (err) {
        console.warn('Network error, falling back to mock data:', err);
        return MOCK_MARKET_DATA;
    }
}
