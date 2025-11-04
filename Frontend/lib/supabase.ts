import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const supabaseUrl = "https://nslovcpniaogjsxxzycu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zbG92Y3BuaWFvZ2pzeHh6eWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjA4MjMsImV4cCI6MjA0NTIzNjgyM30.Bwf4kOhyFOWb6D_fTSpQ7M_-WuvsDHor9umrMsI5ivU"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
