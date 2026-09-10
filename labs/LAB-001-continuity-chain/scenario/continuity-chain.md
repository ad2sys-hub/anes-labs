# Scénario guidé — Continuity Chain

Chaque étape de la chaîne est un **manifeste** : `{ id, parent, provenance, context, state }`.
Un handoff est la comparaison entre deux manifestes successifs.

| # | Étape | Ce qui change | Observation attendue |
|---|-------|---------------|----------------------|
| 1 | Passage propre | rien | `CLEAN_HANDOFF` |
| 2 | Perte de contexte | `contraintes`, `source` disparaissent | `CONTEXT_LOSS` |
| 3 | Changement de provenance | `provenance` remplacée | `PROVENANCE_CHANGE` |
| 4 | Dérive d'état | `budget` modifié, parent non référencé | `STATE_DRIFT` |
| 5 | Delta autorisé | `etape` modifiée, parent référencé, delta déclaré | `AUTHORIZED_DELTA` |

## Questions à se poser
- Qui a le droit de modifier l'état, et sur quelle base déclarée ?
- Une modification sans lien au manifeste parent est-elle observable a posteriori ?
- Que reste-t-il de la provenance après trois outils ?
