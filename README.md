# Infectreck

Infectreck é uma aplicação web projetada para monitorar e analisar surtos de infecção hospitalar. Ela fornece mapas de calor, rankings e resumos para ajudar os profissionais de saúde a tomarem decisões informadas.

## Funcionalidades

- **Visualização de Mapas de Calor**: Exibe surtos de infecção em um mapa.
- **Rankings de Hospitais**: Mostra tendências e rankings de hospitais com base nos dados de infecção.
- **Painel de Resumo**: Fornece métricas-chave como total de surtos, hospitais com alertas e bactérias mais recorrentes.

## Pré-requisitos

- Node.js (v16 ou superior)
- Python (v3.12 ou superior)
- Banco de dados PostgreSQL

## Instalação

### Configuração do Frontend

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-repositorio/infectreck.git
   cd infectreck
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Configuração do Backend

1. Navegue até a pasta `backend`:

   ```bash
   cd backend
   ```

2. Configure um ambiente virtual:

   ```bash
   python -m venv env
   source env/bin/activate  # No Windows: .\env\Scripts\Activate.ps1
   ```

3. Instale as dependências do Python:

   ```bash
   pip install -r requirements.txt
   ```

   O arquivo `requirements.txt` contém as seguintes dependências:

   ```
   fastapi==0.95.2
   uvicorn==0.22.0
   asyncpg==0.30.0
   numpy==2.2.6
   scipy==1.15.3
   six==1.16.0
   pylab==0.1.0
   annotated-types==0.7.0
   anyio==4.9.0
   beautifulsoup4==4.13.4
   cachetools==5.5.2
   certifi==2025.4.26
   charset-normalizer==3.4.2
   click==8.2.1
   cmdstanpy==1.2.5
   colorama==0.4.6
   contourpy==1.3.2
   cycler==0.12.1
   ```

4. Configure o banco de dados:

   - Atualize o `DATABASE_URL` no arquivo `main.py` com suas credenciais do PostgreSQL.
   - Execute o script SQL `data_insertion.sql` para popular o banco de dados.

5. Inicie o servidor FastAPI:

   ```bash
   uvicorn main:app --reload
   ```

6. Acesse o backend em [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Estrutura do Projeto

```
infectreck/
├── app/                # Aplicação Frontend
│   ├── components/     # Componentes reutilizáveis do React
│   ├── dashboard/      # Página do Dashboard
│   └── pages/          # Outras páginas
├── backend/            # Aplicação Backend
│   ├── main.py         # Servidor FastAPI
│   ├── models.py       # Modelos do banco de dados
│   ├── data_insertion.sql # Script SQL para inserção de dados
│   └── test_data.json  # Dados de teste
├── env/                # Ambiente virtual Python
├── public/             # Arquivos públicos
├── package.json        # Dependências do Frontend
├── README.md           # Documentação do projeto
└── tsconfig.json       # Configuração do TypeScript
```

## Implantação

### Frontend

Implante o frontend usando [Vercel](https://vercel.com/):

1. Envie seu código para um repositório GitHub.
2. Conecte o repositório ao Vercel.
3. Siga os passos de implantação no Vercel.

### Backend

Implante o backend manualmente seguindo os passos de configuração descritos acima. Certifique-se de que o servidor FastAPI está rodando e o banco de dados PostgreSQL está configurado corretamente.

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request no GitHub.

## Usuário de Teste

Para acessar o sistema com um usuário de teste, utilize as seguintes credenciais:

- **Email**: test@example.com
- **Senha**: password123
