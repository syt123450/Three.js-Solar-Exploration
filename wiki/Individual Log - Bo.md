## XP Core Values: Communication

### [Nov 10, 2017] - Update documentation<br/>
1. Updated weekly meeting notes, xp core values, burndown chart and etc.

### [Nov 10, 2017] - Weekly meeting<br/>
1. Weekly meeting (3hrs). Discussed technical issues.

### [Nov 9, 2017] - Fixed issues in earth animation tween<br/>
1. Fixed bug in earth animation tween.

### [Nov 8, 2017] - Debug issues in earth animation tween<br/>
1. Started debugging issues in the earth animation tween.

### [Nov 7, 2017] - Halo bug fixed<br/>
1. Fixed the bug in halo effect.

### [Nov 6, 2017] - Halo bug<br/>
1. Tried to fix the bug in halo effect.


### [Nov 4, 2017] - Weekly meeting<br/>
1. Weekly meeting.
2. Updated team wiki and logs.

### [Nov 3, 2017] - Code refactor<br/>
1. Spent 4 hours with Yuntian to refactor the tween animation code.

### [Nov 2, 2017] - Lighting adjustment<br/>
1. Adjusted lighting for all the scenes.
2. Refactored code of earth animation.

### [Nov 1, 2017] - Finalized Double Halos for planets<br/>
1. Made double halos for all the planets.
2. Met with Yuantian and Chenhua to refactor code.

### [Oct 31, 2017] - Double Halos for planets<br/>
1. Started to make double halos effect for all the planets.

### [Oct 30, 2017] - Feature Integration<br/>
1. Met Yuntian for 3 hours to integrate tween animation into the final demos.

### [Oct 28, 2017] - Managed documentations.<br/>
1. Weekly group meeting.
2. Updated team wiki, meeting notes and etc.

### [Oct 27, 2017] - Finished tween animation demo<br/>
1. Finisehd tween animation demo, so that when cone is clicked, the earth slide to the left side.

### [Oct 26, 2017] - Code refactor<br/>
1. Started to refactor tween animation demo.

### [Oct 25, 2017] - Code refactor<br/>
1. Refactored the code use to switch scene betwen planet and the Sun with Chenhua.

### [Oct 24, 2017] - Finished creating double halo demo<br/>
1. Finished double halo demo by applying two ShaderMaterials.
2. Communicated with UI Designer to discuss how to implement the double halo effect

### [Oct 23, 2017] - Tried to create double halo demo<br/>
1. Tried to combine sprites and ShaderMaterials together to create a composite halo effect for the Earth and other planets.
2. Communicated with Bou-yu. Helped him understand how to use raycaster.

***
|| XP CORE VALUES| 
| ------| ------ | 
| WEEK 4| **See the whole**</br>Starting from the 4th week, we begin to put all the pieces we have worked in the past together towards our final product as a whole.</br></br>**Communication**</br>Using wechat group, kept the teammate updated about my progress on implementing the prototypes.</br></br>**Decide as late as possible**</br>For the click to rotate the earth effect, there are different ways to present it. Then we decide not to make a decision at this point, instead we just make a minimum working prototype.</br>|

### [Oct 21, 2017] - Group meeeing<br/>
1. Created new demo, which allows the user to click on the cone to stop the earth from rotating.
2. Refactored code snippet to initialize cone and flag.

### [Oct 20, 2017] - Animation Demo<br/>
1. Created a demo, which implemented animation with Tween.js. The final effect is that we can rotate
the Earth in a pre-defined manner, with specified duration.

### [Oct 19, 2017] - Tween.js<br/>
1. Studied how to use Tween.js to created animation in THREE.js.

### [Oct 18, 2017] - Created click cone demo (finished)<br/>
1. Finished click cone icon to rotate earth demo.

### [Oct 17, 2017] - Created click cone demo (to be continued)<br/>
1. Created new demo, which allows the user to click on the cone to stop the earth from rotating.
2. Refactored code snippet to initialize cone and flag.

### [Oct 16, 2017] <br/>
1. Updated team project wiki.
2. Studied how to do animation in Three.js.

***
|| XP CORE VALUES| 
| ------| ------ | 
| WEEK 3|**Communication**</br>In addition to the regular weekly meeting, we held an extra technical meeting, so that the teams members can help each others to solve the technical issues we had in the past weeeks.</br></br>**Decide as late as possible**</br>Instead of building the final product right away, we started with building smaller prototypes to verify our ideas. All these prototypes will be later be merged into our final product depending on our requirement at that time.</br></br><br/>

***
### [Oct 11, 2017] - Created change scene demo<br/>
1. Created change scene demo.
2. Spot some performance issue in existing code,
which could significant hinder Webgl rendering speed.

***
### [Oct 10, 2017] - Researched issue<br/>
1. Problem to solve: use raycaster to get an aggregated 3d obejct with Three.js.

***
### [Oct 9, 2017] - Created mouse click to stop earth demo<br/>
1. Created demo which shows how to stop the earth from rotating using mouse click.

***
### [Oct 8, 2017] - Update team wiki<br/>
1. Updated weekly meeting minutes, weekly work summary and CFD diagram.

***
### [Oct 5, 2017] - Refactor code<br/>
1. Refactored camZoomInAndZoomOutPrototype.js demo.
2. Solved the problem that raycaster cannot acquire aggregated object in Three.js.

***
### [Oct 4, 2017] - Create ShaderMaterial demo<br/>
1. Improved halo effect using ShaderMaterial, which has better visual effect and is more flexible in terms of changing the patterns.
cmpe202-nullpointerexception/src/main/resources/static/htmlDemo/shaderDemo.html

***
### [Oct 3, 2017] - Create ShaderMaterial demo<br/>
1.  Refactored raycasterDemo.html & raycasterPrototype according to Yuantian's template.

***
### [Oct 2, 2017] - Create ShaderMaterial demo<br/>
1. Created directional lighting demo to give more stereoscopic feeling to the earth.
2. Solved the opacity problem of using sprite.
3. Refactored the haloDemo.html & haloPrototype.js according to Yuntian's template.

Communication: Met with Yuntian in person to solve the opacity problem.

***
|| XP CORE VALUES| 
| ------| ------ | 
| WEEK 2|**Communication**</br>Met with Yuntian in person to solve the opacity problem.</br></br>**Decide as late as possible**</br>Instead of building the final product right away, we started with building smaller prototypes to verify our ideas. All these prototypes will be later be merged into our final product depending on our requirement at that time.</br></br><br/>

***
### [Sep 30, 2017] - Weekly Meeting<br/>
1. Weekly meeting.
2. Took notes for the meeting and wrote weekly meeting minutes.
3. Created backlog items and updated Cumulative Flow Diagram.

***
### [Sep 29, 2017] - Camera Zoom In/Out Demo<br/>
1. Created utility function to zoom in and out camera, while keep the revolving earth in the center of the screen.
https://github.com/nguyensjsu/cmpe202-nullpointerexception/blob/master/src/main/resources/static/htmlDemo/camZoomInAndOutDemo.html

***
### [Sep 28, 2017] - Create Halo Effect<br/>
1. Group meeting from 1:00 pm ~ 5:00 pm.
2. Created halo effect for the stars using sprite. Need to explore how to use shade and ShadeMaterial to create halo effect.

**References**<br/>
https://stemkoski.github.io/Three.js/Simple-Glow.html
https://stemkoski.github.io/Three.js/

***
### [Sep 27, 2017] - Raycaster Class<br/>
1. With Raycaster class, picking up object in 3D space with the mouse. Created demo in Github master branch.
2. Implemented new feature that when mouse moves over the earth, it will stop rotating. Created demo in Github.

Oh yeah, I'm starting push code !!!

***
### [Sep 26, 2017] - Study Projector Class (Raycaster)<br/>
how to find intersection using Raycaster
https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html

***
### [Sep 25, 2017] - Create UI mockups<br/>
1. Created UI mockups in HTML format with interactivity using Axure RP. 

**References**<br/>
https://drive.google.com/file/d/0B3cyrrSDueDhWTZTOXhvUFJSd1E/view?usp=sharing

***
|| XP CORE VALUES| 
| ------| ------ | 
| WEEK 1|**Communication**</br>For better communication, we setup a Wechat group for daily discussion. The goal is to keep everyone updated on each others progress and solve technical or non-techincal issue ASAP through communication.</br></br>**Decide as late as possible**</br>Because most of the team members are not familiar with THREE.js, so we decided to make prototypes first, instead of making the final decision about what the UI will look like exactly.</br></br><br/>

***
### [Sep 22, 2017] - Three.js exploration<br/>
1. KeyFrameTrack - two arrays: time + values, diff types of keyframetrack
2. Use setInterval() to change frame rate.<br/>
https://github.com/mrdoob/three.js/issues/642
3. Set camera position and where to look.<br/>
https://github.com/mrdoob/three.js/wiki/Getting-Started
4. Raycaster: working out what objects in the 3d space the mouse is over<br/>
https://threejs.org/docs/index.html#api/core/Raycaster
5. Particles<br/>
https://threejs.org/examples/webgl_buffergeometry_custom_attributes_particles.html

**References**<br/>
[How to calculate frustum of perspective camera](https://docs.unity3d.com/Manual/FrustumSizeAtDistance.html)

***
### [Sep 21, 2017] - Three.js exploration & Github Maintenaince<br/>
1. Created Personal Project Log Template.
2. Updated Group Wiki Home.
3. Tried to draw an earth with three.js. **Need help from others**

**References**<br/>
[How to calculate frustum of perspective camera](https://docs.unity3d.com/Manual/FrustumSizeAtDistance.html)

***
### [Sep 19, 2017] - Three.js Exploration<br/>
1. Studied the following chapters from thress.js documentation and learned how to create a scene/sphere/perspective camera with Three.js.
* Scene
* Cameras
* SphereGeometry
* Mesh

**References**<br/>
[how to draw earth](http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/)<br/>
[earth texture 1k, 2k, 4k, 10k](http://planetpixelemporium.com/planets.html)<br/>
[draw a globe sample code](https://codepen.io/qkevinto/pen/EVGrGq?editors=0010#0)</br>

***
### [Sep 18, 2017] - Three.js Exploration<br/>
1. Installed PhpStorm IDE for Javascript development.
2. Installed Three.js library and ran test samples.

**References**</br>
* [Three.js doc](https://threejs.org/docs/)

***
### [Sep 17, 2017] - Group Meeting 1
1. Discussed detailed project requirements.
2. Finalized project topic: data visualization using Three.js.
3. Assigned Bo to manage project related documents.

***
### [Sep 14, 2017] - Group Meeting 0
1. Project begins here!
2. Exchanged opinion over project topics. Possible project topics:
Game (like snake), Game with a story line, Data Visualization