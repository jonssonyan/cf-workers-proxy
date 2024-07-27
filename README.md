# Cloudflare Workers Proxy

基于 Cloudflare Workers 的代理

# 目录

- [HTTP 代理](#http-代理)

## HTTP 代理

### 环境变量

| 变量名                   | 示例                     | 必填  | 备注                   |
|-----------------------|------------------------|-----|----------------------|
| TARGET_HOST           | github.com             | √   | 代理地址的 host           |
| TARGET_PROTOCOL       | https                  | ×   | 代理地址的协议              |
| TARGET_PATHNAME_REGEX | .\*/jonssonyan/.\*     | ×   | 代理地址路径匹配的正则表达式       |
| UA_REGEX              | (curl)                 | ×   | User-Agent 白名单的正则表达式 |
| URL302                | https://jonssonyan.com | ×   | 302 跳转地址             |

### 部署

复制 [http_proxy.js](http_proxy.js) ，保存并部署
