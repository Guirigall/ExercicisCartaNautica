# HANDOFF — Aula de carta · Estret (ExercicisCartaNautica)

Notes per a qualsevol persona o IA que vulgui continuar millorant el programa.
No conté dades personals ni rutes locals.

## Què és

PWA estàtica (HTML + JS en mòduls ES, sense build ni dependències) per practicar
exercicis de carta nàutica sobre la carta docent L105 de l'Estret de Gibraltar
(imatge A3 escanejada, `assets/carta.jpg`, 2600 × 1839 px). Funciona fora de línia
gràcies a `sw.js`. Interfície en català, castellà, anglès i francès.

Publicada amb GitHub Pages des de la branca `main` (arrel del repositori).
Llicència MIT.

## Fitxers

| Fitxer | Contingut |
| --- | --- |
| `index.html` | Tota la maquetació (capçalera, panell d'exercici, carta SVG, resolució, diàlegs). |
| `style.css` | Estils (minificats en poques línies; els afegits nous van al final). |
| `app.js` | Lògica d'interfície: eines de dibuix, instruments (regle, compàs, transportadors), zoom/pan, edició, desat/import/export, calibratge. Codi molt compacte, una funció per línia aprox. |
| `nav.js` | Navegació loxodròmica (Mercator): `forward`, `inverse`, `fix`, parser de coordenades `coord`, `formatCoord`. |
| `solver.js` | Motor de variables/incògnites de la fase «Planteja l'exercici». |
| `calculator.js` | Calculadora integrada. |
| `instruments.js` | Geometria auxiliar (`extendedLine`, `squareRay`, `arcPoints`…). |
| `i18n.js` + `translations.js` | Traducció per substitució de text: les claus són cadenes catalanes (o fragments) i es reemplacen al DOM. Cal afegir-hi tota cadena nova visible. |
| `sw.js` | Service worker *network-first*; llista `FILES` per a la memòria cau. |
| `docs/guia-completa.md` | Guia d'usuari multilingüe. |
| `.github/workflows/readme-previews.yml` | Genera captures del README amb Playwright. |

## Conceptes clau d'`app.js`

- Coordenades: `xy(geo)` ↔ `geo(xy)` amb el calibratge `cal` (dos punts A/B coneguts, projecció Mercator).
- Vista: `view = {x,y,w,h}` és el `viewBox` de l'SVG; `zoom()` i `updateView()`.
- Capes SVG: `#solutionInk` (traçats de la resolució), `#manualInk` (marques de l'usuari), `#rulerInk`, `#compassInk`, `#protractorInk`.
- `marks[]`: dibuixos de l'usuari (es desen a `localStorage` i a l'export JSON).
  Les rectes (`type:'line'`, amb `kind` = course, bearing, alignment, opposition, parallel, latitude, longitude…) es pinten amb `drawStraight()`; els extrems són creuetes petites (`plotCross`).
- Eines: `setTool(nom)`; clic a la carta → `chartClick()`; eines de dibuix → `drawingClick()`; valors exactes → `applyDrawing()`.
- Transportadors: array `protractors[]` (màx. `MAX_PROTRACTORS` = 2), actiu `activeProtractor`, accés amb `P()`.
  Mida fixa respecte de la carta: `PROTRACTOR_R = 130` unitats de carta (meitat del costat, ≈ 21 mm sobre l'A3; costat ≈ 42 mm).
  El centre i l'extrem de la corda són creuetes (`crossHandle`, mida constant en pantalla). Les nanses porten l'índex al nom (`protractor-center:1`, `cord:0`…). No es desen a la sessió.
- Menú lateral plegable: botó `#toggleSidebar`, classe `.workspace.sidebar-hidden`, preferència a `localStorage` (`aula-sidebar-hidden`).

## Convencions

- En canviar `app.js` o `style.css`, puja els paràmetres `?v=N` a `index.html`, `sw.js` i el registre del service worker a `app.js`, i el nom de `CACHE` a `sw.js`. La versió visible (`vNN · multilingüe`) és a `index.html`, `translations.js` i `docs/guia-completa.md`.
- Tot `localStorage` va dins de `try/catch`.
- Missatges a l'usuari amb `notify()` (també es mostren a la barra de dibuix si és visible).
- No hi ha suite de proves al repositori; es pot verificar amb un servidor estàtic (`python3 -m http.server`) i Playwright.

## Idees pendents

- Desar també els transportadors i el regle/compàs a la sessió.
- Mida de les etiquetes de grau del transportador a zoom baix (es veuen petites).
- Possibilitat de més de dos transportadors o d'escollir-ne la mida.
- Tests automàtics de `nav.js` i `solver.js`.

**Avís:** ús docent, no vàlid per a la navegació real.
