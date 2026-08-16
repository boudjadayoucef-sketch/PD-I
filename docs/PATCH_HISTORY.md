

## Patch 007a — Branding global + workspace intégré

Objectif :
- PD&I devient le branding de toute l'application SaaS, pas seulement l'interface ISO ;
- ajout du composant global `PdiBrandMark` ;
- correction des libellés de plein écran interne vers une logique `mode focus` / `retour accueil` ;
- documentation du rôle du dépôt `pipeline-design-skill` ;
- rappel : les calculs techniques sont réalisés par Python/règles déterministes, pas par IA générative.

## Patch 007b — ISO intégré + logo public unique

Correctifs :
- l'éditeur ISO ne s'ouvre plus automatiquement en plein écran ;
- le logo produit global est servi depuis `/public` via `PdiBrandMark` ;
- éviter les doubles logos entre le shell SaaS et la topbar interne ISO ;
- le mode plein écran devient un mode focus volontaire, pas l'ouverture par défaut.

Règle : PD&I est toute l'application SaaS. L'ISO est un workspace interne.

## Patch 007c — Shell unifié + accueil + ISO principal

Décision : arrêter la coexistence de deux logiciels (shell SaaS + ancien ISO intégré).

- PD&I devient un seul logiciel.
- La page d'accueil propose : nouveau projet, Vision PD&I, croquis, import DXF/PDF/JSON, exports.
- Le module ISO devient le workspace principal plein écran lorsqu'on le lance.
- Le bouton de sortie ISO devient `Retour accueil`.
- Le dépôt `pipeline-design-skill` est prévu comme équipe d'agents spécialisés.
- PD&I est l'orchestrateur ; les calculs techniques sont faits par Python.

## Patch 007d — ISO plein écran = mode principal

Correctif après test utilisateur :
- le mode non-fullscreen de l'ancien ISO est supprimé de l'usage normal ;
- l'ISO doit s'ouvrir comme workspace principal plein écran ;
- la barre menus Fichier / Édition / Affichage / Dessin / Cotation / Alignement / Insertion / Impression / Export / Outils doit rester visible ;
- le bouton de sortie doit être `Retour accueil` ;
- les tooltips doivent être visibles sur les boutons ;
- le bandeau descriptif `Concepteur & Schéma...` ne doit plus apparaître dans le workspace principal.

## Patch 007e — Optimisation espace ISO + accueil carousel

Correctifs :
- retirer le bouton retour/quitter du workspace ISO ;
- garder l'ISO comme workspace principal plein écran ;
- réduire l'encombrement des compteurs bas ;
- déplacer l'information `Vue isométrique 30°` vers la barre noire du haut ;
- supprimer la phrase d'aide `MAIN = déplacer...` dans le workspace ;
- compléter la grille pour couvrir toute la zone ;
- remplacer le bloc `Architecture cible` de l'accueil par un carousel vertical de fonctionnalités ;
- rendre le logo accueil robuste avec plusieurs chemins `/public`.

