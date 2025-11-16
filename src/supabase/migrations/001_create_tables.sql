-- ========================================
-- DECIDEPERU 2026 - DATABASE SCHEMA
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- ENUMS
-- ========================================

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE candidate_status AS ENUM ('active', 'pending', 'rejected');
CREATE TYPE candidate_position AS ENUM ('Presidencial', 'Congreso', 'Parlamento Andino');
CREATE TYPE news_status AS ENUM ('published', 'draft', 'scheduled');
CREATE TYPE event_category AS ENUM ('electoral', 'capacity', 'deadline', 'general');
CREATE TYPE event_status AS ENUM ('upcoming', 'completed', 'cancelled');

-- ========================================
-- TABLA: users
-- ========================================

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'user' NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- TABLA: candidates
-- ========================================

CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    party TEXT NOT NULL,
    short_party TEXT NOT NULL,
    position candidate_position NOT NULL,
    region TEXT NOT NULL,
    photo_url TEXT,
    bio TEXT,
    plan_resumen TEXT,
    proposals TEXT,
    history TEXT,
    social_media JSONB DEFAULT '{}',
    status candidate_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);

CREATE TRIGGER update_candidates_updated_at 
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para búsqueda rápida
CREATE INDEX idx_candidates_status ON public.candidates(status);
CREATE INDEX idx_candidates_position ON public.candidates(position);
CREATE INDEX idx_candidates_region ON public.candidates(region);
CREATE INDEX idx_candidates_created_at ON public.candidates(created_at DESC);

-- ========================================
-- TABLA: news
-- ========================================

CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    author TEXT NOT NULL,
    views INTEGER DEFAULT 0 NOT NULL,
    status news_status DEFAULT 'draft' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);

CREATE TRIGGER update_news_updated_at 
    BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_category ON public.news(category);
CREATE INDEX idx_news_date ON public.news(date DESC);
CREATE INDEX idx_news_views ON public.news(views DESC);

-- ========================================
-- TABLA: events
-- ========================================

CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    category event_category NOT NULL,
    participants INTEGER,
    status event_status DEFAULT 'upcoming' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL
);

CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_category ON public.events(category);

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- ========================================
-- POLÍTICAS DE SEGURIDAD - USERS
-- ========================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

-- Los admins pueden ver todos los usuarios
CREATE POLICY "Admins can view all users"
    ON public.users FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- POLÍTICAS DE SEGURIDAD - CANDIDATES
-- ========================================

-- Todos pueden ver candidatos activos
CREATE POLICY "Anyone can view active candidates"
    ON public.candidates FOR SELECT
    USING (status = 'active');

-- Admins pueden ver todos los candidatos
CREATE POLICY "Admins can view all candidates"
    ON public.candidates FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins pueden insertar candidatos
CREATE POLICY "Admins can insert candidates"
    ON public.candidates FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins pueden actualizar candidatos
CREATE POLICY "Admins can update candidates"
    ON public.candidates FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins pueden eliminar candidatos
CREATE POLICY "Admins can delete candidates"
    ON public.candidates FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- POLÍTICAS DE SEGURIDAD - NEWS
-- ========================================

-- Todos pueden ver noticias publicadas
CREATE POLICY "Anyone can view published news"
    ON public.news FOR SELECT
    USING (status = 'published');

-- Admins pueden ver todas las noticias
CREATE POLICY "Admins can view all news"
    ON public.news FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins pueden gestionar noticias
CREATE POLICY "Admins can manage news"
    ON public.news FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- POLÍTICAS DE SEGURIDAD - EVENTS
-- ========================================

-- Todos pueden ver eventos próximos
CREATE POLICY "Anyone can view upcoming events"
    ON public.events FOR SELECT
    USING (status = 'upcoming');

-- Admins pueden gestionar eventos
CREATE POLICY "Admins can manage events"
    ON public.events FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- FUNCIÓN: Crear perfil automáticamente al registrarse
-- ========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        'user', -- Por defecto todos son usuarios normales
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automático
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- STORAGE BUCKETS
-- ========================================

-- Bucket para fotos de candidatos
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-photos', 'candidate-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imágenes de noticias
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage - Admins pueden subir
CREATE POLICY "Admins can upload candidate photos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'candidate-photos' AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can view candidate photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'candidate-photos');

CREATE POLICY "Admins can delete candidate photos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'candidate-photos' AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- DATOS INICIALES (OPCIONAL)
-- ========================================

-- Crear usuario admin inicial (cambiar email y password)
-- Este usuario debe ser creado manualmente desde Supabase Dashboard
-- luego ejecutar: UPDATE public.users SET role = 'admin' WHERE email = 'admin@decideperu.com';

COMMENT ON TABLE public.users IS 'Usuarios del sistema con roles';
COMMENT ON TABLE public.candidates IS 'Candidatos electorales';
COMMENT ON TABLE public.news IS 'Noticias y artículos';
COMMENT ON TABLE public.events IS 'Eventos y calendario electoral';
