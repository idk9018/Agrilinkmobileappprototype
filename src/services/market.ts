import { supabase } from '../lib/supabase';

export interface MarketPrice {
    id: string;
    name: string;
    price: number;
    unit: string;
    change_percentage: number;
    best_time: string;
}

export async function fetchMarketPrices(): Promise<MarketPrice[]> {
    const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching market prices:', error);
        throw error;
    }

    return data || [];
}
