[简体中文](README.md)

# Cloudflare Workers Proxy

Cloudflare Workers HTTP reverse proxy

## List

- [HTTP Proxy](#http-proxy)

## HTTP Proxy

### Environment variables

| Name           | Required | Default | Example                | Remark                                      |
|----------------|----------|---------|------------------------|---------------------------------------------|
| PROXY_HOSTNAME | √        |         | github.com             | Proxy address hostname                      |
| PROXY_PROTOCOL | ×        | https   | https                  | Proxy address protocol                      |
| PATHNAME_REGEX | ×        |         | ^./jonssonyan/         | Regular expression for proxy address path   |
| UA_REGEX       | ×        |         | (curl)                 | Regular expression for User-Agent whitelist |
| URL302         | ×        |         | https://jonssonyan.com | 302 Redirect address                        |
| DEBUG          | ×        | false   | false                  | Enable DEBUG                                |

### Deploy

Copy [http_proxy.js](http_proxy.js), save and deploy

### Mirror repository proxy

Set the environment variable PROXY_HOSTNAME to the mirror repository address.

| Mirror repository | Address              |     
|-------------------|----------------------|
| docker            | registry-1.docker.io |   
| k8s-gcr           | k8s.gcr.io           |   
| k8s               | registry.k8s.io      |    
| quay              | quay.io              |   
| gcr               | gcr.io               |  
| ghcr              | ghcr.io              |   
| cloudsmith        | docker.cloudsmith.io |   
| ecr               | public.ecr.aws       |  

## Other

you can contact me at YouTube: https://www.youtube.com/@jonssonyan

If this project is helpful to you, you can buy me a cup of coffee.

<img src="https://github.com/jonssonyan/install-script/assets/46235235/cce90c48-27d3-492c-af3e-468b656bdd06" width="150" alt="Wechat sponsor code" title="Wechat sponsor code"/>