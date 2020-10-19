# 481_04_Project1
Class :481-04
https://github.com/OkaiDao/481_04_Project1/tree/drawBot
Project Number: 1
Project Name: A*_Project

Team Name: Ook Ook
members:
- Jonathan Dao
- Thomas Clark

Intro: 
  The project searches through a maze to find a path that reaches the end of the maze. The algorithm used takes the manhattan distance between the points from the start and the end of the maze to the current point to evaluate the value of that point in the maze. The algorithm then chooses the next adjacent path from all visited nodes and then evalutes from that path until it reaches the end. When the path reaches the end it back tracks the visited paths and when it reaches the end it shows the shortest path.

Contents:
assest 
  -draw0stuff.js
  -styles.css
 0-README.txt
 README.md
 Jathp.js
 cs-sketch-paint.js
 index-js-p5-jathp-5.html
 p5.js
 sprite-cells-28x28-a.png
  
Enternal Requirements: None

Setup and Installation:
Open the index-js-p5-jathp-5.html in a web browser.
To be able to run make sure that strict_origin_policy is enabled in browser.
Using firefox:
  type about:config in the web search
  set strict_origin_policy to true


Sample Invocation:
Added to folder as: 

Features:

Bugs: Note: (The algorithms are written in both java script, located under the cs-sketch-paint, and in lisp: index-js-p5-jathp-5.html)
The java script algorithm isn't implemented correctly and gets stuck in an endless loop.
The function to sort the visited nodes in lisp does not sort correctly.
The back track path viewing function is not implemented in lisp.
