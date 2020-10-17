# CPSC 481-04-AI
# Project 1 - A*

Team Name: Ook Ook

Team Members: Jonathan Dao, Liem Tran, Thomas Clark		

Intro: we will build a bot that will start from the upper-left ring in of a 2D grid of cells 
containing red brick floor tiles and black "wall" tiles and attempt to find an A* quality path to the 
lower-right cell. The bot will show as a circle or other distinguishing icon, so the audience can see its progress. 
The bot move from tile to tile, including back up to get to the “mom” cell leading to the current best F(N) kid cell. 
The bot's grid exploration (cells visited, eg, as smaller dots/icons on the floor tiles). A 2-digit
F(N) number in each of the as-yet-unvisited kid cells that has been evaluated. And the
bot's current (shortest) best-path from the root along the cells to the bot.
The project will be built in Jathp-Lisp running with P5, JS, HTML in a web browser page

How project build: 
  - Download zip folder "js-p5-jathp-maze"
  - extract folder "js-p5-jathp-maze" on desktop
  - open up "index-js-p5-jathp-5" file in any browser 

Setup and Installation: N/A

Contents: assets folder(styless.css, draw-stuff.js), sprite-cells-28x28-a.png, cs-sketch-paint.js, Jathp.js, p5.js, index-js-p5-jathp-5.html,  
README.MD, Project Algorithm Report.pdf

Features: the bot will starts from upper-left corner and makes its way down to the bottom right corner
using the Manhattan metric as heuristic function H(N) and BestFS using F(N) with this heuristic H(N) is an A* algorithm, 
the bot leaves red brick floor tiles in which there are more than one paths on the path given.

External requirements: None

Bugs: None
