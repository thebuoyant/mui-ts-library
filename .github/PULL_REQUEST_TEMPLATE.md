## Summary

<!-- One-line description of what this PR does -->

---

## Pre-Merge Checklist

### Code quality
- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npx vitest run` — all tests pass
- [ ] No `console.log`, `TODO`, or `FIXME` left in source files

### Version
- [ ] `package.json` version bumped (SemVer — patch / minor / major)

### Documentation
- [ ] `CHANGELOG.md` — new version entry added
- [ ] `CHANGELOG.de.md` — German translation added
- [ ] `README.md` — component descriptions / Quick Start snippets updated if needed
- [ ] `README.de.md` — German counterpart updated if needed
- [ ] `user-manuals/<Component>.md` — new props documented
- [ ] `user-manuals/<Component>.de.md` — German counterpart updated
- [ ] `component-features-nice-to-have.md` — implemented features marked ✅

### Stories & tests
- [ ] New props covered by at least one Storybook story
- [ ] New behavior covered by at least one Vitest test
