# AllDifferent Algorithm Visualizer

L'objectif est d'implémenter un outil de visualisation qui décompose le filtrage global de la contrainte AllDifferent. Le programme doit montrer comment une vision "graphe" permet de supprimer des valeurs que de simples contraintes binaires ne verraient pas.

## Objectifs techniques

* Construire et afficher le Graphe Biparti variables-valeurs.
* Visualiser le calcul du Couplage Maximum (Matching).
* Transformer le graphe en Graphe Orienté de Résidu.
* Identifier et colorer les Composantes Fortement Connexes (SCC) pour justifier la suppression des arcs.

## Étapes de visualisation à implémenter

Le programme devra générer les vues successives suivantes :

### Vue Bipartie Initiale :

À gauche, les variables $X_i$, à droite, l'union de leurs domaines.
Les arcs représentent les valeurs possibles pour chaque variable.

### Vue "Couplage Maximum" :

Mise en évidence (en gras ou en couleur) des arcs sélectionnés pour le couplage.
Affichage d'un message indiquant si un couplage complet a été trouvé (sinon, le problème est insatisfaisable).

### Vue "Graphe de Résidu" :

Orientation des arcs : du domaine vers les variables pour le couplage, et inversement pour les autres.
Affichage des cycles et des chemins alternés.

### Vue "Filtrage Final" :

Surlignage des SCC (Composantes Fortement Connexes) trouvées par l'algorithme (ex: Tarjan).
Animation de suppression : Faire disparaître les arcs qui ne sont ni dans le couplage, ni dans un cycle, ni sur un chemin valide.

## Exemple de test imposé

Utilisez ce cas classique où le filtrage global surpasse l'arc-consistance binaire :

$x_1 \in \{1, 2\}$
$x_2 \in \{1, 2\}$
$x_3 \in \{2, 3\}$
$x_4 \in \{2, 3, 4, 5\}$

Note : Ici, $x_1$ et $x_2$ saturent les valeurs $\{1, 2\}$. La valeur 2 doit donc être supprimée des domaines de $x_3$ et $x_4$. Votre programme doit montrer visuellement pourquoi l'arc $(x_3, 2)$ est supprimé.

## Contraintes de développement

Logique Graphe : Utilisation impérative d'un algorithme de détection de SCC (Tarjan ou Kosaraju).

Interactivité : Comme pour l'exercice 1, l'utilisateur doit pouvoir cliquer sur "Suivant" pour voir le graphe changer d'état (notamment le changement d'orientation des arcs).

## Livrable attendu

Un tableau comparatif généré par le programme montrant les domaines avant et après le passage de l'algorithme de Régin, accompagné des graphiques exportés pour chaque étape clé.

