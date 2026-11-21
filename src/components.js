/*
  Componentes reutilizáveis do website IMP NH.
  Cada função devolve HTML estático. As classes usam o prefixo "nh-"
  para não colidir com temas/plugins quando o código for colado em
  blocos HTML do WordPress / Elementor.
*/
const D = require('./data');
const { icon } = require('./icons');

const kz = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Kz';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const waLink = (t) => `https://wa.me/${t.wa}?text=${encodeURIComponent(D.CONTACTOS.mensagemWhatsApp)}`;
const mapsSearch = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const mapsEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

const cursosVisiveis = () =>
  D.CURSOS.filter((c) => c.ativo && (c.confirmado || D.MOSTRAR_POR_CONFIRMAR));
const areaById = (id) => D.AREAS.find((a) => a.id === id);

const NAV = [
  { href: '', label: 'Início' },
  { href: 'sobre/', label: 'Sobre nós' },
  { href: 'polos/', label: 'Os nossos polos' },
  { href: 'cursos/', label: 'Cursos' },
  { href: 'admissoes/', label: 'Admissões' },
  { href: 'contactos/', label: 'Contactos' },
];

/* ---------- Header + MobileMenu ---------- */
function Header(r, current) {
  const link = (n) =>
    `<li><a href="${r}${n.href}"${current === n.href ? ' aria-current="page"' : ''}>${n.label}</a></li>`;
  return `
<a class="nh-skip" href="#conteudo">Saltar para o conteúdo</a>
<header class="nh-header" data-header>
  <div class="nh-container nh-header__bar">
    <a class="nh-brand" href="${r}" aria-label="${D.INSTITUICAO.nome}, página inicial">
      <img class="nh-brand__logo" src="${r}assets/img/logo-imp-nh.png" alt="" width="58" height="48">
      <span class="nh-brand__text"><span class="nh-brand__top">Instituto Politécnico Privado</span><span class="nh-brand__name">Novos Horizontes</span></span>
    </a>
    <nav class="nh-nav" aria-label="Navegação principal">
      <ul>${NAV.map(link).join('')}</ul>
    </nav>
    <a class="nh-btn nh-btn--gold nh-header__cta" href="${r}pre-inscricao/"><span class="nh-hide-xs">Fazer&nbsp;</span>pré-inscrição</a>
    <button class="nh-burger" type="button" aria-expanded="false" aria-controls="nh-menu" data-menu-toggle>
      <span class="nh-sr">Abrir menu</span>${icon('menu')}
    </button>
  </div>
  <div class="nh-mobile" id="nh-menu" hidden data-menu>
    <nav aria-label="Navegação móvel">
      <ul>${NAV.map(link).join('')}
        <li><a href="${r}propinas/"${current === 'propinas/' ? ' aria-current="page"' : ''}>Propinas 2026/2027</a></li>
        <li><a href="${r}galeria/"${current === 'galeria/' ? ' aria-current="page"' : ''}>Galeria</a></li>
      </ul>
    </nav>
    <a class="nh-btn nh-btn--gold nh-btn--block" href="${r}pre-inscricao/">Fazer pré-inscrição</a>
    <div class="nh-mobile__tel">${D.CONTACTOS.telefones.map((t) => `<a href="tel:${t.tel}">${icon('phone')} ${t.label}</a>`).join('')}</div>
  </div>
</header>`;
}

/* ---------- SectionHeader ---------- */
function SectionHeader({ eyebrow, title, text = '', align = 'left', tag = 'h2', light = false }) {
  return `<div class="nh-sh nh-sh--${align}${light ? ' nh-sh--light' : ''}" data-reveal>
  ${eyebrow ? `<p class="nh-eyebrow">${eyebrow}</p>` : ''}
  <${tag} class="nh-sh__title">${title}</${tag}>
  ${text ? `<p class="nh-sh__text">${text}</p>` : ''}
</div>`;
}

/* ---------- PageHero (cabeçalho das páginas internas) ---------- */
function PageHero(r, { eyebrow, title, text = '', img, crumbs = [], tone = 'bordo', actions = '' }) {
  return `<section class="nh-phero nh-phero--${tone}">
  <img class="nh-phero__bg" src="${r}assets/img/${img}" alt="" fetchpriority="high">
  <div class="nh-container nh-phero__inner">
    <nav class="nh-crumbs" aria-label="Localização na página"><a href="${r}">Início</a>${crumbs
      .map((c) => `<span aria-hidden="true">/</span>${c.href ? `<a href="${r}${c.href}">${c.label}</a>` : `<span aria-current="page">${c.label}</span>`}`)
      .join('')}</nav>
    ${eyebrow ? `<p class="nh-eyebrow nh-eyebrow--light">${eyebrow}</p>` : ''}
    <h1 class="nh-phero__title">${title}</h1>
    ${text ? `<p class="nh-phero__text">${text}</p>` : ''}
    ${actions ? `<div class="nh-actions">${actions}</div>` : ''}
  </div>
</section>`;
}

/* ---------- PoloCard ---------- */
function PoloCard(r, polo, variant) {
  const areas = D.AREAS.filter((a) => a.polo === polo.id);
  return `<article class="nh-polo nh-polo--${variant}" data-reveal>
  <div class="nh-polo__media"><img src="${r}assets/img/${polo.imagem}" alt="${polo.imagemAlt}" loading="lazy"></div>
  <div class="nh-polo__body">
    <p class="nh-polo__tag">${polo.nome}</p>
    <h3 class="nh-polo__title">${polo.titulo}</h3>
    <p class="nh-polo__text">${polo.resumo}</p>
    <ul class="nh-polo__areas">${areas.map((a) => `<li>${icon(a.icone)}<span>${a.nomeCurto || a.nome}</span></li>`).join('')}</ul>
    <a class="nh-btn ${variant === 'one' ? 'nh-btn--gold' : 'nh-btn--light'}" href="${r}${polo.url}">Explorar ${polo.nome} ${icon('arrow')}</a>
  </div>
</article>`;
}

/* ---------- CourseCard ---------- */
function CourseCard(c) {
  const a = areaById(c.area);
  const polo = D.POLOS[a.polo];
  return `<article class="nh-course nh-course--${a.polo}" data-course data-polo="${a.polo}" data-area="${a.id}">
  <div class="nh-course__icon">${icon(c.icone)}</div>
  <div class="nh-course__meta"><span>${polo.nome}</span><span aria-hidden="true">·</span><span>${a.nomeCurto || a.nome}</span></div>
  <h3 class="nh-course__title">${c.nome}</h3>
  ${c.confirmado ? '' : '<p class="nh-badge" title="Disponibilidade para 2026/2027 a confirmar pela direção">Oferta a confirmar</p>'}
  <p class="nh-course__desc">${c.desc}</p>
  <button class="nh-course__btn" type="button" data-course-open="${c.id}">Consultar informações ${icon('arrow')}</button>
</article>`;
}

/* ---------- CourseCategory (área + cursos) ---------- */
function CourseCategory(area) {
  const cursos = cursosVisiveis().filter((c) => c.area === area.id);
  if (!cursos.length) return '';
  return `<section class="nh-cat nh-cat--${area.id}" id="${area.id}" aria-labelledby="cat-${area.id}">
  <div class="nh-cat__head" data-reveal>
    <span class="nh-cat__icon">${icon(area.icone)}</span>
    <div><p class="nh-eyebrow">Área de</p><h2 class="nh-cat__title" id="cat-${area.id}">${area.nome}</h2><p class="nh-cat__intro">${area.intro}</p></div>
    <span class="nh-cat__count">${cursos.length} ${cursos.length === 1 ? 'curso' : 'cursos'}</span>
  </div>
  <div class="nh-grid nh-grid--courses">${cursos.map(CourseCard).join('')}</div>
</section>`;
}

/* ---------- CourseFilter ---------- */
function CourseFilter() {
  const f = [
    { k: 'todos', l: 'Todos os cursos' },
    { k: 'polo:polo-i', l: 'Polo I' },
    { k: 'polo:polo-ii', l: 'Polo II' },
    ...D.AREAS.map((a) => ({ k: 'area:' + a.id, l: a.nomeCurto || a.nome })),
  ];
  return `<div class="nh-filter" role="group" aria-label="Filtrar cursos" data-filter>
  ${f.map((x, i) => `<button type="button" class="nh-chip" data-filter-key="${x.k}" aria-pressed="${i === 0}">${x.l}</button>`).join('')}
</div>`;
}

/* ---------- Modal de curso (partilhado) ---------- */
function CourseModal(r) {
  return `<div class="nh-modal" data-modal hidden>
  <div class="nh-modal__backdrop" data-modal-close></div>
  <div class="nh-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="nh-modal-title" tabindex="-1">
    <button class="nh-modal__close" type="button" data-modal-close><span class="nh-sr">Fechar</span>${icon('close')}</button>
    <div class="nh-modal__icon" data-m="icon"></div>
    <p class="nh-modal__meta" data-m="meta"></p>
    <h2 class="nh-modal__title" id="nh-modal-title" data-m="title"></h2>
    <p class="nh-badge" data-m="badge" hidden>Oferta a confirmar: disponibilidade para 2026/2027 sujeita a validação da direção.</p>
    <p class="nh-modal__desc" data-m="desc"></p>
    <p class="nh-modal__note">Duração, plano curricular e horários: pergunte à secretaria. Respondemos por telefone ou WhatsApp.</p>
    <div class="nh-modal__fees" data-m="fees"></div>
    <div class="nh-actions">
      <a class="nh-btn nh-btn--primary" data-m="pre" href="${r}pre-inscricao/">Fazer pré-inscrição</a>
      <a class="nh-btn nh-btn--outline" data-m="wa" href="${waLink(D.CONTACTOS.telefones[0])}" target="_blank" rel="noopener">${icon('whatsapp')} Perguntar no WhatsApp</a>
    </div>
  </div>
</div>`;
}

function CoursesJSON() {
  const data = cursosVisiveis().map((c) => {
    const a = areaById(c.area);
    return { id: c.id, nome: c.nome, desc: c.desc, confirmado: c.confirmado, area: a.id, areaNome: a.nome, polo: a.polo, poloNome: D.POLOS[a.polo].nome, icon: icon(c.icone) };
  });
  const fees = {};
  ['polo-i', 'polo-ii'].forEach((p, i) => {
    const k = i === 0 ? 'p1' : 'p2';
    fees[p] = { matricula: kz(D.PRECARIO.taxas[0][k]), propina10: kz(D.PRECARIO.propinas[0][k]), propina13: kz(D.PRECARIO.propinas[3][k]) };
  });
  return `<script type="application/json" id="nh-cursos">${JSON.stringify({ cursos: data, fees, areas: D.AREAS.map((a) => ({ id: a.id, nome: a.nome, polo: a.polo })), periodos: D.PERIODOS })}</script>`;
}

/* ---------- MissionVisionCard ---------- */
function MissionVisionCard({ k, title, text, ic }) {
  return `<article class="nh-mv nh-mv--${k}" data-reveal>
  <span class="nh-mv__icon">${icon(ic)}</span>
  <h3 class="nh-mv__title">${title}</h3>
  <p class="nh-mv__text">${text}</p>
</article>`;
}

/* ---------- ValueCard ---------- */
function ValueCard(v, i) {
  return `<article class="nh-value" data-reveal style="--d:${i * 60}ms">
  <div class="nh-value__top"><span class="nh-value__num">${String(i + 1).padStart(2, '0')}</span>${icon(v.ic)}</div>
  <h3 class="nh-value__title">${v.t}</h3>
  <p class="nh-value__text">${v.d}</p>
</article>`;
}
const VALORES = [
  { t: 'Excelência', ic: 'award', d: 'Compromisso com elevados padrões de qualidade no ensino e na formação técnica.' },
  { t: 'Ética e Responsabilidade', ic: 'scale', d: 'Atuação baseada em princípios morais, respeito e responsabilidade social.' },
  { t: 'Inovação', ic: 'bulb', d: 'Adoção contínua de metodologias modernas e soluções pedagógicas inovadoras.' },
  { t: 'Compromisso com o Aluno', ic: 'student', d: 'Foco no desenvolvimento académico, profissional e humano dos estudantes.' },
  { t: 'Inclusão e Cidadania', ic: 'hands', d: 'Promoção da igualdade de oportunidades e do respeito pela diversidade.' },
  { t: 'Parceria com o Mercado', ic: 'handshake', d: 'Alinhamento da formação com as necessidades reais do mercado de trabalho.' },
];
const MISSAO =
  'Formar quadros técnicos de excelência, ética e competência profissional, capazes de responder às exigências do mercado nacional e internacional, contribuindo de forma sustentável para o desenvolvimento da sociedade através de uma educação de qualidade.';
const VISAO =
  'Ser uma instituição de ensino médio politécnico de referência a nível nacional e internacional, reconhecida pela qualidade do ensino, inovação pedagógica e impacto positivo na formação de profissionais altamente qualificados.';

/* ---------- Diferenciais ---------- */
const PILARES = [
  { t: 'Ensino de Qualidade', ic: 'shield', d: 'Valorização do conhecimento e da qualidade no processo de formação.' },
  { t: 'Formação para a Vida', ic: 'book', d: 'Desenvolvimento académico, humano e profissional.' },
  { t: 'Disciplina e Excelência', ic: 'award', d: 'Compromisso com responsabilidade, dedicação e qualidade.' },
  { t: 'Inovação e Futuro', ic: 'rocket', d: 'Valorização de metodologias modernas e preparação para novos desafios.' },
];
function Pillars() {
  return `<section class="nh-section nh-pillars" aria-labelledby="pilares-t">
  <div class="nh-container">
    ${SectionHeader({ eyebrow: 'O que nos distingue', title: '<span id="pilares-t">Mais do que ensinar, preparar para a vida.</span>', align: 'center', light: true })}
    <div class="nh-grid nh-grid--4">
      ${PILARES.map((p, i) => `<article class="nh-pillar" data-reveal style="--d:${i * 80}ms"><span class="nh-pillar__icon">${icon(p.ic)}</span><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}
    </div>
  </div>
</section>`;
}

/* ---------- AdmissionCTA ---------- */
function AdmissionCTA(r) {
  const t = D.PRECARIO.taxas[0];
  return `<section class="nh-section nh-admcta" aria-labelledby="admcta-t">
  <div class="nh-container nh-admcta__inner" data-reveal>
    <div class="nh-admcta__copy">
      <p class="nh-eyebrow nh-eyebrow--light">Ano Lectivo ${D.INSTITUICAO.anoLectivo}</p>
      <h2 id="admcta-t" class="nh-admcta__title">Investe no teu futuro, transforma a tua vida!</h2>
      <p>Matrículas para a 10ª, 11ª, 12ª e 13ª classe nos dois polos. O preçário completo está publicado, sem letras pequenas.</p>
      <div class="nh-actions"><a class="nh-btn nh-btn--gold" href="${r}admissoes/">Como fazer a matrícula</a><a class="nh-btn nh-btn--ghost" href="${r}propinas/">Ver preçário completo</a></div>
    </div>
    <dl class="nh-admcta__facts">
      <div><dt>Inscrição e matrícula · Polo I</dt><dd>${kz(t.p1)}</dd></div>
      <div><dt>Inscrição e matrícula · Polo II</dt><dd>${kz(t.p2)}</dd></div>
      <div><dt>Propina mensal 10ª classe · Polo I</dt><dd>${kz(D.PRECARIO.propinas[0].p1)}</dd></div>
      <div><dt>Propina mensal 10ª classe · Polo II</dt><dd>${kz(D.PRECARIO.propinas[0].p2)}</dd></div>
    </dl>
  </div>
</section>`;
}

/* ---------- PriceTable ---------- */
function PriceTable({ id, title, caption, col, rows, ic }) {
  return `<div class="nh-price" data-reveal>
  <div class="nh-price__head"><span class="nh-price__icon">${icon(ic)}</span><h2 class="nh-price__title" id="${id}">${title}</h2></div>
  <div class="nh-price__wrap">
  <table class="nh-table" aria-labelledby="${id}">
    <caption class="nh-sr">${caption}</caption>
    <thead><tr><th scope="col">${col}</th><th scope="col" class="nh-num nh-th-p1">Polo I</th><th scope="col" class="nh-num nh-th-p2">Polo II</th></tr></thead>
    <tbody>${rows.map((x) => `<tr><th scope="row">${x.desc}</th><td class="nh-num" data-label="Polo I">${kz(x.p1)}</td><td class="nh-num" data-label="Polo II">${kz(x.p2)}</td></tr>`).join('')}</tbody>
  </table>
  </div>
</div>`;
}
function PriceTables() {
  return `<div class="nh-prices">
  ${PriceTable({ id: 'tab-taxas', title: 'Taxas administrativas', caption: 'Taxas administrativas do ano lectivo 2026/2027, por polo', col: 'Descrição', rows: D.PRECARIO.taxas, ic: 'clipboard' })}
  ${PriceTable({ id: 'tab-propinas', title: 'Propinas mensais', caption: 'Propinas mensais do ano lectivo 2026/2027, por classe e por polo', col: 'Classe', rows: D.PRECARIO.propinas, ic: 'wallet' })}
</div>
<p class="nh-note" data-reveal>${icon('info')}<span><strong>Os valores apresentados correspondem ao preçário disponibilizado para o ano lectivo 2026/2027.</strong> Para esclarecimentos adicionais, contacte a instituição.</span></p>`;
}

/* ---------- Formulários ---------- */
const field = (id, label, input, hint = '') =>
  `<div class="nh-field"><label for="${id}">${label}</label>${input}${hint ? `<p class="nh-hint" id="${id}-hint">${hint}</p>` : ''}</div>`;

function PreRegistrationForm() {
  const opt = (v, l) => `<option value="${v}">${l}</option>`;
  return `<form class="nh-form" data-demo-form data-form-type="pre-inscricao" novalidate>
  <!-- Integração futura: substituir por Fluent Forms / WPForms / CF7 mantendo os "name" dos campos. -->
  <fieldset><legend>Dados do candidato</legend>
    <div class="nh-form__grid">
      ${field('pi-nome', 'Nome completo do candidato <span aria-hidden="true">*</span>', '<input id="pi-nome" name="nome_candidato" type="text" autocomplete="name" required>')}
      ${field('pi-nasc', 'Data de nascimento <span aria-hidden="true">*</span>', '<input id="pi-nasc" name="data_nascimento" type="date" required>')}
      ${field('pi-tel', 'Número de telefone <span aria-hidden="true">*</span>', '<input id="pi-tel" name="telefone" type="tel" inputmode="tel" autocomplete="tel" placeholder="9XX XXX XXX" required>')}
      ${field('pi-wa', 'WhatsApp', '<input id="pi-wa" name="whatsapp" type="tel" inputmode="tel" placeholder="Se for diferente do telefone">')}
      ${field('pi-enc', 'Nome do encarregado de educação', '<input id="pi-enc" name="encarregado" type="text">')}
    </div>
  </fieldset>
  <fieldset><legend>Formação pretendida</legend>
    <div class="nh-form__grid">
      ${field('pi-polo', 'Polo pretendido <span aria-hidden="true">*</span>', `<select id="pi-polo" name="polo" required data-polo-select>${opt('', 'Escolha o polo')}${opt('polo-i', 'Polo I — Administração, Serviços e Saúde')}${opt('polo-ii', 'Polo II — Áreas Técnicas e Engenharia')}</select>`)}
      ${field('pi-area', 'Área de formação <span aria-hidden="true">*</span>', `<select id="pi-area" name="area" required disabled data-area-select>${opt('', 'Escolha primeiro o polo')}</select>`)}
      ${field('pi-curso', 'Curso pretendido <span aria-hidden="true">*</span>', `<select id="pi-curso" name="curso" required disabled data-curso-select>${opt('', 'Escolha primeiro a área')}</select>`, '')}
      ${field('pi-classe', 'Classe pretendida <span aria-hidden="true">*</span>', `<select id="pi-classe" name="classe" required>${opt('', 'Escolha a classe')}${['10ª', '11ª', '12ª', '13ª'].map((c) => opt(c + ' Classe', c + ' Classe')).join('')}</select>`)}
      <div class="nh-field" data-periodo-field hidden><label for="pi-periodo">Período pretendido</label><select id="pi-periodo" name="periodo"></select></div>
    </div>
    <p class="nh-hint" data-curso-note hidden>${icon('info')} Este curso está marcado como <strong>oferta a confirmar</strong> para 2026/2027. A secretaria confirma a disponibilidade quando entrar em contacto.</p>
  </fieldset>
  ${field('pi-msg', 'Mensagem adicional', '<textarea id="pi-msg" name="mensagem" rows="4"></textarea>')}
  <p class="nh-form__req">Campos com * são obrigatórios.</p>
  <button class="nh-btn nh-btn--primary nh-btn--lg" type="submit">Enviar pré-inscrição</button>
  <div class="nh-form__ok" role="status" tabindex="-1" hidden>${icon('check')}<p>Obrigado pelo seu interesse no Instituto Politécnico Privado Novos Horizontes. O seu pedido foi registado nesta demonstração. Para confirmar a inscrição, entre em contacto com a instituição.</p></div>
</form>`;
}

function ContactForm() {
  return `<form class="nh-form nh-form--compact" data-demo-form data-form-type="contacto" novalidate>
  <!-- Integração futura: formulário nativo do WordPress (Fluent Forms / CF7). -->
  <div class="nh-form__grid">
    ${field('ct-nome', 'Nome <span aria-hidden="true">*</span>', '<input id="ct-nome" name="nome" type="text" autocomplete="name" required>')}
    ${field('ct-tel', 'Telefone <span aria-hidden="true">*</span>', '<input id="ct-tel" name="telefone" type="tel" inputmode="tel" autocomplete="tel" required>')}
    ${field('ct-email', 'Email (opcional)', '<input id="ct-email" name="email" type="email" autocomplete="email">')}
    ${field('ct-assunto', 'Assunto <span aria-hidden="true">*</span>', '<select id="ct-assunto" name="assunto" required><option value="">Escolha o assunto</option><option>Cursos</option><option>Admissões e matrículas</option><option>Propinas e taxas</option><option>Outro assunto</option></select>')}
  </div>
  ${field('ct-msg', 'Mensagem <span aria-hidden="true">*</span>', '<textarea id="ct-msg" name="mensagem" rows="5" required></textarea>')}
  <button class="nh-btn nh-btn--primary" type="submit">Enviar mensagem</button>
  <div class="nh-form__ok" role="status" tabindex="-1" hidden>${icon('check')}<p>Mensagem registada nesta demonstração. O formulário ainda não está ligado à secretaria: para uma resposta, ligue ou envie WhatsApp para ${D.CONTACTOS.telefones[0].label}.</p></div>
</form>`;
}

/* ---------- LocationCard ---------- */
function LocationCard(l, i, withMap = true) {
  return `<article class="nh-loc" data-reveal style="--d:${i * 80}ms">
  ${withMap ? `<div class="nh-loc__map"><iframe title="Mapa: ${esc(l.morada)}" src="${mapsEmbed(l.pesquisa)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>` : ''}
  <div class="nh-loc__body">
    <span class="nh-loc__icon">${icon('pin')}</span>
    <div><p class="nh-loc__label">${l.titulo} · ${l.zona}</p><h3 class="nh-loc__addr">${l.morada}</h3></div>
    <a class="nh-btn nh-btn--outline nh-btn--sm" href="${mapsSearch(l.pesquisa)}" target="_blank" rel="noopener">Abrir localização ${icon('arrow')}</a>
  </div>
</article>`;
}

/* ---------- GalleryGrid ---------- */
const GALERIA = [
  { f: 'vida-academica-01.jpg', c: 'vida', t: 'Encontro de estudantes no pavilhão' },
  { f: 'saude-estudantes.jpg', c: 'saude', t: 'Estudantes da área de saúde no laboratório' },
  { f: 'informatica-aula-01.jpg', c: 'informatica', t: 'Aula prática na sala de informática' },
  { f: 'campus-patio-01.jpg', c: 'instalacoes', t: 'Pátio interior do instituto' },
  { f: 'saude-microscopio-02.jpg', c: 'saude', t: 'Trabalho ao microscópio' },
  { f: 'vida-academica-02.jpg', c: 'vida', t: 'Actividade no pátio do instituto' },
  { f: 'informatica-aula-02.jpg', c: 'informatica', t: 'Estudante numa aula de informática' },
  { f: 'saude-enfermagem-01.jpg', c: 'saude', t: 'Prática em sala de enfermagem' },
  { f: 'campus-fachada.jpg', c: 'instalacoes', t: 'Entrada e painel de cursos' },
  { f: 'saude-laboratorio-02.jpg', c: 'saude', t: 'Laboratório com microscópios' },
  { f: 'vida-academica-03.jpg', c: 'vida', t: 'Estudantes reunidos numa actividade' },
  { f: 'informatica-sala-01.jpg', c: 'informatica', t: 'Sala de informática' },
  { f: 'saude-nutricao.jpg', c: 'saude', t: 'Apresentação de trabalhos da área de saúde' },
  { f: 'campus-patio-03.jpg', c: 'instalacoes', t: 'Vista do pátio a partir do primeiro piso' },
  { f: 'saude-microscopio-01.jpg', c: 'saude', t: 'Estudante no laboratório' },
  { f: 'informatica-aula-03.jpg', c: 'informatica', t: 'Aula de informática' },
  { f: 'campus-entardecer.jpg', c: 'instalacoes', t: 'Varanda do instituto ao fim da tarde' },
  { f: 'saude-enfermagem-02.jpg', c: 'saude', t: 'Sala de prática de enfermagem' },
  { f: 'vida-academica-04.jpg', c: 'vida', t: 'Estudante no instituto' },
  { f: 'sala-desenho.jpg', c: 'instalacoes', t: 'Sala de aula com bancadas' },
  { f: 'campus-entrada-01.jpg', c: 'instalacoes', t: 'Corredor e pátio do instituto' },
  { f: 'saude-laboratorio-01.jpg', c: 'saude', t: 'Estudantes no laboratório de saúde' },
  { f: 'vida-academica-05.jpg', c: 'vida', t: 'Estudante com o painel do instituto' },
  { f: 'campus-patio-04.jpg', c: 'instalacoes', t: 'Pátio interior' },
];
const GAL_CATS = [
  { k: 'vida', l: 'Vida académica' },
  { k: 'administracao', l: 'Administração e Gestão' },
  { k: 'saude', l: 'Saúde' },
  { k: 'informatica', l: 'Informática' },
  { k: 'mecanica', l: 'Mecânica' },
  { k: 'construcao', l: 'Construção Civil' },
  { k: 'electricidade', l: 'Electricidade e Electrónica' },
  { k: 'instalacoes', l: 'Instalações' },
];
function GalleryGrid(r) {
  // Só aparecem filtros de categorias com fotografias. Para ativar Mecânica,
  // Construção, etc., basta acrescentar imagens com essa categoria em GALERIA.
  const used = GAL_CATS.filter((c) => GALERIA.some((g) => g.c === c.k));
  return `<div class="nh-filter nh-filter--center" role="group" aria-label="Filtrar galeria" data-gallery-filter>
  <button type="button" class="nh-chip" data-filter-key="todos" aria-pressed="true">Todas</button>
  ${used.map((c) => `<button type="button" class="nh-chip" data-filter-key="${c.k}" aria-pressed="false">${c.l}</button>`).join('')}
</div>
<div class="nh-gallery" data-gallery>
  ${GALERIA.map((g, i) => `<figure class="nh-gallery__item" data-cat="${g.c}">
    <button type="button" class="nh-gallery__btn" data-lightbox="${i}" aria-label="Ampliar: ${esc(g.t)}">
      <img src="${r}assets/img/${g.f}" alt="${esc(g.t)}" loading="lazy">
      <span class="nh-gallery__zoom">${icon('expand')}</span>
    </button>
    <figcaption>${g.t}</figcaption>
  </figure>`).join('')}
</div>
<div class="nh-lightbox" data-lb hidden role="dialog" aria-modal="true" aria-label="Galeria ampliada">
  <button class="nh-lightbox__close" type="button" data-lb-close><span class="nh-sr">Fechar</span>${icon('close')}</button>
  <button class="nh-lightbox__nav nh-lightbox__nav--prev" type="button" data-lb-prev><span class="nh-sr">Anterior</span>${icon('chevL')}</button>
  <figure><img data-lb-img alt=""><figcaption data-lb-cap></figcaption></figure>
  <button class="nh-lightbox__nav nh-lightbox__nav--next" type="button" data-lb-next><span class="nh-sr">Seguinte</span>${icon('chevR')}</button>
</div>`;
}

/* ---------- CTA final ---------- */
function FinalCTA(r) {
  return `<section class="nh-final" aria-labelledby="final-t">
  <img class="nh-final__bg" src="${r}assets/img/campus-entardecer.jpg" alt="" loading="lazy">
  <div class="nh-container nh-final__inner" data-reveal>
    <span class="nh-final__rule" aria-hidden="true"></span>
    <h2 id="final-t" class="nh-final__title">A educação é um tesouro. <em>Investe no teu futuro!</em></h2>
    <p>Construímos horizontes de conhecimento e formamos líderes para transformar o futuro.</p>
    <div class="nh-actions nh-actions--center"><a class="nh-btn nh-btn--light" href="${r}cursos/">Explorar os cursos</a><a class="nh-btn nh-btn--gold" href="${r}pre-inscricao/">Fazer pré-inscrição</a></div>
  </div>
</section>`;
}

/* ---------- WhatsAppButton ---------- */
function WhatsAppButton() {
  return `<div class="nh-wa" data-wa>
  <div class="nh-wa__panel" id="nh-wa-panel" hidden data-wa-panel>
    <p class="nh-wa__title">Fale connosco no WhatsApp</p>
    <p class="nh-wa__sub">Escolha um dos números da secretaria.</p>
    ${D.CONTACTOS.telefones.map((t) => `<a class="nh-wa__opt" href="${waLink(t)}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t.label}</span>${icon('arrow')}</a>`).join('')}
  </div>
  <button class="nh-wa__btn" type="button" aria-expanded="false" aria-controls="nh-wa-panel" data-wa-toggle>
    ${icon('whatsapp')}<span class="nh-sr">Contactar pelo WhatsApp</span>
  </button>
</div>`;
}

/* ---------- Footer ---------- */
function Footer(r) {
  const nav = [['', 'Início'], ['sobre/', 'Sobre nós'], ['polos/', 'Os nossos polos'], ['cursos/', 'Cursos'], ['admissoes/', 'Admissões'], ['propinas/', 'Propinas'], ['galeria/', 'Galeria'], ['contactos/', 'Contactos']];
  const redes = D.CONTACTOS.redes.filter((s) => s.url);
  return `<footer class="nh-footer">
  <div class="nh-container nh-footer__grid">
    <div class="nh-footer__brand">
      <img src="${r}assets/img/logo-imp-nh.png" alt="Logótipo do IMP NH" width="96" height="80" loading="lazy">
      <p class="nh-footer__name">Instituto Politécnico Privado Novos Horizontes</p>
      <p class="nh-footer__sigla">IMP NH</p>
      <p class="nh-footer__motto">“A educação é um tesouro!”</p>
      <p class="nh-footer__phrase">Educar hoje, transformar amanhã.</p>
      ${redes.length ? `<div class="nh-footer__social">${redes.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.nome}">${icon(s.nome.toLowerCase())}</a>`).join('')}</div>` : ''}
    </div>
    <div><h2 class="nh-footer__h">Navegação</h2><ul>${nav.map(([h, l]) => `<li><a href="${r}${h}">${l}</a></li>`).join('')}</ul></div>
    <div><h2 class="nh-footer__h">Formação</h2><ul>${D.AREAS.map((a) => `<li><a href="${r}${D.POLOS[a.polo].url}#${a.id}">${a.nome}</a></li>`).join('')}</ul></div>
    <div><h2 class="nh-footer__h">Contactos</h2><ul class="nh-footer__contacts">${D.CONTACTOS.telefones.map((t) => `<li><a href="tel:${t.tel}">${icon('phone')}${t.label}</a></li>`).join('')}</ul>
      <h2 class="nh-footer__h nh-footer__h--sp">Localizações</h2><ul class="nh-footer__contacts">${D.LOCALIZACOES.map((l) => `<li><span>${icon('pin')}${l.morada}</span></li>`).join('')}</ul></div>
  </div>
  <div class="nh-footer__bottom"><div class="nh-container"><p>© 2026 Instituto Politécnico Privado Novos Horizontes. Todos os direitos reservados.</p><p>Website desenvolvido por <strong>Rodasil</strong>.</p></div></div>
</footer>`;
}

module.exports = {
  D, icon, kz, esc, waLink, mapsSearch, cursosVisiveis, areaById,
  Header, SectionHeader, PageHero, PoloCard, CourseCard, CourseCategory, CourseFilter, CourseModal, CoursesJSON,
  MissionVisionCard, ValueCard, VALORES, MISSAO, VISAO, Pillars, PILARES, AdmissionCTA, PriceTables, PriceTable,
  PreRegistrationForm, ContactForm, LocationCard, GalleryGrid, FinalCTA, WhatsAppButton, Footer,
};
