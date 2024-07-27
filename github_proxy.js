export default {
    async fetch(request, env, ctx) {
        try {
            const {TARGET_HOST, TARGET_PROTOCOL = "https", PATHNAME_REGEX, UA, URL302} = env;
            const url = new URL(request.url);
            const originUrlProtocol = url.protocol
            const originUrlHostname = url.hostname
            if (!TARGET_HOST || (PATHNAME_REGEX && !new RegExp(PATHNAME_REGEX).test(url.pathname)) || (UA && !new RegExp(UA).test(request.headers.get('user-agent').toLowerCase()))) {
                console.log(`Invalid,clientIp:${request.headers.get('x-real-ip')},user-agent:${request.headers.get('user-agent')}`)
                return URL302 ? Response.redirect(URL302, 302) : new Response('Invalid', {status: 400});
            }
            url.host = TARGET_HOST;
            url.protocol = TARGET_PROTOCOL;
            const newRequestHeaders = new Headers(request.headers);
            newRequestHeaders.set('host', url.hostname);
            newRequestHeaders.set('referer', request.url);
            const originalResponse = await fetch(url.href, {
                method: request.method,
                headers: newRequestHeaders,
                body: request.body || undefined
            });
            const newResponseHeaders = new Headers(originalResponse.headers);
            newResponseHeaders.set('access-control-allow-origin', '*');
            newResponseHeaders.set('access-control-allow-credentials', 'true');
            newResponseHeaders.delete('content-security-policy');
            newResponseHeaders.delete('content-security-policy-report-only');
            newResponseHeaders.delete('clear-site-data');
            const contentType = newResponseHeaders.get('content-type') || '';
            let body;
            if (contentType.includes('text/html')) {
                body = await replaceResponseText(originalResponse, TARGET_HOST, PATHNAME_REGEX, `${originUrlProtocol}//${originUrlHostname}`);
            } else if (contentType.startsWith('image/') || contentType.startsWith('video/') || contentType.startsWith('audio/')) {
                body = await originalResponse.arrayBuffer();
            } else {
                body = await originalResponse.blob();
            }
            return new Response(body, {
                status: originalResponse.status, headers: newResponseHeaders
            });
        } catch (error) {
            console.log('Fetch error:', error);
            return new Response('Internal Server Error', {status: 500});
        }
    }
};

/**
 * 替换内容
 * @param response 响应
 * @param targetHost 目标地址的 host
 * @param pathnameRegex 匹配路径的正则
 * @param str 替换的字符串
 * @returns {Promise<*>}
 */
async function replaceResponseText(response, targetHost, pathnameRegex, str) {
    let text = await response.text();
    if (pathnameRegex) {
        return text.replace(new RegExp(`^(https?://${targetHost})(${pathnameRegex})$`), `${str}$2`);
    } else {
        return text.replace(new RegExp(`^(https?://${targetHost})$`), str);
    }
}