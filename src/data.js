/*
  IMP NH — Dados do website (fonte única)
  ----------------------------------------
  Tudo o que é conteúdo editável está aqui: contactos, localizações,
  preçário 2026/2027 e catálogo de cursos.

  Catálogo de cursos:
  - ativo: false  → o curso deixa de aparecer em todo o site (não é apagado).
  - confirmado: false → o curso aparece com a etiqueta "Oferta a confirmar".
    Quando a direção validar a oferta 2026/2027, mudar para true.
  - MOSTRAR_POR_CONFIRMAR: false → esconde de uma vez todos os cursos
    com confirmado: false.

  Depois de editar, correr:  node src/build.js
*/

const INSTITUICAO = {
  nome: 'Instituto Politécnico Privado Novos Horizontes',
  sigla: 'IMP NH',
  nomeCurto: 'Novos Horizontes',
  lema: 'A educação é um tesouro!',
  frase: 'Educar hoje, transformar amanhã.',
  anoLectivo: '2026/2027',
  // URL final do site (usado em canonical e Open Graph). Ajustar no lançamento.
  url: 'https://rodasil-angola.github.io/novos-horizontes',
  // true = versão de pré-visualização para o cliente: não indexar no Google.
  // No lançamento: mudar url para o domínio final e preview para false.
  preview: true,
};

const CONTACTOS = {
  telefones: [
    { label: '+244 921 296 545', tel: '+244921296545', wa: '244921296545' },
    { label: '+244 957 919 179', tel: '+244957919179', wa: '244957919179' },
  ],
  mensagemWhatsApp:
    'Olá! Gostaria de obter informações sobre os cursos, matrículas e propinas do Instituto Politécnico Privado Novos Horizontes.',
  // Preencher quando a instituição fornecer os endereços oficiais.
  redes: [
    { nome: 'Facebook', url: '' },
    { nome: 'Instagram', url: '' },
  ],
};

/*
  Localizações: mapaUrl/embedUrl usam uma pesquisa de texto no Google Maps,
  não coordenadas. Substituir pelos links oficiais (Partilhar → Incorporar mapa)
  quando a instituição os fornecer.
*/
const LOCALIZACOES = [
  {
    id: 'loc-1',
    titulo: 'Localização 1',
    morada: 'Bairro Dangereux, atrás da Praça da Alegria.',
    zona: 'Talatona, Luanda',
    pesquisa: 'Praça da Alegria, Talatona, Luanda, Angola',
  },
  {
    id: 'loc-2',
    titulo: 'Localização 2',
    morada: 'Rua de entrada do Restaurante Mamamia, Talatona.',
    zona: 'Talatona, Luanda',
    pesquisa: 'Restaurante Mamamia, Talatona, Luanda, Angola',
  },
];

const PRECARIO = {
  taxas: [
    { desc: 'Taxa de Inscrição e Matrícula', p1: 12000, p2: 15000 },
    { desc: 'Confirmação', p1: 11500, p2: 14000 },
    { desc: 'Cartão de Propina', p1: 3000, p2: 3500 },
    { desc: 'Cartão de Estudante', p1: 3000, p2: 3000 },
  ],
  propinas: [
    { desc: '10ª Classe', p1: 13500, p2: 20000 },
    { desc: '11ª Classe', p1: 14500, p2: 21500 },
    { desc: '12ª Classe', p1: 15500, p2: 23000 },
    { desc: '13ª Classe', p1: 16500, p2: 25000 },
  ],
};

const MOSTRAR_POR_CONFIRMAR = true;

const POLOS = {
  'polo-i': {
    id: 'polo-i',
    nome: 'Polo I',
    titulo: 'Administração, Serviços e Saúde',
    url: 'polo-i/',
    resumo:
      'Formação orientada para áreas administrativas, empresariais e de saúde, reunindo diferentes opções para o desenvolvimento académico e profissional.',
    subtitulo: 'Conhecimento, gestão e formação orientada para áreas fundamentais da sociedade.',
    imagem: 'saude-microscopio-02.jpg',
    imagemAlt: 'Estudante do IMP NH a utilizar um microscópio no laboratório',
  },
  'polo-ii': {
    id: 'polo-ii',
    nome: 'Polo II',
    titulo: 'Áreas Técnicas e Engenharia',
    url: 'polo-ii/',
    resumo:
      'Formação técnica em áreas ligadas à informática, mecânica, construção civil, electricidade, electrónica e telecomunicações.',
    subtitulo:
      'Desenvolvimento de competências técnicas para os desafios da indústria, tecnologia e infraestrutura.',
    imagem: 'informatica-sala-01.jpg',
    imagemAlt: 'Sala de informática do IMP NH com computadores nas bancadas',
  },
};

const AREAS = [
  {
    id: 'administracao',
    polo: 'polo-i',
    nome: 'Administração e Serviços',
    icone: 'briefcase',
    intro:
      'Gestão, contabilidade e organização: as bases de qualquer empresa ou instituição, públicas ou privadas.',
  },
  {
    id: 'saude',
    polo: 'polo-i',
    nome: 'Saúde',
    icone: 'heart',
    intro:
      'Cursos com aulas em laboratório, para quem quer trabalhar no cuidado, no diagnóstico e na prevenção.',
  },
  {
    id: 'mecanica',
    polo: 'polo-ii',
    nome: 'Mecânica',
    icone: 'gear',
    intro: 'Motores, climatização e automação. Para quem gosta de perceber como as máquinas funcionam.',
  },
  {
    id: 'informatica',
    polo: 'polo-ii',
    nome: 'Informática',
    icone: 'monitor',
    intro: 'Computadores, redes e sistemas, com aulas práticas em sala equipada.',
  },
  {
    id: 'construcao',
    polo: 'polo-ii',
    nome: 'Construção Civil',
    icone: 'building',
    intro: 'Do desenho do projecto ao acompanhamento da obra.',
  },
  {
    id: 'electricidade',
    polo: 'polo-ii',
    nome: 'Electricidade, Electrónica e Telecomunicações',
    nomeCurto: 'Electricidade e Electrónica',
    icone: 'bolt',
    intro: 'Instalações eléctricas, energia, electrónica e comunicações.',
  },
];

// Descrições institucionais breves. Sem duração, planos curriculares,
// estágios ou saídas garantidas: esses dados ainda não foram fornecidos.
const CURSOS = [
  // POLO I — Administração e Serviços
  { id: 'contabilidade-gestao', nome: 'Contabilidade e Gestão', area: 'administracao', icone: 'calculator', confirmado: true, ativo: true,
    desc: 'Formação na área da contabilidade e da gestão financeira, com foco na organização e no controlo das contas de empresas e instituições.' },
  { id: 'gestao-empresarial', nome: 'Gestão Empresarial', area: 'administracao', icone: 'chart', confirmado: true, ativo: true,
    desc: 'Formação orientada para o funcionamento das organizações: planeamento, administração e gestão de negócios.' },
  { id: 'informatica-gestao', nome: 'Informática e Gestão', area: 'administracao', icone: 'monitor', confirmado: true, ativo: true,
    desc: 'Junta conhecimentos de informática e de gestão, para o uso de ferramentas digitais no dia-a-dia administrativo das organizações.' },
  { id: 'gestao-rh', nome: 'Gestão de Recursos Humanos', area: 'administracao', icone: 'users', confirmado: true, ativo: true,
    desc: 'Formação dedicada à gestão de pessoas nas organizações, da administração de pessoal às relações de trabalho.' },

  // POLO I — Saúde
  { id: 'fisioterapia', nome: 'Fisioterapia', area: 'saude', icone: 'activity', confirmado: true, ativo: true,
    desc: 'Formação na área da reabilitação física e do movimento humano.' },
  { id: 'farmacia', nome: 'Farmácia', area: 'saude', icone: 'pill', confirmado: true, ativo: true,
    desc: 'Formação ligada ao medicamento: preparação, conservação e dispensa, em contexto farmacêutico.' },
  { id: 'enfermagem', nome: 'Enfermagem', area: 'saude', icone: 'heart', confirmado: true, ativo: true,
    desc: 'Formação na prestação de cuidados de saúde e no acompanhamento de doentes.' },
  { id: 'analises-clinicas', nome: 'Análises Clínicas', area: 'saude', icone: 'flask', confirmado: true, ativo: true,
    desc: 'Formação em trabalho de laboratório clínico, apoiada no uso de equipamentos como o microscópio.' },
  { id: 'estomatologia', nome: 'Estomatologia', area: 'saude', icone: 'smile', confirmado: true, ativo: true,
    desc: 'Formação na área da saúde oral.' },
  { id: 'nutricao-dietetica', nome: 'Nutrição e Dietética', area: 'saude', icone: 'apple', confirmado: false, ativo: true,
    desc: 'Formação ligada à alimentação e à sua relação com a saúde.' },
  { id: 'saude-ambiental', nome: 'Saúde Ambiental', area: 'saude', icone: 'leaf', confirmado: false, ativo: true,
    desc: 'Formação sobre a relação entre o ambiente e a saúde das populações.' },
  { id: 'radiologia', nome: 'Radiologia', area: 'saude', icone: 'scan', confirmado: false, ativo: true,
    desc: 'Formação na área do diagnóstico por imagem.' },

  // POLO II — Mecânica
  { id: 'maquinas-motores', nome: 'Máquinas e Motores', area: 'mecanica', icone: 'gear', confirmado: true, ativo: true,
    desc: 'Formação técnica sobre o funcionamento, a manutenção e a reparação de máquinas e motores.' },
  { id: 'frio-climatizacao', nome: 'Frio e Climatização', area: 'mecanica', icone: 'snow', confirmado: true, ativo: true,
    desc: 'Formação em sistemas de refrigeração e de ar condicionado.' },
  { id: 'electromecanica', nome: 'Electromecânica', area: 'mecanica', icone: 'cog-bolt', confirmado: false, ativo: true,
    desc: 'Formação que cruza a mecânica com a electricidade, em equipamentos que combinam as duas.' },
  { id: 'mecatronica', nome: 'Mecatrónica', area: 'mecanica', icone: 'cpu', confirmado: false, ativo: true,
    desc: 'Formação que junta mecânica, electrónica e automação.' },
  { id: 'mecatronica-automovel', nome: 'Mecatrónica Automóvel', area: 'mecanica', icone: 'car', confirmado: false, ativo: true,
    desc: 'Mecatrónica aplicada ao automóvel e aos seus sistemas mecânicos e electrónicos.' },

  // POLO II — Informática
  { id: 'tecnico-informatica', nome: 'Técnico de Informática', area: 'informatica', icone: 'monitor', confirmado: true, ativo: true,
    desc: 'Formação técnica em equipamentos informáticos, software e redes.' },
  { id: 'gestao-sistemas', nome: 'Gestão de Sistemas Informáticos', area: 'informatica', icone: 'server', confirmado: true, ativo: true,
    desc: 'Formação dedicada à administração e ao bom funcionamento de sistemas informáticos.' },

  // POLO II — Construção Civil
  { id: 'desenhador-projetista', nome: 'Desenhador Projetista', area: 'construcao', icone: 'ruler', confirmado: true, ativo: true,
    desc: 'Formação em desenho técnico e na elaboração de projectos de construção.' },
  { id: 'tecnico-obra', nome: 'Técnico de Obra', area: 'construcao', icone: 'helmet', confirmado: false, ativo: true,
    desc: 'Formação ligada ao acompanhamento e à execução de obras de construção civil.' },

  // POLO II — Electricidade, Electrónica e Telecomunicações
  { id: 'electronica-telecom', nome: 'Electrónica e Telecomunicações', area: 'electricidade', icone: 'antenna', confirmado: true, ativo: true,
    desc: 'Formação em circuitos electrónicos e sistemas de comunicação.' },
  { id: 'energia-instalacoes', nome: 'Energia e Instalações Eléctricas', area: 'electricidade', icone: 'plug', confirmado: true, ativo: true,
    desc: 'Formação em instalações eléctricas e na distribuição de energia.' },
  { id: 'energias-renovaveis', nome: 'Energias Renováveis', area: 'electricidade', icone: 'sun', confirmado: false, ativo: true,
    desc: 'Formação sobre sistemas de produção de energia a partir de fontes renováveis, como a solar.' },
  { id: 'electrotecnia', nome: 'Electrotecnia', area: 'electricidade', icone: 'bolt', confirmado: false, ativo: true,
    desc: 'Formação nos princípios e nas aplicações da electricidade.' },
];

// Períodos de aulas: deixar vazio até a instituição confirmar.
// Ex.: ['Manhã', 'Tarde'] — o campo aparece no formulário automaticamente.
const PERIODOS = [];

module.exports = { INSTITUICAO, CONTACTOS, LOCALIZACOES, PRECARIO, POLOS, AREAS, CURSOS, PERIODOS, MOSTRAR_POR_CONFIRMAR };
