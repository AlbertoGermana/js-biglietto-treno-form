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
var userKm = document.getElementById("userKm");
var eta = document.getElementById("eta");

// dichiaro variabili che salveranno i valori degli input
var userNameValue, userKmValue, etaValue;

// dichiaro variabili dei pulsanti che si collegano agli elementi button dell'html
var generateButton = document.getElementById("genera");
var resetButton = document.getElementById("reset");

// variabili che con gli sconti
var scontoUnder = 0.2;
var scontoOver = 0.4;

/* Definizione del prezzo di 0.21€/km */
var euroKm = 0.21;


generateButton.addEventListener("click", 
    function () {
        // controllo se i campi sono vuoti
        if((userName.value=="") || 
            (userKm.value=="")){
                alert("Hai dimenticato di compilare i campi");
        }else{
            // assegno i valori immessi nei campi nelle rispettive variabili
            userNameValue = userName.value;
            userKmValue = userKm.value;
            etaValue = eta.value;
    
            // variabile che conterrà il costo del biglietto
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
            document.getElementById("dettNome").innerHTML = "<span class='min'>Nome passeggero: </span><br>" + userNameValue;
            document.getElementById("dettKm").innerHTML = "<span class='min'>Distanza: </span>" + userKmValue + "Km";
            document.getElementById("dettEta").innerHTML = "<span class='min'>Età: </span>" + etaValue;
            
            document.getElementById("dettCosto").innerHTML = "<span class='min'>Costo del biglietto: </span><br>" + bigliettoScontato + "€";
    
            document.getElementById("trainTicket").className = "displayYes";
            document.getElementById("qr-code").className = "qr-code-displayed";

            document.getElementById("code").innerHTML = createTicketCode();
        }
        
        
        

    }
    );
    
resetButton.addEventListener("click", 
    function(){
        // resetto i valori dei campi
        userName.value = "";
        userKm.value = "";

        //resetto html
        document.getElementById("dettNome").innerHTML = "<span class='min'>Nome passeggero: </span><br>";
        document.getElementById("dettKm").innerHTML = "<span class='min'>Distanza: </span>";
        document.getElementById("dettEta").innerHTML = "<span class='min'>Età: </span>";
        
        document.getElementById("dettCosto").innerHTML = "<span class='min'>Costo del biglietto: </span><br>";
        document.getElementById("dettSconto").innerHTML = "";

        document.getElementById("trainTicket").className = "displayNone";
        document.getElementById("qr-code").className = "qr-code-none";
    }
    
    );

    function createTicketCode(){
        var codice;
        var array = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","1","2","3","4","5","6","7","8","9","0"];
        var casuale = "ID:  "; 
        
        for(var i = 0; i < 12; i++){
            casuale = Math.floor(Math.random() * array.length);
            codice = codice + array[casuale];
            console.log("array[casuale]" + array[casuale]);
            
            
        }

        return codice;
    }