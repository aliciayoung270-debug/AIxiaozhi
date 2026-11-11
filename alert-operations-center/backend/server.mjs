import http from "node:http";
import fs from "node:fs/promises";
import { getAlertRuleFields, getComparableFields } from "./field_catalog_service.mjs";

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";
const prototypeUrl = new URL("../prototype.html", import.meta.url);

const commonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    ...commonHeaders,
    "content-type": "application/json; charset=utf-8",
    "cache-control": "private, max-age=300",
  });
  response.end(JSON.stringify(body));
}

async function sendPrototype(response) {
  const html = await fs.readFile(prototypeUrl, "utf8");
  response.writeHead(200, {
    ...commonHeaders,
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(html);
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    if (request.method === "OPTIONS") {
      response.writeHead(204, commonHeaders);
      return response.end();
    }
    if (request.method !== "GET") return sendJson(response, 405, { code: "METHOD_NOT_ALLOWED" });

    if (url.pathname === "/" || url.pathname === "/prototype.html") {
      return sendPrototype(response);
    }

    if (url.pathname === "/api/health") {
      return sendJson(response, 200, { status: "ok", service: "alert-field-catalog" });
    }

    if (url.pathname === "/api/v1/alert-rule-fields") {
      const payload = await getAlertRuleFields({
        alertObjectType: url.searchParams.get("alertObjectType"),
        statisticalObjectType: url.searchParams.get("statisticalObjectType") || undefined,
        query: url.searchParams.get("query") || "",
      });
      return sendJson(response, 200, payload);
    }

    if (url.pathname === "/api/v1/alert-rule-fields/comparable") {
      const payload = await getComparableFields({
        alertObjectType: url.searchParams.get("alertObjectType"),
        fieldId: url.searchParams.get("fieldId"),
      });
      return sendJson(response, 200, payload);
    }

    return sendJson(response, 404, { code: "NOT_FOUND" });
  } catch (error) {
    return sendJson(response, error.statusCode || 500, {
      code: error.message || "INTERNAL_ERROR",
    });
  }
});

server.listen(port, host, () => {
  console.log(`Alert prototype and field catalog API: http://${host}:${port}`);
});
