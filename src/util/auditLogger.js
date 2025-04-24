const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Ensure log directory exists
// const logDir = path.join(__dirname, '..', 'logs');
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

const auditLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "Audit-Service" },
  transports: [
    new winston.transports.File({ filename: "log/audit.log" }),
    // new winston.transports.File({ filename: path.join(logDir, 'audit.log') }),
    // new winston.transports.Console()
  ],
});

// ✅ Fallback-safe utility
function logAuditEvent({
  event,
  message,
  user = {},
  req = {},
  target = {},
  status = {},
  service = "Unknown-Service",
}) {
  auditLogger.info({
    event: event || "UNKNOWN_EVENT",
    message: message || "No message provided",
    user: {
      id: user.id || null,
      username: user.username || "anonymous",
      email: user.email || null,
      role: user.role || "unknown",
    },
    ip: req.ip || "unknown",
    target: {
      entity: target.entity || null,
      entityId: target.entityId || null,
      details: target.details || {},
    },
    status: {
      success: status.success ?? true,
      code: status.code || 200,
      message: status.message || "Success",
    },
    service,
    timestamp: new Date().toISOString(),
  });
}

// 🔴 Failure logger
function logAuditError({
  event,
  message,
  user = {},
  req = {},
  target = {},
  error = {},
  service = "Unknown-Service",
}) {
  auditLogger.error({
    event: event || "UNKNOWN_FAILURE",
    message: message || "No error message provided",
    user: {
      id: user.id || null,
      username: user.username || "anonymous",
      email: user.email || null,
      role: user.role || "unknown",
    },
    ip: req.ip || "unknown",
    target: {
      entity: target.entity || null,
      entityId: target.entityId || null,
      details: target.details || {},
    },
    error: {
      name: error.name || "Error",
      message: error.message || "Unknown error",
      stack: error.stack || "",
    },
    status: {
      success: false,
      code: error.statusCode || 500,
      message: "Operation failed",
    },
    service,
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  logAuditEvent,
  logAuditError,
};
