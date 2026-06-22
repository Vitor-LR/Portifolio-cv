# Portfólio — Vitor Lombard Rocha

Site de portfólio estático (HTML + CSS + JavaScript, sem dependências/build).
Tema "console de engenharia": fundo navy com partículas, destaque ciano, terminal
animado no hero e tipografia técnica (Space Grotesk · Inter · JetBrains Mono).

## Estrutura de pastas

```
portfolio-vitor/
├── index.html              → página principal (todas as seções)
├── todos-projetos.html     → lista completa de projetos
├── projetos/               → páginas de estudo de caso (uma por projeto)
│   ├── gotask-api.html
│   ├── observastack.html
│   ├── datamart-sql.html
│   ├── sites-marcas.html
│   └── urlshort.html
├── assets/
│   ├── css/style.css       → todo o estilo (cores no :root, no topo)
│   ├── js/
│   │   ├── projects.js     → LISTA ÚNICA de projetos (ver abaixo)
│   │   ├── main.js         → menu, tema, scroll reveal, terminal, contadores
│   │   ├── particles.js    → background de partículas (constelação)
│   │   ├── github-contrib.js → calendário de contribuições do GitHub (ao vivo)
│   │   ├── github-langs.js   → linguagens mais usadas do GitHub (ao vivo)
│   │   └── contact-form.js   → formulário (FormSubmit + popup de confirmação)
│   ├── img/                → coloque aqui suas imagens (prints, banners, og)
│   ├── cv/CV-Vitor-Rocha.pdf → currículo usado no botão "Baixar CV"
│   ├── favicon.png
│   └── apple-touch-icon.png
├── sitemap.xml
├── robots.txt
└── LEIA-ME.md
```

## Projetos — fonte única em `assets/js/projects.js`

Os cards de projeto **não** ficam escritos no HTML: são gerados a partir de uma
lista única no arquivo `assets/js/projects.js`. Edite SÓ esse arquivo.

- A **home** (`index.html`) mostra automaticamente apenas os **4 primeiros** da lista.
- A página **todos-projetos.html** mostra **todos**.

### Como adicionar um projeto

1. Em `projects.js`, copie um bloco `{ ... }` e cole no fim da lista.
2. Preencha os campos:
   - `titulo`, `categoria`, `glyph` (texto grande da capa), `descricao`, `tags`
   - `pagina`  → caminho do estudo de caso (ex.: `projetos/meu-projeto.html`)
   - `codigo`  → URL do repositório no GitHub (botão "Código")
   - `demo`    → URL do projeto publicado. Controla o botão "Ver projeto":
     com URL, abre o projeto em nova aba; com `#` (ou vazio), abre a página
     do estudo de caso.
3. Crie a página do estudo de caso em `projetos/` (duplique uma existente, como
   `gotask-api.html`, e troque o conteúdo).

Para destacar um projeto na home, mova o bloco dele para entre os 4 primeiros.
A ordem na lista é a prioridade.

## Páginas de projeto (estudo de caso)

Em cada arquivo de `projetos/`:

- **Botões "Ver projeto" / "Ver código"**: aparecem no topo e na barra lateral.
  Troque o `href="#"` (Ver projeto) e o `https://github.com/` (Ver código) pelos
  links reais.
- **Capa grande** (`.case-banner`): troque o `<span class="banner-glyph">...</span>`
  por `<img src="../assets/img/seu-banner.png" alt="...">`.
- **Screenshots** (`.gallery`): troque cada `<span class="ph">[ ... ]</span>` por
  `<img src="../assets/img/seu-print.png" alt="...">`.

O CSS já está pronto para receber as imagens (formato e recorte automáticos).
Imagens ficam em `assets/img/` e, dentro de `projetos/`, são referenciadas com
`../assets/img/...`.

## Formulário de contato

Usa o **FormSubmit** (https://formsubmit.co) — não precisa de servidor. Ao enviar,
abre um popup "não sou um robô" e, confirmando, a mensagem é enviada por AJAX e
aparece um popup de agradecimento (sem trocar de página).

Na primeira vez que alguém enviar, o FormSubmit manda um e-mail de confirmação
para **vitor04082@gmail.com**. Basta confirmar uma vez.

O card de e-mail (na seção de contato) abre a janela de composição do **Gmail**
já endereçada a você.

## O que trocar ANTES de publicar

1. **Domínio** — `seudominio.com` aparece no `canonical` de cada página, no
   `sitemap.xml`, no `robots.txt` e no campo `_next` do formulário (`index.html`).
   Troque pela URL real.
2. **Links dos projetos** — `codigo`/`demo` no `projects.js` e os botões nas
   páginas de `projetos/` ainda usam `https://github.com/` e `#`. Troque pelos
   links reais.
3. **Estatísticas** — na seção "em números" do `index.html`, ajuste os valores em
   `data-count="..."` conforme a realidade.
4. **Imagens** — substitua os placeholders (glyphs e `[ print ... ]`) por imagens
   reais em `assets/img/`.
5. **Open Graph** — descomente e preencha `og:url` e `og:image` no `index.html`
   para um preview bonito ao compartilhar.

## Como visualizar localmente

O ideal é rodar um servidor local (para os caminhos entre páginas funcionarem):

```bash
# dentro da pasta do projeto
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Como publicar (grátis)

- **Netlify** ou **Vercel**: arraste a pasta inteira ou conecte um repositório do
  GitHub.
- **GitHub Pages**: suba a pasta em um repositório e ative o Pages.

## Acessibilidade & performance

- Respeita `prefers-reduced-motion` (desliga partículas/animações).
- Tema claro/escuro com persistência e sem "flash" ao carregar.
- Foco visível no teclado, HTML semântico e SEO básico (meta tags + Open Graph).
- Sem bibliotecas externas além das fontes do Google — carrega rápido.
- As partículas pausam quando a aba perde o foco (economia de bateria/CPU).

## Cores (trocar tema)

Todas as cores estão em variáveis no topo do `style.css`, dentro de `:root`
(e do bloco `[data-theme="light"]` para o tema claro). Para mudar o destaque,
altere `--accent` e `--accent-2` (e o `--gradient`).


//before claude