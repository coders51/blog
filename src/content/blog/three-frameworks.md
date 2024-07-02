---
title: "3 Frontend's frameworks"
description: "Una sfida tra tre dei framework/librerie frontend piu' in trend del momento"
author: Davide Dall'Olio a.k.a. DDL
keywords: ["js", "frontend", "ts", "elixir", "angular", "svelte", "liveview"]
pubDate: "07-01-2024 10:00"
updatedDate: "07-01-2024 12:00"
heroImage: "three-frameworks/hero.webp"
timeRead: "3"
---

### Intro

Qui in in Italia, per un certo periodo di tempo, hanno trasmesso in tv un reality show di cucina chiamato 4 Ristoranti il cui host era Alessandro Borghese. In questo reality 4 ristoratori si sfidavano per "il miglior ristorante in citta'". In ogni puntata i 4 ristoratori partecipanti visitavano i ristoranti degli avversari e , alla fine di una pasto, votavano il ristorante visitato votando 4 categorie: la location, il menu', il servizio e il conto. Alla fine del giro dei ristoranti, il ristorante con il voto piu' alto veniva proclamato il migliore in citta'.
Durante il workshop formativo aziendale di frontend (seguito da DDL e ABJ), abbiamo voluto replicare questo format facendo "sfidare" 3 framework/librerie di frontend che sono, ad oggi, in trend. Lo scopo finale non era pero' trovare il miglior framework, ma stilare una "classifica" per valutare quanto possa essere viabile abbracciare e usare un eventuale framework/librerie per lo sviluppo. Per poter analizzare i framework/librerie abbiamo deciso di avvalerci di un POC che si componeva di una pagina di Login, una lista di elementi recuperata in realtime da un server in SSE, e la possibilita' di filtrare/ricercare elementi nella suddetta lista. I framework/librerie in gioco sono stati Svelte, Angular e LiveView. Ovviamente, essendo le 4 categoria di votazione non applicabili allo stesso modo, le abbiamo un po' reinventate cercando di rimanere abbastanza attinenti alle categorie originali.

- La Location e' stata per noi il primo contatto con il framework/libreria. Nello specifico come si presentava la documentazione, quanto era dev friendly l'init del progetto, e tutto cio' che poteva essere una prima impressione nell'avvicinarsi al framework/libreria.
- Il Menù era per noi quello che il framework/libreria aveva da offrire. In pratica le funzionalita' che il framework/libreria fornisce built in.
- Il voto sul Servizio si riferiva invece a tutto quello che e' l'ecosistema di "accessori" che abbiamo trovato. Toolkits, CLI, community, plugin di vs code
- E infine il Conto era relativo a quanto la curva di apprendimento e la realizzazione del poc e' stata costosa rispetto a quello che il framework/libreria offre

Ora che sono state spiegate le regole del gioco partiamo con il primo dei contendenti: Svelte!

In questa disamina non ci soffermeremo sulla sintassi ma andremo dritti alle votazioni spiegando il motivo dei voti e come sono stati assegnati. Nel caso vi interessi approfondire un po' le sintassi, questo sito https://component-party.dev/ e' un'ottima risorsa da cui partire. Purtroppo non e' presente LiveView in quanto il sito tratta solo framework/librerie js.

### Svelte <img class='w-8 !my-0 mr-2 float-left' src="/public/posts/three-frameworks/svelte.png"/>

Creato da Rich Harris, e' un framework frontend nato nel 2016 da Reactive.js. La sua particolarita' e' non avvalersi di un Virtual DOM per aggiungere interattivita' alle pagine web ma di manipolare il DOM direttamente garantendo, a detta loro, delle performance elevatissime. Quello che ci ha colpito di Svelte e' la semplicita' con cui si puo' iniziare a scrivere del codice e quanto asciutto il codice sia. Per manipolare lo stato di un componente/applicazione basta creare delle variabili e manipolarle ricordandosi di usare il $ per renderle reattive. Ovviamente c'e' molto piu' di questo ma siamo rimasti veramente colpiti, venendo da react, quanto sia facile sviluppare un poc senza perdersi nella gestione degli stati/effetti come succede su react. La documentazione e' molto ben scritta (https://svelte.dev/) e il framework che consigliano di usare (Sveltekit - https://kit.svelte.dev/) e' solido e aggiunge quelle funzionalita' di contorno che la libreria vanilla non contiene, ad esempio routing.

### Votazioni Svelte

![Svelte](/public/posts/three-frameworks/svelte-background.jpeg)

#### DDL

Location: <strong>9</strong>

Menu: <strong>7</strong>

Servizio: <strong>8</strong>

Conto: <strong>10</strong>

Totale: <strong>34</strong>

#### ABJ

Location: <strong>9</strong>

Menu: <strong>8</strong>

Servizio: <strong>9</strong>

Conto: <strong>10</strong>

Totale: <strong>36</strong>

### Angular <img class='w-8 !my-0 mr-2 float-left' src="/public/posts/three-frameworks/angular.png"/>

Nato prima come Angular.js, poi diventato Angular dalla versione 2 in poi, e' sviluppato da Google a partire dal 2016. Molto usato in ambiente enterprise data la presenza di una cli che struttura il codice in modo "formale" e perche' la sua sintassi e modo di scrivere codice e' molto verboso e strutturato. Ci ritroviamo quindi a scrivere costruttori, classi e tutto cio' che si avvicina molto all'ambiente backend js. La documentazione (https://angular.dev/) e' stata rivista da poco ma rimane comunque molto enterprise e con tanto contenuto. Il sui punto di forza sono il two way data binding che permette di sincronizzare i dati tra il model e la view e la depencency injection che permette di gestire e iniettare dipendenze nei componenti e servizi promuovendo quindi la modularita'. Il framework fornisce built-in una serie di feature, come il routing, quindi non e' necessario scriversi/cercare librerie per gestire lo stack standard di sviluppo web

### Votazioni Angular

![Angular](/public/posts/three-frameworks/angular-background.jpeg)

#### DDL

Location: <strong>5</strong>

Menu: <strong>9</strong>

Servizio: <strong>8</strong>

Conto: <strong>4</strong>

Totale: <strong>26</strong>

#### ABJ

Location: <strong>3</strong>

Menu: <strong>7</strong>

Servizio: <strong>6</strong>

Conto: <strong>4</strong>

Totale: <strong>20</strong>

### LiveView <img class='w-10 !m-0 mr-2 float-left' src="/public/posts/three-frameworks/liveview.png"/>

Nasce come feature di Phoenix, noto framework scritto in elixir, paritetico a express nel mondo javascript, ha raggiunto la maturita' all'inizio del 2024. Permette di creare esperienze utente realtime tramite codice HTML renderizzato lato server e inviato al browser tramite websocket. La sua particolarita', oltre a essere scritto in elixir, e' quella di spostare molta della parte sviluppo lato server in quanto tutte le funzionalita' interattive sono gestite lato Elixir e non piu' nel client browser. Questo avvicina molto lo sviluppo backend a quello frontend (e viceversa).

### Votazioni LiveView

![LiveView](/public/posts/three-frameworks/liveview-background.jpeg)

#### DDL

Location: <strong>6</strong>

Menu: <strong>7</strong>

Servizio: <strong>8</strong>

Conto: <strong>8</strong>

Totale: <strong>29</strong>

#### ABJ

Location: <strong>7</strong>

Menu: <strong>8</strong>

Servizio: <strong>6</strong>

Conto: <strong>8</strong>

Totale: <strong>29</strong>

### Risultati finali

Giungiamo dunque alla fine di questo percorso che ha visto i contendenti svidarsi su varie categorie. Di seguito la classifica:

#### DDL

1. Svelte - 34 punti
2. LiveView - 29 punti
3. Angular - 26 punti

#### ABJ

1. Svelte - 36 punti
2. LiveView - 29 punti
3. Angular - 20 punti

Il vincitore risulta quindi

<h2>Svelte!</h2>
