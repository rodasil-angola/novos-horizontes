/*
  Gera o site estático em ../site a partir de data.js + components.js.
  Uso:  node src/build.js
*/
const fs = require('fs');
const path = require('path');
const C = require('./components');
const { D, icon, kz } = C;

const OUT = path.join(__dirname, '..', 'site');

function layout({ slug, title, desc, body, extraHead = '', ogImg = 'vida-academica-01.jpg' }) {
  const depth = slug ? slug.split('/').filter(Boolean).length : 0;
  const r = '../'.repeat(depth);
  const canonical = D.INSTITUICAO.url + '/' + slug;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: D.INSTITUICAO.nome,
    alternateName: D.INSTITUICAO.sigla,
    slogan: D.INSTITUICAO.lema,
    url: D.INSTITUICAO.url + '/',
    logo: D.INSTITUICAO.url + '/assets/img/logo-imp-nh.png',
    telephone: D.CONTACTOS.telefones.map((t) => t.tel),
  };
  return `<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">${D.INSTITUICAO.preview ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_AO">
<meta property="og:site_name" content="${D.INSTITUICAO.nome}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${D.INSTITUICAO.url}/assets/img/${ogImg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#641C32">
<link rel="icon" type="image/png" href="${r}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/css/main.css">
<script>document.documentElement.classList.add('nh-js')</script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
${extraHead}
</head>
<body>
${C.Header(r, slug)}
<main id="conteudo">
${body(r)}
</main>
${C.Footer(r)}
${C.WhatsAppButton()}
<script src="${r}assets/js/main.js" defer></script>
</body>
</html>
`;
}

const btn = (href, label, cls = 'primary', ic = '') => `<a class="nh-btn nh-btn--${cls}" href="${href}">${label}${ic ? ' ' + icon(ic) : ''}</a>`;

/* ===================== PÁGINAS ===================== */
const pages = [];

/* ---------- INÍCIO ---------- */
pages.push({
  slug: '',
  title: 'Instituto Politécnico Privado Novos Horizontes | IMP NH',
  desc: 'Conheça o Instituto Politécnico Privado Novos Horizontes, em Talatona, Luanda. Formação nas áreas de Administração, Saúde, Informática, Mecânica, Construção Civil e Engenharia.',
  body: (r) => `
<section class="nh-hero" aria-labelledby="hero-t">
  <img class="nh-hero__bg" src="${r}assets/img/vida-academica-01.jpg" alt="" fetchpriority="high">
  <div class="nh-container nh-hero__inner">
    <div class="nh-hero__copy">
      <p class="nh-eyebrow nh-eyebrow--light">Instituto Politécnico Privado</p>
      <h1 id="hero-t" class="nh-hero__title">Educar hoje, <em>transformar amanhã.</em></h1>
      <p class="nh-hero__text">Construímos horizontes de conhecimento e formamos profissionais preparados para os desafios de um mundo em constante transformação.</p>
      <div class="nh-actions">${btn(r + 'cursos/', 'Explorar os cursos', 'gold', 'arrow')}${btn(r + 'admissoes/', 'Informações sobre matrículas', 'ghost')}</div>
    </div>
    <div class="nh-hero__mark" aria-hidden="true">
      <span class="nh-hero__mono">IMP<span>NH</span></span>
      <span class="nh-hero__motto">A educação é um tesouro</span>
    </div>
  </div>
  <div class="nh-hero__strip">
    <ul class="nh-container">
      <li>${icon('shield')}<span>Ensino de qualidade</span></li>
      <li>${icon('book')}<span>Formação para a vida</span></li>
      <li>${icon('award')}<span>Disciplina e excelência</span></li>
    </ul>
  </div>
</section>

<section class="nh-section nh-intro" aria-labelledby="intro-t">
  <div class="nh-container nh-split">
    <div class="nh-split__media nh-frame" data-reveal>
      <img src="${r}assets/img/saude-estudantes.jpg" alt="Estudantes da área de saúde do IMP NH com batas brancas no laboratório" loading="lazy">
      <span class="nh-frame__tag">Ano lectivo ${D.INSTITUICAO.anoLectivo}</span>
    </div>
    <div class="nh-split__copy">
      ${C.SectionHeader({ eyebrow: 'Quem somos', title: '<span id="intro-t">Construímos horizontes de conhecimento.</span>' })}
      <div data-reveal>
        <p>O Instituto Politécnico Privado Novos Horizontes é uma instituição orientada para a formação académica e técnico-profissional, para jovens que querem construir um futuro com conhecimento, competência e responsabilidade.</p>
        <p>A oferta está organizada em dois polos: Administração, Serviços e Saúde num, e as áreas técnicas no outro (Informática, Mecânica, Construção Civil, Electricidade, Electrónica e Telecomunicações).</p>
        <p>O que nos orienta é simples. Valorizar o conhecimento, formar para a vida e desenvolver competências que a sociedade angolana realmente precisa.</p>
        <div class="nh-actions">${btn(r + 'sobre/', 'Conheça o instituto', 'primary', 'arrow')}</div>
      </div>
    </div>
  </div>
</section>

<section class="nh-section nh-section--alt nh-polos" aria-labelledby="polos-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Dois polos de formação', title: '<span id="polos-t">Escolha por onde começa o seu percurso.</span>', text: 'Cada polo reúne um conjunto de áreas. Comece pelo que mais lhe interessa e veja os cursos de cada um.', align: 'center' })}
    <div class="nh-polos__grid">
      ${C.PoloCard(r, D.POLOS['polo-i'], 'one')}
      ${C.PoloCard(r, D.POLOS['polo-ii'], 'two')}
    </div>
  </div>
</section>

<section class="nh-section nh-areas" aria-labelledby="areas-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Oferta formativa', title: `<span id="areas-t">Seis áreas, ${C.cursosVisiveis().length} cursos.</span>`, text: 'Toque numa área para ver os cursos que a compõem.' })}
    <div class="nh-areas__grid">
      ${D.AREAS.map((a, i) => {
        const n = C.cursosVisiveis().filter((c) => c.area === a.id).length;
        return `<a class="nh-area" href="${r}cursos/#area:${a.id}" data-reveal style="--d:${i * 60}ms">
          <span class="nh-area__icon">${icon(a.icone)}</span>
          <span class="nh-area__polo">${D.POLOS[a.polo].nome}</span>
          <span class="nh-area__name">${a.nome}</span>
          <span class="nh-area__count">${n} ${n === 1 ? 'curso' : 'cursos'} ${icon('arrow')}</span>
        </a>`;
      }).join('')}
    </div>
  </div>
</section>

${C.Pillars()}
${C.AdmissionCTA(r)}

<section class="nh-section nh-section--alt" aria-labelledby="loc-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Onde estamos', title: '<span id="loc-t">Em Talatona, Luanda.</span>', text: 'Duas referências para chegar até nós.' })}
    <div class="nh-grid nh-grid--2">${D.LOCALIZACOES.map((l, i) => C.LocationCard(l, i, false)).join('')}</div>
    <div class="nh-actions">${btn(r + 'contactos/', 'Ver mapas e contactos', 'outline', 'arrow')}</div>
  </div>
</section>

${C.FinalCTA(r)}`,
});

/* ---------- SOBRE ---------- */
pages.push({
  slug: 'sobre/',
  title: 'Sobre o Instituto | IMP NH Novos Horizontes',
  desc: 'Missão, visão e valores do Instituto Politécnico Privado Novos Horizontes, instituição de ensino médio politécnico em Talatona, Luanda.',
  ogImg: 'saude-estudantes.jpg',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Sobre nós', title: 'A educação é um tesouro.', text: 'Uma instituição de ensino médio politécnico em Talatona, com formação académica e técnico-profissional em dois polos.', img: 'campus-patio-01.jpg', crumbs: [{ label: 'Sobre nós' }] })}

<section class="nh-section" aria-labelledby="sobre-t">
  <div class="nh-container nh-split nh-split--rev">
    <div class="nh-split__copy">
      ${C.SectionHeader({ eyebrow: 'O instituto', title: '<span id="sobre-t">Construímos horizontes de conhecimento.</span>' })}
      <div data-reveal>
        <p>O Instituto Politécnico Privado Novos Horizontes (IMP NH) é uma instituição orientada para a formação académica e técnico-profissional. Recebe jovens da 10ª à 13ª classe que querem sair preparados para trabalhar ou continuar a estudar.</p>
        <p>Através de dois polos de formação, o IMP NH organiza a sua oferta em áreas de Administração, Serviços, Saúde, Informática, Mecânica, Construção Civil, Electricidade, Electrónica e Telecomunicações.</p>
        <p>A nossa proposta educativa assenta na valorização do conhecimento, na formação para a vida e no desenvolvimento de competências relevantes para a sociedade.</p>
      </div>
    </div>
    <div class="nh-split__media nh-collage" data-reveal>
      <img src="${r}assets/img/saude-microscopio-01.jpg" alt="Estudante sorri junto ao microscópio no laboratório" loading="lazy">
      <img src="${r}assets/img/informatica-aula-02.jpg" alt="Estudante numa aula na sala de informática" loading="lazy">
    </div>
  </div>
</section>

<section class="nh-section nh-section--navy nh-mvsec" aria-label="Missão e visão">
  <div class="nh-container nh-grid nh-grid--2">
    ${C.MissionVisionCard({ k: 'missao', title: 'Missão', text: C.MISSAO, ic: 'target' })}
    ${C.MissionVisionCard({ k: 'visao', title: 'Visão', text: C.VISAO, ic: 'eye' })}
  </div>
</section>

<section class="nh-section" aria-labelledby="valores-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Valores', title: '<span id="valores-t">Seis princípios que orientam o nosso trabalho.</span>', align: 'center' })}
    <div class="nh-grid nh-grid--3">${C.VALORES.map(C.ValueCard).join('')}</div>
  </div>
</section>

${C.Pillars()}

<section class="nh-section nh-section--alt" aria-labelledby="campus-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'O nosso espaço', title: '<span id="campus-t">Salas, laboratórios e pátio.</span>', text: 'Algumas imagens do dia-a-dia no instituto.' })}
    <div class="nh-strip" data-reveal>
      <img src="${r}assets/img/campus-fachada.jpg" alt="Entrada do instituto com o painel de cursos" loading="lazy">
      <img src="${r}assets/img/saude-laboratorio-02.jpg" alt="Laboratório com microscópios" loading="lazy">
      <img src="${r}assets/img/informatica-sala-01.jpg" alt="Sala de informática" loading="lazy">
      <img src="${r}assets/img/campus-patio-03.jpg" alt="Pátio interior visto do primeiro piso" loading="lazy">
    </div>
    <div class="nh-actions">${btn(r + 'galeria/', 'Ver a galeria', 'outline', 'arrow')}</div>
  </div>
</section>

${C.FinalCTA(r)}`,
});

/* ---------- POLOS ---------- */
pages.push({
  slug: 'polos/',
  title: 'Os nossos polos | IMP NH Novos Horizontes',
  desc: 'Polo I: Administração, Serviços e Saúde. Polo II: Áreas Técnicas e Engenharia. Conheça os dois polos de formação do IMP NH em Talatona.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Os nossos polos', title: 'Dois polos, uma mesma exigência.', text: 'A oferta do IMP NH divide-se entre as áreas de administração e saúde e as áreas técnicas e de engenharia.', img: 'campus-entrada-01.jpg', crumbs: [{ label: 'Os nossos polos' }], tone: 'navy' })}
<section class="nh-section" aria-label="Polos de formação">
  <div class="nh-container nh-polos__grid">
    ${C.PoloCard(r, D.POLOS['polo-i'], 'one')}
    ${C.PoloCard(r, D.POLOS['polo-ii'], 'two')}
  </div>
</section>
<section class="nh-section nh-section--alt" aria-labelledby="cmp-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Comparar', title: '<span id="cmp-t">Áreas e valores de cada polo.</span>', text: 'Propinas mensais do ano lectivo 2026/2027.' })}
    <div class="nh-compare" data-reveal>
      ${['polo-i', 'polo-ii'].map((p, i) => {
        const k = i ? 'p2' : 'p1';
        const polo = D.POLOS[p];
        return `<div class="nh-compare__col nh-compare__col--${p}">
          <p class="nh-polo__tag">${polo.nome}</p><h3>${polo.titulo}</h3>
          <ul class="nh-checks">${D.AREAS.filter((a) => a.polo === p).map((a) => `<li>${icon('check')}${a.nome}</li>`).join('')}</ul>
          <dl class="nh-compare__fees">
            <div><dt>Inscrição e matrícula</dt><dd>${kz(D.PRECARIO.taxas[0][k])}</dd></div>
            ${D.PRECARIO.propinas.map((x) => `<div><dt>${x.desc}</dt><dd>${kz(x[k])}<small>/mês</small></dd></div>`).join('')}
          </dl>
          ${btn(r + polo.url, 'Ver cursos do ' + polo.nome, i ? 'navy' : 'primary', 'arrow')}
        </div>`;
      }).join('')}
    </div>
  </div>
</section>
<section class="nh-section" aria-labelledby="ploc-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Localização', title: '<span id="ploc-t">Onde estamos.</span>', text: 'O instituto indica duas referências de localização em Talatona. Para saber qual corresponde ao polo que procura, confirme com a secretaria.' })}
    <div class="nh-grid nh-grid--2">${D.LOCALIZACOES.map((l, i) => C.LocationCard(l, i, false)).join('')}</div>
  </div>
</section>
${C.FinalCTA(r)}`,
});

/* ---------- POLO I / POLO II ---------- */
function poloPage(id, img, tone) {
  const polo = D.POLOS[id];
  const k = id === 'polo-i' ? 'p1' : 'p2';
  const areas = D.AREAS.filter((a) => a.polo === id);
  const pend = C.cursosVisiveis().filter((c) => !c.confirmado && areas.some((a) => a.id === c.area));
  return {
    slug: id + '/',
    title: `${polo.nome}: ${polo.titulo} | IMP NH`,
    desc: `Cursos do ${polo.nome} do Instituto Politécnico Privado Novos Horizontes: ${areas.map((a) => a.nome).join(', ')}. Propinas 2026/2027.`,
    ogImg: img,
    extraHead: '',
    body: (r) => `
${C.PageHero(r, { eyebrow: polo.nome, title: `${polo.nome} — ${polo.titulo}`, text: polo.subtitulo, img, crumbs: [{ label: 'Os nossos polos', href: 'polos/' }, { label: polo.nome }], tone })}
<nav class="nh-subnav" aria-label="Áreas do ${polo.nome}"><div class="nh-container">${areas.map((a) => `<a href="#${a.id}">${icon(a.icone)}${a.nomeCurto || a.nome}</a>`).join('')}<a href="#valores-polo">${icon('wallet')}Propinas</a></div></nav>
<div class="nh-section nh-polo-page"><div class="nh-container">
  ${areas.map(C.CourseCategory).join('')}
  ${pend.length ? `<p class="nh-note nh-note--warn" data-reveal>${icon('info')}<span><strong>Oferta a confirmar.</strong> ${pend.map((c) => c.nome).join(', ')} constam de alguns materiais de divulgação. A disponibilidade para o ano lectivo 2026/2027 depende de confirmação da direção.</span></p>` : ''}
</div></div>
<section class="nh-section nh-section--alt" id="valores-polo" aria-labelledby="vp-t">
  <div class="nh-container nh-split nh-split--top">
    <div>${C.SectionHeader({ eyebrow: 'Ano lectivo 2026/2027', title: `<span id="vp-t">Valores do ${polo.nome}.</span>`, text: 'Taxas administrativas e propinas mensais. Os mesmos valores para todos os cursos do polo.' })}
      <div class="nh-actions" data-reveal>${btn(r + 'propinas/', 'Comparar com o outro polo', 'outline', 'arrow')}</div></div>
    <div class="nh-minifees" data-reveal>
      <table class="nh-table nh-table--single"><caption class="nh-sr">Taxas e propinas do ${polo.nome}</caption>
        <tbody>
          ${D.PRECARIO.taxas.map((x) => `<tr><th scope="row">${x.desc}</th><td class="nh-num">${kz(x[k])}</td></tr>`).join('')}
          <tr class="nh-table__sep"><th scope="row" colspan="2">Propina mensal</th></tr>
          ${D.PRECARIO.propinas.map((x) => `<tr><th scope="row">${x.desc}</th><td class="nh-num">${kz(x[k])}</td></tr>`).join('')}
        </tbody></table>
    </div>
  </div>
</section>
${C.FinalCTA(r)}
${C.CourseModal(r)}
${C.CoursesJSON()}`,
  };
}
pages.push(poloPage('polo-i', 'saude-laboratorio-02.jpg', 'bordo'));
pages.push(poloPage('polo-ii', 'informatica-sala-01.jpg', 'navy'));

/* ---------- CURSOS ---------- */
pages.push({
  slug: 'cursos/',
  title: 'Cursos | Oferta formativa IMP NH Novos Horizontes',
  desc: 'Cursos técnicos em Talatona, Luanda: Contabilidade e Gestão, Gestão Empresarial, Enfermagem, Farmácia, Análises Clínicas, Informática, Mecatrónica, Construção Civil, Energias e mais.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Oferta formativa', title: 'Descubra o seu próximo horizonte.', text: `${C.cursosVisiveis().length} cursos distribuídos por seis áreas e dois polos. Use os filtros para encontrar o seu.`, img: 'informatica-aula-01.jpg', crumbs: [{ label: 'Cursos' }] })}
<section class="nh-section nh-catalog" aria-label="Catálogo de cursos">
  <div class="nh-container">
    ${C.CourseFilter()}
    <p class="nh-catalog__count" aria-live="polite" data-count></p>
    <div class="nh-grid nh-grid--courses" data-course-grid>
      ${C.cursosVisiveis().map(C.CourseCard).join('')}
    </div>
    <p class="nh-note" data-reveal>${icon('info')}<span>Os cursos com a etiqueta <strong>Oferta a confirmar</strong> aparecem em alguns materiais de divulgação. A disponibilidade para 2026/2027 depende de confirmação da direção.</span></p>
  </div>
</section>
${C.AdmissionCTA(r)}
${C.CourseModal(r)}
${C.CoursesJSON()}`,
});

/* ---------- ADMISSÕES ---------- */
pages.push({
  slug: 'admissoes/',
  title: 'Admissões e matrículas 2026/2027 | IMP NH',
  desc: 'Matrículas para o ano lectivo 2026/2027 no Instituto Politécnico Privado Novos Horizontes, em Talatona. Cursos, preçário e pré-inscrição online.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Ano Lectivo 2026/2027', title: 'Investe no teu futuro, transforma a tua vida!', text: 'Descubra as oportunidades de formação disponíveis nos nossos dois polos e obtenha informações sobre os procedimentos de inscrição e matrícula.', img: 'vida-academica-03.jpg', crumbs: [{ label: 'Admissões' }], actions: btn(r + 'cursos/', 'Consultar cursos', 'gold') + btn(r + 'propinas/', 'Consultar preçário', 'ghost') })}
<section class="nh-section" aria-labelledby="passos-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Como se inscrever', title: '<span id="passos-t">Quatro passos até à matrícula.</span>' })}
    <ol class="nh-steps">
      ${[
        ['Escolha o polo e o curso', 'Veja a oferta do Polo I e do Polo II e escolha a área que mais lhe interessa.', 'cursos/', 'Ver cursos'],
        ['Consulte os valores', 'Taxas e propinas de 2026/2027 estão publicadas por polo e por classe.', 'propinas/', 'Ver preçário'],
        ['Faça a pré-inscrição', 'Preencha o formulário online ou fale connosco por telefone ou WhatsApp.', 'pre-inscricao/', 'Pré-inscrição'],
        ['Confirme na instituição', 'A secretaria indica os documentos necessários e conclui a matrícula consigo.', 'contactos/', 'Contactos'],
      ].map(([t, d, h, l], i) => `<li class="nh-step" data-reveal style="--d:${i * 80}ms"><span class="nh-step__n">${i + 1}</span><h3>${t}</h3><p>${d}</p><a href="${r}${h}">${l} ${icon('arrow')}</a></li>`).join('')}
    </ol>
  </div>
</section>
<section class="nh-section nh-section--alt" aria-labelledby="classes-t">
  <div class="nh-container nh-split nh-split--top">
    <div>
      ${C.SectionHeader({ eyebrow: 'Classes', title: '<span id="classes-t">Matrículas da 10ª à 13ª classe.</span>', text: 'Os dois polos recebem matrículas para as quatro classes do ensino médio técnico.' })}
      <ul class="nh-classes" data-reveal>${['10ª', '11ª', '12ª', '13ª'].map((c) => `<li><strong>${c}</strong><span>Classe</span></li>`).join('')}</ul>
    </div>
    <div class="nh-infobox" data-reveal>
      <h3>${icon('info')} Datas e documentos</h3>
      <p>As datas do período de matrículas e a lista de documentos são indicadas pela secretaria. Para não perder prazos, ligue ou envie mensagem antes de se deslocar.</p>
      <ul class="nh-infobox__tels">${D.CONTACTOS.telefones.map((t) => `<li><a href="tel:${t.tel}">${icon('phone')}${t.label}</a><a class="nh-infobox__wa" href="${C.waLink(t)}" target="_blank" rel="noopener">${icon('whatsapp')}<span class="nh-sr">WhatsApp ${t.label}</span></a></li>`).join('')}</ul>
    </div>
  </div>
</section>
${C.AdmissionCTA(r)}
${C.FinalCTA(r)}`,
});

/* ---------- PROPINAS ---------- */
pages.push({
  slug: 'propinas/',
  title: 'Taxas e propinas 2026/2027 | IMP NH Novos Horizontes',
  desc: 'Preçário 2026/2027 do IMP NH: taxa de inscrição e matrícula, confirmação, cartões e propinas mensais da 10ª à 13ª classe, Polo I e Polo II.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Ano Lectivo 2026/2027', title: 'Taxas administrativas e propinas', text: 'Todos os valores, por polo e por classe.', img: 'campus-fachada.jpg', crumbs: [{ label: 'Propinas' }], tone: 'navy' })}
<section class="nh-section" aria-label="Tabelas de preços">
  <div class="nh-container nh-container--narrow">
    <div class="nh-legend" data-reveal>
      <span class="nh-legend__p1"><i></i><strong>Polo I</strong> Administração, Serviços e Saúde</span>
      <span class="nh-legend__p2"><i></i><strong>Polo II</strong> Áreas Técnicas e Engenharia</span>
    </div>
    ${C.PriceTables()}
    <div class="nh-actions nh-actions--center" data-reveal>${btn(r + 'pre-inscricao/', 'Fazer pré-inscrição', 'primary')}<a class="nh-btn nh-btn--outline" href="${C.waLink(D.CONTACTOS.telefones[0])}" target="_blank" rel="noopener">${icon('whatsapp')} Esclarecer dúvidas</a></div>
  </div>
</section>
${C.FinalCTA(r)}`,
});

/* ---------- GALERIA ---------- */
pages.push({
  slug: 'galeria/',
  title: 'Galeria | IMP NH Novos Horizontes',
  desc: 'Imagens do Instituto Politécnico Privado Novos Horizontes: laboratórios, salas de informática, instalações e vida académica.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Galeria', title: 'Conhecimento que abre novos horizontes.', text: 'Laboratórios, salas de aula, pátio e momentos da vida académica no IMP NH.', img: 'vida-academica-02.jpg', crumbs: [{ label: 'Galeria' }] })}
<section class="nh-section" aria-label="Galeria de imagens">
  <div class="nh-container">${C.GalleryGrid(r)}</div>
</section>
${C.FinalCTA(r)}`,
});

/* ---------- CONTACTOS ---------- */
pages.push({
  slug: 'contactos/',
  title: 'Contactos e localizações | IMP NH Novos Horizontes',
  desc: 'Contactos do Instituto Politécnico Privado Novos Horizontes: +244 921 296 545 e +244 957 919 179 (telefone e WhatsApp). Talatona, Luanda.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Contactos', title: 'Estamos disponíveis para ajudar.', text: 'Entre em contacto connosco para obter informações sobre cursos, admissões, matrículas e propinas.', img: 'campus-patio-01.jpg', crumbs: [{ label: 'Contactos' }], tone: 'navy' })}
<section class="nh-section" aria-labelledby="tel-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Telefones e WhatsApp', title: '<span id="tel-t">Ligue ou escreva-nos.</span>', text: 'Os dois números atendem chamadas e mensagens de WhatsApp.' })}
    <div class="nh-grid nh-grid--2">
      ${D.CONTACTOS.telefones.map((t, i) => `<article class="nh-phone" data-reveal style="--d:${i * 80}ms">
        <span class="nh-phone__icon">${icon('phone')}</span>
        <p class="nh-phone__label">Secretaria · linha ${i + 1}</p>
        <p class="nh-phone__num">${t.label}</p>
        <div class="nh-actions"><a class="nh-btn nh-btn--wa" href="${C.waLink(t)}" target="_blank" rel="noopener">${icon('whatsapp')} Contactar pelo WhatsApp</a><a class="nh-btn nh-btn--outline" href="tel:${t.tel}">${icon('phone')} Ligar agora</a></div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="nh-section nh-section--alt" aria-labelledby="form-t">
  <div class="nh-container nh-split nh-split--top">
    <div>
      ${C.SectionHeader({ eyebrow: 'Formulário', title: '<span id="form-t">Prefere escrever?</span>', text: 'Deixe a sua mensagem e o contacto. Indique o assunto para encaminharmos mais depressa.' })}
      <div class="nh-social" data-reveal>
        <p class="nh-social__t">Redes sociais</p>
        ${D.CONTACTOS.redes.map((s) => s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${icon(s.nome.toLowerCase())}${s.nome}</a>` : `<span class="nh-social__soon">${icon(s.nome.toLowerCase())}${s.nome}<small>em breve</small></span>`).join('')}
      </div>
    </div>
    <div class="nh-card-form" data-reveal>${C.ContactForm()}</div>
  </div>
</section>
<section class="nh-section" aria-labelledby="mapas-t">
  <div class="nh-container">
    ${C.SectionHeader({ eyebrow: 'Localizações', title: '<span id="mapas-t">Duas referências em Talatona.</span>', text: 'Os mapas mostram a zona de referência. Na dúvida, ligue antes e indicamos o caminho.' })}
    <div class="nh-grid nh-grid--2">${D.LOCALIZACOES.map((l, i) => C.LocationCard(l, i, true)).join('')}</div>
  </div>
</section>`,
});

/* ---------- PRÉ-INSCRIÇÃO ---------- */
pages.push({
  slug: 'pre-inscricao/',
  title: 'Pré-inscrição 2026/2027 | IMP NH Novos Horizontes',
  desc: 'Manifeste o seu interesse numa vaga no Instituto Politécnico Privado Novos Horizontes. Escolha o polo, a área e o curso.',
  body: (r) => `
${C.PageHero(r, { eyebrow: 'Pré-inscrição', title: 'Comece a construir o seu futuro.', text: 'Preencha os seus dados para manifestar interesse numa vaga de formação no Instituto Politécnico Privado Novos Horizontes.', img: 'saude-estudantes.jpg', crumbs: [{ label: 'Pré-inscrição' }] })}
<section class="nh-section nh-section--alt" aria-label="Formulário de pré-inscrição">
  <div class="nh-container nh-preform">
    <div class="nh-card-form" data-reveal>${C.PreRegistrationForm()}</div>
    <aside class="nh-preform__aside" data-reveal>
      <div class="nh-infobox">
        <h2>${icon('info')} Antes de enviar</h2>
        <p>A pré-inscrição é um primeiro contacto e não garante vaga. A matrícula fica concluída na instituição, com o pagamento das taxas.</p>
        <p><a href="${r}propinas/">Consultar taxas e propinas ${icon('arrow')}</a></p>
      </div>
      <div class="nh-infobox nh-infobox--navy">
        <h2>${icon('whatsapp')} Prefere falar já?</h2>
        <ul class="nh-infobox__tels">${D.CONTACTOS.telefones.map((t) => `<li><a href="${C.waLink(t)}" target="_blank" rel="noopener">${t.label}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>
${C.CoursesJSON()}`,
});

/* ===================== ESCRITA ===================== */
for (const p of pages) {
  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(p));
  console.log('✓', '/' + p.slug);
}

// sitemap + robots
const urls = pages.map((p) => `  <url><loc>${D.INSTITUICAO.url}/${p.slug}</loc></url>`).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), D.INSTITUICAO.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${D.INSTITUICAO.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log('✓ sitemap.xml, robots.txt');
