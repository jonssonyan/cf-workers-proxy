<div align="center">

<h1 align="center">Cloudflare Workers Proxy</h1>

[English](README_EN.md) / 简体中文

Cloudflare Workers HTTP 反向代理

<p>
<a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://img.shields.io/github/license/jonssonyan/cf-workers-proxy" alt="License: GPL-3.0"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/stargazers"><img src="https://img.shields.io/github/stars/jonssonyan/cf-workers-proxy" alt="GitHub stars"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/forks"><img src="https://img.shields.io/github/forks/jonssonyan/cf-workers-proxy" alt="GitHub forks"></a>
<a href="https://github.com/jonssonyan/cf-workers-proxy/releases"><img src="https://img.shields.io/github/v/release/jonssonyan/cf-workers-proxy" alt="GitHub release"></a>
</p>


</div>

**建议自用，使用正则表达式过滤请求，并设置 worker 自定义域名，禁止代理全站，例如：GitHub，否则导致账号被官方风控概不负责**

理论上支持代理任何被屏蔽的域名，只需要设置环境变量 PROXY_HOSTNAME 为被屏蔽的域名，最后通过你的 worker 自定义域名访问即可

## 部署

- Workers 方式: 复制 [_worker.js](_worker.js) ，在 [Cloudflare](https://www.cloudflare.com) 保存并部署
- Pages 方式: [Fork](https://github.com/jonssonyan/cf-workers-proxy/fork)
  仓库，在 [Cloudflare](https://www.cloudflare.com) 连接 GitHub 一键部署

注意：大部分情况使用 [_worker.js](_worker.js) 部署即可，但是部分代理地址要特殊处理，部署时请使用指定的文件

| 名称     | 文件                       |
|--------|--------------------------|
| 通用     | [_worker.js](_worker.js) |
| Docker | [docker.js](docker.js)   |

## 环境变量

| 变量名                    | 必填  | 默认值   | 示例                                             | 备注                  |
|------------------------|-----|-------|------------------------------------------------|---------------------|
| PROXY_HOSTNAME         | √   |       | github.com                                     | 代理地址 hostname       |
| PROXY_PROTOCOL         | ×   | https | https                                          | 代理地址协议              |
| PATHNAME_REGEX         | ×   |       | ^/jonssonyan/                                  | 代理地址路径正则表达式         |
| UA_WHITELIST_REGEX     | ×   |       | (curl)                                         | User-Agent 白名单正则表达式 |
| UA_BLACKLIST_REGEX     | ×   |       | (curl)                                         | User-Agent 黑名单正则表达式 |
| IP_WHITELIST_REGEX     | ×   |       | (192.168.0.1)                                  | IP 白名单正则表达式         |
| IP_BLACKLIST_REGEX     | ×   |       | (192.168.0.1)                                  | IP 黑名单正则表达式         |
| REGION_WHITELIST_REGEX | ×   |       | (JP)                                           | 地区白名单正则表达式          |
| REGION_BLACKLIST_REGEX | ×   |       | (JP)                                           | 地区黑名单正则表达式          |
| URL302                 | ×   |       | https://github.com/jonssonyan/cf-workers-proxy | 302 跳转地址            |
| DEBUG                  | ×   | false | false                                          | 开启调试                |

## 镜像仓库加速

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

## 开源协议

[GPL-3.0](LICENSE)