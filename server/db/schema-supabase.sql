-- ============================================
-- SCHEMA pour Supabase (PostgreSQL)
-- Digitall Global — Migration depuis MySQL
-- ============================================

-- 1. TABLE users (clients)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    stripe_customer_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending')),
    must_change_password BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLE plans (offres)
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    stripe_price_id VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_lifetime BOOLEAN DEFAULT FALSE
);

-- 3. TABLE subscriptions (abonnements)
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT NOT NULL REFERENCES plans(id),
    stripe_subscription_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLE client_sites (sites des clients)
CREATE TABLE IF NOT EXISTS client_sites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subdomain VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'creating', 'ready', 'error')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- DONNÉES INITIALES : les 3 plans
-- (Remplacez les price_id par vos IDs Stripe LIVE)
-- ============================================
INSERT INTO plans (name, stripe_price_id, price, is_lifetime) VALUES
('Offre Started',  'price_LIVE_ACCESS_ID_ICI',    149.00, false),
('Offre Pro',      'price_LIVE_PREMIUM_ID_ICI',   1599.00, true),
('Offre Prenium',  'price_LIVE_PLATINIUM_ID_ICI', 2099.00, true)
ON CONFLICT DO NOTHING;
