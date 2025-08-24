// Serverless handler untuk Vercel (@vercel/node)
// Tidak pakai express, tidak app.listen — aman untuk Edge/Serverless.

const FIXED_TOKEN =
"eu7D9Z3ok7kvrDCkszn4NnBIDC1S92SfHLaVObAvyBy7Y7qZo49h%2FuqzRXsmDgfrnBi7G6IcodH7v%2FV9IXjb%2BphQuHKQs31F4R7oo%2B%2Fd3bVaW9JsSSf2WYqdR5T1rq8V6hX0mUgaFY0SOUtW0MAlODKID5IY8%2FzwhFr9C0gI0lc1W49aJtWUVZJqu8AF0eJQs31QxupU2JiApoc30%2BiL8Z4NRGEHuuPnprhxLQO%2BjNrKEiJ1WmnIvbTcvHmeOIvPIMeJmNGADmTgwEjI0zNuW54FKFLkAUN0fuvj8ANX%2FXQHHgfCh%2FlN%2BGXYjtIMOHikfj5JlQ8njs2aw%2BLcftcqhlbxOZcwxbtJ3kb4nOXP%2BdT7PuL31f8CsssWJn44xPmRQcn%2FAmImlvELTSK01KFOeZ2dLSWPRfniVxtYA5cMnEWAwRxVYv5gRgXqN3eHI%2BLV4FXTwBqIp5zg%2FbJWp1QANWXAOnBzgtR%2FuzEl6f74bSloPnG5E1DyN5qHMNh%2FRUiA7DL6Nj3ht5SzngzX4PITnzV%2FsVUAHLP9nUeKprp6rLI%3D";

module.exports = (req, res) => {
  const u = req.url || "/";

  // Healthcheck
  if (u === "/" || u === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("OK");
  }

  // ====== Route khusus pakai token tetap (hardcoded) ======
  // Akses: /player/growid/login/fixed
  if (u === "/player/growid/login/fixed") {
    res.statusCode = 302;
    res.setHeader(
      "Location",
      "https://login.growtopiagame.com/player/growid/login?token=" + FIXED_TOKEN
    );
    return res.end();
  }

  // ====== Bridge umum: teruskan apa adanya ======
  // /player/growid/login?token=...  -> teruskan (query ikut)
  if (u.startsWith("/player/growid/login")) {
    const q = u.includes("?") ? u.slice(u.indexOf("?")) : "";
    res.statusCode = 302;
    res.setHeader(
      "Location",
      "https://login.growtopiagame.com/player/growid/login" + q
    );
    return res.end();
  }

  // /player/growid/... lainnya -> teruskan
  if (u.startsWith("/player/growid/")) {
    res.statusCode = 302;
    res.setHeader("Location", "https://login.growtopiagame.com" + u);
    return res.end();
  }

  // /player/login/... (dashboard dlsb) -> teruskan juga
  if (u.startsWith("/player/login/")) {
    res.statusCode = 302;
    res.setHeader("Location", "https://login.growtopiagame.com" + u);
    return res.end();
  }

  // 404
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h3>404</h3>");
};
