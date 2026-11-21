# Website IMP NH: Instituto Politécnico Privado Novos Horizontes

Site institucional estático (HTML/CSS/JS, sem dependências), preparado para migrar para WordPress.

## Estrutura

```
src/
  data.js        ← CONTEÚDO EDITÁVEL: contactos, localizações, preçário, cursos, períodos
  components.js  ← componentes (Header, PoloCard, CourseCard, PriceTable, formulários…)
  icons.js       ← ícones lineares SVG
  build.js       ← monta as páginas
  serve.js       ← servidor local de pré-visualização
site/            ← RESULTADO (publicar esta pasta)
  index.html, sobre/, polos/, polo-i/, polo-ii/, cursos/, admissoes/,
  propinas/, galeria/, contactos/, pre-inscricao/
  assets/css/main.css · assets/js/main.js · assets/img/
  sitemap.xml · robots.txt
```

## Comandos

```
node src/build.js    # regenerar o site depois de editar src/
node src/serve.js    # pré-visualizar em http://localhost:5180
```

## Editar conteúdo (src/data.js)

- **Confirmar um curso**: `confirmado: true` remove a etiqueta "Oferta a confirmar".
- **Retirar um curso**: `ativo: false` (não apaga o registo).
- **Esconder todos os cursos por confirmar**: `MOSTRAR_POR_CONFIRMAR = false`.
- **Períodos de aulas**: preencher `PERIODOS` (ex.: `['Manhã', 'Tarde']`) e o campo aparece no formulário.
- **Redes sociais**: preencher `url` em `CONTACTOS.redes`. Sem URL, aparecem como "em breve" e não vão para o rodapé.
- **Mapas**: hoje usam pesquisa de texto no Google Maps. Substituir pelos links oficiais quando existirem.
- **Domínio**: `INSTITUICAO.url` (canonical, Open Graph, sitemap).

## Pendente de validação com a direção

1. Cursos marcados "Oferta a confirmar": Nutrição e Dietética, Saúde Ambiental, Radiologia, Electromecânica, Mecatrónica, Mecatrónica Automóvel, Técnico de Obra, Energias Renováveis, Electrotecnia.
2. Qual localização corresponde a cada polo.
3. Links oficiais do Google Maps, Facebook e Instagram, e o domínio final.
4. Fotografias para Mecânica, Construção Civil, Electricidade e Administração (a galeria só mostra filtros de categorias que têm fotos).

## Migração para WordPress

- Classes prefixadas com `nh-` (sem conflito com tema/plugins). Tokens de cor/tipografia no topo de `main.css`: colar em CSS Adicional.
- Cada `<section>` de `site/*/index.html` pode ir para um bloco "HTML Personalizado" (Gutenberg) ou widget HTML (Elementor); `main.js` vai para o rodapé do tema.
- Formulários são **demonstração** (não enviam dados). Substituir por Fluent Forms / CF7 mantendo os `name` dos campos.
