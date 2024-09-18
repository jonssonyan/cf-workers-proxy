<div align="center">

<h1 align="center">Cloudflare Workers Proxy</h1>

English / [简体中文](README.md)

Cloudflare Workers HTTP reverse proxy

<p>
<a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://img.shields.io/github/license/jonssonyan/cf-workers-proxy" alt="License: GPL-3.0"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/stargazers"><img src="https://img.shields.io/github/stars/jonssonyan/cf-workers-proxy" alt="GitHub stars"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/forks"><img src="https://img.shields.io/github/forks/jonssonyan/cf-workers-proxy" alt="GitHub forks"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/releases"><img src="https://img.shields.io/github/v/release/jonssonyan/cf-workers-proxy" alt="GitHub release"></a>
</p>

</div>

**It is recommended to use regular expressions to filter requests for personal use, and set a custom domain name for the worker. It
is forbidden to use the proxy for the entire site, such as GitHub. Otherwise, the official risk control will not be
responsible for the account.**

Theoretically, it supports proxying any blocked domain name. You only need to set the environment variable
PROXY_HOSTNAME to the blocked domain name, and then access it through your worker custom domain name.

## Deploy

- Workers: Copy [_worker.js](_worker.js), save and deploy on [Cloudflare](https://www.cloudflare.com)
- Pages: [Fork](https://github.com/jonssonyan/cf-workers-proxy/fork) the repository and connect GitHub
  on [Cloudflare](https://www.cloudflare.com) for quick deployment

Note: In most cases, you can use [_worker.js](_worker.js) to deploy, but some proxy addresses require special
processing. Please use the specified file when deploying.

| Name    | File                     |
|---------|--------------------------|
| General | [_worker.js](_worker.js) |
| Docker  | [docker.js](docker.js)   |

## Environment variables

| Name                   | Required | Default | Example                                        | Remark                                      |
|------------------------|----------|---------|------------------------------------------------|---------------------------------------------|
| PROXY_HOSTNAME         | √        |         | github.com                                     | Proxy address hostname                      |
| PROXY_PROTOCOL         | ×        | https   | https                                          | Proxy address protocol                      |
| PATHNAME_REGEX         | ×        |         | ^/jonssonyan/                                  | Regular expression for proxy address path   |
| UA_WHITELIST_REGEX     | ×        |         | (curl)                                         | Regular expression for User-Agent whitelist |
| UA_BLACKLIST_REGEX     | ×        |         | (curl)                                         | Regular expression for User-Agent blacklist |
| IP_WHITELIST_REGEX     | ×        |         | (192.168.0.1)                                  | Regular expression for IP whitelist         |
| IP_BLACKLIST_REGEX     | ×        |         | (192.168.0.1)                                  | Regular expression for IP blacklist         |
| REGION_WHITELIST_REGEX | ×        |         | (JP)                                           | Regular expression for region whitelist     |
| REGION_BLACKLIST_REGEX | ×        |         | (JP)                                           | Regular expression for region blacklist     |
| URL302                 | ×        |         | https://github.com/jonssonyan/cf-workers-proxy | 302 Redirect address                        |
| DEBUG                  | ×        | false   | false                                          | Enable DEBUG                                |

## Mirror repository proxy

1. Set the environment variable PROXY_HOSTNAME to the mirror repository address.

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

2. Set up a Docker registry proxy

   Replace https://dockerhub.xxx.com with your worker custom domain name

   ```bash
   mkdir -p /etc/docker
   cat >/etc/docker/daemon.json <<EOF
   {
     "registry-mirrors":["https://dockerhub.xxx.com"]
   }
   EOF
   systemctl daemon-reload
   systemctl restart docker
   ```

## Other

you can contact me at YouTube: https://www.youtube.com/@jonssonyan

If this project is helpful to you, you can buy me a cup of coffee.

<img src="https://github.com/jonssonyan/install-script/assets/46235235/cce90c48-27d3-492c-af3e-468b656bdd06" width="150" alt="Wechat sponsor code" title="Wechat sponsor code"/>

## License

[GPL-3.0](LICENSE)