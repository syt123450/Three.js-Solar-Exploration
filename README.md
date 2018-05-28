<p align="center">
<a href="https://github.com/syt123450/Three.js-Solar-Exploration" target="_blank">
<img width="100" src="https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/logo.png" alt="Three.js Solar Exploration">
</a>
</p>

<h1 align="center">Three.js Solar Exploration</h1>

<p align="center">
  <a href="https://github.com/syt123450/Three.js-Solar-Exploration/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="license badge"></a>
  <a href="https://github.com/mrdoob/three.js/"><img src="https://img.shields.io/badge/dependencies-Three.js-brightgreen.svg" alt="dependencies badge"></a>
 </p>


## Content

- [Introduction](#introduction)
- [Feature Review](#feature-review)
- [Setup](#setup)


## Introduction

* This is a web 3D Solar System, you can explore the solar system and click the planets to see some resource data of them. <br>
* The project is mainly built on Three.js, while the animation is built on Tween.js, and the backend uses Spring Boot. <br>
* The project can been seen from the link below [Click Me](http://solar-exploration.com) <br>
* The project has best experience in Chrome.

## Feature Review

Home page is the solar system, every planet in it can be clicked to see the detailed data.
![picture](https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/solar.png)

There is a transition page between solar system and the "scene" for a specific planet, it will briefly introduce the planet
![picture](https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/transition.png)

In planet scene, you can rotate the planet, double click the planet to see resource data, and other interesting features
![picture](https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/planet.png)

The earth scene is special, you can click the timeline and the "cone" to see resource data each year
![picture](https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/earth.png)

And you can click the "All" button to see all the data in the earth, this earth is built on [webgl-globe](https://github.com/dataarts/webgl-globe)
![picture](https://github.com/syt123450/Three.js-Solar-Exploration/blob/master/assets/whole.png)

## Setup

1. Clone the repository
```html
git clone https://github.com/syt123450/Three.js-Solar-Exploration
```

2. Put the base folder in a web environment, for example apache, and then open the index.html.

3. We recommend to see this project in Chrome.