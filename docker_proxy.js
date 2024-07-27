const routes = {
  docker: "registry-1.docker.io",
  "k8s-gcr": "k8s.gcr.io",
  k8s: "registry.k8s.io",
  quay: "quay.io",
  gcr: "gcr.io",
  ghcr: "ghcr.io",
  cloudsmith: "docker.cloudsmith.io",
  ecr: "public.ecr.aws",
};

function logError(request, message) {
  console.error(
    `${message}, clientIp: ${request.headers.get(
      "x-real-ip"
    )}, user-agent: ${request.headers.get("user-agent")}, url: ${request.url}`
  );
}

function createNewRequest(request, url, host) {
  const newRequestHeaders = new Headers(request.headers);
  newRequestHeaders.set("host", url.hostname);
  newRequestHeaders.set("referer", url.hostname);
  if (host === "docker") {
    if (
      /^\/v2\/[^/]+\/[^/]+\/[^/]+$/.test(url.pathname) &&
      !/^\/v2\/library/.test(url.pathname)
    ) {
      url.pathname = url.pathname.replace(/\/v2\//, "/v2/library/");
    }
  }
  return new Request(url.toString(), {
    method: request.method,
    headers: newRequestHeaders,
    body: request.body,
  });
}

function setResponseHeaders(originalResponse, host, originUrlHostname) {
  const newResponseHeaders = new Headers(originalResponse.headers);
  newResponseHeaders.set("access-control-allow-origin", "*");
  newResponseHeaders.set("access-control-allow-credentials", "true");
  newResponseHeaders.set("cache-control", "no-store");
  newResponseHeaders.delete("content-security-policy");
  newResponseHeaders.delete("content-security-policy-report-only");
  newResponseHeaders.delete("clear-site-data");
  const wwwAuthenticate = newResponseHeaders.get("Www-Authenticate");
  if (host === "docker" && wwwAuthenticate) {
    newResponseHeaders.set(
      "Www-Authenticate",
      wwwAuthenticate.replace(
        new RegExp("registry-1.docker.io", "g"),
        originUrlHostname
      )
    );
  }
  return newResponseHeaders;
}

export default {
  async fetch(request, env, ctx) {
    const { SERVICE = "docker", URL302 } = env;
    const host = routes[SERVICE];
    if (!host) {
      logError(request, "Invalid service");
      return URL302
        ? Response.redirect(URL302, 302)
        : new Response("Invalid", { status: 400 });
    }
    try {
      const url = new URL(request.url);
      const originUrlHostname = url.hostname;
      url.host = host;
      const newRequest = createNewRequest(request, url, host);
      const originalResponse = await fetch(newRequest);
      const newResponseHeaders = setResponseHeaders(
        originalResponse,
        host,
        originUrlHostname
      );
      return new Response(originalResponse.body, {
        status: originalResponse.status,
        headers: newResponseHeaders,
      });
    } catch (error) {
      logError(request, `Fetch error: ${error.message}`);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
