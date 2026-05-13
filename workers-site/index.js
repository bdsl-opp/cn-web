export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    
    try {
      return await env.ASSETS.fetch(new URL(path, request.url));
    } catch (e) {
      return new Response("Not Found", { status: 404 });
    }
  }
};
