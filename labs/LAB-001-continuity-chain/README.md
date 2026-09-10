# LAB-001 — Continuity Chain (v0.1.0)

Demo Capsule : **Continuity Chain Capsule** — *Demo Capsule = Lab Test Unit*.

## Objectif
Observer comment le **contexte**, la **provenance** et l'**état** se dégradent au passage
d'un outil à un autre (handoff), et distinguer une modification légitime d'une dérive.

## Statuts
- Demo Capsule : **TESTABLE** (Lab reproductible, tests locaux et CI)
- Production Capsule ANES : **NOT DEPLOYED**

## Lancer les tests (Node 20+)
```bash
cd labs/LAB-001-continuity-chain
node --test tests/*.test.mjs
```
Résultat attendu : **5/5 PASS**.

## Démonstration statique
Voir le dossier `/docs` à la racine du dépôt (publié via GitHub Pages).

## Scénarios couverts
1. `CLEAN_HANDOFF` — passage propre
2. `CONTEXT_LOSS` — perte de contexte
3. `PROVENANCE_CHANGE` — origine déclarée modifiée
4. `STATE_DRIFT` — état modifié sans autorisation ni lien au parent
5. `AUTHORIZED_DELTA` — modification déclarée, rattachée au manifeste parent

## Limites
Empreinte non cryptographique, fixtures synthétiques, aucune donnée réelle ni secret.
