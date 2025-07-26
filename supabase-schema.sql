-- AIAIAI CommunityOS - Schema SQL
-- Ejecutar este script en el SQL Editor de Supabase

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de organizaciones
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    clerk_org_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de miembros
CREATE TABLE members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    clerk_user_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(organization_id, clerk_user_id)
);

-- Tabla de eventos
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    max_participants INTEGER,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CLP',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method VARCHAR(50),
    external_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_members_organization_id ON members(organization_id);
CREATE INDEX idx_members_clerk_user_id ON members(clerk_user_id);
CREATE INDEX idx_events_organization_id ON events(organization_id);
CREATE INDEX idx_payments_organization_id ON payments(organization_id);
CREATE INDEX idx_payments_member_id ON payments(member_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para organizaciones
CREATE POLICY "Users can view their own organization" ON organizations
    FOR SELECT USING (clerk_org_id = current_setting('app.current_org_id', true));

CREATE POLICY "Admins can update their organization" ON organizations
    FOR UPDATE USING (clerk_org_id = current_setting('app.current_org_id', true));

-- Políticas RLS para miembros
CREATE POLICY "Users can view members in their organization" ON members
    FOR SELECT USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

CREATE POLICY "Admins can manage members in their organization" ON members
    FOR ALL USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

-- Políticas RLS para eventos
CREATE POLICY "Users can view events in their organization" ON events
    FOR SELECT USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

CREATE POLICY "Admins can manage events in their organization" ON events
    FOR ALL USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

-- Políticas RLS para pagos
CREATE POLICY "Users can view payments in their organization" ON payments
    FOR SELECT USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

CREATE POLICY "Admins can manage payments in their organization" ON payments
    FOR ALL USING (organization_id IN (
        SELECT id FROM organizations WHERE clerk_org_id = current_setting('app.current_org_id', true)
    ));

-- Datos de ejemplo para testing
INSERT INTO organizations (name, slug, clerk_org_id) VALUES 
('ASECH - Asociación de Emprendedores', 'asech', 'org_test_asech'),
('AÚNA - Asociación de Startups', 'auna', 'org_test_auna'),
('CPD - Comunidad de Programadores', 'cpd', 'org_test_cpd'); 