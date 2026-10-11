# LAB-007 — Project Value Timeline / OneTPDAY

Statut : LAB UNIT — DATA MODEL READY  
Date initiale : 2026-10-11

## But

Transformer le suivi de projet ANES en expérience reproductible : documenter les choix de départ, la difficulté, l'implication humaine, les preuves, les écarts, le résultat réel et la valeur produite dans le temps.

Ce Lab sert de source au futur dashboard « Gestion de projet » d'Écho du Futur.

## Hypothèse pédagogique

**OneTPDAY = One TP Per Day = un travail pratique validé par jour.**

Un TP validé représente 1 % de progression nominale d'un parcours de 100 TP, mais pas automatiquement 1 % de valeur réelle.

```text
S_d = <P_d, V_d, Q_d, D_d, H_d, R_d, B_d, E_d>
S_(d+1) = S_d + G_d * Delta_d

P_n  = min(1, P_0 + 0.01 * SUM(G_d * TP_d))
RR_d = G_d * Q_d * E_d * (1 - B_d)
IH_d = H_d * (1 + lambda*D_d) * G_d
```

Le terme manquant dans une formule purement temporelle est le **Gate de validation** : le temps écoulé ne constitue pas une preuve d'avancement.

## Dimensions du dashboard

- P(t) : progression nominale ;
- VR(t) : valeur réalisée, prouvée ;
- D(t) : difficulté ;
- IH(t) : implication humaine ;
- E(t) : qualité des preuves ;
- R(t) : réduction du risque ;
- B(t) : blocage / dette / reprise ;
- RR(t) : résultat réel.

## Valeur réalisée

Indice non financier :

```text
VR(t) = 100 * (
  0.20*F +
  0.20*E +
  0.15*S +
  0.15*O +
  0.10*Doc +
  0.10*U +
  0.10*R
)
```

Première observation enregistrée pour Formation Room : **75.25/100** au 2026-10-11.

Ce nombre n'est pas une valorisation commerciale. Il représente un niveau de valeur opérationnelle actuellement réalisée et soutenue par les preuves disponibles.

## Premier cas réel — ANES Formation Room

Checkpoint : `d17a6b2`.

Preuves déjà obtenues :

- UTF-8 sanity : PASS ;
- ESLint : PASS ;
- build TypeScript/Vite : PASS ;
- tests Image Lab : PASS ;
- diff check : PASS ;
- branche distante synchronisée ;
- 59 commits devant `master`, 0 derrière.

Points non fermés :

- test Image Lab absent du workflow CI ;
- labels réels de `ANES-DEPLOY-01` non vérifiés ;
- ordre/portée des secrets Vite/Supabase à revoir ;
- destination `gh-pages` à confirmer ;
- assets interactifs encore `pending` ;
- Age Assurance non câblé au Rights Gate Junior ;
- timeline d'audit encore en `localStorage`.

## Expérience journalière

Chaque journée peut produire un enregistrement :

```json
{
  "date": "YYYY-MM-DD",
  "tp": 1,
  "gate": 1,
  "difficulty": 0.0,
  "human_involvement": 0.0,
  "evidence_quality": 0.0,
  "risk_reduction": 0.0,
  "blocker_rework": 0.0,
  "result": "PASS|PARTIAL|FAIL",
  "evidence_refs": []
}
```

Aucune durée ou implication n'est inventée : elles doivent être enregistrées par l'utilisateur ou calculées depuis des événements réellement observés.

## Chaîne

```text
OneTPDAY
→ TADT
→ PDTJ
→ PSIC
→ Evidence Gate
→ RR
→ VR(t)
→ Écho du Futur / Dashboard
→ Formation Room / Retour d'expérience
```
