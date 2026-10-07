# LAB SME — Scénarios des 8 démonstrations

> Démonstration : LUC-UTP, ANES & AREMS — Édition spéciale SME, 13 & 14 octobre 2026.
> Statut : **v0.2.0 — 8 démos jouables publiées** : https://ad2sys-hub.github.io/anes-labs/sme/ (simulation pédagogique). Production Capsule : NOT DEPLOYED.
> Cadre : défensif, non opérationnel. Données 100 % fictives. Aucune procédure de contournement. Aucune plateforme réelle n'est désignée ni qualifiée de frauduleuse.

Format commun : Objectif · Mise en situation (fictive) · Déroulé d'observation · Ce que l'on observe · Questions à poser · Limites.

---

## SME-1 — Décomposition d'un message

**Objectif.** Comprendre qu'un message n'est pas seulement son texte : en-tête, corps, promesse, provenance, chronologie, signature.

**Mise en situation.** Un e-mail fictif « Votre compte artiste nécessite une validation » reçu par une artiste, Léa M.

**Déroulé.**
1. Afficher le message tel que le lecteur le voit (nom d'expéditeur, objet, corps, bouton).
2. Ouvrir la vue « couches » : nom affiché vs adresse réelle, domaine d'envoi, résultats d'authentification du domaine présentés de façon simplifiée (conforme / non conforme / absent), date d'émission vs date de réception.
3. Isoler la promesse (urgence, gain, menace) et l'appel à l'action.
4. Comparer avec un message légitime fictif du même service.

**Ce que l'on observe.** Un message peut être « authentifié » pour son domaine d'envoi sans prouver qu'il vient de l'organisation qu'il prétend représenter. La cohérence nom affiché / domaine / chronologie / promesse compte autant que le texte.

**Questions à poser.** Qui est l'émetteur réel ? Le domaine correspond-il à l'organisation ? La promesse est-elle cohérente avec mes échanges passés ? Puis-je vérifier par un autre canal ?

**Limites.** Les indicateurs techniques sont simplifiés ; un message conforme techniquement peut rester trompeur, et un message légitime peut présenter des anomalies de configuration.

---

## SME-2 — Tracking et événements de consultation

**Objectif.** Expliquer le principe général du pixel / image de suivi : finalité légitime (mesure d'ouverture), risques de détournement, questions à poser.

**Mise en situation.** Une newsletter fictive « Studio News » contenant une image de suivi.

**Déroulé.**
1. Ouvrir le message avec images bloquées, puis autorisées.
2. Visualiser sur une timeline simulée l'« événement de consultation » enregistré côté émetteur : heure, type d'appareil approximatif, réouvertures.
3. Montrer l'usage légitime (statistiques agrégées) puis l'usage détourné possible (confirmer qu'une adresse est active, cibler le bon moment pour relancer).

**Ce que l'on observe.** Un simple affichage d'image peut générer un événement côté émetteur. Le suivi n'est pas une faille en soi : c'est sa finalité et son consentement qui comptent.

**Questions à poser.** Ai-je consenti au suivi ? Mon client de messagerie bloque-t-il les images distantes ? L'émetteur annonce-t-il sa politique de mesure ?

**Limites.** Les protections modernes (proxy d'images, blocage) rendent la mesure imprécise ; la démo ne reproduit pas un système réel de tracking.

---

## SME-3 — Identité déclarée vs provenance vérifiable

**Objectif.** Distinguer ce qu'une source affirme être et ce que l'on peut prouver sur son origine.

**Mise en situation.** Trois demandes fictives de virement de droits adressées à un label : une par e-mail, une par messagerie instantanée, une via un portail authentifié.

**Déroulé.**
1. Pour chaque demande, lister l'identité déclarée (nom, fonction, logo).
2. Lister les éléments de provenance disponibles : canal, compte authentifié, appareil connu, historique, signature.
3. Classer chaque demande : déclarative / partiellement vérifiable / documentée.

**Ce que l'on observe.** Une authentification réussie prouve l'accès à un compte, pas forcément l'identité de la personne ni la légitimité de la demande.

**Questions à poser.** Quels éléments sont prouvés, lesquels sont seulement affirmés ? Existe-t-il une confirmation hors bande ?

**Limites.** Aucune grille ne remplace une procédure interne de validation (double contrôle, seuils).

---

## SME-4 — LUC-UTP : relier utilisateur, machine, signature, contexte, requête, autorisation

**Objectif.** Montrer le principe du protocole de continuité LUC-UTP : une requête n'est acceptée que si sa chaîne de liens est complète et cohérente.

**Mise en situation.** Un agent fictif demande l'export d'un catalogue d'œuvres.

**Déroulé.**
1. Afficher l'enveloppe LUC-UTP simulée : utilisateur, machine, signature, contexte, requête, autorisation.
2. Scénario A : tous les liens présents → requête acceptée et journalisée.
3. Scénario B : machine inconnue → requête mise en attente de vérification.
4. Scénario C : autorisation expirée → rejet motivé.

**Ce que l'on observe.** La décision ne repose pas sur l'identité déclarée seule mais sur la cohérence de l'ensemble des liens.

**Questions à poser.** Quel lien manque ? Qui peut le rétablir ? La décision est-elle traçable ?

**Limites.** LUC-UTP est présenté au stade concept / démonstration. Son efficacité dépend de la qualité des identités, des clés et des journaux.

---

## SME-5 — AREMS : contrôle et isolation de la donnée

**Objectif.** Illustrer le contrôle de la donnée à l'entrée, pendant le traitement et à la sortie.

**Mise en situation.** Un fichier fictif de relevés de streams importé dans un outil de répartition.

**Déroulé.**
1. Entrée : vérification du format, de l'origine déclarée et d'une empreinte d'intégrité ; un fichier non conforme est placé en quarantaine.
2. Traitement : la donnée est traitée dans un espace isolé ; chaque transformation est journalisée.
3. Sortie : contrôle de ce qui sort (destinataire autorisé, champs autorisés), avec référence au lot d'origine.

**Ce que l'on observe.** La donnée suspecte ne contamine pas le reste de la chaîne ; chaque sortie peut être reliée à son entrée.

**Questions à poser.** Où une donnée non vérifiée peut-elle entrer ? Qui reçoit les sorties ? Peut-on rejouer le traitement ?

**Limites.** L'isolation ajoute de la complexité opérationnelle ; elle ne garantit pas que la donnée d'origine était juste.

---

## SME-6 — Reverse Mining : reconstituer la chaîne d'exécution

**Objectif.** Partir d'un résultat et remonter, à l'aide des journaux disponibles, les étapes qui l'ont produit.

**Mise en situation.** Un relevé fictif de revenus présente un montant inattendu pour un titre.

**Déroulé.**
1. Partir du montant final.
2. Remonter : calcul de répartition → lot de données → import → source déclarée.
3. Identifier l'étape où l'écart apparaît (ex. lot importé deux fois).
4. Montrer un cas où un maillon n'est pas journalisé : la reconstitution s'arrête.

**Ce que l'on observe.** La reconstitution est possible seulement là où des traces existent. Reverse Mining n'est pas une capacité absolue : sans journal, pas de preuve.

**Questions à poser.** Quelles étapes sont journalisées ? Les journaux sont-ils fiables et horodatés ?

**Limites.** Résultat partiel si les traces sont incomplètes, altérées ou non synchronisées.

---

## SME-7 — Studio Vision 8 : séquencer, échantillonner, cartographier la timeline

**Objectif.** Représenter les événements d'un workflow sur une timeline lisible pour repérer incohérences et ruptures.

**Mise en situation.** La journée fictive de diffusion d'un single : dépôt, validation, publication, premiers streams, réclamation.

**Déroulé.**
1. Séquencer : placer chaque événement dans l'ordre réel.
2. Échantillonner : regrouper par intervalles pour faire ressortir les pics.
3. Cartographier : relier événements, acteurs et systèmes.
4. Repérer une anomalie : une modification de métadonnées intervenue après publication sans autorisation tracée.

**Ce que l'on observe.** La chronologie rend visibles des ruptures invisibles dans une liste brute.

**Questions à poser.** L'ordre des événements est-il cohérent ? Chaque changement a-t-il un auteur et une autorisation ?

**Limites.** La timeline dépend de la synchronisation des horloges et de l'exhaustivité des événements collectés.

---

## SME-8 — Artiste, droits et redistribution

**Objectif.** Relier artiste → identité → œuvre → contribution → exploitation → revenus → redistribution, avec une comptabilité de provenance.

**Mise en situation.** Un titre fictif co-écrit par trois contributeurs (auteure, compositeur, beatmaker).

**Déroulé.**
1. Déclarer identités et parts de contribution, signées par chaque partie.
2. Enregistrer des exploitations fictives (streams, synchro).
3. Calculer la répartition ; pour chaque montant, répondre : combien, pourquoi, pour qui, à partir de quoi, selon quel événement, avec quelle preuve.
4. Simuler un contributeur non déclaré qui réclame une part : montrer comment la chaîne documentée aide à instruire la demande.

**Ce que l'on observe.** Une attribution documentée rend la redistribution explicable et contestable sur des bases factuelles.

**Questions à poser.** Les parts sont-elles signées ? Chaque revenu est-il relié à un événement d'exploitation prouvé ?

**Limites.** Ne remplace ni les organismes de gestion collective ni un conseil juridique ; dépend de l'interopérabilité avec les tiers de confiance.

---

## Bénéfices visés (objectifs, non garanties)
Meilleure traçabilité des requêtes et événements ; corrélation identité / utilisateur / machine / contexte ; audit et investigation facilités ; protection renforcée des workflows sensibles ; attribution plus fiable des droits et revenus.

## Limites
Aucune architecture ne garantit un risque zéro. Dépend de la qualité d'intégration, de la gestion des clés, identités, appareils et journaux. Complexité opérationnelle et gouvernance. Interopérabilité avec les organismes de confiance externes. Procédures d'installation automatisées, testées et documentées nécessaires. Formation continue des utilisateurs (FormationRoom).

Produced by Chawblick Music · AD2SYS
