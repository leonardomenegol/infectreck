-- Criar tabela hospitais
CREATE TABLE IF NOT EXISTS hospitais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL
);

-- Criar tabela unidades
CREATE TABLE IF NOT EXISTS unidades (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  hospital_id INT NOT NULL,
  FOREIGN KEY (hospital_id) REFERENCES hospitais(id)
);

-- Criar tabela setores
CREATE TABLE IF NOT EXISTS setores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  unidade_id INT NOT NULL,
  FOREIGN KEY (unidade_id) REFERENCES unidades(id)
);

-- Criar tabela leitos
CREATE TABLE IF NOT EXISTS leitos (
  id SERIAL PRIMARY KEY,
  setor_id INT NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  paciente_nome VARCHAR(255),
  idade INT,
  sexo VARCHAR(10),
  FOREIGN KEY (setor_id) REFERENCES setores(id)
);

-- Criar tabela coletas
CREATE TABLE IF NOT EXISTS coletas (
  id SERIAL PRIMARY KEY,
  leito_id INT NOT NULL,
  data DATE NOT NULL,
  bacteria VARCHAR(255) NOT NULL,
  resistencia VARCHAR(50) NOT NULL,
  sitio_coleta VARCHAR(255) NOT NULL,
  FOREIGN KEY (leito_id) REFERENCES leitos(id)
);

-- Criar tabela alertas
CREATE TABLE IF NOT EXISTS alertas (
  id SERIAL PRIMARY KEY,
  setor_id INT NOT NULL,
  bacteria VARCHAR(255) NOT NULL,
  nivel VARCHAR(50) NOT NULL,
  data DATE NOT NULL,
  tipo_alerta VARCHAR(100) NOT NULL
);

-- Criar tabela surtos
CREATE TABLE IF NOT EXISTS surtos (
  id SERIAL PRIMARY KEY,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  intensidade INT NOT NULL
);

-- Alterar tabela alertas para adicionar colunas lat, lng e intensidade
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'alertas' AND column_name = 'lat'
  ) THEN
    ALTER TABLE alertas ADD COLUMN lat FLOAT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'alertas' AND column_name = 'lng'
  ) THEN
    ALTER TABLE alertas ADD COLUMN lng FLOAT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'alertas' AND column_name = 'intensidade'
  ) THEN
    ALTER TABLE alertas ADD COLUMN intensidade INT;
  END IF;
END $$;

-- Inserir dados na tabela hospitais
INSERT INTO hospitais (nome, cidade, estado)
VALUES
  ('Hospital A', 'São Paulo', 'SP'),
  ('Hospital B', 'Rio de Janeiro', 'RJ'),
  ('Hospital C', 'Belo Horizonte', 'MG');

-- Inserir dados na tabela unidades
INSERT INTO unidades (nome, hospital_id)
VALUES
  ('Unidade 1', 1),
  ('Unidade 2', 2),
  ('Unidade 3', 3);

-- Inserir dados na tabela setores
INSERT INTO setores (nome, unidade_id)
VALUES
  ('Setor A', 1),
  ('Setor B', 2),
  ('Setor C', 3);

-- Inserir dados na tabela leitos
INSERT INTO leitos (setor_id, codigo, paciente_nome, idade, sexo)
VALUES
  (1, 'Leito 101', 'João Silva', 45, 'Masculino'),
  (2, 'Leito 102', 'Maria Oliveira', 32, 'Feminino'),
  (3, 'Leito 103', 'Carlos Souza', 60, 'Masculino');

-- Inserir dados na tabela coletas
INSERT INTO coletas (leito_id, data, bacteria, resistencia, sitio_coleta)
VALUES
  (1, '2025-05-01', 'E. coli', 'Alta', 'Urina'),
  (2, '2025-05-02', 'Staphylococcus', 'Média', 'Sangue'),
  (3, '2025-05-03', 'Salmonella', 'Baixa', 'Fezes');

-- Inserir dados na tabela alertas
INSERT INTO alertas (setor_id, bacteria, nivel, data, tipo_alerta)
VALUES
  (1, 'E. coli', 'Crítico', '2025-05-01', 'Surtos'),
  (2, 'Staphylococcus', 'Moderado', '2025-05-02', 'Infecção'),
  (3, 'Salmonella', 'Baixo', '2025-05-03', 'Prevenção');

-- Atualizar tabela alertas com dados fictícios de latitude, longitude e intensidade
INSERT INTO alertas (setor_id, bacteria, nivel, data, tipo_alerta, lat, lng, intensidade) VALUES
  (1, 'E. coli', 'Crítico', '2025-05-01', 'Surtos', -30.0346, -51.2177, 5),
  (2, 'Staphylococcus', 'Moderado', '2025-05-02', 'Infecção', -30.0350, -51.2200, 8),
  (3, 'Salmonella', 'Baixo', '2025-05-03', 'Prevenção', -30.0320, -51.2150, 3);

-- Inserir dados na tabela surtos
INSERT INTO surtos (lat, lng, intensidade) VALUES
(-30.0346, -51.2177, 5),
(-30.0350, -51.2200, 8),
(-30.0320, -51.2150, 3),
(-30.0400, -51.2300, 7),
(-30.0450, -51.2250, 6);
