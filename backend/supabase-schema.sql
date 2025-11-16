-- ============================================
-- SCHEMA SQL PARA SUPABASE
-- DecidePerú 2026 - Backend Database
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  dni TEXT UNIQUE,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  is_admin BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_dni ON users(dni);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================
-- TABLA: candidates
-- ============================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  cargo TEXT NOT NULL CHECK (cargo IN ('presidente', 'vicepresidente', 'congresista', 'gobernador', 'alcalde')),
  partido TEXT,
  numero TEXT,
  foto TEXT,
  biografia TEXT,
  propuestas JSONB DEFAULT '[]'::jsonb,
  distrito TEXT,
  provincia TEXT,
  departamento TEXT,
  website TEXT,
  redes_sociales JSONB DEFAULT '{}'::jsonb,
  votos_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para candidates
CREATE INDEX IF NOT EXISTS idx_candidates_cargo ON candidates(cargo);
CREATE INDEX IF NOT EXISTS idx_candidates_partido ON candidates(partido);
CREATE INDEX IF NOT EXISTS idx_candidates_departamento ON candidates(departamento);

-- ============================================
-- TABLA: news
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'elecciones', 'candidatos', 'eventos', 'noticias')),
  author TEXT,
  featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para news
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);

-- ============================================
-- TABLA: events
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  type TEXT NOT NULL CHECK (type IN ('debate', 'mitin', 'eleccion', 'registro', 'votacion', 'otro')),
  location TEXT,
  address TEXT,
  image_url TEXT,
  candidates_ids UUID[] DEFAULT ARRAY[]::UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para events
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);

-- ============================================
-- TABLA: saved_candidates
-- ============================================
CREATE TABLE IF NOT EXISTS saved_candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, candidate_id)
);

-- Índices para saved_candidates
CREATE INDEX IF NOT EXISTS idx_saved_candidates_user_id ON saved_candidates(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_candidates_candidate_id ON saved_candidates(candidate_id);

-- ============================================
-- TABLA: notifications
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error', 'reminder')),
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para candidates (público puede leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view candidates"
  ON candidates FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert candidates"
  ON candidates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

CREATE POLICY "Only admins can update candidates"
  ON candidates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

CREATE POLICY "Only admins can delete candidates"
  ON candidates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Políticas para news (público puede leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view news"
  ON news FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage news"
  ON news FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Políticas para events (público puede leer, solo admins pueden escribir)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Políticas para saved_candidates
CREATE POLICY "Users can view their saved candidates"
  ON saved_candidates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save candidates"
  ON saved_candidates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved candidates"
  ON saved_candidates FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para notifications
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- DATOS INICIALES (OPCIONAL)
-- ============================================

-- Insertar usuario admin de ejemplo (ajusta según necesites)
-- NOTA: Esto debe hacerse después de crear el usuario en auth.users
-- INSERT INTO users (id, email, full_name, role, is_admin)
-- VALUES ('<uuid-del-usuario-admin>', 'admin@decideperu2026.com', 'Admin User', 'admin', true);

-- ============================================
-- COMENTARIOS
-- ============================================
COMMENT ON TABLE users IS 'Usuarios del sistema';
COMMENT ON TABLE candidates IS 'Candidatos electorales';
COMMENT ON TABLE news IS 'Noticias y artículos';
COMMENT ON TABLE events IS 'Eventos del calendario electoral';
COMMENT ON TABLE saved_candidates IS 'Candidatos guardados por usuarios';
COMMENT ON TABLE notifications IS 'Notificaciones para usuarios';

