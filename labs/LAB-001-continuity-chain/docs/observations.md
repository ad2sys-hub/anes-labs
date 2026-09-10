# Observations — LAB-001

- Une perte de contexte est invisible tant que le contexte n'est pas déclaré explicitement.
- Un changement de provenance masque toutes les autres dégradations : il est évalué en premier.
- La différence entre `STATE_DRIFT` et `AUTHORIZED_DELTA` ne tient pas au contenu du changement,
  mais à sa déclaration et au rattachement au manifeste parent.
- L'empreinte (`fingerprint`) permet de constater qu'un état a bougé, pas de prouver qui l'a modifié.
