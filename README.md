Sommaire
1. Description du projet et de la solution
a. Objectif du projet
b. Description de la solution
2. Choix techniques
a. Chart.js
b. Model
3. Problème et améliorations possible
a. Affichage
b. Les données
_____________________________________________________________
1. Description of the project and the solution
a. Objective of the project
b. Description of the solution
2.Technical choices
a. Chart.js
b. Model
3. Problem and possible improvements
a. Display
b. Data
1. Description du projet et de la solution
A. Objectif du projet :
Le projet est un projet numérique qui vise a représenter graphiquement l’évolution
du nombre de publications réalisées sur un réseau (sociale/vidéo) en fonction des
heures et du jours.
Pour ce faire, il est demandé d’utiliser l’Open API
https://stream.upfluence.co/stream et de réaliser une visualisation graphique en 3D
pour chaque type de post envoyé par l’API .
B. Description de la solution :
Pour répondre à ce besoin, j’ai décidé d’utiliser Ember.js qui est le langage utilisé
par le client. L’application est composée d’une page sur laquelle se trouve un
bouton pour chaque type de post, et un graphique à point représentant le nombre
de post sélectionné par jour et heures évoluant au fur et à mesure que l’API envoi
des données .
Techniquement, l’application est composé de 2 templates (application.hbs et
index.hbs) pour l’affichage, d’un model pour stocker et utiliser les données, d’une
route pour ouvrir la connexion SSE et récupérer les données, d’un service pour
mettre en forme les données récupérées de l’API et pour pouvoir les utiliser dans
l’application et d’un component pour afficher les graphiques.
2. Choix techniques
A. Chart.js :
Pour développer cette application il fallait trouver un moyen pour faire des
graphiques . Pour cela plusieurs libraries/addons existent mais mon choix s'est
porté sur Chart.js. Cette librairie javascript est régulièrement tenue à jour avec une
bonne communauté et une documentation bien détaillée. Elle permet une bonne
liberté de personnalisation des graphiques et est compatible avec Ember.js, en plus
d’être visuellement agréable . Pour ces raisons, je pense que Chart.js est un bon
candidat pour répondre aux besoins graphiques de l’application.
B. Model :
Le modèle est composé de 6 variables nommés par les différents types de post que
renvoi l’API et représentant les données nécessaire a chart.js pour afficher les
graphiques, et de 7 autres variables représentant le nombre de post.
Lors de la récupération des données de l’API j’utilise un service pour modifier la
structure des données pour qu'elles correspondent à la forme que chart.js a besoin
pour fonctionner tout en supprimant les données qui me sont inutiles pour
l’application.
Ce type de model est très spécifique pour chart.js ce qui peut être compliqué à
faire évoluer mais nous laisse la liberté de créer d’autre model indépendant pour de
futures évolution.
3. Problèmes et améliorations possibles
Pour introduire ce dernier point, malgré mon envie de faire les choses bien pour un
code clair,lisible et pertinent , la plupart de mes choix ont été principalement fait
d’un point de vue fonctionnel de l’application plutôt que “beauté du code”, dû à mon
manque d’expérience avec ce langage.
A. Affichage :
On pourra constater dans l’application un petit problème avec l’affichage des
légendes au survole des bulles du graphique. Celles-ci ne restent qu’une petite
seconde avant de disparaître . Cela étant dû soit à ma manière d’utiliser les
données, soit de ember-chart qui a l’air d’être un composant qui se rafraîchit à
chaque fois que les data sont mis à jour ce qui provoque la regénération du
graphique ce qui fait que la légende ne reste pas malgré que la souris soit
toujours sur la bulle.Donc je n’ai pas encore pu corriger le problème.
Dans les améliorations architecturales du code, j’aurais peut-être dû faire un
composant “Bouton”, à la place de répéter 6 fois dans le composant du
graphique la même chose.Et revoir la manière de passer mon model a mon
composant graph (peut être en intégrant des récupérations de données avec
des param ex : (‘datachart/:param_id’)) .
De plus je ne me suis pas attardé sur les test ember.js car j’ai plus l’imppression
que cela correspond a des tests pour vérifier que les maintenances du code ne
provoque pas de nouveau problème par des suppressions maladroite
d’élément.Me paraissant secondaire (dans notre cas. Attention c’est important
les tests) et plutôt chronophage je me suis concentré sur d’autre chose.
B. Les données :
Venant de terminer le tutoriel d’ember.js avant de commencer cette application
et une mauvaise lecture du sujet j’ai perdu énormément de temps pour réussir à
récupérer les données de l’API. Au début j’ai essayé en appliquant le même
procédé que dans le tutoriel cependant cela n’a pas marché. Alors j’ai commencé
à faire des recherches en associant “ember.js” et “API SSE” malheureusement la
plupart des résultats étaient trop vieux et inutilisables. C’est finalement en
faisant plus de recherche au sujet du “SSE” que j’ai réussi à trouver une solution.
La récupération des données se fait correctement cependant je n’ai pas géré les
problèmes de déconnections.
Actuellement l’application ne stocke pas les données déjà récupérées ce qui veut
dire que dès qu’on ferme l’onglet, on recommence de zéro . Cela pourrait être
bien de stocker les données déjà récupérées mais cela veut dire qu’il faudrait
gérer soit la suppression des données soit la taille des bulles sur le graphique
voir même les deux.
1. Description of the project and the solution
A. Objective of the project :
The project is a digital project that aims to graphically represent the evolution of
the number of publications made on a network (social / video) according to hours
and days.
To do this, it is asked to use the Open API https://stream.upfluence.co/stream and
to make a 3D graphic visualization for each type of post sent by the API.
B. Description de la solution
I decided to use Ember.js which is the language used by the client. The application
is composed of a page on which there is a button for each type of post, and a
punch card chart representing the number of posts selected per day and hours
evolving as the API sends data.
Technically, the application is composed of 2 templates (application.hbs and
index.hbs) for display, a model to store and use the data, a route to open the SSE
connection and retrieve the data, a service to format the data retrieved from the
API and to be able to use it in the application, and a component for display the
graphs.
2. Technical choices
A. Chart.js :
To develop this application it was necessary to find a way to make graphics. For
this, several libraries/addons exist but my choice fell on Chart.js. This javascript
library is regularly updated with a good community and well-detailed
documentation. It allows a good freedom of graphics customization and is
compatible with Ember.js, in addition to being visually pleasing. For these reasons, I
think Chart.js is a good candidate to meet the graphics needs of the application.
B. Model :
The model is composed of 6 variables named by the different types of post that the
API returns and representing the data needed by chart.js to display the graphs, and
7 other variables representing the number of posts.
When fetching data from the API I use a service to modify the structure of the data
to match the shape chart.js needs to work while removing data that I don't need
for the application .
This type of model is very specific for chart.js which can be complicated to evolve
but leaves us the freedom to create other independent models for future
developments.
3. Technical choices
To introduce this last point, despite my desire to do things well for a clear, readable
and relevant code, most of my choices were mainly made from a functional point of
view of the application rather than “beauty of code” , because of my lack of
experience with this language.
A. Display :
We can see in the application a small problem with the display of the legends when
hovering over the bubbles of the graph. We can see it for a second before
disappearing. This being either due to my way of using the data, or ember-chart
which seems to be a component that refreshes each time the data is updated
which makes the chart to regenerate which causes the caption not to stay despite
the mouse still being over the bubble. So I haven't been able to fix the issue yet.
In the architectural improvements of the code, maybe I should have made a
“Button” component, instead of repeating the same thing 6 times in the graph
component. And review the way to pass my model to my graph component (
maybe by integrating data fetches with params ex: ('datachart/:param_id')) .
In addition, I did not do well on the ember.js tests because I have the impression
that this corresponds more to tests to verify that code maintenance does not cause
new problems by element deletions. So, how it looks like secondary (in our case.
Be careful, tests are important) and rather time-consuming, I focused on something
else.
B. Data :
As I had just finished the ember.js tutorial before starting this application , and a
bad reading of the subject I lost a lot of time to successfully retrieve the data from
the API. At first I tried applying the same process as in the tutorial, however it did
not work. So I started doing research combining “ember.js” and “SSE API”
unfortunately most of the results were too old and unusable. It was finally by doing
more research about the “SSE” that I found a solution. Data recovery is done
correctly, however I did not manage the disconnection problems.
Currently the application does not store the data already recovered which means
that as soon as you close the tab, you start from the beginning. It could be good to
store the data already recovered but that means that it would be necessary to
manage either the deletion of the data or the size of the bubbles on the graph or
even both.
