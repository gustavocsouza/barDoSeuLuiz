# Bar do Luiz Fernandes — Guia do Projeto

## Informações do Negócio

**Nome:** Bar do Luiz Fernandes (BDL)
**Slogan:** "Boteco com alma desde 1970"
**Frase de destaque:** "Os petiscos mais gostosos de toda Zona Norte!"
**Reconhecimento:** "O bar mais tradicional de SP"
**Site oficial:** bardoluizfernandes.com.br
**Loja online:** lojabdl.com.br

### História

Em 1942, Eduardo Fernandes e sua esposa Idalina tocavam um pequeno empório na Rua Augusto Tolle com o lema "Produtos nacionais e estrangeiros. Não tememos concorrência." Com a chegada dos supermercados, o negócio foi abalado. Em 1970, Seu Luiz, sua mãe e sua esposa (ambas chamadas Idalina) transformaram a mercearia num pequeno bar no Mandaqui, zona norte de São Paulo — onde já reinava o famoso bolinho de carne. No fim dos anos 70, Eduardo (filho de Seu Luiz), aos 12 anos, já atendia mesas e expandia o cardápio. Durante a pandemia de 2020, a família lançou o bolinho frito e congelado com tecnologia de ultracongelamento e passou a oferecer PF toda sexta-feira.

### Localização

**Unidade principal:** Rua Augusto Tolle, 610 — Mandaqui, São Paulo
O bar tem ao menos duas unidades com cardápios distintos (Andorinha e Augusto Tolle) e uma Cervejaria.

### Horários de Funcionamento

- Terças a Sextas: 16h00 – 24h00
- Sábados: 11h00 – 20h00
- Domingos: 11h00 – 18h00

### Contato e Redes Sociais

- Telefone: (11) 2976-3556
- E-mail: bar.luiz@terra.com.br
- Instagram: @bardoluizf / instagram.com/bardoluizf/
- Facebook: /bardoluizfernandes / facebook.com/bardoluizfernandes/
- Delivery: Rappi e iFood

### Cardápio — Petiscos Principais

| # | Nome | Destaque |
|---|------|----------|
| 01 | Bolinho de Carne | Mais tradicional da casa desde os anos 1970. Vencedor Melhor Petisco Veja SP (2013) e Melhor Petisco Datafolha (2015). |
| 02 | Surpresa da Dona Idalina | Carne moída, tomate seco e surpresa. Vencedor Boteco Bohemia 2006 e Mais Você (Ana Maria Braga). |
| 03 | Bolinho Maravilha | Linguiça blumenau e picles. Sabores mais intensos. |
| 04 | Bolinho de Bacalhau | Tradicional, segundo lugar em concurso de petiscos. |
| 05 | Quarentinha | Massa de batata, muçarela ralada, tomate seco, manjericão, miolo de alcachofra e aliche. |
| 06 | Croquete de Carne | Clássico. |
| 07 | Coxinha de Frango | — |
| 08 | Pastéis | De carne, queijo e palmito. |
| 09 | Garbanzo | — |
| 10 | Bolovo | — |
| 11 | Frango à Passarinho | — |
| 12 | Bolinho Rabo de Touro | — |

### Batidas Artesanais ("De Geração em Geração")

Tradição de cinco décadas. Comercializadas em garrafa com rolha de cortiça em 7 sabores: Maracujá, Amendoim, Coco, Mel, Milho, Vinho com morango, Espanhola.

### Produtos para Levar (Linha Congelados)

Bolinho de Carne e Bolinho de Bacalhau fritos e congelados, prontos para aquecer em casa. Tecnologia de ultracongelamento. Disponíveis em pontos físicos em São Paulo.

### PF (Prato Feito)

Toda sexta-feira, um prato feito especial. Opções anunciadas pelas redes sociais. Recomenda-se chegar cedo.

### Eventos (BDL no seu Evento)

Buffet/catering para residências, escritórios, lojas, varandas gourmet e outros espaços. Cardápio personalizado. Orçamento: (11) 2976-3556 ou formulário no site.

### Equipe

- **Eduardo** (bisavô) — Fundador do empório em 1942. Nasceu num navio vindo da Espanha.
- **Idalina** (bisavó) — Matriarca responsável pelos petiscos. "Todo quitute virava obra de arte em suas mãos."
- **Seu Luiz** — Fundador do bar em 1970. Por muitos anos o rosto do Bar do Luiz.
- **Dona Idalina** — Aprendeu a cozinhar com a sogra; criou inúmeros petiscos da casa.
- **Luiz Eduardo** — Filho de Seu Luiz. Atende todos os frequentadores, bom de papo, engraçado, muito ativo.
- **Catarina** — Filha mais velha de Luiz Eduardo. Idealizou a linha de bolinhos congelados.
- **Carol** — Filha do meio. Garante que tudo corra 100% no boteco.
- **Clara** — Caçula. Gerencia projetos como o novo rótulo das batidas artesanais.
- **Rita** — Visão de terapeuta; traz um olhar mais humano nas decisões.

### Depoimento

> "A credibilidade desse estabelecimento é tão grande que quando saio de casa e minha mulher, Marisa, pergunta onde vou, se respondo 'É no Bar do Luiz', ela fica tranquila."
> — Ronaldo "Pantera" Lopes

---

## Arquitetura do Projeto

### Stack

- **Framework:** Next.js 16.2.6 (App Router) — **ATENÇÃO:** esta versão tem breaking changes. Leia os guias em `node_modules/next/dist/docs/` antes de escrever código novo.
- **Runtime:** React 19.2.4
- **Linguagem:** TypeScript 5
- **Animações:** GSAP 3.15 + ScrollTrigger, SplitType 0.3, Framer Motion 12
- **Scroll suave:** Lenis 1.3 + @studio-freight/lenis 1.0
- **Estilos:** Tailwind CSS v4 (via @tailwindcss/postcss)
- **Lint:** ESLint 9 + eslint-config-next

### Estrutura de Arquivos

```
app/
  layout.tsx          — RootLayout, metadata, fontes Google, providers
  page.tsx            — Página principal: monta todas as seções
  globals.css         — Estilos globais, variáveis CSS, utilitários
  favicon.ico

components/
  sections/
    HeroSection.tsx         — Seção hero com animação de entrada (GSAP + SplitType)
    StorytellingSection.tsx — 3 painéis de narrativa com scroll reveal
    AboutSection.tsx        — Seção "Nossa História" com imagem + texto + stats + marquee
    MenuSection.tsx         — Grade de cards do cardápio com hover interativo
    ExperienceSection.tsx   — Seção pinada com tipografia cinematográfica (GSAP ScrollTrigger pin)
    CTASection.tsx          — CTA final com endereço, horários, contato e rodapé
  bottle/
    BeerBottle.tsx          — Modelo 3D/visual da garrafa
    BottleScene.tsx         — Cena da garrafa fixada (fixed), animada via master timeline
  ui/
    Navbar.tsx              — Barra de navegação
    MobileNav.tsx           — Menu mobile
    CustomCursor.tsx        — Cursor personalizado
    GrainOverlay.tsx        — Overlay de textura de grão
    ScrollProgress.tsx      — Barra de progresso de scroll
  providers/
    SmoothScrollProvider.tsx — Wrapper do Lenis

hooks/
  useBottleMasterTimeline.ts — Hook que controla a timeline principal da garrafa
```

### Fontes (CSS Variables)

- `var(--font-bebas)` — Bebas Neue: títulos grandes, números decorativos
- `var(--font-libre)` — Libre Baskerville: textos em itálico, citações
- `var(--font-grotesk)` — Space Grotesk: labels, legendas, corpo de texto pequeno

### Paleta de Cores

| Variável / Hex | Uso |
|----------------|-----|
| `#F4EFE4` | Fundo creme (cor base de quase todas as seções) |
| `#0A0A0A` | Preto: títulos, texto principal |
| `#C41E3A` | Vermelho: destaques, labels, regras decorativas |
| `#6B6B6B` | Cinza: texto secundário, legendas |
| `#ECE6D6` | Creme escuro: fundo da faixa marquee em AboutSection |
| `#0A0A0A` | Preto: fundo de ExperienceSection |

---

## Mapeamento de Conteúdo — O que Trocar

Todo o conteúdo atual é da cervejaria fictícia "Iron Crow Brewery". Abaixo está o mapeamento preciso do que substituir em cada arquivo.

### `app/layout.tsx`

| Campo | Antes | Depois |
|-------|-------|--------|
| `lang` no `<html>` | `"en"` | `"pt-BR"` |
| `metadata.title` | `'Iron Crow Brewery — Craft Beer & Bar'` | `'Bar do Luiz Fernandes — Boteco com alma desde 1970'` |
| `metadata.description` | `'Small-batch craft beer brewed with obsession...'` | `'Os petiscos mais gostosos de toda Zona Norte! Boteco tradicional no Mandaqui, São Paulo, desde 1970.'` |
| `openGraph.title` | `'Iron Crow Brewery'` | `'Bar do Luiz Fernandes'` |
| `openGraph.description` | `'Brewed with obsession.'` | `'Boteco com alma desde 1970.'` |

---

### `components/sections/HeroSection.tsx`

| Elemento | Antes | Depois |
|----------|-------|--------|
| Texto de fundo gigante (`bgTextRef`) | `CROW` | `BDL` |
| Subheading acima do título | `Small-batch · Handcrafted` | `Boteco tradicional · Desde 1970` |
| Headline principal (`taglineRef`) | `BREWED<br/>WITH<br/>OBSESSION` | `PETISCOS<br/>COM<br/>ALMA` |
| Subtítulo inferior esquerdo | `A bar that takes its beer as seriously as its art. Downtown, every night.` | `O boteco mais tradicional da Zona Norte. Todo dia, desde 1970.` |
| Texto decorativo inferior | `6.5% ABV · 355ml` | `Mandaqui · São Paulo` |

---

### `components/sections/StorytellingSection.tsx`

**Header:**

| Campo | Antes | Depois |
|-------|-------|--------|
| Label esquerdo | `The Process` | `A História` |
| Label direito | `Iron Crow Brewery` | `Bar do Luiz Fernandes` |

**Array `PANELS`** — substituir os 3 objetos:

```ts
const PANELS = [
  {
    num: '01',
    word: 'HISTÓRIA',
    accent: 'Tudo começou num empório.',
    body: 'Em 1942, Eduardo e Idalina Fernandes tocavam um pequeno armazém na Rua Augusto Tolle com o lema: "Produtos nacionais e estrangeiros. Não tememos concorrência."',
    align: 'left' as const,
  },
  {
    num: '02',
    word: 'TRADIÇÃO',
    accent: 'O boteco nasceu em 1970.',
    body: 'Seu Luiz transformou a mercearia num bar no Mandaqui. Ali já reinava o famoso bolinho de carne — consumido no local ou levado para casa, acompanhado de batidas artesanais.',
    align: 'center' as const,
  },
  {
    num: '03',
    word: 'FAMÍLIA',
    accent: 'Quatro gerações no balcão.',
    body: 'De Eduardo aos 12 anos atendendo mesas, a Catarina idealizando os congelados e Clara cuidando do novo rótulo das batidas — o Bar do Luiz é feito por quem ama.',
    align: 'right' as const,
  },
]
```

---

### `components/sections/AboutSection.tsx`

| Elemento | Antes | Depois |
|----------|-------|--------|
| Header label "Our Story" | `Our Story` | `Nossa História` |
| Texto SVG dentro da ilustração (`<text>`) | `BREW` | `BDL` |
| Label da imagem (canto inferior esquerdo) | `Iron Crow Brewery — Downtown` | `Bar do Luiz Fernandes — Mandaqui, SP` |
| Tag acima do título | `The Art of Craft` | `Mais de 50 Anos` |
| Headline (`headlineRef`) | `Born from a<br />single obsession` | `Nascido de uma<br />família e uma paixão` |
| Citação em itálico | `"We started with one question: what would the perfect beer taste like? Three years and 200 batches later, Iron Crow was born."` | `"Seu Luiz transformou uma mercearia num boteco e criou o petisco mais premiado da Zona Norte."` |
| Parágrafo descritivo | `Founded in 2024, our downtown brewery...` | `Fundado em 1970 no Mandaqui, o Bar do Luiz Fernandes é aberto ao público de terça a domingo. Venha provar diretamente os petiscos premiados e entender por que tradição tem sabor.` |
| Stats (3 cards) | `200L / 28 / 4` | Ver abaixo |

**Substituir o array de stats:**
```ts
[
  { num: '1970', label: 'Ano de fundação' },
  { num: '50+',  label: 'Anos de tradição' },
  { num: '4',    label: 'Gerações da família' },
]
```

**Marquee (faixa inferior):**
Substituir o texto `IRON CROW BREWERY &nbsp;·&nbsp; CRAFT BEER &nbsp;·&nbsp; EST. 2024 &nbsp;·` por:
`BAR DO LUIZ FERNANDES &nbsp;·&nbsp; BOTECO COM ALMA &nbsp;·&nbsp; EST. 1970 &nbsp;·`

---

### `components/sections/MenuSection.tsx`

**Header:**

| Campo | Antes | Depois |
|-------|-------|--------|
| Label superior | `On Tap` | `Petiscos` |
| Título grande | `WHAT'S<br/>ON TAP` | `NOSSO<br/>CARDÁPIO` |
| Subtítulo | `Four rotating recipes. Brewed on-site. Always fresh.` | `Petiscos premiados. Feitos na hora. Tradição de 50 anos.` |

**Array `BEERS`** — renomear para `PETISCOS` e substituir os 4 objetos:

```ts
const PETISCOS = [
  {
    id: 'bolinho-carne',
    num: '01',
    name: 'Bolinho de Carne',
    style: 'Petisco Clássico',
    abv: '★★★',
    ibu: 'Desde 1970',
    color: '#A03010',
    desc: 'O mais tradicional da casa. Vencedor do prêmio Melhor Petisco da Veja SP (2013) e Melhor Petisco Datafolha (2015). Um clássico inigualável.',
    notes: ['Premiado', 'Tradicional', 'Ícone'],
    tagline: 'O bolinho que fez história.',
  },
  {
    id: 'surpresa-idalina',
    num: '02',
    name: 'Surpresa da Dona Idalina',
    style: 'Petisco Campeão',
    abv: '★★★',
    ibu: 'Boteco Bohemia 2006',
    color: '#C9920D',
    desc: 'Carne moída, tomate seco e… surpresa. Vencedor do Boteco Bohemia 2006 e do Concurso de Botequim do programa Mais Você (Ana Maria Braga).',
    notes: ['Premiado', 'Exclusivo', 'Surpresa'],
    tagline: 'Todo quitute vira obra de arte.',
  },
  {
    id: 'quarentinha',
    num: '03',
    name: 'Quarentinha',
    style: 'Petisco Especial',
    abv: '★★★',
    ibu: 'Receita Autoral',
    color: '#E8B840',
    desc: 'Massa de batata, muçarela ralada, tomate seco, manjericão, miolo de alcachofra e aliche. Uma combinação de sabores intensa e memorável.',
    notes: ['Autoral', 'Intenso', 'Especial'],
    tagline: 'Uma explosão de sabor em cada mordida.',
  },
  {
    id: 'bolinho-bacalhau',
    num: '04',
    name: 'Bolinho de Bacalhau',
    style: 'Petisco Tradicional',
    abv: '★★★',
    ibu: '2º Lugar Concurso',
    color: '#6B6B6B',
    desc: 'Receita tradicional, segundo lugar no concurso de petiscos. Crocante por fora, macio por dentro — um clássico da culinária portuguesa adaptado com alma paulistana.',
    notes: ['Clássico', 'Crocante', 'Premiado'],
    tagline: 'Tradição que cruza gerações.',
  },
]
```

Atualizar também todas as referências ao array `BEERS` no JSX para `PETISCOS` (no `.map` e no `ref`).

---

### `components/sections/ExperienceSection.tsx`

| Elemento | Antes | Depois |
|----------|-------|--------|
| Corner tag | `The Experience` | `A Experiência` |
| Counter | `04 / 06` | `04 / 06` (manter) |
| Headline linha 1 (`line1Ref`) | `DRINK` | `BOTECO` |
| Headline linha 2 (`line2Ref`, contorno vermelho) | `DIFFERENT` | `DE VERDADE` |
| Subtítulo | `Every glass is a declaration of intent. We don't brew for the masses — we brew for the moment.` | `Cada petisco é uma declaração de amor. Não fazemos para as massas — fazemos para quem sabe o que é bom.` |
| Texto decorativo inferior | `Iron Crow · Downtown` | `Bar do Luiz · Mandaqui` |

---

### `components/sections/CTASection.tsx`

| Elemento | Antes | Depois |
|----------|-------|--------|
| Tag superior | `Come find us` | `Nos Encontre` |
| Headline | `VISIT US<br/>TONIGHT` | `VENHA NOS<br/>VISITAR` |
| Subtítulo | `The bar is open. The tank is full. The only thing missing is you.` | `O boteco está aberto. O petisco está fresquinho. Só falta você.` |

**Info grid** — substituir o array dos 3 cards:
```ts
[
  { label: 'Endereço', value: 'Rua Augusto Tolle, 610\nMandaqui, São Paulo' },
  { label: 'Horários', value: 'Ter–Sex  16h00 – 24h00\nSáb  11h00 – 20h00  ·  Dom  11h00 – 18h00' },
  { label: 'Contato',  value: '(11) 2976-3556\nbar.luiz@terra.com.br' },
]
```

**Botões CTA:**

| Antes | Depois |
|-------|--------|
| `Reserve a Table` | `Pedir pelo iFood` |
| `See Our Menu` | `Ver o Cardápio` |

**Rodapé:**

| Elemento | Antes | Depois |
|----------|-------|--------|
| Nome da marca | `IRON CROW BREWERY` | `BAR DO LUIZ FERNANDES` |
| Links sociais | `['Instagram', 'Facebook', 'Untappd']` | `['Instagram', 'Facebook', 'iFood']` |
| Copyright | `© 2024 Iron Crow` | `© 1970 Bar do Luiz Fernandes` |

---

### `components/ui/Navbar.tsx` e `components/ui/MobileNav.tsx`

Verificar e substituir qualquer ocorrência de "Iron Crow" ou "Iron Crow Brewery" pelo nome "Bar do Luiz Fernandes" ou "BDL". Manter a estrutura de navegação atual.

---

## Imagens do Site Oficial

Todas as imagens foram retiradas do site oficial bardoluizfernandes.com.br (CDN Wix). Elas devem ser baixadas para `public/images/` e usadas nos componentes conforme o mapeamento abaixo.

### Passo 1 — Baixar as imagens

Execute os comandos abaixo na raiz do projeto para criar a pasta e baixar todas as imagens:

```bash
mkdir -p public/images

# Identidade
curl -L "https://static.wixstatic.com/media/d748db_6b454c7f81f3403cb445b8a305c5f79c~mv2.png" -o public/images/logo-bdl.png
curl -L "https://static.wixstatic.com/media/d748db_84d50fac96bf4a7b97a93d652a6d9324~mv2.png" -o public/images/logo-ifood.png

# Ambiente do bar
curl -L "https://static.wixstatic.com/media/d748db_028272449ab44d6994b08f2789350508~mv2.png" -o public/images/bar-hero.png
curl -L "https://static.wixstatic.com/media/d748db_00b0b9fb73d84db1a76114fb42627f7e~mv2.jpeg" -o public/images/bar-cheio.jpeg
curl -L "https://static.wixstatic.com/media/d748db_3cfb15f25c604590b221e30c38781c6a~mv2.jpg" -o public/images/bar-parede-azul.jpg
curl -L "https://static.wixstatic.com/media/d748db_5a9dd8cb095c4b4e8dcf16750936aafb~mv2.jpg" -o public/images/bar-ambiente.jpg
curl -L "https://static.wixstatic.com/media/d748db_3a30941fbabf4d7585cddaa599af92e0~mv2.png" -o public/images/bar-parede-amarela.png

# Petiscos
curl -L "https://static.wixstatic.com/media/d748db_802254d9ebed4827aa9242c305d1552f~mv2.jpg" -o public/images/petisco-bolinho-carne.jpg
curl -L "https://static.wixstatic.com/media/d748db_145a5fd94aaf4acbad99e9baa3d03e8a~mv2.jpg" -o public/images/petisco-surpresa-idalina.jpg
curl -L "https://static.wixstatic.com/media/d748db_c692828d91b7412790f4bb691dbb3bbe~mv2.jpg" -o public/images/petisco-rabo-touro.jpg
curl -L "https://static.wixstatic.com/media/d748db_c3a04cd107384645a5dcf80a2e472d3e~mv2.jpg" -o public/images/petisco-bolovo.jpg
curl -L "https://static.wixstatic.com/media/d748db_8701adbe7dd3419c99588ec8f7086409~mv2.jpg" -o public/images/petisco-garbanzo.jpg
curl -L "https://static.wixstatic.com/media/d748db_15e5fb4cd74b4be58b1bc3c640087fca~mv2.jpg" -o public/images/petisco-frango.jpg
curl -L "https://static.wixstatic.com/media/d748db_5180d2a048304f1a9ee92ff7f3629134~mv2.png" -o public/images/congelados.png
curl -L "https://static.wixstatic.com/media/d748db_b1b0195d7aaa478e897bcba0ec463c31~mv2.jpeg" -o public/images/pf-feijuca.jpeg

# Equipe
curl -L "https://static.wixstatic.com/media/d748db_203d73cb50ef46bca03451c465f9186a~mv2.png" -o public/images/equipe-eduardo.png
curl -L "https://static.wixstatic.com/media/d748db_8b154dc3d13f4a7aa8309ed7977768c7~mv2.png" -o public/images/equipe-idalina.png
curl -L "https://static.wixstatic.com/media/d748db_46a45e837a3b40018362bd86ffccc97d~mv2.png" -o public/images/equipe-seu-luiz.png
curl -L "https://static.wixstatic.com/media/d748db_ac0fc5605f7f440a8747a5549e5437c2~mv2.png" -o public/images/equipe-dona-idalina.png
curl -L "https://static.wixstatic.com/media/d748db_cf0b5a1a47544c7999a15401daa7c0b5~mv2.png" -o public/images/equipe-luiz-eduardo.png
curl -L "https://static.wixstatic.com/media/d748db_8e96b42988b04bc28887e0c5f4793a96~mv2.png" -o public/images/equipe-catarina.png
curl -L "https://static.wixstatic.com/media/d748db_f39fb8c5fc03416b9e226b1e6a7bd6d9~mv2.png" -o public/images/equipe-carol.png
curl -L "https://static.wixstatic.com/media/d748db_d3cb2d0af8c84661aa1c13078983e6c5~mv2.png" -o public/images/equipe-clara.png
curl -L "https://static.wixstatic.com/media/d748db_1e022ba6cbbe4619b24c131089b537e5~mv2.png" -o public/images/equipe-rita.png

# Outros
curl -L "https://static.wixstatic.com/media/d748db_5ebe0bdadd84412fa032340c38af3887~mv2.png" -o public/images/testimonial-bg.png
```

### Passo 2 — Mapeamento de uso nos componentes

Use `next/image` (`<Image>`) para todas as imagens. O `src` deve ser o caminho local `/images/nome-do-arquivo`.

#### `components/ui/Navbar.tsx` e `components/ui/MobileNav.tsx`
- Substituir qualquer logo textual/SVG pelo logotipo real:
  ```tsx
  import Image from 'next/image'
  <Image src="/images/logo-bdl.png" alt="Bar do Luiz Fernandes" width={120} height={60} />
  ```

#### `components/sections/HeroSection.tsx`
- Adicionar imagem de fundo `bar-hero.png` como `<Image>` com `fill` e `objectFit="cover"` atrás do conteúdo:
  ```tsx
  import Image from 'next/image'
  // Dentro do <section>, antes do conteúdo, com position absolute:
  <Image src="/images/bar-hero.png" alt="" fill style={{ objectFit: 'cover', opacity: 0.12 }} aria-hidden />
  ```

#### `components/sections/StorytellingSection.tsx`
- No painel 01 (HISTÓRIA), adicionar `bar-parede-azul.jpg` como fundo com baixa opacidade
- No painel 03 (FAMÍLIA), adicionar `equipe-seu-luiz.png` como imagem decorativa

#### `components/sections/AboutSection.tsx`
- Substituir o placeholder SVG escuro (div com `background: radial-gradient(...)`) por:
  ```tsx
  import Image from 'next/image'
  // No lugar do div .img-inner com gradiente:
  <Image src="/images/bar-cheio.jpeg" alt="Bar do Luiz Fernandes lotado" fill style={{ objectFit: 'cover' }} />
  ```
- No banner marquee inferior, opcionalmente adicionar `bar-parede-amarela.png` como fundo

#### `components/sections/MenuSection.tsx`
- Adicionar uma propriedade `image` ao array `PETISCOS` e renderizar com `<Image>` no topo de cada card:

| Card | Imagem |
|------|--------|
| Bolinho de Carne (01) | `/images/petisco-bolinho-carne.jpg` |
| Surpresa da Dona Idalina (02) | `/images/petisco-surpresa-idalina.jpg` |
| Quarentinha (03) | *(sem imagem específica — manter card sem foto)* |
| Bolinho de Bacalhau (04) | *(sem imagem específica — manter card sem foto)* |

Adicionar ao objeto do petisco:
```ts
{ id: 'bolinho-carne', ..., image: '/images/petisco-bolinho-carne.jpg' }
```
Renderizar no card com altura fixa (ex: 160px), `objectFit: cover`.

#### `components/sections/ExperienceSection.tsx`
- Adicionar `bar-ambiente.jpg` como fundo da seção escura com `opacity: 0.15`:
  ```tsx
  <Image src="/images/bar-ambiente.jpg" alt="" fill style={{ objectFit: 'cover', opacity: 0.15 }} aria-hidden />
  ```

#### `components/sections/CTASection.tsx`
- No botão "Pedir pelo iFood", exibir o logo do iFood ao lado do texto:
  ```tsx
  <Image src="/images/logo-ifood.png" alt="iFood" width={24} height={24} />
  ```
- No rodapé da seção, usar o logo BDL no lugar do texto `BAR DO LUIZ FERNANDES`:
  ```tsx
  <Image src="/images/logo-bdl.png" alt="Bar do Luiz Fernandes" width={100} height={50} />
  ```

### Notas importantes

- **`next/image` exige `width` e `height` explícitos** para imagens estáticas, ou `fill` + `position: relative/absolute` no container pai.
- **Imagens com `fill`**: o elemento pai precisa de `position: relative` (ou absolute) e dimensões definidas.
- **Alt text**: imagens decorativas usam `alt=""` e `aria-hidden`. Imagens de conteúdo usam descrição real.
- Os arquivos ficam em `public/images/` e são servidos pelo Next.js em `/images/nome-do-arquivo`.
