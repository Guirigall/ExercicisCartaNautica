[← README](../README.md)

> Guia tècnica detallada / Detailed technical guide. Les ordres referides al projecte font només són aplicables si aquests fitxers hi són; el README descriu els fitxers i les ordres d’aquest repositori.

# Aula de carta · Estret — v16

[Català](#català) · [Español](#español) · [English](#english) · [Français](#français)

## Català

PWA educativa sobre la carta A3 de l’Estret de Gibraltar facilitada per l’usuari. **No és vàlida per navegar.** La imatge de 5.200 píxels d’amplada prové directament de `CARTA-ESTRECHO-A3.pdf` i conserva la informació del document.

### Idiomes

El selector ofereix català, espanyol, anglès i francès. Canvia la interfície, les ajudes, els noms de variables, els passos i els errors sense buidar les dades introduïdes. Recorda la llengua en aquest navegador. Els noms i textos escrits per l’usuari i les inscripcions de la carta escanejada es conserven. Els símbols de les fórmules (Ra, Rv, Rs, Ct, dm, Δ, M, Da i Dv) són els mateixos en totes les llengües; **M** com a unitat representa milles nàutiques.

### Dues fases

1. Introdueix només les dades conegudes. Totes les variables estan disponibles, agrupades per tema. Un camp buit és desconegut: **zero s’ha d’escriure expressament**.
2. Prem «Tria què vols calcular», revisa les dades i prem la incògnita. El cercador ajuda a trobar-la pel nom o símbol.
3. Consulta les fórmules amb substitució de dades i els traçats sobre la carta quan el càlcul determina una situació.

L’app sempre arrenca amb les variables buides. Després d’un càlcul correcte, torna a la fase 1 amb els camps buits i manté la resolució visible. Un error conserva les dades per corregir-les. Canviar d’idioma no és reiniciar l’exercici i no buida els camps.

### Variables i càlculs

- Ra, Rv, Rs, correcció total Ct, variació/declinació dm, desviament Δ, abatiment signat, mòdul d’abatiment i direcció d’on ve el vent.
- Distància, velocitat, durada en minuts/hores, HRB de sortida/arribada, dies entre totes dues i HRB de les observacions simultànies.
- Coordenades inicials i finals/observades; noms i coordenades de dues referències amb marcacions i demores d’agulla/veritables; direcció i distància respecte d’una referència.

El motor encadena i inverteix `Ct = dm + Δ`, `Rv = Ra + Ct`, `Rs = Rv + Ab`, `Dv = Da + Ct`, `Dv = Rv + M` i `D = V × t`. També resol situacions directa/inversa, intersecció de dues demores, desplaçaments respecte d’una referència i hores amb canvi de dia.

No assumeix dades. Per calcular una durada entre dues HRB, introdueix també els dies (**0** si és el mateix dia). Detecta dades contradictòries o insuficients i inversions no úniques. No totes les combinacions tenen una solució implementada. No modela corrents ni marees ni demores no simultànies. Els noms dels fars no carreguen coordenades automàticament.

Admet graus decimals o graus/minuts/segons i coma decimal. Els angles es compten des del nord en sentit horari. Est/NE i estribord són positius; oest/NW i babord, negatius. En una correcció, `4 NW` significa −4°, no 315°. Les marcacions accepten Er/Br, estribord/babord i graus circulars. En anglès també STBD/PORT; en francès tribord/bâbord. El vent indica **d’on ve**.

### Carta i eines

El PDF és un escaneig. El calibratge inicial aproximat usa A: 36°10′ N / 6°00′ W i B: 35°50′ N / 5°20′ W. Ajusta’l amb dues interseccions i comprova’n una tercera. La transformació longitude/Mercator no corregeix rotació ni deformacions locals. Els càlculs numèrics entre coordenades no depenen del calibratge.

- Transportador quadrat giratori amb corda de llargada variable i angles exactes.
- Regle de dos clics que es pot moure rígidament.
- Compàs amb punxes fines: radi constant en milles amb qualsevol zoom o trasllat. Mou el centre amb la punta verda i traça arcs amb la violeta.
- Waypoint, recta, rumb, demora, distància, cercle, text, latitud, longitud, paral·lela, enfilació, oposició i calculadora.
- «Edita» selecciona a la carta o la llista; «Esborra» elimina directament; es poden desfer fins a trenta esborrats de la sessió.

Els arcs permeten veure talls amb rectes, sense ajust magnètic ni coordenades automàtiques del tall. Esborrar un traçat de resolució només canvia el gràfic; recalcular el regenera. No es detecten costa, obstacles o zones de trànsit. El motor usa loxodròmia esfèrica, `R = 60 × 180/π M`, no geodèsia el·lipsoidal. Toleràncies de coherència: 0,12° en angles, 0,001° en coordenades i 0,025 en altres valors.

### Sessions, instal·lació i fitxers

Les dades i dibuixos es poden desar i exportar/importar en JSON v2; també s’admeten fitxers v1. A l’arrencada només es recuperen calibratge i dibuixos, mai variables ni càlculs anteriors. Una importació manual explícita sí que pot carregar dades. Els instruments temporals i l’historial d’esborrats no s’inclouen al JSON.

Per instal·lar a Android, publica els fitxers estàtics en **HTTPS**, obre’ls amb Chrome i prem «Instal·la a Android» o el menú del navegador. Espera «Disponible fora de línia» abans de desconnectar. No és un APK i el ZIP no s’instal·la directament. En iPhone, Safari → Comparteix → Afegeix a la pantalla d’inici. La primera visita requereix connexió; la disponibilitat posterior depèn de la memòria cau del navegador.

La publicació de Sites continua pendent per un error DNS del servidor Git; no hi ha una URL publicada verificada. La identitat del lloc és a `.openai/hosting.json` i s’ha de reutilitzar en reprendre la publicació.

Ús local:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

`dist/` conté HTML, CSS, motors de càlcul i regles, instruments, calculadora, traduccions, manifests, service worker, aquest `README.md` i assets. No necessita compilació ni dependències externes. El PDF original no es duplica: es distribueix la imatge derivada (~3,2 MB). No hi ha IA remota ni claus API. El vídeo de referència no es va poder recuperar i no s’afirma reproduir-ne exactament les funcions.

La capçalera mostra **v16**. `npm test` comprova els càlculs, el motor de regles, el formulari, les sessions, els instruments, l’edició, els idiomes i el mode fora de línia. Les proves d’interacció utilitzen un DOM simulat: falta la verificació visual completa en navegador i la instal·lació real a Android.

## Español

PWA educativa sobre la carta A3 del Estrecho de Gibraltar proporcionada por el usuario. **No es válida para navegar.** La imagen de 5.200 píxeles de ancho procede directamente de `CARTA-ESTRECHO-A3.pdf` y conserva su información.

### Idiomas

El selector ofrece catalán, español, inglés y francés. Cambia la interfaz, las ayudas, los nombres de variables, los pasos y los errores sin vaciar los datos introducidos. Recuerda el idioma en este navegador. Se mantienen los nombres y textos del usuario y las inscripciones de la carta escaneada. Los símbolos de las fórmulas (Ra, Rv, Rs, Ct, dm, Δ, M, Da y Dv) son iguales en todos los idiomas; **M** como unidad representa millas náuticas.

### Dos fases

1. Introduce solo los datos conocidos. Todas las variables están disponibles, agrupadas por tema. Un campo vacío es desconocido: **el cero debe introducirse expresamente**.
2. Pulsa «Elige qué quieres calcular», revisa los datos y pulsa la incógnita. El buscador permite localizarla por nombre o símbolo.
3. Consulta las fórmulas con sustitución de datos y los trazados sobre la carta cuando el cálculo determina una situación.

La aplicación siempre arranca con las variables vacías. Tras un cálculo correcto vuelve a la fase 1 con los campos vacíos y mantiene visible la resolución. Un error conserva los datos para corregirlos. Cambiar de idioma no reinicia el ejercicio ni vacía los campos.

### Variables y cálculos

- Ra, Rv, Rs, corrección total Ct, variación/declinación dm, desvío Δ, abatimiento con signo, módulo del abatimiento y dirección de donde viene el viento.
- Distancia, velocidad, duración en minutos/horas, HRB de salida/llegada, días entre ambas y HRB de las observaciones simultáneas.
- Coordenadas iniciales y finales/observadas; nombres y coordenadas de dos referencias con marcaciones y demoras de aguja/verdaderas; dirección y distancia respecto a una referencia.

El motor encadena e invierte `Ct = dm + Δ`, `Rv = Ra + Ct`, `Rs = Rv + Ab`, `Dv = Da + Ct`, `Dv = Rv + M` y `D = V × t`. También resuelve situaciones directa/inversa, intersección de dos demoras, desplazamientos respecto a una referencia y horas con cambio de día.

No supone datos. Para calcular una duración entre dos HRB, introduce también los días (**0** si es el mismo día). Detecta datos contradictorios o insuficientes e inversiones no únicas. No todas las combinaciones tienen una solución implementada. No modela corrientes, mareas ni demoras no simultáneas. Los nombres de los faros no cargan coordenadas automáticamente.

Admite grados decimales o grados/minutos/segundos y coma decimal. Los ángulos se cuentan desde el norte en sentido horario. Este/NE y estribor son positivos; oeste/NW y babor, negativos. En una corrección, `4 NW` significa −4°, no 315°. Las marcaciones aceptan Er/Br, estribor/babor y grados circulares. En inglés también STBD/PORT; en francés tribord/bâbord. El viento indica **de dónde viene**.

### Carta y herramientas

El PDF es un escaneo. La calibración inicial aproximada utiliza A: 36°10′ N / 6°00′ W y B: 35°50′ N / 5°20′ W. Ajústala con dos intersecciones y comprueba una tercera. La transformación longitud/Mercator no corrige rotación ni deformaciones locales. Los cálculos numéricos entre coordenadas no dependen de la calibración.

- Transportador cuadrado giratorio con cuerda de longitud variable y ángulos exactos.
- Regla de dos clics que se puede trasladar rígidamente.
- Compás con puntas finas: radio constante en millas con cualquier zoom o traslado. Mueve el centro con la punta verde y traza arcos con la violeta.
- Waypoint, recta, rumbo, demora, distancia, círculo, texto, latitud, longitud, paralela, enfilación, oposición y calculadora.
- «Edita» selecciona en la carta o lista; «Borra» elimina directamente; se pueden deshacer hasta treinta borrados de la sesión.

Los arcos permiten ver cortes con rectas, sin ajuste magnético ni coordenadas automáticas del corte. Borrar un trazado de resolución solo cambia el gráfico; recalcular lo regenera. No se detectan costa, obstáculos o zonas de tráfico. El motor usa loxodromia esférica, `R = 60 × 180/π M`, no geodesia elipsoidal. Tolerancias de coherencia: 0,12° en ángulos, 0,001° en coordenadas y 0,025 en otros valores.

### Sesiones, instalación y archivos

Los datos y dibujos pueden guardarse y exportarse/importarse en JSON v2; también se admiten archivos v1. Al arrancar solo se recuperan calibración y dibujos, nunca variables ni cálculos anteriores. Una importación manual explícita sí puede cargar datos. Los instrumentos temporales y el historial de borrados no se incluyen en el JSON.

Para instalar en Android, publica los archivos estáticos en **HTTPS**, ábrelos con Chrome y pulsa «Instala en Android» o usa el menú del navegador. Espera «Disponible sin conexión» antes de desconectarte. No es un APK y el ZIP no se instala directamente. En iPhone, Safari → Compartir → Añadir a la pantalla de inicio. La primera visita requiere conexión; la disponibilidad posterior depende de la caché del navegador.

La publicación de Sites sigue pendiente por un error DNS del servidor Git; no hay una URL publicada verificada. La identidad del sitio está en `.openai/hosting.json` y debe reutilizarse al reanudar la publicación.

Uso local:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

`dist/` contiene HTML, CSS, motores de cálculo y reglas, instrumentos, calculadora, traducciones, manifests, service worker, este `README.md` y assets. No necesita compilación ni dependencias externas. No se duplica el PDF original: se distribuye su imagen derivada (~3,2 MB). No hay IA remota ni claves API. No se pudo recuperar el vídeo de referencia y no se afirma reproducir exactamente sus funciones.

La cabecera muestra **v16**. `npm test` comprueba cálculos, motor de reglas, formulario, sesiones, instrumentos, edición, idiomas y modo sin conexión. Las pruebas de interacción usan un DOM simulado: falta la verificación visual completa en navegador y la instalación real en Android.

## English

Educational PWA using the user-provided A3 chart of the Strait of Gibraltar. **Not for navigation.** The 5,200-pixel-wide image comes directly from `CARTA-ESTRECHO-A3.pdf` and preserves its information.

### Languages

The selector offers Catalan, Spanish, English and French. It changes the interface, help, variable labels, solution steps and errors without clearing entered values. The language is remembered in this browser. User-written names and text and the scanned chart’s inscriptions are preserved. Formula symbols (Ra, Rv, Rs, Ct, dm, Δ, M, Da and Dv) remain the same in every language; **M** as a unit means nautical miles.

### Two phases

1. Enter only known values. All variables are available, grouped by topic. An empty field is unknown: **zero must be entered explicitly**.
2. Press “Choose what to calculate”, review the data and select the unknown. Search by name or symbol.
3. Follow the formulas with substituted values and the plots generated when the calculation determines a position.

The app always starts with empty variable fields. After a successful calculation it returns to phase 1 with empty fields and keeps the solution visible. An error preserves the data so you can correct them. Changing language does not restart the problem or clear the fields.

### Variables and calculations

- Compass heading Ra, true heading Rv, course through the water Rs, total correction Ct, magnetic variation dm, compass deviation Δ, signed leeway, leeway magnitude and wind direction of origin.
- Distance, speed, duration in minutes/hours, departure/arrival ship’s-clock time (HRB), elapsed days and observation HRB for simultaneous observations.
- Initial and final/observed coordinates; names and coordinates of two references with relative, compass and true bearings; direction and distance from a reference.

The solver chains and inverts `Ct = dm + Δ`, `Rv = Ra + Ct`, `Rs = Rv + Ab`, `Dv = Da + Ct`, `Dv = Rv + M` and `D = V × t`. It also solves forward/inverse positions, intersection of two bearings, offsets from a reference and times across day boundaries.

It does not assume missing data. For elapsed time between two HRB readings, also enter the days (**0** for the same day). It detects conflicting or insufficient data and non-unique inverses. Not every combination has an implemented solution. Currents, tides and non-simultaneous bearings are not modelled. Lighthouse names do not load coordinates automatically.

Decimal degrees or degrees/minutes/seconds are accepted, including decimal commas. Angles run clockwise from north. East/NE and starboard are positive; west/NW and port are negative. In a correction, `4 NW` means −4°, not 315°. Relative bearings accept Er/Br, starboard/port and clockwise degrees; STBD/PORT and French tribord/bâbord are also accepted. Wind direction indicates **where it comes from**.

### Chart and tools

The PDF is a scan. Approximate initial calibration uses A: 36°10′ N / 6°00′ W and B: 35°50′ N / 5°20′ W. Adjust it with two intersections and check a third. The longitude/Mercator transformation does not correct rotation or local distortion. Numerical calculations between coordinates do not depend on calibration.

- Rotating square protractor with variable-length string and exact angles.
- Two-click ruler that can be translated as a rigid tool.
- Fine-needle dividers: a constant nautical-mile radius at any zoom or position. Move the centre with the green needle and draw arcs with the purple one.
- Waypoint, straight line, course, bearing, distance, circle, text, latitude, longitude, parallel line, transit, opposition and calculator.
- “Edit” selects on the chart or in the list; “Erase” deletes directly; up to thirty session deletions can be undone.

Arcs show intersections with straight lines without snapping or automatic intersection coordinates. Deleting a solution plot only changes the drawing; recalculating regenerates it. There is no coastline, obstacle or traffic-zone detection. The engine uses spherical rhumb-line navigation, `R = 60 × 180/π M`, not ellipsoidal geodesy. Consistency tolerances: 0.12° for angles, 0.001° for coordinates and 0.025 for other values.

### Sessions, installation and files

Values and drawings can be saved and exported/imported as JSON v2; v1 files are also supported. Startup restores only calibration and drawings, never previous variable values or calculations. An explicit manual import can load values. Temporary instruments and deletion history are not included in JSON.

To install on Android, publish the static files over **HTTPS**, open them in Chrome and press “Install on Android” or use the browser menu. Wait for “Available offline” before disconnecting. This is not an APK and the ZIP cannot be installed directly. On iPhone: Safari → Share → Add to Home Screen. The first visit requires a connection; later availability depends on the browser cache.

Sites publication remains pending because of a Git-server DNS error; there is no verified published URL. The site identity is in `.openai/hosting.json` and must be reused when publication resumes.

Local use:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

`dist/` contains HTML, CSS, calculation and rule engines, instruments, calculator, translations, manifests, service worker, this `README.md` and assets. No build or external dependencies are needed. The original PDF is not duplicated: its derived image (~3.2 MB) is distributed. There is no remote AI or API key. The reference video could not be retrieved, and exact reproduction of its features is not claimed.

The header shows **v16**. `npm test` checks calculations, the rule engine, form, sessions, instruments, editing, languages and offline mode. Interaction tests use a simulated DOM: full browser visual verification and actual Android installation remain unverified.

## Français

PWA pédagogique utilisant la carte A3 du détroit de Gibraltar fournie par l’utilisateur. **Ne pas utiliser pour naviguer.** L’image de 5 200 pixels de large provient directement de `CARTA-ESTRECHO-A3.pdf` et conserve ses informations.

### Langues

Le sélecteur propose le catalan, l’espagnol, l’anglais et le français. Il modifie l’interface, l’aide, les noms des variables, les étapes et les erreurs sans vider les données saisies. La langue est mémorisée dans ce navigateur. Les noms et textes de l’utilisateur ainsi que les inscriptions de la carte scannée sont conservés. Les symboles des formules (Ra, Rv, Rs, Ct, dm, Δ, M, Da et Dv) restent identiques dans toutes les langues ; **M** comme unité désigne les milles nautiques.

### Deux phases

1. Saisissez uniquement les données connues. Toutes les variables sont disponibles, regroupées par thème. Un champ vide est inconnu : **zéro doit être saisi explicitement**.
2. Appuyez sur « Choisissez la variable à calculer », vérifiez les données et sélectionnez l’inconnue. La recherche accepte son nom ou son symbole.
3. Consultez les formules avec les valeurs substituées et les tracés produits lorsque le calcul détermine une position.

L’application démarre toujours avec des champs de variables vides. Après un calcul réussi, elle revient à la phase 1 avec les champs vides et garde la résolution visible. Une erreur conserve les données pour les corriger. Changer de langue ne redémarre pas l’exercice et ne vide pas les champs.

### Variables et calculs

- Cap compas Ra, cap vrai Rv, route surface Rs, variation du compas Ct, déclinaison magnétique dm, déviation Δ, dérive due au vent signée, sa valeur absolue et la direction d’origine du vent.
- Distance, vitesse, durée en minutes/heures, heures de bord (HRB) de départ/arrivée, jours écoulés et HRB des observations simultanées.
- Coordonnées initiales et finales/observées ; noms et coordonnées de deux repères avec gisements et relèvements compas/vrais ; direction et distance depuis un repère.

Le moteur enchaîne et inverse `Ct = dm + Δ`, `Rv = Ra + Ct`, `Rs = Rv + Ab`, `Dv = Da + Ct`, `Dv = Rv + M` et `D = V × t`. Il résout aussi les positions directe/inverse, le croisement de deux relèvements, les déplacements depuis un repère et les heures avec changement de jour.

Aucune donnée manquante n’est supposée. Pour une durée entre deux HRB, indiquez aussi les jours (**0** pour le même jour). Le moteur détecte les données contradictoires ou insuffisantes et les inversions non uniques. Toutes les combinaisons ne disposent pas d’une résolution implémentée. Les courants, les marées et les relèvements non simultanés ne sont pas modélisés. Les noms des phares ne chargent pas leurs coordonnées automatiquement.

Les degrés décimaux ou degrés/minutes/secondes sont acceptés, y compris la virgule décimale. Les angles se comptent depuis le nord dans le sens horaire. Est/NE et tribord sont positifs ; ouest/NW et bâbord sont négatifs. Pour une correction, `4 NW` signifie −4°, et non 315°. Les gisements acceptent Er/Br, tribord/bâbord et les degrés circulaires ; STBD/PORT est également accepté. Le vent indique **d’où il vient**.

### Carte et outils

Le PDF est un scan. L’étalonnage initial approximatif utilise A : 36°10′ N / 6°00′ W et B : 35°50′ N / 5°20′ W. Ajustez-le sur deux intersections et vérifiez-en une troisième. La transformation longitude/Mercator ne corrige ni rotation ni déformations locales. Les calculs numériques entre coordonnées ne dépendent pas de l’étalonnage.

- Rapporteur carré orientable avec fil de longueur variable et angles exacts.
- Règle définie par deux clics et déplaçable comme un outil rigide.
- Compas à pointes fines : rayon constant en milles quel que soit le zoom ou l’emplacement. Déplacez le centre avec la pointe verte et tracez des arcs avec la violette.
- Waypoint, droite, cap, relèvement, distance, cercle, texte, latitude, longitude, parallèle, alignement, opposition et calculatrice.
- « Modifier » sélectionne sur la carte ou dans la liste ; « Effacer » supprime directement ; jusqu’à trente suppressions de la session peuvent être annulées.

Les arcs permettent de voir les intersections avec les droites, sans accrochage ni coordonnées automatiques d’intersection. Supprimer un tracé de résolution ne modifie que le dessin ; recalculer le régénère. Il n’y a pas de détection des côtes, obstacles ou zones de trafic. Le moteur utilise la loxodromie sphérique, `R = 60 × 180/π M`, et non la géodésie ellipsoïdale. Tolérances de cohérence : 0,12° pour les angles, 0,001° pour les coordonnées et 0,025 pour les autres valeurs.

### Sessions, installation et fichiers

Les données et dessins peuvent être enregistrés et exportés/importés en JSON v2 ; les fichiers v1 sont également acceptés. Au démarrage, seuls l’étalonnage et les dessins sont restaurés, jamais les anciennes valeurs ni les anciens calculs. Une importation manuelle explicite peut charger des données. Les instruments temporaires et l’historique des suppressions ne sont pas inclus dans le JSON.

Pour installer sur Android, publiez les fichiers statiques en **HTTPS**, ouvrez-les dans Chrome et appuyez sur « Installer sur Android » ou utilisez le menu du navigateur. Attendez « Disponible hors connexion » avant de vous déconnecter. Ce n’est pas un APK et le ZIP ne s’installe pas directement. Sur iPhone : Safari → Partager → Sur l’écran d’accueil. La première visite exige une connexion ; la disponibilité ultérieure dépend du cache du navigateur.

La publication Sites reste bloquée par une erreur DNS du serveur Git ; aucune URL publiée n’est vérifiée. L’identité du site figure dans `.openai/hosting.json` et doit être réutilisée à la reprise de la publication.

Utilisation locale :

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

`dist/` contient HTML, CSS, moteurs de calcul et de règles, instruments, calculatrice, traductions, manifests, service worker, ce `README.md` et assets. Aucune compilation ni dépendance externe n’est nécessaire. Le PDF original n’est pas dupliqué : seule son image dérivée (~3,2 Mo) est distribuée. Aucune IA distante ni clé API n’est utilisée. La vidéo de référence n’a pas pu être récupérée et aucune reproduction exacte de ses fonctions n’est revendiquée.

L’en-tête affiche **v16**. `npm test` vérifie calculs, moteur de règles, formulaire, sessions, instruments, modification, langues et mode hors connexion. Les tests d’interaction utilisent un DOM simulé : la vérification visuelle complète dans un navigateur et l’installation réelle sur Android restent à effectuer.
