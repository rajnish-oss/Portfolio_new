import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xakftqrzqzjortwzfqtx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhha2Z0cXJ6cXpqb3J0d3pmcXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDQzNTMsImV4cCI6MjA2Njc4MDM1M30.tO-ZyfjORhYl3xoNIa_C2F3fEXEjhSgNqRMQc-V_CXI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
