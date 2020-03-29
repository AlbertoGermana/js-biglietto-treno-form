/* 
-------------------- DESCRIZIONE ESERCIZIO: --------------------
Creo una versione dell’EX del biglietto del treno ricca con un bell’output dinamico;
Sulla base di quello visto insieme in aula, ma non per forza identico;
L’importante è usare eventi sui 2 bottoni principali, e sviluppare le logiche che sottendono;
“Genera” mi calcolerà il prezzo del biglietto a partire dai dati inseriti negli input, e mi draà l’output in pagina, nel modo migliore possibile;
“Annulla” mi fa tornare allo stato iniziale con output pulito (o nascosto) e campi puliti (non vale fare refresh del browser :male-farmer:);
BONUS: (ma solo se il resto è fatto)
la pagina la strutturo per bene e la rendo bella;
versione responsive;
aggiungo delle animazioni/transizioni;
varie ed eventuali a fantasia */


// ------------------- SVOLGIMENTO -------------------

// dichiaro variabili che si collegano agli elementi input
var userName = document.getElementById("userName");
var userFrom = document.getElementById("from");
var userTo = document.getElementById("to");
var userKm; /* = document.getElementById("userKm"); */
var eta = document.getElementById("eta");

// dichiaro variabili che salveranno i valori degli input
var userNameValue, userKmValue, etaValue, userFromValue, userToValue;

// dichiaro variabili dei pulsanti che si collegano agli elementi button dell'html
var generateButton = document.getElementById("genera");
var resetButton = document.getElementById("reset");
var buyButton = document.getElementById("buy");

// variabili che con gli sconti
var scontoUnder = 0.2;
var scontoOver = 0.4;

/* Definizione del prezzo di 0.21€/km */
var euroKm = 0.21;

/* Funzione che al click del pulsante "Genera" raccoglie i dati dell'utente e crea un'anteprima del biglietto */
generateButton.addEventListener("click", 
    function () {
        // assegno i valori immessi nei campi nelle rispettive variabili
        userNameValue = userName.value;
        userFromValue = userFrom.value;
        userToValue = userTo.value;
        etaValue = eta.value;
        /* Assegno ad ogni itinerario i Chilometri corrispondenti */
        if(userNameValue==""){ // controllo se il campo "Nome e Cognome è compilato"
                alert('Hai dimenticato di compilare il campo con "Cognome e Nome"');
        }else{
            if(userFromValue === userToValue){ // controllo se l'utente ha selezionato la stessa città tra Partenza e Arrivo
                userKmValue = 0;
            /* Da qui in poi assegno ad ogni itinerario i Km corrispondenti */
            }else if(userFromValue === "palermo" && userToValue === "roma"){
                userKmValue = 925;
            }else if(userFromValue === "palermo" && userToValue === "milano"){
                userKmValue = 1479;
            }else if(userFromValue === "roma" && userToValue === "milano"){
                userKmValue = 573;
            }else if(userFromValue === "milano" && userToValue === "roma"){
                userKmValue = 573;
            }else if(userFromValue === "milano" && userToValue === "palermo"){
                userKmValue = 1479;
            }else if(userFromValue === "roma" && userToValue === "palermo"){
                userKmValue = 925;
            }
        
    
            // dichiaro variabile del biglietto scontato e valorizzo il costo del biglietto base
            var costoBiglietto = userKmValue * euroKm;
            var bigliettoScontato;
    
            // Calcolo del biglietto nel caso di minorenne, applicare 20% di sconto */
            if (etaValue === "minorenne"){
                bigliettoScontato = Math.ceil((costoBiglietto - (costoBiglietto*scontoUnder))*100)/100;
                document.getElementById("dettSconto").innerHTML = "Sconto applicato: " + (scontoUnder*100) + "%";
            }else if(etaValue === "over"){  // In caso di over 65 sconto del 40%
                bigliettoScontato = Math.ceil((costoBiglietto - (costoBiglietto*scontoOver))*100)/100;
                document.getElementById("dettSconto").innerHTML = "Sconto applicato: " + (scontoOver*100) + "%";
            }else{  // Eta compresa tra 18 e 65 anni
                bigliettoScontato = Math.ceil(costoBiglietto*100)/100;
                document.getElementById("dettSconto").innerHTML = "Nessuno Sconto";
            };
            
    
            // stampo i dati nell'HTML
            document.getElementById("dettNome").innerHTML = "<span class='min'>Nome passeggero: </span><br>" + userNameValue; //nome utente
            document.getElementById("dettKm").innerHTML = "<span class='min'>Distanza: </span>" + userKmValue + "Km"; //distanza calcolata
            document.getElementById("dettEta").innerHTML = "<span class='min'>Età: </span>" + etaValue; // fascia di età
            document.getElementById("dettCosto").innerHTML = "<span class='min'>Costo del biglietto: </span><br>" + bigliettoScontato + "€"; // costo biglietto
            document.getElementById("dettFrom").innerHTML = "<span class='min'>FROM: </span><br>" + userFromValue; //città di partenza
            document.getElementById("dettTo").innerHTML = "<span class='min'>TO: </span><br>" + userToValue; //città di arrivo
            // cambio classi nell'html per dinamicità del sito
            document.getElementById("trainTicket").className = "displayYes"; //tolgo l'effetto sfocatura al biglietto
            document.getElementById("genera").className = "buttonClass displayNo"; //nascondo tasto "Genera"
            
            // lancio una funzione che crea un n° ID e la inietta nell'HTML
            document.getElementById("code").innerHTML = createTicketCode();
        }
    }
    );
// Evento click per il tasto "Nuovo"
resetButton.addEventListener("click", 
    function(){
        // resetto il valore del campo del nome utente
        userName.value = "";
        
        //resetto html
        document.getElementById("dettNome").innerHTML = "<span class='min'>Nome passeggero: </span><br>";
        document.getElementById("dettKm").innerHTML = "<span class='min'>Distanza: </span>";
        document.getElementById("dettEta").innerHTML = "<span class='min'>Età: </span>";
        document.getElementById("dettCosto").innerHTML = "<span class='min'>Costo del biglietto: </span><br>";
        document.getElementById("dettSconto").innerHTML = "";
        
        // cambio classi nell'html per dinamicità del sito
        document.getElementById("trainTicket").className = "displayNone"; //oscuro il biglietto
        document.getElementById("qr-code").className = "qr-code-none"; // nascondo qr code
        document.getElementById("code").className = "displayNo"; // nascondo codice biglietto
        document.getElementById("buy").className = "displayBlock"; // mostro il link per acquistare il biglietto
        document.getElementById("genera").className = "buttonClass"; // mostro il tasto "Genera"
    }
    
    );
    // creo funzione per generare un ID del Biglietto
    function createTicketCode(){
        var codice = "ID:  ";
        var array = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","1","2","3","4","5","6","7","8","9","0"];
        var casuale; 
        
        for(var i = 0; i < 12; i++){
            casuale = Math.floor(Math.random() * array.length);
            codice = codice + array[casuale];
        }
        return codice;
    }
// Evento Click per il link "Acquista"
buyButton.addEventListener("click", 
function(){
    alert("Grazie per aver acquistato il biglietto. Trovi il numero identificativo della transazione sul biglietto. O per comodità puoi utilizzare il codice QR per oltrepassare i tornelli. Portalo sempre con te!")
    // modifico classi html per dinamicità sito
    document.getElementById("buy").className = "displayNo"; //nascondo il tasto "Acquista"
    document.getElementById("code").className = "displayBlock"; //mostro codice id del biglietto
    document.getElementById("qr-code").className = "qr-code-displayed"; // mostro codice qr
}
);

// stampo data di oggi
var today = new Date();
var nowDay = today.getDate(); 
var nowMonth = today.getMonth() + 1; 
var nowYear = today.getFullYear(); 
document.getElementById("now").innerHTML = nowDay + "/" + nowMonth + "/" + nowYear;
document.getElementById("cost").innerHTML = euroKm;