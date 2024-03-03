import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://huziymqgoldytltoxlqk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1eml5bXFnb2xkeXRsdG94bHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MzE5OTAsImV4cCI6MjAyNTAwNzk5MH0.ompebaYl8va5dIJqxpk9HGS37WvE8xqC4cSlrTjwK9M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
