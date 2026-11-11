# 修改前备份

原型：prototype.before.html（保持修改前的完整文件）。
Notion PRD：prd.before.md（完整正文）及 notion.before.json（原始读取结果、页面 URL 与属性）。
目标页面：https://app.notion.com/p/3ea68e98446681d5b247fd9f000f29e8

如需回退，可以在原聊天中说“恢复到 2026-10-09 本次规则频率修改前，原型和 PRD 都恢复”。原型用 prototype.before.html 恢复覆盖；Notion 优先用 notion-updates.json 中的新旧内容反向替换，保留其他后续修改。若页面有后续改动，先读取并检查冲突。完整正文备份不包含 Notion 原生评论或页面版本历史，但本次不修改这些内容。
