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
        'Fake Shop — Estudo de caso · Vitor Lombard Rocha': 'Fake Shop — Case study · Vitor Lombard Rocha',
        'DevBook — Estudo de caso · Vitor Lombard Rocha': 'DevBook — Case study · Vitor Lombard Rocha',
        'pulso.app — Estudo de caso · Vitor Lombard Rocha': 'pulso.app — Case study · Vitor Lombard Rocha',
        'luizalombard.com.br — Estudo de caso · Vitor Lombard Rocha': 'luizalombard.com.br — Case study · Vitor Lombard Rocha',
        'Calculadora em C — Estudo de caso · Vitor Lombard Rocha': 'C Calculator — Case study · Vitor Lombard Rocha',
        'LinkQ — Estudo de caso · Vitor Lombard Rocha': 'LinkQ — Case study · Vitor Lombard Rocha',
        'DevBurguer — Estudo de caso · Vitor Lombard Rocha': 'DevBurguer — Case study · Vitor Lombard Rocha',
        'Conversor de Distância — Estudo de caso · Vitor Lombard Rocha': 'Distance Converter — Case study · Vitor Lombard Rocha',

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

        'Calculadora em C': 'C Calculator',
        'Conversor de Distância': 'Distance Converter',
        /* ---------- Fake Shop ---------- */
        '// projeto · devops': '// project · devops',
        'Loja virtual completa em Python levada do código à produção: pipeline de CI/CD no GitHub Actions, imagem publicada no Docker Hub e cluster Kubernetes rodando 10 réplicas atrás de um LoadBalancer.': 'A complete Python online store taken from code to production: GitHub Actions CI/CD pipeline, image published to Docker Hub and a Kubernetes cluster running 10 replicas behind a LoadBalancer.',
        'O Fake Shop é um e-commerce em Flask com catálogo, carrinho persistido por cookie e checkout, gravando em PostgreSQL via SQLAlchemy. Mas a aplicação é o meio, não o fim: o projeto existe para exercitar o ciclo completo de entrega — build, ship, run — com as mesmas ferramentas usadas em produção.': 'Fake Shop is a Flask e-commerce with a catalog, a cookie-persisted cart and checkout, writing to PostgreSQL through SQLAlchemy. The application is the means, not the end: the project exists to exercise the full delivery cycle — build, ship, run — with the same tools used in production.',
        'Colocar uma aplicação real para rodar de forma reprodutível é um problema diferente de escrevê-la: a imagem precisa ser imutável, as migrações do banco precisam acontecer sozinhas, as réplicas precisam dividir o mesmo estado e cada push deveria gerar uma versão publicável sem passo manual.': 'Getting a real application to run reproducibly is a different problem from writing it: the image must be immutable, database migrations must happen on their own, replicas must share the same state and every push should produce a publishable version with no manual step.',
        'A aplicação foi containerizada com as migrações Alembic aplicadas automaticamente no entrypoint, antes do Gunicorn subir. O workflow do GitHub Actions constrói a imagem a cada push e publica no Docker Hub com duas tags: uma versionada pelo número da execução e a latest. Os manifestos Kubernetes sobem o PostgreSQL com Service ClusterIP e a loja com 10 réplicas expostas por LoadBalancer; o job de CD aplica os manifestos no cluster a partir de um kubeconfig em secret, hoje por acionamento manual. A aplicação ainda expõe métricas Prometheus em /metrics, em modo multiprocesso.': 'The application was containerized with Alembic migrations applied automatically in the entrypoint, before Gunicorn starts. The GitHub Actions workflow builds the image on every push and publishes it to Docker Hub with two tags: one versioned by the run number and latest. The Kubernetes manifests bring up PostgreSQL with a ClusterIP Service and the store with 10 replicas exposed through a LoadBalancer; the CD job applies the manifests to the cluster from a kubeconfig secret, currently triggered manually. The application also exposes Prometheus metrics at /metrics, in multiprocess mode.',
        'Catálogo, detalhe de produto, carrinho por cookie e checkout': 'Catalog, product detail, cookie-based cart and checkout',
        'Migrações de banco automáticas no entrypoint do container': 'Automatic database migrations in the container entrypoint',
        'CI que publica imagem com tag versionada + latest a cada push': 'CI publishing a versioned + latest image tag on every push',
        'Deploy no Kubernetes com 10 réplicas e rollout sem downtime': 'Kubernetes deploy with 10 replicas and zero-downtime rollouts',
        'Métricas Prometheus expostas em /metrics': 'Prometheus metrics exposed at /metrics',
        'Página de arquitetura publicada no GitHub Pages': 'Architecture page published on GitHub Pages',
        'O fluxo é push → GitHub Actions → Docker Hub → cluster. No cluster, todas as réplicas da loja compartilham o mesmo PostgreSQL, resolvido por DNS interno pelo nome do Service — qualquer réplica atende qualquer visitante. Atualizar é trocar a imagem e deixar o rollout substituir os pods em ondas, sem tirar a loja do ar.': 'The flow is push → GitHub Actions → Docker Hub → cluster. Inside the cluster, every store replica shares the same PostgreSQL, resolved by internal DNS through the Service name — any replica can serve any visitor. Updating means swapping the image and letting the rollout replace pods in waves, without taking the store down.',
        'O maior aprendizado veio de depurar o ciclo na prática: entender que uma imagem é imutável e que a tag latest pode ficar em cache no nó, quando usar rollout restart e quando cravar uma tag numerada, e como provar em qual elo — disco, GitHub, registry, cluster ou navegador — uma mudança se perdeu. É o tipo de intuição que só o erro real constrói.': 'The biggest learning came from debugging the cycle in practice: understanding that an image is immutable and that the latest tag can be cached on the node, when to use rollout restart versus pinning a numbered tag, and how to prove in which link — disk, GitHub, registry, cluster or browser — a change got lost. That kind of intuition is only built by real failure.',
        'DevOps e backend — containerização, pipeline e cluster': 'DevOps and backend — containerization, pipeline and cluster',
        'Banner do projeto Fake Shop': 'Fake Shop project banner',
        'Vitrine da loja com os produtos': 'Store front with the products',
        'Pipeline verde no GitHub Actions': 'Green pipeline on GitHub Actions',
        'Réplicas rodando no Kubernetes': 'Replicas running on Kubernetes',
        'Página de arquitetura no GitHub Pages': 'Architecture page on GitHub Pages',
        'E-commerce Flask + PostgreSQL usado como laboratório DevOps: CI/CD no GitHub Actions, imagem no Docker Hub e deploy no Kubernetes com 10 réplicas.': 'Flask + PostgreSQL e-commerce used as a DevOps lab: GitHub Actions CI/CD, Docker Hub image and Kubernetes deploy with 10 replicas.',

        /* ---------- DevBook ---------- */
        '// projeto · fullstack go': '// project · fullstack go',
        'Uma rede social onde quem escreve código conta o que aprendeu: publicações, curtidas, seguidores e busca — construída em dois serviços Go que conversam por HTTP.': 'A social network where people who write code share what they learned: posts, likes, followers and search — built as two Go services talking over HTTP.',
        'O DevBook é uma rede social no estilo Twitter/X voltada a desenvolvedores: cada pessoa publica o que está construindo ou aprendendo, segue outras, curte publicações e acompanha o feed. O projeto é 100% Go, dividido em uma API REST e uma aplicação web que a consome.': 'DevBook is a Twitter/X-style social network aimed at developers: each person posts what they are building or learning, follows others, likes posts and browses the feed. The project is 100% Go, split into a REST API and a web application that consumes it.',
        'Uma rede social concentra os problemas clássicos de backend: autenticação segura, autorização por recurso (só o autor edita ou apaga a própria publicação), relações entre usuários e um webapp que mantenha a sessão sem expor o token. O desafio era resolver tudo isso com a biblioteca padrão do Go no centro.': 'A social network concentrates the classic backend problems: secure authentication, per-resource authorization (only the author can edit or delete their own post), relationships between users and a webapp that keeps the session without exposing the token. The challenge was solving all of it with the Go standard library at the core.',
        'A API expõe usuários e publicações em rotas REST com gorilla/mux, senhas com hash bcrypt e login que emite JWT; um middleware valida o token antes de cada rota protegida. O webapp renderiza templates Go no servidor e guarda o token num cookie assinado e criptografado com gorilla/securecookie. O MySQL 8 sobe por docker-compose com o schema aplicado automaticamente na primeira execução e healthcheck.': 'The API exposes users and posts through REST routes with gorilla/mux, bcrypt-hashed passwords and a login that issues a JWT; a middleware validates the token before every protected route. The webapp renders Go templates on the server and stores the token in a cookie signed and encrypted with gorilla/securecookie. MySQL 8 comes up through docker-compose with the schema applied automatically on first run, plus a healthcheck.',
        'Cadastro, login e sessão com JWT + cookie criptografado': 'Sign-up, login and session with JWT + encrypted cookie',
        'Feed com publicações, curtir e descurtir': 'Feed with posts, like and unlike',
        'Criar, editar e excluir as próprias publicações': 'Create, edit and delete your own posts',
        'Seguir, deixar de seguir, seguidores e seguindo': 'Follow, unfollow, followers and following',
        'Busca de pessoas e perfil com estatísticas': 'People search and profile with stats',
        'Tema claro/escuro com persistência': 'Light/dark theme with persistence',
        'São dois processos independentes: a API na porta 5001 e o webapp na 3000. O navegador só fala com o webapp; o webapp repassa cada ação à API por HTTP, anexando o JWT guardado no cookie. Na API, o fluxo é rota → middleware de autenticação → controller → repositório → MySQL, com as camadas separadas por pacote.': 'There are two independent processes: the API on port 5001 and the webapp on 3000. The browser only talks to the webapp; the webapp forwards each action to the API over HTTP, attaching the JWT stored in the cookie. Inside the API, the flow is route → auth middleware → controller → repository → MySQL, with layers separated by package.',
        'O ponto mais delicado foi a sessão: manter o token fora do alcance do JavaScript do navegador exigiu cookie assinado e criptografado, e a autorização por recurso exigiu comparar o dono do registro com o usuário do token em cada operação sensível. O projeto consolidou API design em Go, middlewares e a separação entre serviço de dados e aplicação web.': 'The trickiest part was the session: keeping the token out of reach of browser JavaScript required a signed, encrypted cookie, and per-resource authorization required comparing the record owner with the token user on every sensitive operation. The project consolidated API design in Go, middlewares and the separation between data service and web application.',
        'Desenvolvimento fullstack — API e webapp': 'Fullstack development — API and webapp',
        'Banner do projeto DevBook': 'DevBook project banner',
        'Tela de login do DevBook': 'DevBook login screen',
        'Feed com publicações e curtidas': 'Feed with posts and likes',
        'Perfil com seguidores e seguindo': 'Profile with followers and following',
        'Busca de pessoas': 'People search',
        'Rede social para devs no estilo Twitter/X, 100% em Go: API REST com JWT, bcrypt e MySQL + webapp com templates server-side e cookies criptografados.': 'Twitter/X-style social network for devs, built entirely in Go: REST API with JWT, bcrypt and MySQL + server-rendered webapp with encrypted cookies.',

        /* ---------- pulso.app ---------- */
        '// projeto · fullstack': '// project · fullstack',
        'Plataforma de desempenho pessoal com nove seções — dashboard, semana, hábitos, estatísticas, metas, finanças, visão anual, temporizador e configurações — num visual de console de engenharia.': 'A personal performance platform with nine sections — dashboard, week, habits, statistics, goals, finances, yearly view, timer and settings — in an engineering-console look.',
        'O pulso.app acompanha hábitos e transforma os registros em análise: streaks, heatmap anual, percentuais por mês, metas com progresso, um módulo de finanças com recorrências e um temporizador de foco. A interface segue a estética de console de engenharia, com tipografia técnica, trilha de grade e tema claro/escuro.': 'pulso.app tracks habits and turns the records into analysis: streaks, a yearly heatmap, monthly percentages, goals with progress, a finances module with recurrences and a focus timer. The interface follows an engineering-console aesthetic, with technical typography, a grid trail and light/dark themes.',
        'Acompanhar hábitos de verdade pede mais que uma lista de tarefas: pede métricas calculadas sobre o histórico, visões por dia, semana, mês e ano, e dados que continuem seus — sem depender de um serviço em nuvem de terceiros.': 'Really tracking habits takes more than a to-do list: it takes metrics computed over the history, views by day, week, month and year, and data that remains yours — without depending on a third-party cloud service.',
        'O front é React 19 com Next.js 15 e Tailwind 4, com animações em Framer Motion, arrastar e soltar com dnd-kit e gráficos em Recharts. O backend é uma API em Go escrita só com a biblioteca padrão, persistindo num arquivo JSON — e o motor de métricas (streaks, metas, finanças com recorrências projetadas) foi portado para o Go, de modo que o cálculo vive junto dos dados.': 'The front end is React 19 with Next.js 15 and Tailwind 4, with Framer Motion animations, drag and drop via dnd-kit and charts in Recharts. The backend is a Go API written with the standard library only, persisting to a JSON file — and the metrics engine (streaks, goals, finances with projected recurrences) was ported to Go, so computation lives next to the data.',
        'Check-ins com streaks, recordes e insights automáticos': 'Check-ins with streaks, records and automatic insights',
        'Heatmap anual e evolução mensal de conclusão': 'Yearly heatmap and monthly completion trend',
        'Metas com progresso e ordenação própria': 'Goals with progress and custom ordering',
        'Finanças com receitas, despesas e recorrências projetadas': 'Finances with income, expenses and projected recurrences',
        'Temporizador, pomodoro e cronômetro com presets': 'Timer, pomodoro and stopwatch with presets',
        'Busca global, seletor de mês que filtra todo o app e temas': 'Global search, an app-wide month selector and themes',
        'O app é dividido em contexts de dados e de temporizador, páginas por rota no App Router e uma camada de storage que fala com a API Go por HTTP. A lógica de métricas fica em módulos puros e testados (Vitest no front, go test no back), separados da interface — a mesma regra roda idêntica nos dois lados.': 'The app is split into data and timer contexts, per-route pages in the App Router and a storage layer that talks to the Go API over HTTP. The metrics logic lives in pure, tested modules (Vitest on the front, go test on the back), separate from the UI — the same rules run identically on both sides.',
        'O desafio central foi manter o motor de métricas idêntico em TypeScript e em Go — cada regra de streak e recorrência precisou de testes espelhados nos dois lados. No caminho, o projeto virou também um exercício de refino de UX: relógio que sincroniza no minuto cheio, foco devolvido ao gatilho ao fechar diálogos e um sistema de tokens de design que sustenta os dois temas.': 'The central challenge was keeping the metrics engine identical in TypeScript and Go — every streak and recurrence rule needed mirrored tests on both sides. Along the way the project also became an exercise in UX refinement: a clock that syncs on the full minute, focus returned to the trigger when dialogs close, and a design-token system sustaining both themes.',
        'Fullstack · Produtividade': 'Fullstack · Productivity',
        'Desenvolvimento fullstack — interface, motor de métricas e API': 'Fullstack development — interface, metrics engine and API',
        'Banner do projeto pulso.app': 'pulso.app project banner',
        'Dashboard com checklist do dia': 'Dashboard with the daily checklist',
        'Heatmap anual de conclusão': 'Yearly completion heatmap',
        'Módulo de finanças': 'Finances module',
        'Temporizador de foco': 'Focus timer',
        'Rastreador e análise de hábitos: React/Next.js com heatmaps, streaks, metas, finanças e temporizador, servido por uma API em Go sem dependências.': 'Habit tracker and analytics: React/Next.js with heatmaps, streaks, goals, finances and a focus timer, backed by a dependency-free Go API.',

        /* ---------- luizalombard.com.br ---------- */
        '// projeto · site em produção': '// project · production website',
        'Projeto para cliente real, do código à publicação: site de advocacia rápido, acessível e em conformidade com a LGPD, servido pelo GitHub Pages com domínio próprio.': 'A real-client project, from code to launch: a fast, accessible, LGPD-compliant law-firm website served by GitHub Pages on its own domain.',
        'Site institucional de uma advogada, no ar em luizalombard.com.br. Todo o front é HTML, CSS e JavaScript puros — sem frameworks — com tema claro/escuro sem flash de carregamento, fontes auto-hospedadas e atenção a performance e acessibilidade.': 'The institutional website of a lawyer, live at luizalombard.com.br. The whole front end is plain HTML, CSS and JavaScript — no frameworks — with a flash-free light/dark theme, self-hosted fonts and care for performance and accessibility.',
        'Um site profissional de verdade precisa de mais do que aparência: precisa carregar rápido em celular, ser encontrado no Google, tratar dados de visitantes conforme a LGPD e custar pouco para manter. E, sendo para cliente real, precisa ficar no ar de forma confiável.': 'A real professional website needs more than looks: it must load fast on mobile, be found on Google, handle visitor data under LGPD and stay cheap to maintain. And, being for a real client, it must stay reliably online.',
        'O site foi construído estático e publicado no GitHub Pages com domínio próprio via CNAME. O SEO usa dados estruturados schema.org do tipo Attorney, sitemap e robots. O script do Google Ads só carrega depois do consentimento de cookies — conformidade com a LGPD de verdade, não um banner decorativo. O formulário de contato envia por FormSubmit com honeypot anti-spam, sem backend próprio.': 'The site was built static and published on GitHub Pages with a custom domain via CNAME. SEO uses schema.org structured data of type Attorney, a sitemap and robots. The Google Ads script only loads after cookie consent — actual LGPD compliance, not a decorative banner. The contact form submits through FormSubmit with an anti-spam honeypot, with no dedicated backend.',
        'Tema claro/escuro persistente e sem flash de carregamento': 'Persistent light/dark theme with no loading flash',
        'Dados estruturados schema.org (Attorney) para SEO local': 'schema.org structured data (Attorney) for local SEO',
        'Consentimento de cookies controlando o carregamento do Google Ads': 'Cookie consent gating the Google Ads script',
        'Formulário de contato com FormSubmit e honeypot anti-spam': 'Contact form with FormSubmit and an anti-spam honeypot',
        'Fontes auto-hospedadas e imagens otimizadas': 'Self-hosted fonts and optimized images',
        'Domínio próprio no GitHub Pages via CNAME': 'Custom domain on GitHub Pages via CNAME',
        'Arquitetura deliberadamente simples: arquivos estáticos servidos pelo Pages, JavaScript separado por responsabilidade e nenhum servidor para manter. O consentimento é a peça central do fluxo: os scripts de terceiros ficam bloqueados até o visitante aceitar, e a escolha fica registrada para as próximas visitas.': 'A deliberately simple architecture: static files served by Pages, JavaScript split by responsibility and no server to maintain. Consent is the centerpiece of the flow: third-party scripts stay blocked until the visitor accepts, and the choice is remembered for future visits.',
        'O aprendizado maior foi o que existe em volta do código num projeto para cliente: DNS e domínio, LGPD aplicada na prática, SEO local e a responsabilidade de manter um site que representa o trabalho de outra pessoa. É o projeto que atravessou a fronteira entre exercício e produção.': 'The biggest learning was everything around the code in a client project: DNS and domain, LGPD applied in practice, local SEO and the responsibility of maintaining a site that represents someone else’s work. This is the project that crossed the line between exercise and production.',
        'Site · Landing Page': 'Website · Landing Page',
        'Projeto completo para cliente real — do código à publicação': 'Complete project for a real client — from code to launch',
        'Banner do projeto luizalombard.com.br': 'luizalombard.com.br project banner',
        'Página inicial do site': 'Site home page',
        'Seção de áreas de atuação': 'Practice areas section',
        'Formulário de contato': 'Contact form',
        'Versão mobile do site': 'Mobile version of the site',
        'Site profissional de advocacia no ar com domínio próprio: vanilla JS, tema claro/escuro, SEO com dados estruturados e conformidade com a LGPD.': 'Professional law-firm website live on its own domain: vanilla JS, light/dark theme, SEO with structured data and LGPD compliance.',

        /* ---------- Calculadora em C ---------- */
        '// projeto · c → webassembly': '// project · c → webassembly',
        'Todo o cérebro da calculadora é um único arquivo C sem biblioteca padrão, compilado direto para WebAssembly — o JavaScript apenas conecta os botões ao binário.': 'The calculator’s entire brain is a single C file with no standard library, compiled straight to WebAssembly — JavaScript only wires the buttons to the binary.',
        'Uma calculadora de aparência familiar escondendo um exercício de baixo nível: o motor inteiro — estado, operações, porcentagem, raiz quadrada e a conversão de número para texto — é C freestanding, sem libc, compilado para um binário WebAssembly de 12 KB que roda em qualquer navegador.': 'A familiar-looking calculator hiding a low-level exercise: the entire engine — state, operations, percentage, square root and number-to-text conversion — is freestanding C, no libc, compiled to a 12 KB WebAssembly binary that runs in any browser.',
        'Sem biblioteca padrão, nada vem de graça: não há printf para formatar números, nem sqrt pronta, nem quem decida o que acontece quando alguém digita 5 + 3 × 2 e espera o comportamento clássico de calculadora. Cada regra precisou ser definida e implementada do zero.': 'Without a standard library nothing comes for free: there is no printf to format numbers, no ready-made sqrt, and nobody to decide what happens when someone types 5 + 3 × 2 expecting classic calculator behavior. Every rule had to be defined and implemented from scratch.',
        'O motor implementa uma máquina de estados no estilo das calculadoras clássicas (5 + 3 × 2 = 16), porcentagem contextual — em soma ela age sobre o acumulado (200 + 10% = 220), em multiplicação é fração (200 × 10% = 20) —, igual repetido, raiz por Newton-Raphson e um conversor próprio de double para texto com vírgula decimal pt-BR. A compilação usa clang com alvo wasm32, sem Emscripten, orquestrada por um Makefile com alvos de build, teste e servidor local.': 'The engine implements a state machine in the style of classic calculators (5 + 3 × 2 = 16), contextual percentage — in addition it acts on the accumulator (200 + 10% = 220), in multiplication it is a fraction (200 × 10% = 20) —, repeated equals, square root via Newton-Raphson and a custom double-to-text converter with pt-BR decimal comma. Compilation uses clang targeting wasm32, no Emscripten, orchestrated by a Makefile with build, test and local-server targets.',
        'Quatro operações com encadeamento no estilo calculadora clássica': 'Four operations chained in classic calculator style',
        'Porcentagem contextual e igual repetido': 'Contextual percentage and repeated equals',
        'Raiz quadrada por Newton-Raphson e unárias aninhadas': 'Square root via Newton-Raphson and nested unary operations',
        'Formatação pt-BR feita à mão, com 15 dígitos significativos': 'Hand-built pt-BR formatting with 15 significant digits',
        'Teclado físico com feedback visual nos botões': 'Physical keyboard with visual feedback on the buttons',
        '23 casos de teste validando o motor via Node.js': '23 test cases validating the engine through Node.js',
        'Três camadas bem separadas: calc.c é o motor puro e exporta funções; app.js só traduz cliques e teclas em chamadas ao binário e escreve o resultado na tela; o HTML e o CSS cuidam da aparência. O calc.wasm versionado permite que o GitHub Pages sirva o projeto direto da raiz, sem etapa de build no deploy.': 'Three cleanly separated layers: calc.c is the pure engine and exports functions; app.js merely translates clicks and keys into calls to the binary and writes the result to the screen; HTML and CSS handle looks. The versioned calc.wasm lets GitHub Pages serve the project straight from the root, with no build step at deploy time.',
        'Os bugs mais instrutivos vieram da conversão numérica: potências de dez calculadas em laço sujavam o último dígito, resolvido com exponenciação binária; e a decisão de exibir 15 dígitos significativos — para 0,1 + 0,2 mostrar 0,3 — virou uma lição prática sobre ponto flutuante IEEE 754 e sobre escolher honestidade em vez de falsa precisão.': 'The most instructive bugs came from number conversion: powers of ten computed in a loop dirtied the last digit, fixed with binary exponentiation; and the decision to display 15 significant digits — so 0.1 + 0.2 shows 0.3 — became a practical lesson on IEEE 754 floating point and on choosing honesty over false precision.',
        'Projeto completo — motor em C, build e interface': 'Complete project — C engine, build and interface',
        'Banner do projeto Calculadora em C': 'C Calculator project banner',
        'Calculadora aberta no navegador': 'Calculator open in the browser',
        'Trecho do motor em C': 'Excerpt of the C engine',
        'Testes passando no terminal': 'Tests passing in the terminal',
        'Makefile com os alvos de build': 'Makefile with the build targets',
        'Calculadora com motor 100% em C freestanding compilado para WebAssembly: máquina de estados, porcentagem contextual e formatação pt-BR, em 12 KB.': 'A calculator with a 100% freestanding C engine compiled to WebAssembly: state machine, contextual percentage and pt-BR formatting, in 12 KB.',

        /* ---------- LinkQ ---------- */
        '// projeto · go no navegador': '// project · go in the browser',
        'O GitHub Pages não executa servidor — então o servidor virou WebAssembly: validação, códigos curtos, QR Code, DOM e tema, tudo escrito em Go e executado pelo navegador.': 'GitHub Pages runs no server — so the server became WebAssembly: validation, short codes, QR Code, DOM and theme, all written in Go and executed by the browser.',
        'O LinkQ encurta URLs e gera o QR Code de cada link, com histórico e cópia rápida. A particularidade está em onde o código roda: o projeto é Go compilado para WebAssembly, e os únicos JavaScripts da página são a ponte oficial do Go e um carregador de poucas linhas.': 'LinkQ shortens URLs and generates a QR Code for each link, with history and quick copy. What makes it unusual is where the code runs: the project is Go compiled to WebAssembly, and the only JavaScript on the page is Go’s official bridge plus a loader of a few lines.',
        'Hospedagem estática não executa nada no servidor — um encurtador tradicional, com API e banco, está fora de questão no GitHub Pages. A pergunta do projeto era: dá para manter toda a lógica em Go mesmo assim, com testes de verdade e sem reescrever o núcleo em JavaScript?': 'Static hosting executes nothing on the server — a traditional shortener, with an API and a database, is off the table on GitHub Pages. The project’s question was: can all the logic stay in Go anyway, with real tests, without rewriting the core in JavaScript?',
        'O Go é compilado com GOOS=js GOARCH=wasm e o binário vira um arquivo estático que o navegador executa. A lógica de negócio — validação e normalização de URLs, recusa de esquemas perigosos como javascript: e data:, geração de códigos curtos e o serviço de links — vive em pacotes puros, sem tocar o navegador. A persistência usa localStorage atrás de uma interface de repositório injetável, e o QR Code é gerado pela biblioteca go-qrcode vendorizada.': 'Go is compiled with GOOS=js GOARCH=wasm and the binary becomes a static file the browser executes. The business logic — URL validation and normalization, rejection of dangerous schemes like javascript: and data:, short-code generation and the link service — lives in pure packages that never touch the browser. Persistence uses localStorage behind an injectable repository interface, and the QR Code is generated by the vendored go-qrcode library.',
        'Encurtamento com código curto único e histórico local': 'Shortening with unique short codes and local history',
        'QR Code de cada link, com download em PNG': 'A QR Code for every link, downloadable as PNG',
        'Validação que recusa esquemas perigosos (javascript:, data:, file:)': 'Validation rejecting dangerous schemes (javascript:, data:, file:)',
        'Redirecionamento do link curto sem poluir o histórico do navegador': 'Short-link redirect that keeps the browser history clean',
        'Tema claro/escuro e interface controlada inteiramente pelo Go': 'Light/dark theme and a UI driven entirely by Go',
        '18 testes em Go nativo, rodando sem navegador': '18 native Go tests, running without a browser',
        'A separação é imposta pelo compilador: os pacotes de lógica não importam syscall/js e são testáveis com go test comum; os que tocam o navegador (DOM, storage, UI) carregam a build tag js && wasm e nem entram na compilação nativa. O serviço recebe o repositório por interface — trocar o localStorage por um backend de verdade seria alterar um arquivo.': 'The separation is enforced by the compiler: the logic packages never import syscall/js and are testable with plain go test; the ones touching the browser (DOM, storage, UI) carry the js && wasm build tag and are excluded from native compilation. The service receives its repository through an interface — swapping localStorage for a real backend would mean changing one file.',
        'O custo do caminho é explícito: o binário carrega o runtime do Go inteiro e pesa 3,7 MB (1 MB comprimido) — a documentação do projeto discute esse trade-off abertamente. Os QR Codes gerados foram verificados por decodificação real em múltiplas escalas, e o link curto funciona em cinco formas diferentes de hospedar a página, da raiz do Pages a subcaminhos.': 'The cost of this path is explicit: the binary ships Go’s entire runtime and weighs 3.7 MB (1 MB compressed) — the project documentation discusses that trade-off openly. The generated QR Codes were verified by real decoding at multiple scales, and the short link works across five different ways of hosting the page, from the Pages root to subpaths.',
        'Projeto completo — arquitetura, lógica e interface': 'Complete project — architecture, logic and interface',
        'Banner do projeto LinkQ': 'LinkQ project banner',
        'Encurtador com link gerado': 'Shortener with a generated link',
        'Modal do QR Code': 'QR Code modal',
        'Histórico de links': 'Link history',
        'Testes do pacote shortener': 'Shortener package tests',
        'Encurtador de URL com gerador de QR Code escrito em Go e compilado para WebAssembly — toda a lógica roda no navegador, publicado no GitHub Pages.': 'URL shortener with a QR Code generator written in Go and compiled to WebAssembly — all the logic runs in the browser, published on GitHub Pages.',

        /* ---------- DevBurguer ---------- */
        '// projeto · web backend': '// project · web backend',
        'Um site completo de hamburgueria servido por Express: as páginas são montadas no servidor, o cardápio vem de um JSON e o formulário de contato responde com páginas estilizadas na identidade do site.': 'A complete burger-joint website served by Express: pages are assembled on the server, the menu comes from a JSON file and the contact form responds with pages styled to match the site.',
        'O DevBurguer é o site de uma hamburgueria fictícia com servidor próprio em Node.js e Express: home, cardápio, contato e uma rota de API que expõe os lanches em JSON. Nasceu como desafio de bootcamp e foi retrabalhado até virar um projeto apresentável de ponta a ponta.': 'DevBurguer is the website of a fictional burger joint with its own Node.js and Express server: home, menu, contact and an API route exposing the burgers as JSON. It started as a bootcamp challenge and was reworked into a presentable end-to-end project.',
        'A base original tinha os problemas típicos de código de exercício: caminhos quebrados, dados duplicados no código, entradas do formulário indo para a resposta sem tratamento e páginas de retorno em texto puro. O objetivo foi transformar isso em um servidor correto, seguro no básico e agradável de usar.': 'The original base had the typical problems of exercise code: broken paths, data duplicated in the code, form input flowing into the response untreated and plain-text return pages. The goal was to turn that into a server that is correct, safe on the basics and pleasant to use.',
        'O servidor foi refeito: o cardápio passou a ser lido de um único JSON e servido tanto nas páginas quanto na rota /api/lanches, o formulário de contato ganhou validação e escape de HTML contra XSS, e as respostas viraram páginas completas na identidade visual do site, com botão de retorno. A porta é configurável por variável de ambiente.': 'The server was rebuilt: the menu is now read from a single JSON file and served both in the pages and at the /api/lanches route, the contact form gained validation and HTML escaping against XSS, and responses became full pages in the site’s visual identity, with a back button. The port is configurable through an environment variable.',
        'Cardápio dinâmico montado no servidor a partir de JSON': 'Dynamic menu assembled on the server from JSON',
        'Rota /api/lanches expondo os dados do cardápio': 'An /api/lanches route exposing the menu data',
        'Formulário de contato com validação e escape anti-XSS': 'Contact form with validation and anti-XSS escaping',
        'Páginas de resposta estilizadas na identidade do site': 'Response pages styled to the site’s identity',
        'Porta configurável por variável de ambiente': 'Port configurable through an environment variable',
        'Demonstração estática honesta publicada no GitHub Pages': 'An honest static demo published on GitHub Pages',
        'O Express serve os arquivos estáticos e monta as páginas dinâmicas; os dados vivem em public/data/lanches.json, lidos pelo servidor a cada uso. Como o Pages não executa Node, a pasta docs contém uma versão estática com um aviso claro de que os formulários ali são simulados — a distinção entre o que precisa de servidor e o que não precisa é parte do que o projeto ensina.': 'Express serves the static files and assembles the dynamic pages; the data lives in public/data/lanches.json, read by the server on use. Since Pages cannot run Node, the docs folder holds a static version with a clear notice that its forms are simulated — the distinction between what needs a server and what does not is part of what the project teaches.',
        'Os desafios reais estavam dentro do servidor: a rota do cardápio falhava em silêncio por ler o JSON do caminho errado, e a comparação entre o id da URL — que chega como texto — e o id numérico dos dados fazia lanches existentes voltarem como não encontrados. O mais importante foi perceber que o formulário devolvia o que o usuário digitava direto para o HTML da resposta, uma porta aberta para XSS — resolvida com uma função de escape aplicada a toda entrada. Por fim, centralizar as páginas de resposta num único helper eliminou HTML duplicado e ensinou na prática o valor de uma fonte única para cada responsabilidade.': 'The real challenges lived inside the server: the menu route failed silently by reading the JSON from the wrong path, and comparing the URL id — which arrives as text — with the numeric id in the data made existing burgers come back as not found. The most important lesson was noticing that the form echoed whatever the user typed straight into the response HTML, an open door to XSS — closed with an escaping function applied to every input. Finally, centralizing the response pages in a single helper removed duplicated HTML and taught, in practice, the value of a single source for each responsibility.',
        'Backend e front — servidor, rotas e interface': 'Backend and front end — server, routes and interface',
        'Banner do projeto DevBurguer': 'DevBurguer project banner',
        'Home do site da hamburgueria': 'Burger joint site home',
        'Cardápio de lanches': 'Burger menu',
        'Formulário de contato': 'Contact form',
        'Resposta estilizada do formulário': 'Styled form response',
        'Site de hamburgueria com servidor Node/Express: cardápio dinâmico lido de JSON, rota de API, formulário de contato e páginas de resposta estilizadas.': 'A burger-joint website with a Node/Express server: dynamic menu read from JSON, an API route, a contact form and styled response pages.',

        /* ---------- Conversor de Distância ---------- */
        '// projeto · python docker': '// project · python docker',
        'Um exercício de containerização levado a sério: aplicação Flask com identidade visual própria, publicada como imagem no Docker Hub e acompanhada de uma demo que converte de verdade no navegador.': 'A containerization exercise taken seriously: a Flask application with its own visual identity, published as an image on Docker Hub and shipped with a demo that really converts in the browser.',
        'O Conversor de Distância transforma valores entre unidades de comprimento com resultados formatados no padrão brasileiro, vírgula decimal incluída. Nasceu como desafio de Docker e foi remodelado por completo: identidade visual própria em tons de verde, tipografia dedicada e experiência de erro cuidada.': 'The Distance Converter transforms values between length units with results formatted the Brazilian way, decimal comma included. It started as a Docker challenge and was fully remodeled: its own green-toned visual identity, dedicated typography and a well-handled error experience.',
        'Além de containerizar, o desafio real foi de produto: mensagens claras quando a entrada é inválida, formulário que preserva o que o usuário digitou, números no formato local — e uma pergunta de arquitetura: como demonstrar um app Flask numa hospedagem que não executa Python?': 'Beyond containerizing, the real challenge was product-shaped: clear messages for invalid input, a form that preserves what the user typed, numbers in the local format — and an architecture question: how to demo a Flask app on hosting that cannot run Python?',
        'O app organiza as conversões num dicionário único de fatores, formata os resultados em pt-BR e roda numa imagem Docker publicada no Docker Hub, com porta configurável. Para o GitHub Pages, a resposta foi reconhecer que conversão é matemática pura: a demo em docs refaz o cálculo em JavaScript no navegador, funcional de verdade, com um aviso explicando a diferença para a versão em Flask.': 'The app organizes conversions in a single factor dictionary, formats results in pt-BR and runs in a Docker image published to Docker Hub, with a configurable port. For GitHub Pages, the answer was recognizing that conversion is pure math: the docs demo redoes the calculation in browser JavaScript, genuinely working, with a notice explaining how it differs from the Flask version.',
        'Conversão entre unidades de distância com fatores centralizados': 'Distance unit conversion with centralized factors',
        'Resultados com vírgula decimal e formatação pt-BR': 'Results with a decimal comma and pt-BR formatting',
        'Validação com mensagens claras e formulário que se repopula': 'Validation with clear messages and a self-repopulating form',
        'Imagem Docker pública no Docker Hub': 'Public Docker image on Docker Hub',
        'Demo estática funcional em JavaScript no GitHub Pages': 'A working static JavaScript demo on GitHub Pages',
        'Identidade visual própria, sem frameworks de CSS': 'Its own visual identity, no CSS frameworks',
        'No servidor, o Flask renderiza o template com o resultado calculado a partir do dicionário de fatores; o Dockerfile congela o ambiente e a imagem sobe em qualquer host com um docker run. A demo do Pages replica a mesma tabela de fatores no cliente — dois ambientes, uma só regra de negócio.': 'On the server, Flask renders the template with the result computed from the factor dictionary; the Dockerfile freezes the environment and the image runs on any host with a single docker run. The Pages demo mirrors the same factor table on the client — two environments, one business rule.',
        'O código original repetia a mesma conta em ramos quase idênticos — cada unidade nova exigiria mais um bloco copiado. A refatoração concentrou tudo num dicionário único de fatores de conversão, e adicionar unidade virou adicionar uma linha. O outro desafio foi a formatação: exibir float em padrão brasileiro exigiu cuidar da vírgula decimal e dos resíduos de ponto flutuante, e aceitar entrada com vírgula sem quebrar a conversão. Completam a lista a validação com mensagem clara em vez de erro genérico e o formulário que preserva a seleção do usuário após o envio.': 'The original code repeated the same arithmetic across nearly identical branches — every new unit would demand another copied block. The refactor concentrated everything in a single dictionary of conversion factors, and adding a unit became adding a line. The other challenge was formatting: displaying floats the Brazilian way meant handling the decimal comma and floating-point residue, and accepting comma-typed input without breaking the conversion. Rounding out the list are validation with a clear message instead of a generic error, and a form that preserves the user\'s selection after submission.',
        'Aplicação, imagem Docker e demo estática': 'Application, Docker image and static demo',
        'Banner do projeto Conversor de Distância': 'Distance Converter project banner',
        'Conversor com resultado calculado': 'Converter with a computed result',
        'Demo estática no GitHub Pages': 'Static demo on GitHub Pages',
        'Imagem no Docker Hub': 'Image on Docker Hub',
        'Execução com docker run': 'Running with docker run',
        'Conversor de unidades em Flask com formatação pt-BR, empacotado como imagem Docker pública e com demo funcional em JavaScript no GitHub Pages.': 'A Flask unit converter with pt-BR formatting, packaged as a public Docker image, with a working JavaScript demo on GitHub Pages.',

        /* dinâmicos: aria dos cards gerados por projects.js */
        'Ver estudo de caso: Fake Shop': 'View case study: Fake Shop',
        'Ver estudo de caso: DevBook': 'View case study: DevBook',
        'Ver estudo de caso: pulso.app': 'View case study: pulso.app',
        'Ver estudo de caso: luizalombard.com.br': 'View case study: luizalombard.com.br',
        'Ver estudo de caso: Calculadora em C': 'View case study: C Calculator',
        'Ver estudo de caso: LinkQ': 'View case study: LinkQ',
        'Ver estudo de caso: DevBurguer': 'View case study: DevBurguer',
        'Ver estudo de caso: Conversor de Distância': 'View case study: Distance Converter'
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
        syncButtons(next);                       // sigla PT⇄EN gira JÁ, no clique
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

    /* -------- botão de idioma (mostra o idioma atual) --------
       Aceita um idioma explícito para poder animar a sigla no
       clique, antes de o resto da troca acontecer. */
    function syncButtons(l) {
        l = l || lang;
        var btns = document.querySelectorAll('.lang-toggle');
        Array.prototype.forEach.call(btns, function (b) {
            b.classList.toggle('is-en', l === 'en');
            b.setAttribute('aria-label', l === 'en' ? 'Switch language to Portuguese' : 'Mudar idioma para inglês');
            b.setAttribute('title', l === 'en' ? 'Language: English' : 'Idioma: Português');
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
