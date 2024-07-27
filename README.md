[English](README_EN.md)

# Cloudflare Workers Proxy

Cloudflare Workers HTTP 反向代理

## 目录

- [HTTP 代理](#http-代理)

## HTTP 代理

理论上支持代理任何被屏蔽的域名，只需要设置环境变量 PROXY_HOSTNAME 为被屏蔽的域名，最后通过你的 worker 自定义域名访问即可

### 环境变量

| 变量名            | 必填  | 默认值   | 示例                     | 备注                   |
|----------------|-----|-------|------------------------|----------------------|
| PROXY_HOSTNAME | √   |       | github.com             | 代理地址 hostname        |
| PROXY_PROTOCOL | ×   | https | https                  | 代理地址协议               |
| PATHNAME_REGEX | ×   |       | ^./jonssonyan/         | 代理地址路径匹配的正则表达式       |
| UA_REGEX       | ×   |       | (curl)                 | User-Agent 白名单的正则表达式 |
| URL302         | ×   |       | https://jonssonyan.com | 302 跳转地址             |
| DEBUG          | ×   | false | false                  | 开启调试                 |

### 部署

复制 [http_proxy.js](http_proxy.js) ，保存并部署

### 镜像仓库加速

1. 将环境变量 PROXY_HOSTNAME 设置为以镜像仓库地址即可

| 镜像仓库       | 地址                   |     
|------------|----------------------|
| docker     | registry-1.docker.io |   
| k8s-gcr    | k8s.gcr.io           |   
| k8s        | registry.k8s.io      |    
| quay       | quay.io              |   
| gcr        | gcr.io               |  
| ghcr       | ghcr.io              |   
| cloudsmith | docker.cloudsmith.io |   
| ecr        | public.ecr.aws       |   

2. 设置 Docker 镜像仓库加速

将 https://dockerhub.xxx.com 替换为你的 worker 自定义域名

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

## 其他

你可以在哔哩哔哩上关注我: https://space.bilibili.com/374864141

如果这个项目对你有帮助，你可以请我喝杯咖啡:

<img src="https://github.com/jonssonyan/install-script/assets/46235235/cce90c48-27d3-492c-af3e-468b656bdd06" width="150" alt="微信赞赏码" title="微信赞赏码"/>