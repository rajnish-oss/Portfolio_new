import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xakftqrzqzjortwzfqtx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_RVEOJAQHhV6qJJJoeIDuIw_hvQzulCK";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
