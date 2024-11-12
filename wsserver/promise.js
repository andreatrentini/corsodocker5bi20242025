// Fake function che simula l'accessoad un database (di qualsiasi natura) in grado di fornirci dati
// La funzione impieghera un certo lasso di tempo per completare l'operazione.

function getUser() {
    // resolve e reject sono due funzioni di callback che saranno eseguite in caso di successo oppure di rifiuto
    return new Promise((resolve, reject) => {
        // Simulazione di successo o fallimento
        let success = Math.random() > 0.3;
        setTimeout(() => {
            if (success) {
                resolve(
                    {
                        id: 1,
                        nome: 'Chiara'
                    }
                );
            }
            else {
                reject('Errore durante il caricamento dell\'utente.');
            }
        }, 2000);
    })
}

function getOrders(userId) {
    return new Promise((resolve, reject) => {
        let success = Math.random() > 0.4;
        setTimeout(() => {
            if (success) {
                resolve({
                    id: 126,
                    userId: userId,
                    product: 'iPhone 16'
                })
            }
            else {
                reject('Errore durante il caricamento degli ordini.')
            }
        }, 1500) 
    })
}

function getData() {
    getUser()
    .then((utente) => {
      console.log('Utente ricevuto in modo asincrono: ', utente);
      return getOrders(utente.id);   
    })
    .then((ordini) => {
        console.log('Ordini ricevuti in modo asincrono: ', ordini);        
    })
    .catch((errore) => {
        console.log('Errore durante il recupero dell\'utente in modo asincrono: ', errore);
    })
    .finally(() => {
        console.log('Finally viene eseguito sempre o dopo il then o dopo il catch.')
    })

}

async function getDataAsincrono() {
    try {
        const utente = await getUser();
        // La riga successiva sarà eseguita solo dopo che la promise di getUser sarà risolta
        console.log('Utente ricevuto con await: ', utente);
        const ordini = await getOrders(utente.id);
        console.log('Ordini ricevuti con await: ', ordini);
    }
    catch(errore) {
        console.log('Errore durante async/await: ', errore);
    }
    finally {
        console.log('Istruzioni eseguite sempre con async/await.');
    }
}

console.log('Inizio operazioni di recupero dati in modo asincrono...');
getData();
console.log('Termine operazioni di recupero dati in modo asincrono.');

console.log('Inizio operazioni di recupero dati in modo sincrono...');
getDataAsincrono();
console.log('Termine operazioni di recupero dati in modo sincrono.');
