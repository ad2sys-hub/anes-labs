# LAB-001 — Exemple guidé : capture d’écran, réexport et rupture de provenance

## Pourquoi cet exemple ?

Une image peut sembler identique à l’écran et pourtant devenir un **nouveau fichier** qui ne transporte plus l’histoire du fichier précédent.

Le Lab ne cherche pas à dire qu’un screenshot est « faux » ou qu’un réexport est malveillant. Il montre un problème plus simple :

> **les pixels visibles ne suffisent pas à prouver l’origine, l’auteur, l’opérateur de capture, l’outil utilisé ni la continuité entre deux fichiers.**

C’est exactement le type de rupture que LUC-UTP cherche à rendre observable.

---

## Mise en situation concrète

### Situation de départ

- **Auteur de la photo** : PHOTO-AUTHOR-001
- **Utilisateur qui effectue la capture** : USER-1
- **Outil de capture** : OUTIL-A
- **Heure** : 2026-10-11T03:36:47Z
- **Fichier produit** : capture-A.png
- **Empreinte pédagogique** : HASH-A

Au moment de la capture, on peut encore décrire une chaîne :

~~~text
PHOTO-AUTHOR-001
      |
      v
PHOTO ORIGINALE
      |
      | capture par USER-1
      | avec OUTIL-A
      | à T0
      v
capture-A.png
HASH-A
~~~

La provenance complète n’est pas forcément stockée *dans* l’image elle-même. Elle peut être portée par des métadonnées, un journal, une signature, un manifeste ou des EvidenceRefs.

---

## Le passage qui casse la continuité

USER-1 ouvre ensuite capture-A.png avec OUTIL-B.

Il peut :

- recadrer l’image ;
- l’annoter ;
- l’enregistrer sous un autre format ;
- la partager puis la télécharger ;
- faire une nouvelle capture d’écran ;
- l’exporter depuis la même application ou une autre.

Le résultat peut être visuellement presque identique :

~~~text
capture-A.png                    export-B.jpg
+--------------------+           +--------------------+
|    même visuel     |   --->    |    même visuel     |
+--------------------+           +--------------------+
HASH-A                           HASH-B
~~~

Mais export-B.jpg est un **nouvel objet numérique**.

Sans mécanisme de continuité, il peut ne plus transporter :

- l’identité de l’auteur de la photo ;
- l’identité de USER-1 qui a réalisé la capture ;
- la référence à capture-A.png ;
- l’outil initial ;
- le timestamp initial ;
- l’intention de la capture ;
- l’autorisation ;
- la chaîne de transformations ;
- la preuve permettant de relier HASH-B à HASH-A.

La question correcte n’est donc pas :

> « Est-ce la même image ? »

mais :

> « Puis-je encore démontrer comment ce fichier est relié à l’objet qui l’a précédé ? »

---

## Même outil, même problème

La rupture ne nécessite pas forcément OUTIL-B.

Même avec OUTIL-A, une commande « Exporter », « Enregistrer sous », « Copier », « Télécharger » ou une nouvelle capture peut produire un nouvel objet.

~~~text
USER-1
  |
  v
OUTIL-A
  |
  +--> capture-A.png / HASH-A
  |
  +--> export-C.png  / HASH-C
~~~

Si export-C.png ne référence pas capture-A.png, la continuité reste rompue.

Le problème est donc un problème de **lignage**, pas seulement de changement d’application.

---

## Ce que LUC-UTP chercherait à préserver

Une capsule de continuité peut transporter ou référencer :

| Élément | Exemple |
|---|---|
| identité | USER-1 |
| auteur déclaré | PHOTO-AUTHOR-001 |
| outil | OUTIL-A, puis OUTIL-B |
| temps | T0, T1 |
| parent | HASH-A |
| enfant | HASH-B |
| intention | illustrer le Lab SME |
| action | capture, réexport |
| autorisation | allowed=true |
| EvidenceRef | lien vers preuve ou manifeste |
| état | contexte avant/après |
| causalité | HASH-B dérive de HASH-A |

Exemple conceptuel :

~~~json
{
  "asset": "export-B.jpg",
  "hash": "HASH-B",
  "parentHash": "HASH-A",
  "actor": "USER-1",
  "tool": "OUTIL-B",
  "action": "REEXPORT",
  "requestedAt": "T1",
  "intent": "illustration pédagogique",
  "evidenceRefs": ["capture-A-manifest"],
  "continuity": "DERIVED_LINEAGE_VERIFIED"
}
~~~

Ceci est un **modèle pédagogique**, pas une affirmation qu’un format image standard fournit automatiquement ces champs.

---

## Mini-expérience à faire devant le public

### Étape 1 — observer

Présenter une image A.

Demander :

> « Qui peut me dire qui a créé ce fichier, qui a fait la capture et avec quel outil ? »

Réponse attendue :

> « On ne peut pas le savoir uniquement en regardant les pixels. »

### Étape 2 — transformer

Faire une capture ou un export avec un autre outil.

Montrer les deux fichiers.

Demander :

> « Ils se ressemblent. Sont-ils le même objet numérique ? »

Réponse :

> « Non. Ils peuvent avoir un nom, un format, des métadonnées et une empreinte différents. »

### Étape 3 — poser la question de provenance

Demander :

> « Si je vous donne seulement le second fichier, pouvez-vous prouver le chemin exact qui mène au premier ? »

Réponse :

> « Pas sans une preuve ou une chaîne de provenance conservée séparément ou embarquée. »

### Étape 4 — montrer LUC-UTP

Afficher :

~~~text
HASH-A
  |
  | actor=USER-1
  | tool=OUTIL-B
  | action=REEXPORT
  | time=T1
  | EvidenceRef=...
  v
HASH-B
~~~

Conclusion :

> « LUC-UTP ne protège pas seulement un fichier. Il cherche à préserver la continuité de compréhension autour de l’action. »

---

## Interaction cognitive : éviter la surcharge et le relâchement d’attention

Le Lab doit suivre une boucle courte :

~~~text
VOIR
 ↓
FORMULER UNE HYPOTHÈSE
 ↓
AGIR
 ↓
OBSERVER UNE DIFFÉRENCE
 ↓
EXPLIQUER AVEC SES MOTS
 ↓
VOIR LA RÉPONSE
 ↓
REJOUER
~~~

Règle pédagogique :

- une notion par écran ;
- une action principale ;
- une question courte ;
- réponse cachée jusqu’à l’action de l’utilisateur ;
- possibilité de rejouer ;
- visuel animé de 10–15 secondes maximum ;
- pas de mur de texte avant la démonstration.

---

## Questions interactives suggérées

### Q1
**Question :** Deux fichiers peuvent-ils afficher exactement la même image tout en ayant des empreintes différentes ?

**Réponse :** Oui. Une nouvelle capture, un réencodage ou un réexport crée généralement un nouvel objet binaire.

### Q2
**Question :** L’empreinte HASH-B permet-elle de retrouver automatiquement l’auteur de la photo ?

**Réponse :** Non. Une empreinte identifie un contenu ou un fichier dans un contexte donné ; elle ne fournit pas à elle seule l’identité de l’auteur.

### Q3
**Question :** Pourquoi conserver le hash parent ?

**Réponse :** Pour pouvoir rattacher le nouvel objet à l’objet précédent et vérifier une relation de dérivation déclarée.

### Q4
**Question :** Est-ce que LUC-UTP doit copier toutes les données à chaque étape ?

**Réponse :** Non. Il peut transporter des références vérifiables — EvidenceRefs — plutôt que recopier toute la donnée.

### Q5
**Question :** Que doit faire le système si le parent manque ?

**Réponse :** Ne pas inventer la provenance. Il doit signaler une continuité non vérifiée ou passer en REVIEW / QUARANTINE selon la politique.

### Q6
**Question :** Le fait que le même utilisateur utilise le même outil garantit-il la continuité ?

**Réponse :** Non. Un nouvel export peut toujours créer un nouveau fichier sans lien explicite vers son parent.

---

## Speech présentateur — version 60 secondes

> « Regardez cette image. Visuellement, elle paraît simple. Mais une image numérique n’est pas seulement ce que vous voyez. Supposons qu’un auteur crée la photo, qu’un premier utilisateur en fasse une capture avec un outil A, puis qu’il ouvre cette capture avec un outil B et l’exporte à nouveau. Le résultat peut sembler identique, mais c’est un nouveau fichier, avec une nouvelle empreinte. Si l’outil B ne transporte pas l’identité du créateur, l’utilisateur de capture, le fichier parent, l’heure et la raison de la transformation, alors la chaîne s’arrête. C’est là que se place LUC-UTP : non pas pour prétendre rendre un fichier inviolable, mais pour conserver ou référencer les éléments nécessaires afin de comprendre qui a fait quoi, quand, avec quel outil, dans quelle intention, et à partir de quel état précédent. Même image ne veut donc pas dire même provenance. »

---

## Speech présentateur — version 20 secondes

> « Une capture puis un réexport peuvent produire presque la même image, mais un fichier totalement neuf. Sans chaîne de provenance, on perd l’auteur, le capteur, l’outil et le parent. LUC-UTP sert à conserver cette continuité : qui, quoi, quand, avec quel outil, et à partir de quelle preuve. »

---

## Critère de réussite du Lab

L’apprenant a compris le Lab s’il peut expliquer avec ses propres mots :

1. pourquoi un fichier visuellement identique peut être un nouvel objet ;
2. pourquoi un hash ne suffit pas à établir l’auteur ;
3. pourquoi le parent et les EvidenceRefs sont nécessaires ;
4. pourquoi une continuité non vérifiable doit être déclarée comme telle ;
5. la différence entre **contenu visible** et **chaîne de provenance**.

---

## Limites

- Les hashes montrés sont des exemples pédagogiques.
- Le Lab ne prétend pas extraire magiquement l’auteur d’un fichier.
- Les métadonnées peuvent être absentes, modifiées ou supprimées.
- Une chaîne de provenance est utile seulement si ses preuves, identités, horodatages et autorités sont elles-mêmes vérifiables.
- LUC-UTP reste ici une Demo Capsule/Lab ; la Production Capsule est non déployée.
