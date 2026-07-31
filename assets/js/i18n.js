/* ============================================================
   I18N — tradução PT ⇄ EN em tempo de execução
   ------------------------------------------------------------
   - O HTML permanece 100% em português (fonte da verdade).
   - O dicionário TEXTS mapeia texto PT → EN. O motor percorre os
     nós de texto e atributos visíveis (placeholder, aria-label,
     title, alt) e troca o que encontrar no dicionário.
   - O que NÃO está no dicionário fica intocado — é assim que
     nomes próprios (Vitor, Driveoo, GoTask API…), tecnologias e
     códigos são preservados sem esforço.
   - Um MutationObserver traduz conteúdo inserido depois pelo JS
     (cards de projeto, widgets GitHub/LeetCode, mensagens do
     formulário) sem precisar alterar esses scripts.
   - A volta para PT restaura os originais guardados em memória.
   - A escolha persiste em localStorage ('lang'); o lang do <html>
     acompanha; o evento 'i18n:change' avisa os outros scripts
     (o terminal do hero redigita no novo idioma).

   PARA EDITAR TRADUÇÕES: altere/adicione pares em TEXTS.
   A chave é o texto PT com espaços normalizados (sem quebras).
   ============================================================ */
(function () {
    'use strict';

    var TEXTS = {
        /* ---------- títulos das páginas ---------- */
        'Vitor Lombard Rocha — Desenvolvedor Backend': 'Vitor Lombard Rocha — Backend Developer',
        'Todos os projetos · Vitor Lombard Rocha': 'All projects · Vitor Lombard Rocha',
        'GoTask API — Estudo de caso · Vitor Lombard Rocha': 'GoTask API — Case study · Vitor Lombard Rocha',
        'ObservaStack — Estudo de caso · Vitor Lombard Rocha': 'ObservaStack — Case study · Vitor Lombard Rocha',
        'DataMart SQL — Estudo de caso · Vitor Lombard Rocha': 'DataMart SQL — Case study · Vitor Lombard Rocha',
        'Sites para marcas parceiras — Estudo de caso · Vitor Lombard Rocha': 'Sites para marcas parceiras — Case study · Vitor Lombard Rocha',
        'URLShort — Estudo de caso · Vitor Lombard Rocha': 'URLShort — Case study · Vitor Lombard Rocha',

        /* ---------- header / nav ---------- */
        'Sobre': 'About',
        'Projetos': 'Projects',
        'Trajetória': 'Career',
        'Contato': 'Contact',
        'Baixar CV': 'Download CV',
        'Baixar currículo': 'Download resume',
        'Início': 'Home',
        'Ir para o início': 'Go to top',
        'Navegação principal': 'Main navigation',
        'Alternar tema claro e escuro': 'Toggle light and dark theme',
        'Alternar tema': 'Toggle theme',
        'Abrir menu': 'Open menu',
        'Redes sociais': 'Social links',

        /* ---------- hero ---------- */
        'disponível para novas oportunidades': 'open to new opportunities',
        'desenvolvedor de software': 'software developer',
        'dados': 'data',
        'Construo aplicações back-end escaláveis, containerização com Docker, pipelines de dados e interfaces front-end. Priorizo performance, observabilidade e um código que acompanha o produto conforme ele cresce.':
            'I build scalable back-end applications, containerization with Docker, data pipelines and front-end interfaces. I prioritize performance, observability and code that keeps up with the product as it grows.',
        'Ver projetos': 'View projects',
        'Entrar em contato': 'Get in touch',
        'Belo Horizonte · MG': 'Belo Horizonte · MG',
        'Brasil': 'Brazil',
        'Terminal exibindo o perfil de Vitor Lombard Rocha': "Terminal displaying Vitor Lombard Rocha's profile",

        /* ---------- sobre ---------- */
        '// 01 — sobre': '// 01 — about',
        'Quem está por trás do código': 'The person behind the code',
        'Sou': "I'm",
        ', desenvolvedor de software e formando em Análise e Desenvolvimento de Sistemas em Belo Horizonte. Minha atuação é focada em':
            ', a software developer finishing a degree in Systems Analysis and Development in Belo Horizonte. My work is focused on',
        'backend, ciência e análise de dados': 'backend, data science and data analysis',
        ', construindo aplicações escaláveis para ambientes web.': ', building scalable applications for the web.',
        'No dia a dia trabalho com': 'Day to day I work with',
        ', aplicando conceitos de APIs REST, POO e boas práticas de código. Gosto de entender o sistema de ponta a ponta, da modelagem do banco ao monitoramento em produção.':
            ', applying REST API concepts, OOP and coding best practices. I like understanding the system end to end, from database modeling to monitoring in production.',
        'Meu objetivo é entregar soluções de alta qualidade, com código limpo e sustentável, que ajudem o produto e a empresa a crescerem de forma sólida. Estou sempre estudando algo novo na fronteira entre dados e infraestrutura.':
            'My goal is to deliver high-quality solutions, with clean and maintainable code, that help the product and the company grow on solid ground. I am always studying something new at the frontier between data and infrastructure.',
        'Além da parte técnica, possuo experiência com atendimento ao público e rotinas administrativas, o que fortaleceu minha capacidade de comunicação, autonomia e responsabilidade no trabalho.':
            'Beyond the technical side, I have experience with customer service and administrative routines, which strengthened my communication skills, autonomy and sense of responsibility at work.',
        '// em números': '// in numbers',
        'anos de experiência': 'years of experience',
        'projetos realizados': 'projects built',
        'nível de inglês': 'English level',
        'certificações': 'certifications',

        /* ---------- stack ---------- */
        '// 02 — stack': '// 02 — stack',
        'Tecnologias & ferramentas': 'Technologies & tools',
        'As linguagens, bancos e ferramentas que uso para construir, versionar e colocar aplicações em produção.':
            'The languages, databases and tools I use to build, version and ship applications to production.',
        'Responsivo': 'Responsive',
        'Linguagens programação': 'Programming languages',
        'Banco de Dados': 'Databases',

        /* ---------- projetos (home + todos) ---------- */
        '// 03 — projetos': '// 03 — projects',
        'Projetos em destaque': 'Featured projects',
        'Uma seleção de trabalhos com foco em desenvolvimento de software. Clique no card para ver o estudo de caso completo.':
            'A selection of work focused on software development. Click a card to see the full case study.',
        'Todos os projetos': 'All projects',
        'todos os projetos': 'all projects',
        '// projetos desenvolvidos': '// projects built',
        'A lista completa de trabalhos em backend, dados, infraestrutura e web. Clique no card para ver o estudo de caso completo.':
            'The complete list of work in backend, data, infrastructure and web. Click a card to see the full case study.',
        'Voltar à seção Projetos': 'Back to the Projects section',
        'Voltar aos projetos': 'Back to projects',
        'Ver projeto': 'View project',
        'Código': 'Code',
        'Ver código': 'View code',

        /* descrições dos cards (projects.js) */
        'API REST de gerenciamento de tarefas em Go, com autenticação JWT, PostgreSQL e deploy containerizado.':
            'Task-management REST API in Go, with JWT authentication, PostgreSQL and containerized deploy.',
        'Stack de monitoramento com métricas expostas em Go, coletadas via Prometheus e visualizadas em dashboards Grafana.':
            'Monitoring stack with metrics exposed in Go, collected by Prometheus and visualized in Grafana dashboards.',
        'Pipeline de ingestão, limpeza e análise de dados em Python e SQL, gerando relatórios e indicadores a partir de dados armazenados em PostgreSQL.':
            'Data ingestion, cleaning and analysis pipeline in Python and SQL, producing reports and indicators from data stored in PostgreSQL.',
        'Criação e implementação de sites responsivos para marcas parceiras, com foco em performance, SEO e na identidade visual de cada marca.':
            'Design and implementation of responsive websites for partner brands, focused on performance, SEO and each brand\u2019s visual identity.',
        'API encurtadora de URLs construída em Go, com cache em Redis para redirecionamentos de baixa latência, persistência em PostgreSQL e deploy containerizado com Docker.':
            'URL-shortener API built in Go, with Redis caching for low-latency redirects, PostgreSQL persistence and containerized deploy with Docker.',
        'API · Backend': 'API · Backend',
        'Observabilidade': 'Observability',
        'Dados · Análise': 'Data · Analytics',
        'Web · Sites': 'Web · Sites',

        /* ---------- trajetória ---------- */
        '// 04 — trajetória': '// 04 — career',
        'Experiência & formação': 'Experience & education',
        'Experiência': 'Experience',
        'ago 2025 — jun 2026': 'Aug 2025 — Jun 2026',
        'Engenheiro de Software': 'Software Engineer',
        'Desenvolvimento de aplicações backend com Go (Golang)': 'Backend application development with Go (Golang)',
        'Modelagem e gestão de banco de dados PostgreSQL': 'PostgreSQL database modeling and management',
        'Deploy e operação em Cloud (Magalu Cloud)': 'Deployment and operations in the Cloud (Magalu Cloud)',
        'Monitoramento e observabilidade com Grafana': 'Monitoring and observability with Grafana',
        'Pipelines de CI/CD e versionamento com GitHub': 'CI/CD pipelines and version control with GitHub',
        'mar 2026 — jul 2026': 'Mar 2026 — Jul 2026',
        'Web Developer · CRM & IA': 'Web Developer · CRM & AI',
        'ShopCouture · meio período': 'ShopCouture · part-time',
        'Desenvolvimento e personalização de sites e lojas virtuais': 'Development and customization of websites and online stores',
        'Aplicação de IA generativa aplicados ao desenvolvimento web': 'Generative AI applied to web development',
        'CRM e ferramentas de gestão (ClickUp, Full Funnel e Trello)': 'CRM and management tools (ClickUp, Full Funnel and Trello)',
        'Análise e gerenciamento de dados com Excel e Google Sheets': 'Data analysis and management with Excel and Google Sheets',
        'Gestão de campanhas de tráfego pago no Meta Ads Manager (Facebook e Instagram)': 'Paid-traffic campaign management in Meta Ads Manager (Facebook and Instagram)',
        'out 2025 — mar 2026': 'Oct 2025 — Mar 2026',
        'Suporte Interno': 'Internal Support',
        'ShopCouture · Estágio': 'ShopCouture · Internship',
        'Operação de ERP (Globerr) para gestão de lojas, clientes e processos': 'ERP operation (Globerr) for managing stores, customers and processes',
        'Criação e implementação de sites para marcas parceiras': 'Design and implementation of websites for partner brands',
        'Suporte técnico em TI para usuários e sistemas': 'IT technical support for users and systems',
        'Atendimento e suporte ao cliente, auxiliando na resolução de demandas e problemas': 'Customer service and support, helping resolve requests and issues',
        'jan 2024 — atual': 'Jan 2024 — present',
        'Desenvolvedor de Software': 'Software Developer',
        'Autônomo · Projetos Pessoais': 'Freelance · Personal Projects',
        'Estudos práticos em Java, Python, Go, C/C++ e SQL com sistemas e scripts': 'Hands-on studies in Java, Python, Go, C/C++ and SQL with systems and scripts',
        'APIs REST e serviços back-end com Node.js e Express': 'REST APIs and back-end services with Node.js and Express',
        'Experimentação com microsserviços e arquiteturas distribuídas': 'Experimenting with microservices and distributed architectures',
        'Containerização de aplicações e gerenciamento de ambientes com Docker': 'Application containerization and environment management with Docker',
        'Criação, integração e consumo de APIs e serviços web': 'Building, integrating and consuming APIs and web services',
        'Versionamento e gerenciamento de código com Git e GitHub': 'Version control and code management with Git and GitHub',
        'Formação': 'Education',
        'Análise e Desenvolvimento de Sistemas': 'Systems Analysis and Development',
        'Anhanguera — Belo Horizonte': 'Anhanguera — Belo Horizonte',
        'Técnico em Mecânica': 'Mechanical Technician',
        'SENAI — Ipatinga': 'SENAI — Ipatinga',
        'Certificações': 'Certifications',
        'Introdução à Ciência da Computação': 'Introduction to Computer Science',
        'Aprenda Golang do Zero': 'Golang from Zero',
        'Banco de Dados e SQL': 'Databases and SQL',
        'Excel Completo': 'Complete Excel',

        /* ---------- contato ---------- */
        '// 05 — contato': '// 05 — contact',
        'Vamos conversar': "Let's talk",
        'Tem uma vaga, projeto ou ideia? Me mande uma mensagem — respondo o quanto antes.':
            'Have a role, a project or an idea? Send me a message — I reply as soon as I can.',
        'localização': 'location',
        'Belo Horizonte, MG': 'Belo Horizonte, Brazil',
        'Ver Belo Horizonte no Google Maps': 'See Belo Horizonte on Google Maps',
        'e-mail': 'email',
        'use o formulário ao lado': 'use the contact form',
        'Perfil no LeetCode': 'LeetCode profile',
        'carregando estatísticas…': 'loading stats…',
        'resolvidos': 'solved',
        'não foi possível carregar o LeetCode': 'could not load LeetCode data',
        'defina seu usuário do LeetCode (data-user)': 'set your LeetCode username (data-user)',
        'Nome': 'Name',
        'Seu nome': 'Your name',
        'E-mail': 'Email',
        'voce@email.com': 'you@email.com',
        'Telefone': 'Phone',
        '(opcional)': '(optional)',
        'Use apenas números': 'Numbers only',
        'Trocar país (código do telefone)': 'Change country (phone code)',
        'País': 'Country',
        'Assunto': 'Subject',
        'Sobre o que quer falar?': 'What would you like to talk about?',
        'Mensagem': 'Message',
        'Escreva sua mensagem...': 'Write your message...',
        'Enviar mensagem': 'Send message',
        'Enviando…': 'Sending…',
        'Não foi possível enviar agora. Tente novamente em instantes.': 'Could not send right now. Please try again in a moment.',
        'linguagens mais usadas': 'most used languages',
        'carregando linguagens…': 'loading languages…',
        'sem linguagens': 'no language data',
        'sem repositórios': 'no repositories',
        'Linguagens mais usadas no GitHub': 'Most used languages on GitHub',
        'Distribuição de linguagens': 'Language distribution',
        'contribuições no github': 'github contributions',
        'carregando contribuições…': 'loading contributions…',
        'não foi possível carregar as contribuições': 'could not load contributions',
        'sem dados de contribuição': 'no contribution data',
        'sem dados': 'no data',
        'defina seu usuário do GitHub (data-user)': 'set your GitHub username (data-user)',
        'Calendário de contribuições do GitHub': 'GitHub contributions calendar',
        'Ver perfil no GitHub': 'See GitHub profile',

        /* modais do formulário */
        'Quase lá': 'Almost there',
        'Confirme que você não é um robô para enviar sua mensagem.': 'Confirm you are not a robot to send your message.',
        'Não sou um robô': "I'm not a robot",
        'Cancelar': 'Cancel',
        'Fechar': 'Close',
        'Mensagem enviada': 'Message sent',
        'Obrigado pelo contato! Recebi sua mensagem e retorno o quanto antes.': 'Thanks for reaching out! I received your message and will get back to you soon.',
        'Voltar': 'Back',

        /* ---------- footer ---------- */
        'Vitor Lombard Rocha — Todos os direitos reservados.': 'Vitor Lombard Rocha — All rights reserved.',
        'construído com': 'built with',
        '<código/>': '<code/>',
        'e café': 'and coffee',

        /* ---------- páginas de projeto: rótulos comuns ---------- */
        'Visão geral': 'Overview',
        'O problema': 'The problem',
        'A solução': 'The solution',
        'Funcionalidades': 'Features',
        'Arquitetura': 'Architecture',
        'Processo': 'Process',
        'Screenshots': 'Screenshots',
        'Desafios & aprendizados': 'Challenges & learnings',
        '// detalhes': '// details',
        'categoria': 'category',
        'ano': 'year',
        'papel': 'role',
        'tecnologias': 'technologies',
        'Projeto': 'Project',
        'Screenshot ampliada': 'Enlarged screenshot',
        'Fechar (Esc)': 'Close (Esc)',

        /* ---------- GoTask API ---------- */
        '// projeto · api backend': '// project · backend api',
        'API REST para gerenciamento de tarefas construída em Go, com autenticação via JWT, persistência em PostgreSQL e deploy containerizado com Docker.':
            'Task-management REST API built in Go, with JWT authentication, PostgreSQL persistence and containerized deploy with Docker.',
        'O GoTask API é um serviço backend que organiza tarefas por usuário, com controle de prazos, status e prioridades. O foco do projeto foi construir uma API limpa, segura e fácil de manter, aplicando boas práticas de arquitetura em Go.':
            'GoTask API is a backend service that organizes tasks per user, with control over deadlines, status and priority. The focus of the project was to build a clean, secure and maintainable API, applying good architecture practices in Go.',
        'Aplicações de produtividade precisam de um backend confiável que isole os dados de cada usuário, valide entradas e responda rápido, mesmo sob carga. O desafio era entregar isso com uma base de código organizada, testável e pronta para evoluir.':
            "Productivity apps need a reliable backend that isolates each user's data, validates input and responds fast, even under load. The challenge was to deliver that with a codebase that is organized, testable and ready to evolve.",
        'Desenvolvi uma API REST em Go seguindo uma separação clara de camadas (handlers, serviços e repositórios). A autenticação usa':
            'I built a REST API in Go following a clean separation of layers (handlers, services and repositories). Authentication uses',
        ', os dados ficam em': ', data is stored in',
        'e toda a aplicação é empacotada em': 'and the whole application is packaged in',
        ', facilitando o deploy em qualquer ambiente.': ', making it easy to deploy in any environment.',
        'Cadastro e login de usuários com hash de senha': 'User sign-up and login with password hashing',
        'Autenticação e autorização por token JWT': 'Authentication and authorization via JWT tokens',
        'CRUD completo de tarefas com filtros por status e prazo': 'Full task CRUD with filters by status and due date',
        'Validação de entrada e respostas de erro padronizadas': 'Input validation and standardized error responses',
        'Paginação e ordenação nas listagens': 'Pagination and sorting on list endpoints',
        'Healthcheck e logs estruturados': 'Healthcheck and structured logs',
        'A estrutura segue o fluxo': 'The structure follows the flow',
        'requisição → handler → serviço → repositório → banco': 'request → handler → service → repository → database',
        '. Os handlers tratam HTTP, os serviços concentram a regra de negócio e os repositórios isolam o acesso ao PostgreSQL — o que torna cada camada testável de forma independente. O container Docker sobe a API junto a um banco PostgreSQL via docker-compose.':
            '. Handlers deal with HTTP, services concentrate the business rules and repositories isolate PostgreSQL access — which makes each layer independently testable. The Docker container brings up the API alongside a PostgreSQL database via docker-compose.',
        'O principal desafio foi estruturar a autenticação de forma segura sem acoplar o JWT à regra de negócio. Resolvi isso com um middleware dedicado, que valida o token antes da requisição chegar aos serviços. O projeto reforçou meu domínio sobre':
            'The main challenge was structuring authentication securely without coupling JWT to the business rules. I solved it with a dedicated middleware that validates the token before the request reaches the services. The project strengthened my command of',
        'design de APIs': 'API design',
        'modelagem relacional': 'relational modeling',
        'containerização': 'containerization',
        '— e como cada decisão de arquitetura impacta a manutenção a longo prazo.': '— and how each architecture decision impacts long-term maintenance.',
        'Desenvolvimento full backend': 'Full backend development',
        'Banner do projeto GoTask API': 'GoTask API project banner',
        'Rotas da API REST': 'REST API routes',
        'Autenticação via JWT': 'JWT authentication',
        'Consulta no PostgreSQL': 'PostgreSQL query',
        'Subindo com Docker Compose': 'Starting with Docker Compose',

        /* ---------- ObservaStack ---------- */
        '// projeto · observabilidade': '// project · observability',
        'Stack de observabilidade que expõe métricas de uma aplicação Go, coleta os dados com Prometheus e os transforma em dashboards visuais no Grafana.':
            'Observability stack that exposes metrics from a Go application, collects the data with Prometheus and turns it into visual dashboards in Grafana.',
        'O ObservaStack reúne, em um único ambiente, tudo que é preciso para enxergar a saúde de uma aplicação: instrumentação de métricas no código, coleta periódica e visualização em painéis. É um projeto inspirado diretamente no que faço com observabilidade no dia a dia.':
            'ObservaStack brings together, in a single environment, everything needed to see the health of an application: metrics instrumentation in the code, periodic collection and dashboard visualization. It is a project directly inspired by the observability work I do day to day.',
        'Sem observabilidade, problemas em produção só aparecem quando o usuário reclama. O objetivo era instrumentar uma aplicação para responder, a qualquer momento, perguntas como: quantas requisições por segundo? Qual a latência? Onde estão os erros?':
            'Without observability, production problems only show up when a user complains. The goal was to instrument an application to answer, at any moment, questions like: how many requests per second? What is the latency? Where are the errors?',
        'Instrumentei uma aplicação': 'I instrumented a',
        'expondo métricas no formato Prometheus (contadores, histogramas e gauges). O':
            'application, exposing metrics in the Prometheus format (counters, histograms and gauges).',
        'coleta esses dados em intervalos regulares e o': 'collects this data at regular intervals, and',
        'os transforma em dashboards de latência, throughput e taxa de erro. Tudo orquestrado com':
            'turns it into dashboards for latency, throughput and error rate. All orchestrated with',
        'com métricas customizadas': 'with custom metrics',
        'Coleta automática via Prometheus (scrape configurável)': 'Automatic collection via Prometheus (configurable scrape)',
        'Dashboards Grafana de latência, throughput e erros': 'Grafana dashboards for latency, throughput and errors',
        'Alertas configuráveis por limite de métrica': 'Configurable alerts by metric threshold',
        'Ambiente reprodutível com Docker Compose': 'Reproducible environment with Docker Compose',
        'O fluxo é': 'The flow is',
        'app Go (expõe /metrics) → Prometheus (coleta e armazena) → Grafana (consulta e exibe)':
            'Go app (exposes /metrics) → Prometheus (collects and stores) → Grafana (queries and displays)',
        '. Cada serviço roda em seu próprio container, comunicando-se por uma rede interna do Compose, o que mantém o ambiente isolado e fácil de subir em qualquer máquina.':
            '. Each service runs in its own container, communicating over an internal Compose network, which keeps the environment isolated and easy to bring up on any machine.',
        'O maior aprendizado foi escolher': 'The biggest learning was choosing',
        'quais métricas realmente importam': 'which metrics actually matter',
        '— instrumentar tudo gera ruído. Definir histogramas de latência com buckets adequados e montar dashboards que contam uma história clara aprofundou bastante meu domínio sobre':
            '— instrumenting everything creates noise. Defining latency histograms with proper buckets and building dashboards that tell a clear story deepened my command of',
        'Prometheus, Grafana e monitoramento de sistemas': 'Prometheus, Grafana and systems monitoring',
        'Observabilidade · DevOps': 'Observability · DevOps',
        'Instrumentação & infraestrutura': 'Instrumentation & infrastructure',
        'Banner do projeto ObservaStack': 'ObservaStack project banner',
        'Dashboard de latência': 'Latency dashboard',
        'Dashboard de throughput': 'Throughput dashboard',
        'Targets no Prometheus': 'Prometheus targets',
        'Regras de alerta': 'Alert rules',

        /* ---------- DataMart SQL ---------- */
        '// projeto · dados & análise': '// project · data & analytics',
        'O DataMart SQL pega dados brutos de diferentes fontes, organiza em um banco relacional e extrai indicadores úteis por meio de consultas SQL e análise em Python. Une duas das minhas áreas de foco: dados e backend.':
            'DataMart SQL takes raw data from different sources, organizes it in a relational database and extracts useful indicators through SQL queries and Python analysis. It brings together two of my focus areas: data and backend.',
        'Dados espalhados em planilhas e arquivos não respondem perguntas de negócio com agilidade. O objetivo era centralizar esses dados, tratá-los e disponibilizá-los de forma consultável e confiável.':
            'Data scattered across spreadsheets and files cannot answer business questions quickly. The goal was to centralize this data, clean it and make it queryable and reliable.',
        'Construí um pipeline em': 'I built a pipeline in',
        '(com Pandas) para ler, limpar e padronizar os dados, carregando-os em um modelo relacional no':
            '(with Pandas) to read, clean and standardize the data, loading it into a relational model in',
        '. Sobre essa base, escrevi consultas': '. On top of that base, I wrote optimized',
        'otimizadas que geram os relatórios e métricas finais.': 'queries that generate the final reports and metrics.',
        'Ingestão de dados de CSV/planilhas com validação': 'Data ingestion from CSV/spreadsheets with validation',
        'Limpeza e normalização com Pandas': 'Cleaning and normalization with Pandas',
        'Modelagem relacional e carga no PostgreSQL': 'Relational modeling and loading into PostgreSQL',
        'Consultas SQL para indicadores e agregações': 'SQL queries for indicators and aggregations',
        'Exportação de relatórios prontos para análise': 'Export of analysis-ready reports',
        'O fluxo segue o padrão': 'The flow follows the',
        'extração → transformação → carga (ETL)': 'extract → transform → load (ETL)',
        ': Python lê e trata os dados, popula as tabelas no PostgreSQL, e as consultas SQL ficam isoladas em scripts versionados, fáceis de revisar e reaproveitar.':
            'pattern: Python reads and processes the data, populates the PostgreSQL tables, and the SQL queries live in isolated, versioned scripts that are easy to review and reuse.',
        'O desafio central foi': 'The central challenge was',
        'garantir a qualidade dos dados': 'guaranteeing data quality',
        ': tratar valores ausentes, padronizar formatos e evitar duplicidades antes da carga. O projeto consolidou minha base em':
            ': handling missing values, standardizing formats and preventing duplicates before loading. The project consolidated my foundation in',
        'SQL, modelagem de dados e análise com Python': 'SQL, data modeling and analysis with Python',
        ', áreas que pretendo continuar aprofundando.': ', areas I intend to keep deepening.',
        'Engenharia & análise de dados': 'Data engineering & analytics',
        'Banner do projeto DataMart SQL': 'DataMart SQL project banner',
        'Pipeline ETL em Python': 'ETL pipeline in Python',
        'Modelo dimensional': 'Dimensional model',
        'Query de indicadores': 'Indicator query',
        'Relatório de receita': 'Revenue report',

        /* ---------- Sites para marcas parceiras ---------- */
        '// projeto · web & sites': '// project · web & sites',
        'Projeto de criação e implementação de sites para marcas parceiras, realizado na ShopCouture. Cada site é pensado para refletir a identidade da marca, carregar rápido e ser encontrado com facilidade nas buscas — unindo front-end, performance e SEO.':
            'A project to design and implement websites for partner brands, carried out at ShopCouture. Each site is designed to reflect the brand identity, load fast and be easy to find in search — combining front-end, performance and SEO.',
        'Marcas parceiras precisavam de presença online própria, rápida e responsiva, sem depender de plataformas genéricas. O desafio era entregar sites consistentes, leves e otimizados para conversão e busca, mantendo a identidade visual de cada marca.':
            "Partner brands needed their own fast, responsive online presence without depending on generic platforms. The challenge was to deliver consistent, lightweight sites optimized for conversion and search, while keeping each brand's visual identity.",
        'Desenvolvi os sites com': 'I built the sites with',
        ', priorizando layout responsivo, boas práticas de': ', prioritizing responsive layout, good',
        '(estrutura semântica, meta tags e performance) e um carregamento enxuto. O resultado são páginas que se adaptam a qualquer tela e transmitem a marca de forma profissional.':
            'practices (semantic structure, meta tags and performance) and lean loading. The result is pages that adapt to any screen and convey the brand professionally.',
        'Layout totalmente responsivo (desktop, tablet e mobile)': 'Fully responsive layout (desktop, tablet and mobile)',
        'Identidade visual personalizada por marca': 'Custom visual identity per brand',
        'SEO on-page: títulos, meta descriptions e HTML semântico': 'On-page SEO: titles, meta descriptions and semantic HTML',
        'Performance: imagens otimizadas e carregamento leve': 'Performance: optimized images and light loading',
        'Seções de destaque, contato e chamadas para ação': 'Highlight sections, contact and calls to action',
        'Integração com formulários e canais de atendimento': 'Integration with forms and support channels',
        'O fluxo segue': 'The flow follows',
        'briefing da marca → estrutura e wireframe → implementação responsiva → otimização de SEO e performance → publicação':
            'brand briefing → structure and wireframe → responsive implementation → SEO and performance optimization → publishing',
        '. Cada etapa busca equilibrar identidade visual, velocidade e facilidade de manutenção, garantindo um resultado fiel à marca e fácil de evoluir.':
            '. Each step balances visual identity, speed and maintainability, ensuring a result that stays true to the brand and is easy to evolve.',
        'O principal desafio foi': 'The main challenge was',
        'conciliar identidade visual e performance': 'reconciling visual identity and performance',
        ': entregar sites bonitos e fiéis à marca sem sacrificar a velocidade. O projeto consolidou minha base em':
            ': delivering beautiful, on-brand sites without sacrificing speed. The project consolidated my foundation in',
        'front-end responsivo, SEO e otimização': 'responsive front-end, SEO and optimization',
        ', além da experiência de lidar diretamente com as necessidades de cada marca.': ', plus the experience of dealing directly with the needs of each brand.',
        'Desenvolvimento & implementação': 'Development & implementation',
        'Banner do projeto Sites para marcas parceiras': 'Sites para marcas parceiras project banner',
        'Home do site (desktop)': 'Site home (desktop)',
        'Versão mobile': 'Mobile version',
        'Seção de produtos': 'Products section',
        'Seção de contato': 'Contact section',

        /* ---------- URLShort ---------- */
        'O URLShort é um serviço backend que transforma URLs longas em links curtos e os resolve com baixa latência. O foco foi unir uma API REST limpa em Go a uma camada de cache eficiente, garantindo redirecionamentos rápidos mesmo sob alto volume.':
            'URLShort is a backend service that turns long URLs into short links and resolves them with low latency. The focus was combining a clean REST API in Go with an efficient caching layer, ensuring fast redirects even under high volume.',
        'Encurtadores de URL precisam responder o redirecionamento em poucos milissegundos e aguentar muitas leituras repetidas do mesmo link. Consultar o banco a cada acesso não escala — era preciso uma estratégia de cache que reduzisse essa carga sem perder consistência.':
            'URL shorteners must answer redirects within a few milliseconds and withstand many repeated reads of the same link. Hitting the database on every access does not scale — it needed a caching strategy that reduced that load without losing consistency.',
        'Desenvolvi uma API REST em': 'I built a REST API in',
        'que gera códigos curtos únicos e os persiste no': 'that generates unique short codes and persists them in',
        '. Os links mais acessados ficam em cache no': '. The most-accessed links are cached in',
        ', de modo que o redirecionamento responde direto da memória. Toda a aplicação é empacotada em':
            ', so redirects are served straight from memory. The whole application is packaged in',
        'para subir em qualquer ambiente.': 'to run in any environment.',
        'Encurtamento de URLs com código curto único': 'URL shortening with unique short codes',
        'Redirecionamento de baixa latência com cache em Redis': 'Low-latency redirects with Redis caching',
        'Persistência dos links e metadados no PostgreSQL': 'Link and metadata persistence in PostgreSQL',
        'Contagem de cliques por link': 'Click counting per link',
        'Validação de URL e respostas de erro padronizadas': 'URL validation and standardized error responses',
        'Healthcheck e ambiente reprodutível com Docker Compose': 'Healthcheck and reproducible environment with Docker Compose',
        'O fluxo de leitura é': 'The read flow is',
        'requisição → checa Redis → (se faltar) consulta PostgreSQL → popula o cache → redireciona':
            'request → check Redis → (on miss) query PostgreSQL → populate cache → redirect',
        '. A escrita grava no PostgreSQL e invalida/atualiza o cache. Cada serviço roda em seu próprio container, comunicando-se por uma rede interna do Docker Compose.':
            '. Writes go to PostgreSQL and invalidate/update the cache. Each service runs in its own container, communicating over an internal Docker Compose network.',
        'O principal desafio foi manter': 'The main challenge was keeping',
        'cache e banco coerentes': 'cache and database consistent',
        'sem comprometer a velocidade. Resolvi isso definindo uma política clara de expiração e invalidação do Redis. O projeto aprofundou meu domínio sobre':
            'without compromising speed. I solved it by defining a clear Redis expiration and invalidation policy. The project deepened my command of',
        'cache distribuído': 'distributed caching',
        'otimização de latência': 'latency optimization',
        'Banner do projeto URLShort': 'URLShort project banner',
        'Rotas da API': 'API routes',
        'Cache no Redis': 'Redis cache',
        'Tabela de links': 'Links table',

        /* dinâmicos: aria dos cards gerados por projects.js */
        'Ver estudo de caso: GoTask API': 'View case study: GoTask API',
        'Ver estudo de caso: ObservaStack': 'View case study: ObservaStack',
        'Ver estudo de caso: DataMart SQL': 'View case study: DataMart SQL',
        'Ver estudo de caso: Sites para marcas parceiras': 'View case study: Sites para marcas parceiras',
        'Ver estudo de caso: URLShort': 'View case study: URLShort'
    };

    var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
    var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };

    /* Padrões com partes variáveis (números, nomes) */
    var PATTERNS = [
        [/^(\d[\d.,]*) contribuições$/, '$1 contributions'],
        [/^(\d[\d.,]*) contribuição$/, '$1 contribution'],
        [/^aceitação\s+(.+)$/, 'acceptance $1'],
        [/^Ampliar: (.+)$/, 'Enlarge: $1']
    ];

    function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

    function toEN(key) {
        if (TEXTS.hasOwnProperty(key)) return TEXTS[key];
        for (var i = 0; i < PATTERNS.length; i++) {
            if (PATTERNS[i][0].test(key)) return key.replace(PATTERNS[i][0], PATTERNS[i][1]);
        }
        return null;
    }

    /* Originais guardados para a volta ao PT */
    var textOrig = new Map();   // TextNode -> string original
    var attrOrig = new Map();   // Element  -> { attr: valor original }

    function translateTextNode(node) {
        var raw = node.nodeValue;
        var key = norm(raw);
        if (!key) return;

        var en = toEN(key);

        /* Conjunção solta entre dois elementos: "<b>X</b> e <b>Y</b>".
           Só quando o nó é exatamente "e" e está entre elementos —
           qualquer outro "e" da página fica em paz. */
        if (en === null && key === 'e' &&
            node.previousSibling && node.previousSibling.nodeType === 1 &&
            node.nextSibling && node.nextSibling.nodeType === 1) {
            en = 'and';
        }
        if (en === null) return;

        if (!textOrig.has(node)) textOrig.set(node, raw);
        var lead = raw.match(/^\s*/)[0];
        var trail = raw.match(/\s*$/)[0];
        node.nodeValue = lead + en + trail;
    }

    function translateAttrs(el) {
        for (var i = 0; i < ATTRS.length; i++) {
            var a = ATTRS[i];
            if (!el.hasAttribute || !el.hasAttribute(a)) continue;
            var v = el.getAttribute(a);
            var en = toEN(norm(v));
            if (en === null) continue;
            var bag = attrOrig.get(el);
            if (!bag) { bag = {}; attrOrig.set(el, bag); }
            if (!(a in bag)) bag[a] = v;
            el.setAttribute(a, en);
        }
    }

    function walk(root) {
        if (root.nodeType === 3) { translateTextNode(root); return; }
        if (root.nodeType !== 1 && root.nodeType !== 11) return;
        if (root.nodeType === 1) {
            if (SKIP[root.tagName]) return;
            if (root.id === 'terminal-out') return;   // o terminal cuida de si (main.js)
            translateAttrs(root);
        }
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                if (n.nodeType === 1 && (SKIP[n.tagName] || n.id === 'terminal-out')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var n;
        while ((n = walker.nextNode())) {
            if (n.nodeType === 3) translateTextNode(n);
            else translateAttrs(n);
        }
    }

    function restore() {
        textOrig.forEach(function (orig, node) { node.nodeValue = orig; });
        textOrig.clear();
        attrOrig.forEach(function (bag, el) {
            for (var a in bag) el.setAttribute(a, bag[a]);
        });
        attrOrig.clear();
    }

    /* -------- título do documento -------- */
    var titleOrig = null;
    function applyTitle(lang) {
        if (lang === 'en') {
            var en = toEN(norm(document.title));
            if (en !== null) { titleOrig = document.title; document.title = en; }
        } else if (titleOrig !== null) {
            document.title = titleOrig; titleOrig = null;
        }
    }

    /* -------- observer p/ conteúdo dinâmico -------- */
    var observer = null;
    function observe(on) {
        if (on) {
            if (observer) return;
            observer = new MutationObserver(function (muts) {
                for (var i = 0; i < muts.length; i++) {
                    var added = muts[i].addedNodes;
                    for (var j = 0; j < added.length; j++) walk(added[j]);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        } else if (observer) {
            observer.disconnect(); observer = null;
        }
    }

    /* -------- estado + API -------- */
    var lang = 'pt';
    try { if (localStorage.getItem('lang') === 'en') lang = 'en'; } catch (e) { }

    /* -------- CV: baixa a versão do idioma ativo --------
       Em EN, os links do currículo apontam para o PDF traduzido
       (CV-Vitor-Rocha-EN.pdf); em PT, voltam ao original. */
    function swapCvLinks(l) {
        var links = document.querySelectorAll('a[href*="CV-Vitor-Rocha"]');
        Array.prototype.forEach.call(links, function (a) {
            var href = a.getAttribute('href');
            if (l === 'en') {
                a.setAttribute('href', href.replace(/CV-Vitor-Rocha(-EN)?\.pdf/, 'CV-Vitor-Rocha-EN.pdf'));
            } else {
                a.setAttribute('href', href.replace(/CV-Vitor-Rocha-EN\.pdf/, 'CV-Vitor-Rocha.pdf'));
            }
        });
    }

    function setLang(next, initial) {
        lang = (next === 'en') ? 'en' : 'pt';
        try { localStorage.setItem('lang', lang); } catch (e) { }
        document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');

        if (lang === 'en') { walk(document.body); observe(true); }
        else { observe(false); restore(); }
        applyTitle(lang);
        swapCvLinks(lang);
        syncButtons();
        if (!initial) {
            document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: lang } }));
        }
    }

    window.I18N = {
        get lang() { return lang; },
        t: function (pt) { return lang === 'en' ? (toEN(norm(pt)) || pt) : pt; },
        toggle: function () { switchAnimated(lang === 'en' ? 'pt' : 'en'); }
    };

    /* -------- troca animada: a página "recarrega" --------
       Mesma sensação da entrada: o conteúdo desce/some rápido
       (.i18n-out), os textos trocam, e tudo volta com o fadeUp
       de carga (.i18n-in). O terminal redigita junto, via evento.
       Com prefers-reduced-motion, troca seca (sem coreografia). */
    var mqReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var switching = false;

    function switchAnimated(next) {
        if (next === lang || switching) return;
        if (mqReduce && mqReduce.matches) { setLang(next); return; }

        switching = true;
        var root = document.documentElement;
        root.classList.add('i18n-out');
        setTimeout(function () {
            setLang(next);                       // troca com o conteúdo oculto
            root.classList.remove('i18n-out');
            root.classList.add('i18n-in');       // reexecuta o fadeUp de entrada
            setTimeout(function () {
                root.classList.remove('i18n-in');
                switching = false;
            }, 650);
        }, 190);
    }

    /* -------- botão de idioma (mostra o idioma atual) -------- */
    function syncButtons() {
        var btns = document.querySelectorAll('.lang-toggle');
        Array.prototype.forEach.call(btns, function (b) {
            b.classList.toggle('is-en', lang === 'en');
            b.setAttribute('aria-label', lang === 'en' ? 'Switch language to Portuguese' : 'Mudar idioma para inglês');
            b.setAttribute('title', lang === 'en' ? 'Language: English' : 'Idioma: Português');
        });
    }

    function init() {
        Array.prototype.forEach.call(document.querySelectorAll('.lang-toggle'), function (b) {
            b.addEventListener('click', function () { window.I18N.toggle(); });
        });
        setLang(lang, true);
        /* Se a página já abriu em EN, avisa os scripts que rodam
           depois (o terminal redigita em inglês). */
        if (lang === 'en') {
            setTimeout(function () {
                document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: 'en' } }));
            }, 0);
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
