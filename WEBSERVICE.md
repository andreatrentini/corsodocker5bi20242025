# Guida alla realizzazione del webservice RESTFUL CRUD


## Configurazione di docker

### Docker network
1. Per prima cosa creare una network per il collegmaneto fra il container mysql e il container nodejs sul quale implementare il webservice.

```bash
docker network create ws-sql-net
```

In una fase successiva andremo a creare un volume nel quale salvare i dati del database

2. Creare ed eseguire un container mysql:

```bash
docker run -d --name sqlserver --network ws-sql-net -p 3310:3306 -e MYSQL_ROOT_PASSWORD=cisco mysql:latest
```

3. Configurare MySQL Workbench per accedere e gestire MySQL server (container)
    - Creare una nuova connessione