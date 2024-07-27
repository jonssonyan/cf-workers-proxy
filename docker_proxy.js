export default {
  async fetch(request, env, ctx) {
    try {
      const { TARGET_HOST = "docker" } = env;
    } catch (error) {
      console.log("Fetch error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

const routes = {
  docker: "https://registry-1.docker.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io",
  ecr: "https://public.ecr.aws",
};
