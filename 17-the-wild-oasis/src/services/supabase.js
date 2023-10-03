import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rquplcrnxhowjzrfzokq.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdXBsY3JueGhvd2p6cmZ6b2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyNDEyNTEsImV4cCI6MjAxMDgxNzI1MX0.Ft5Ko_WweBG0WlqoUKuMyFl9lUPxJcGazywSd7swLwY';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
