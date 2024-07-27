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

function createNewRequest(request, url) {
  const newRequestHeaders = new Headers(request.headers);
  newRequestHeaders.set("host", url.hostname);
  newRequestHeaders.set("referer", url.hostname);
  return new Request(url.toString(), {
    method: request.method,
    headers: newRequestHeaders,
    body: request.body,
  });
}

function setResponseHeaders(originalResponse) {
  const newResponseHeaders = new Headers(originalResponse.headers);
  newResponseHeaders.set("access-control-allow-origin", "*");
  newResponseHeaders.set("access-control-allow-credentials", "true");
  newResponseHeaders.set("cache-control", "no-store");
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
      const responseBody = await originalResponse.clone().arrayBuffer();
      const newResponseHeaders = setResponseHeaders(originalResponse);
      return new Response(responseBody, {
        status: originalResponse.status,
        headers: newResponseHeaders,
      });
    } catch (error) {
      logError(request, `Fetch error: ${error.message}`);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
