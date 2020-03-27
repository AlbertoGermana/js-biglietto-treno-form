/* DESCRIZIONE:
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
var userKm = document.getElementById("userKm");
var eta = document.getElementById("eta");

// dichiaro variabili che salveranno i valori degli input
var userNameValue, userKmValue, etaValue;

// dichiaro variabili dei pulsanti che si collegano agli elementi button dell'html
var generateButton = document.getElementById("genera");
var asd = document.getElementById("asd");


generateButton.addEventListener("click", 
    function () {
        userNameValue = userName.value;
        userKmValue = userKm.value;
        etaValue = eta.value;

        console.log("Ho generato: "+ userNameValue + userKmValue + etaValue);
        document.getElementById("stampa").innerHTML = userNameValue;
    }
);

