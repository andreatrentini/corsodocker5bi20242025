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