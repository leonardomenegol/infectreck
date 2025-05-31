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
