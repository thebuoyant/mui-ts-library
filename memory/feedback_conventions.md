---
name: feedback-conventions
description: Verbindliche Code-Conventions für das gesamte Projekt
metadata:
  type: feedback
---

Alle Code-Kommentare ausschließlich auf Deutsch — und nur wenn das WHY nicht-offensichtlich ist.

**Why:** Thomas hat das explizit eingeführt und auf alle Komponenten angewendet (GanttChart, TagSelection, PasswordStrengthMeter).

**How to apply:** Vor jedem Kommentar prüfen: (1) Ist er auf Englisch? → Übersetzen. (2) Erklärt er nur WAS der Code tut? → Weglassen.

---

Alle Vitest-Tests müssen mit `it("Should ...)` beginnen — Verb im Infinitiv, nicht konjugiert.

**Why:** Thomas hat bestehende Tests (`it("renders..."`, `it("shows..."`) korrigiert; das Pattern soll konsistent sein.

**How to apply:** Nie `it("renders`, `it("shows`, `it("calls` — immer `it("Should render`, `it("Should show`, `it("Should call`.

---

Exportierte `DEFAULT_*`-Konstanten statt inline-Defaults in Funktionssignaturen.

**Why:** Ermöglicht Tree-Shaking, macht Defaults für Nutzer der Bibliothek zugänglich und ist das etablierte Pattern in allen drei Komponenten.

**How to apply:** Neue Komponenten immer mit `DEFAULT_*`-Konstante in der `.types.ts`-Datei anlegen.

---

`translation?: Partial<TranslationType>` — nie vollständiger Typ als Prop.

**Why:** Nutzer sollen nur abweichende Keys angeben müssen. Merge-Pattern: `const t = { ...DEFAULT_*, ...translation }`.
