# Cloudflare Workers Proxy

基于 Cloudflare Workers 的代理

# 目录

- [HTTP 代理](#http-代理)

## HTTP 代理

### 环境变量

| 变量名            | 必填  | 示例                     | 默认值   | 备注                   |
|----------------|-----|------------------------|-------|----------------------|
| PROXY_HOSTNAME | √   | github.com             |       | 代理地址 host            |
| PROXY_PROTOCOL | ×   | https                  | https | 代理地址协议               |
| PATHNAME_REGEX | ×   | ^./jonssonyan/         |       | 代理地址路径匹配的正则表达式       |
| UA_REGEX       | ×   | (curl)                 |       | User-Agent 白名单的正则表达式 |
| URL302         | ×   | https://jonssonyan.com |       | 302 跳转地址             |
| DEBUG          | ×   | false                  | false | 开启调试                 |

### 部署

复制 [http_proxy.js](http_proxy.js) ，保存并部署
