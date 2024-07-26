# Cloudflare Workers Proxy

Cloudflare Workers 代理

# HTTP 代理

# 环境变量

| 变量名             | 示例                     | 必填  | 备注                   |
|-----------------|------------------------|-----|----------------------|
| TARGET_HOST     | github.com             | √   | 目标地址的 host           |
| TARGET_PROTOCOL | https                  | ×   | 目标地址的协议              |
| PATHNAME_REGEX  | .*/jonssonyan/.*       | ×   | 匹配路径的正则表达式           |
| UA              | (curl)                 | ×   | User-Agent 白名单的正则表达式 |
| URL302          | https://jonssonyan.com | ×   | 302 跳转地址             |

## 部署

复制 [http_proxy.js](http_proxy.js) ，保存并部署