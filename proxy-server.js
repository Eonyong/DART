const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 8080;

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// OpenDART API 프록시 설정
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://opendart.fss.or.kr",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api",
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[PROXY] ${req.method} ${req.url} -> ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
      console.error("[PROXY ERROR]", err.message);
      res.status(500).json({ error: "Proxy server error" });
    },
  })
);

// 헬스 체크 엔드포인트
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Proxy server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying requests to: https://opendart.fss.or.kr`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
