# corsodocker5bi20242025


Docker è una piattaforma di virtualizzazione a livello di sistema operativo, conosciuta anche come "containerizzazione". Permette agli sviluppatori di impacchettare un'applicazione con tutte le parti necessarie, come librerie e dipendenze, e distribuirla come un unico pacchetto o container. Questo container può essere eseguito su qualsiasi sistema che ha Docker installato, indipendentemente dall'ambiente sottostante, il che aiuta ad eliminare il problema del "funziona sul mio computer".

Alcune caratteristiche chiave di Docker includono:

1. **Portabilità**: I container Docker possono essere eseguiti su qualsiasi sistema operativo che supporta Docker, che può essere una macchina locale, un server di produzione, o anche un cloud.
2. **Isolamento**: Ogni container Docker è isolato dagli altri e dal sistema ospite. Un container ha il suo ambiente e set di risorse, che gli permette di operare indipendentemente.
3. **Leggerezza**: I container Docker condividono il kernel del sistema operativo ospitante ma possono essere limitati a usare una certa quantità di risorse come CPU e memoria. Questo li rende molto più leggeri rispetto alle macchine virtuali tradizionali.
4. **Scalabilità e gestibilità**: Docker facilita la scalabilità delle applicazioni. È possibile utilizzare strumenti di orchestrazione come Kubernetes per gestire, scalare e distribuire automaticamente i container Docker.

Docker è ampiamente utilizzato per lo sviluppo di applicazioni, il testing, e la produzione, offrendo un modo consistente e affidabile per eseguire il software.

## Output docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image  
  exec        Execute a command in a running container  
  ps          List containers  
  build       Build an image from a Dockerfile  
  pull        Download an image from a registry  
  push        Upload an image to a registry  
  images      List images  
  login       Log in to a registry  
  logout      Log out from a registry  
  search      Search Docker Hub for images  
  version     Show the Docker version information  
  info        Display system-wide information  

Management Commands:
  builder     Manage builds
  buildx*     Docker Buildx
  compose*    Docker Compose
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  plugin      Manage plugins
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Swarm Commands:
  swarm       Manage Swarm

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  import      Import the contents from a tarball to create a filesystem image
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Global Options:
      --config string      Location of client config files (default "/home/codespace/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket to connect to
  -l, --log-level string   Set the logging level ("debug", "info", "warn", "error", "fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/home/codespace/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/home/codespace/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/home/codespace/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Run 'docker COMMAND --help' for more information on a command.

For more help on how to use Docker, head to https://docs.docker.com/go/guides/

# Guida ai Comandi Principali di Docker

## 1. `docker run`

**Descrizione:** Esegue un comando in un nuovo container.

**Sintassi:**

```bash
docker run [opzioni] immagine [comando] [argomenti]
```

**Esempio:**

```bash
docker run hello-world
```

---

## 2. `docker pull`

**Descrizione:** Scarica un'immagine da un repository Docker.

**Sintassi:**

```bash
docker pull [opzioni] nome_immagine[:tag]
```

**Esempio:**

```bash
docker pull ubuntu:latest
```

---

## 3. `docker images`

**Descrizione:** Elenca le immagini Docker presenti sul sistema.

**Sintassi:**

```bash
docker images [opzioni]
```

**Esempio:**

```bash
docker images
```

---

## 4. `docker ps`

**Descrizione:** Elenca i container in esecuzione.

**Sintassi:**

```bash
docker ps [opzioni]
```

**Esempio:**

```bash
docker ps -a
```

_L'opzione `-a` mostra tutti i container, inclusi quelli non in esecuzione._

---

## 5. `docker stop`

**Descrizione:** Ferma uno o più container in esecuzione.

**Sintassi:**

```bash
docker stop [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker stop mio_container
```

---

## 6. `docker start`

**Descrizione:** Avvia uno o più container fermati.

**Sintassi:**

```bash
docker start [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker start mio_container
```

---

## 7. `docker rm`

**Descrizione:** Rimuove uno o più container.

**Sintassi:**

```bash
docker rm [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker rm mio_container
```

---

## 8. `docker rmi`

**Descrizione:** Rimuove una o più immagini dal sistema.

**Sintassi:**

```bash
docker rmi [opzioni] NOME_IMMAGINE/ID_IMMAGINE
```

**Esempio:**

```bash
docker rmi ubuntu:latest
```

---

## 9. `docker build`

**Descrizione:** Costruisce un'immagine Docker da un Dockerfile.

**Sintassi:**

```bash
docker build [opzioni] percorso
```

**Esempio:**

```bash
docker build -t mio_progetto:1.0 .
```

_L'opzione `-t` assegna un tag all'immagine creata._

---

## 10. `docker exec`

**Descrizione:** Esegue un comando in un container in esecuzione.

**Sintassi:**

```bash
docker exec [opzioni] NOME_CONTAINER/ID_CONTAINER comando
```

**Esempio:**

```bash
docker exec -it mio_container /bin/bash
```

_L'opzione `-it` permette l'accesso interattivo al container._

---

## 11. `docker logs`

**Descrizione:** Recupera i log di un container.

**Sintassi:**

```bash
docker logs [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker logs mio_container
```

---

## 12. `docker inspect`

**Descrizione:** Fornisce informazioni dettagliate su container o immagini.

**Sintassi:**

```bash
docker inspect NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker inspect mio_container
```

---

## 13. `docker push`

**Descrizione:** Carica un'immagine in un repository Docker.

**Sintassi:**

```bash
docker push NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker push mio_username/mia_immagine:latest
```

---

## 14. `docker tag`

**Descrizione:** Assegna un nuovo tag a un'immagine Docker.

**Sintassi:**

```bash
docker tag ID_IMMAGINE NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker tag 123456789abc mio_username/mia_immagine:latest
```

---

## 15. `docker network`

**Descrizione:** Gestisce le reti Docker.

**Sintassi:**

```bash
docker network [comando] [opzioni]
```

**Esempio per creare una rete:**

```bash
docker network create mia_rete
```

---

## 16. `docker volume`

**Descrizione:** Gestisce i volumi Docker.

**Sintassi:**

```bash
docker volume [comando] [opzioni]
```

**Esempio per creare un volume:**

```bash
docker volume create mio_volume
```

---

## 17. `docker-compose`

**Descrizione:** Strumento per definire ed eseguire applicazioni multi-container con Docker.

**Esempio per avviare i servizi definiti in un file `docker-compose.yml`:**

```bash
docker-compose up
```

## Descrizione di Container e Immagini in Docker

### Immagini Docker

Un'**immagine Docker** è un modello immutabile (read-only) che contiene tutto il necessario per eseguire un'applicazione, compreso il codice, le librerie, le dipendenze, i file di configurazione e le variabili d'ambiente. Le immagini sono costruite a strati utilizzando un Dockerfile, che è uno script contenente una serie di istruzioni su come assemblare l'immagine.

- **Stratificazione:** Ogni istruzione nel Dockerfile crea un nuovo strato nell'immagine. Questo approccio consente di riutilizzare gli strati comuni tra diverse immagini, ottimizzando lo spazio su disco e accelerando i tempi di build.
- **Portabilità:** Le immagini possono essere condivise attraverso registri pubblici o privati, come Docker Hub, permettendo una distribuzione semplice e consistente delle applicazioni.

### Container Docker

Un **container Docker** è un'istanza eseguibile di un'immagine Docker. I container sono ambienti isolati che eseguono un'applicazione e le sue dipendenze, utilizzando le risorse del sistema operativo host ma mantenendo un isolamento rispetto ad altri container e processi.

- **Isolamento:** I container utilizzano funzionalità del kernel come namespace e cgroups per isolare i processi, garantendo che le applicazioni non interferiscano tra loro.
- **Leggerezza:** A differenza delle macchine virtuali, i container condividono il kernel del sistema operativo host, rendendoli molto più leggeri e veloci da avviare.
- **Efficienza:** Permettono di eseguire più istanze di un'applicazione sullo stesso host senza la necessità di overhead aggiuntivo.

### Relazione tra Immagini e Container

- **Creazione di Container:** Un container viene creato a partire da un'immagine. Quando esegui `docker run`, Docker prende l'immagine specificata e la utilizza per creare e avviare un nuovo container.
- **Immutabilità vs. Mutabilità:** Le immagini sono immutabili; non cambiano una volta create. I container, invece, possono avere uno stato mutabile, ad esempio dati generati o modifiche durante l'esecuzione.
- **Persistenza dei Dati:** Se desideri che i dati generati all'interno di un container persistano oltre il ciclo di vita del container stesso, è comune utilizzare volumi o bind mounts.

### Esempio Pratico

1. **Costruzione di un'Immagine:**

   Supponiamo di avere un'applicazione Node.js. Crei un Dockerfile che specifica l'ambiente Node necessario e come installare le dipendenze dell'applicazione.

   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY package.json ./
   RUN npm install
   COPY . .
   CMD ["node", "app.js"]
   ```

   Costruisci l'immagine con:

   ```bash
   docker build -t mia_applicazione .
   ```

2. **Esecuzione di un Container:**

   Una volta costruita l'immagine, puoi creare ed eseguire un container basato su di essa:

   ```bash
   docker run -d -p 3000:3000 mia_applicazione
   ```

   Questo comando avvia un container che esegue la tua applicazione Node.js, mappando la porta 3000 del container alla porta 3000 dell'host.

### Conclusione

In sintesi, le **immagini Docker** sono i modelli da cui vengono creati i container, contenenti tutto il necessario per eseguire un'applicazione. I **container Docker** sono le istanze eseguibili di queste immagini, che possono essere avviate, fermate, spostate e cancellate. Questa separazione tra immagine e container offre grande flessibilità e efficienza nella gestione e distribuzione delle applicazioni.
docker-compose up
