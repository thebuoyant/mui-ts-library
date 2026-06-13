import type { SqlSchema } from "@thebuoyant-tsdev/mui-ts-library";

export const SQL_EDITOR_SCHEMA: SqlSchema = {
  tables: [
    {
      name: "users",
      columns: [
        { name: "id", type: "INT" },
        { name: "name", type: "VARCHAR" },
        { name: "email", type: "VARCHAR" },
        { name: "active", type: "BOOLEAN" },
        { name: "created_at", type: "TIMESTAMP" },
      ],
    },
    {
      name: "orders",
      columns: [
        { name: "id", type: "INT" },
        { name: "user_id", type: "INT" },
        { name: "total", type: "DECIMAL" },
        { name: "status", type: "VARCHAR" },
        { name: "created_at", type: "TIMESTAMP" },
      ],
    },
  ],
};

export const SQL_EDITOR_SAMPLE_VALUE = `SELECT
  u.id, u.name, u.email,
  COUNT(o.id) AS order_count,
  SUM(o.total) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = 1 AND u.created_at >= '2026-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 50;`;
