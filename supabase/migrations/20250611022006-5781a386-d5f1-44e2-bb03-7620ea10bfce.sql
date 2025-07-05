
-- Drop the orders and order_items tables and their policies since we're not using database anymore
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
