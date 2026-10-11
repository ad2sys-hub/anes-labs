# Observations — LAB-001

## Observations générales

- Une perte de contexte est invisible tant que le contexte n'est pas déclaré explicitement.
- Un changement de provenance masque toutes les autres dégradations : il est évalué en premier.
- La différence entre `STATE_DRIFT` et `AUTHORIZED_DELTA` ne tient pas au contenu du changement, mais à sa déclaration et au rattachement au manifeste parent.
- L'empreinte (`fingerprint`) permet de constater qu'un état a bougé, pas de prouver qui l'a modifié.

## Observation concrète — capture et réexport

Une capture d'écran ou un réexport produit généralement un **nouvel objet numérique**.

Même si l'image visible paraît identique :

- le fichier peut avoir une nouvelle empreinte ;
- les métadonnées peuvent avoir changé ou disparu ;
- l'auteur initial n'est pas déductible des pixels ;
- l'identité de l'utilisateur qui a fait la capture n'est pas automatiquement conservée ;
- l'outil précédent peut ne plus être connu ;
- le lien vers le fichier parent peut être perdu.

Conclusion pédagogique :

> **Même image ≠ même provenance.**

Le point important est de distinguer :

1. **le contenu visible** ;
2. **le fichier binaire** ;
3. **la provenance déclarée** ;
4. **la preuve de continuité entre parent et enfant**.

## Ce que le Lab ne doit pas laisser croire

- Un hash ne prouve pas à lui seul l'identité de l'auteur.
- Un nom de fichier ne constitue pas une preuve de provenance.
- Une métadonnée déclarative n'est pas automatiquement fiable.
- Une capture d'écran ne transporte pas nécessairement la chaîne causale de l'objet capturé.
- Utiliser le même logiciel deux fois ne garantit pas qu'un lien parent/enfant soit conservé.

## Observation LUC-UTP

La continuité devient exploitable lorsque le nouvel objet peut être rattaché à son parent par des références vérifiables :

- parent hash / asset id ;
- acteur ;
- outil ;
- action ;
- temps ;
- intention ;
- autorisation ;
- EvidenceRefs ;
- état avant/après.

Si ces éléments manquent, le système ne doit pas inventer la provenance : il doit produire un état explicite de continuité non vérifiée, REVIEW ou QUARANTINE selon la politique.
