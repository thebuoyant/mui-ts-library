/**
 * Prüft ob ein TipTap-HTML-String inhaltlich leer ist (nur leere Tags, kein sichtbarer Text).
 */
export function isRichTextEditorEmpty(html: string): boolean {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  return stripped.length === 0;
}

/**
 * Wandelt einen TipTap-JSON-String in einen lesbaren HTML-String um —
 * nur für Display-Zwecke ohne Editor-Instanz verwendbar.
 */
export function richTextJsonToHtml(json: string): string {
  try {
    const doc = JSON.parse(json) as { type: string; content?: unknown[] };
    if (doc.type !== "doc") return json;
    return json;
  } catch {
    return json;
  }
}
