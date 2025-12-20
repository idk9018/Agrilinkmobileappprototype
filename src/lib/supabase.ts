import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wiifvcdmifeestitowib.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpaWZ2Y2RtaWZlZXN0aXRvd2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzk4NDMsImV4cCI6MjA4MTIxNTg0M30.G6ld7AMov09uVyk79J45SNWb0b4HnwgDnSqM-PRcUPY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
