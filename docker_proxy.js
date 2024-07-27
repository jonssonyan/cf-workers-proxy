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
    )}, user-agent: ${request.headers.get("user-agent")}`
  );
}

function createNewRequest(request, url) {
  const newRequestHeaders = new Headers(request.headers);
  newRequestHeaders.set("host", url.hostname);
  newRequestHeaders.set("referer", url.hostname);
  return new Request(url.href, {
    method: request.method,
    headers: newRequestHeaders,
    body: request.body || undefined,
  });
}

function setResponseHeaders(originalHeaders) {
  const newResponseHeaders = new Headers(originalHeaders);
  newResponseHeaders.set("access-control-allow-origin", "*");
  newResponseHeaders.set("access-control-allow-credentials", "true");
  newResponseHeaders.delete("content-security-policy");
  newResponseHeaders.delete("content-security-policy-report-only");
  newResponseHeaders.delete("clear-site-data");
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
      url.host = host;
      const newRequest = createNewRequest(request, url);
      const originalResponse = await fetch(newRequest);
      const newResponseHeaders = setResponseHeaders(originalResponse.headers);
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
