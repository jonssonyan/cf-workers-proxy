# Cloudflare Workers Proxy

Cloudflare Workers HTTP reverse proxy

# List

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
