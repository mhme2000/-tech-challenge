# Tech challenge - grupo 15

Projeto desenvolvido para pós graduação POSTECH - Software Architeture.

## Requisitos para executar o projeto

É necessário ter instalado na máquina [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/).

## Modelo Entidade Relacionamento

<img src="tech_challenge_mer.png" alt="drawing" width="75%"/>

## Rodando o projeto

Para executar o projeto basta rodar o comando:

```
docker compose build
docker compose up
```

## Acessando o projeto

### Acesso a API

``` http://localhost:3000/api#/```

### Acesso ao prometheus

```http://localhost:9090```

### Acesso ao grafana

user: admin
senha: admin

```http://localhost:3001/d/PTSqcpJWk/nestjs-application-dashboard?orgId=1```