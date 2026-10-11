# LAB-001 — Continuity Chain (v0.2.0)

Demo Capsule : **Continuity Chain Capsule** — *Demo Capsule = Lab Test Unit*.

## Objectif

Observer comment le **contexte**, la **provenance**, l'**identité de l'acteur** et l'**état** peuvent se dégrader au passage d'un outil à un autre (handoff), et distinguer une modification légitime d'une rupture de continuité.

Le Lab part désormais d'un exemple concret : **une capture d'écran puis un réexport**.

Deux fichiers peuvent montrer pratiquement la même image tout en étant deux objets numériques différents. Le second peut avoir une nouvelle empreinte et ne plus transporter la référence vers :

- l'auteur déclaré de la photo ;
- l'utilisateur qui a effectué la capture ;
- l'outil de capture ;
- le fichier parent ;
- l'heure de l'action ;
- l'intention ;
- les preuves / EvidenceRefs.

Formule pédagogique :

> **Même image ≠ même provenance.**

## Exemple guidé — capture A → export B

~~~text
PHOTO / AUTEUR
      |
      v
USER-1 + OUTIL-A
      |
      v
capture-A.png / HASH-A
      |
      | réexport avec OUTIL-B
      v
export-B.jpg / HASH-B
~~~

Si HASH-B n'est relié à HASH-A par aucune preuve vérifiable, la continuité de provenance est rompue même si les pixels paraissent identiques.

Voir le walkthrough complet :

- [Capture d'écran, réexport et rupture de provenance](docs/screenshot-provenance-walkthrough.md)

## Boucle d'apprentissage

Le Lab privilégie une interaction courte afin d'éviter la surcharge cognitive :

~~~text
VOIR
 ↓
FAIRE UNE HYPOTHÈSE
 ↓
AGIR
 ↓
OBSERVER
 ↓
EXPLIQUER
 ↓
VÉRIFIER LA RÉPONSE
 ↓
REJOUER
~~~

Chaque notion doit être reliée à un exemple, une question, une action et une observation.

## Statuts

- Demo Capsule : **TESTABLE** (Lab reproductible, tests locaux et CI)
- Production Capsule ANES : **NOT DEPLOYED**

## Lancer les tests (Node 20+)

~~~bash
cd labs/LAB-001-continuity-chain
node --test tests/*.test.mjs
~~~

Résultat attendu : **5/5 PASS**.

## Démonstration statique

Voir le dossier `/docs` à la racine du dépôt (publié via GitHub Pages).

## Scénarios couverts

1. `CLEAN_HANDOFF` — passage propre
2. `CONTEXT_LOSS` — perte de contexte
3. `PROVENANCE_CHANGE` — origine déclarée modifiée
4. `STATE_DRIFT` — état modifié sans autorisation ni lien au parent
5. `AUTHORIZED_DELTA` — modification déclarée, rattachée au manifeste parent

Le scénario « capture → réexport » sert d'analogie pédagogique pour comprendre `PROVENANCE_CHANGE` et la nécessité d'un parent / EvidenceRef.

## Questions de compréhension

1. Deux fichiers visuellement identiques peuvent-ils avoir des empreintes différentes ?
2. Un hash suffit-il à prouver l'identité de l'auteur ?
3. Pourquoi conserver la référence vers le parent ?
4. Que doit déclarer le système si le parent ou la preuve manque ?
5. Le même outil utilisé deux fois garantit-il la continuité ?

Les réponses et le speech présentateur sont dans le walkthrough.

## Limites

- Empreinte non cryptographique dans ce Lab : pédagogique, pas une garantie d'intégrité.
- Fixtures synthétiques, aucune donnée réelle ni secret.
- Le Lab ne prétend pas reconstruire automatiquement un auteur à partir d'une image.
- Les métadonnées peuvent être absentes, supprimées ou altérées.
- Ce Lab n'est pas une capsule de production ANES.
