[Week 7 XP Core Values (or Lean/Kanban Principle)]

* See the whole

1. change the animation with tween, convient for later development<br>
2. as time is limited, cut some features so that we can finish our project in time<br>

* Communication
1. communicate with bo to refactor old animation<br>
2. communicate with chen for the size of the scene<br>
3. communicate with the UI to fix the size of the resource<br>

* Decide as late as possible
1. create info board first, let adding of the information later<br>
2. implement function first, then refactor it later for better design pattern

[Nov.10.2017] Phases Summary

Work Done:<br>

* Fix events bug
* Adjust performance
* Add audio music
* change tweens 
* help adjust image
* update UI

Problem:<br>

* Raycaster sometimes can not work
* Tween refactoring has not finished yet
* Music need to be decided
* Add some story board before going into scene
* Switch tween need to be added

[Week 6 XP Core Values (or Lean/Kanban Principle)]

* See the whole
This week, I add bo's tween animation into demo, however, I found a different to implement the animation as we done before, so we need to refactor previous animation, so that we can use a unified process to implement the animation in the feature. It shows the see the whole value.

* Communication
This week, I integrate and refactor the animation with the bo, and integrate the cone feature with the bouyu, we meet and write code together, and communicate a lot. It shows the communication value.

* Decide as late as possible
I found the event has concurreny problem, but I still integrate the event features into our demo, because I think this problem can be solved latter, and we can decide how to solve as late as possible.

[Nov.2.2017] Work Done

* add several event features
* refactor the front end code
* change the back end service
* design and implement event manager
* combine tween feature
* update front end UI

[Week 5 XP Core Values (or Lean/Kanban Principle)] 

* See the whole
The universeUtils and SolarSceneController has some same responsibility, so I refactor it to avoid duplicate

* Communication
This week, I communicate with bo to implement some features and joint debugging with chen to ensure the usability of the backend service

* Decide as late as possible
I did a info board in the front end regardless with the design, I only show function and we can decide the design later.

[Oct.26.2017]  Phase Summary

Work Done:

* Refactor the raycaster
* Add back ico in front end
* Add Info board and show information on it
* Combine the latest solar to demo.html
* Change the action of the planet scene
* Fix warnning in front end caused by depreating of Three.js's library
* Change the service in back end

Problem:

* The design need to be defined
* Need to do some research in amimate function, the planet will rotate quicker
* The picture of the planet need to be resized
* The solar system's config define and use

[Oct.23.2017] Summary

* Finish the demo.html as our first edition

[Week 4 XP Core Values (or Lean/Kanban Principle)] 

* See the whole
I find that half time is passed, we need to give out a milestone edition, so that we can have a potential deliverable product, this is the see the whole value in XP.

* Communication
In order to do the help teammates refactor their code, I make an appointment with the teammates, share the understanding of the code style, and refactor the code together, this process shows the communication value of XP

* Decide as late as possible
This week I refactor the google's webgl-globe library, however, there are still some bugs in it, but I think these bugs will not influence our milestone edition, so I decide to fix it later, this process shows the decide as late as possible value in XP

[Oct.19.2017] Work Done Summary

* Finish refactoring the google's webgl-globe library
* Integrate google's earth with our own earth
* Create mock API to provide data for google's earth

[Oct.18.2017] Short Summary

Work Done:
* add some set function to google's library
* refactor the action of the library, can import renderer to it
* write a demo to show how to use it
* change the cone function, now can add cone by scene's fucntion

[Oct.12.2017] Weekly Summary

Work Done:
* Learn how to use google's webgl-globe library

Problems: 
* Google's webgl-globe library has several problem, such as it renderer on the div

[Week 3 XP Core Values (or Lean/Kanban Principle)] 

* See the whole
I want to use the google's webgl-globe, but this library do not have the same as the "Scene" we defined in our project, I many cause some problem, so I propose it in our meeting, this shows the see the whole value in XP.

* Communication
As I face some problem using the third-party library, I propose this problem in our technique meeting, and we talk about this problem together and find out a work around, this process show the communication value of XP.

* Decide as late as possible
We talk about the problem about a third-party library, we decide to use a work around to fix it, although the work around can not solve the whole problem, but it can solve part of it, and we can solve left part later. This shows the decide as late as possible.

[Oct.6.2017] Brief Summary

Work Done:

* Define code style and create demo
* Refactor previous code and help other teammate to refactor code
* Combine existing feature
* Create and implement utils file

Problems:

* Raycaster can not get earth in solar system
* Can not click to get object
* Not sure how to create planet in utils file
* Not sure how to use webgl-globe
* Not sure about the UI style and details
* Do not know how to serially execute an animation in a scene
* webgl-globe compatibility problem

Good news:

* We can use Google's webgl-globe in our project

[Week 2 XP Core Values (or Lean/Kanban Principle)] 

* See the whole
I find that we have wrote many features, and I think that if I combine all these features, we can get a good first edition, so a write a combine demo, this shows the see the whole value in XP.

* Communication
This week, I communicate with the teammates about what they have done before, and combine them together into a demo. In the communication, we disscuss how to integrate their work into a combinedDemo, this process show the communication value of XP.

* Decide as late as possible
When I write the combine demo, I find that the switch scene is an important feature, but we have not implement yet. However, I won't use this feature in this feature, so I decide to implement it next week, it shows the principle decide as late as possible.

[Sept.29.2017] Work Done

* Create meteor in universe
* Refactor the code
* Combine several features together

[Sept.27.2017] Summary By Phases

* Finished Basic work proposed in last meeting
1. Learn camera control
2. Create mock front end timeline
3. Create mock API and mock data

* Extra work
1. Learn how to use TrackballControl
2. Get point on the earth by latitude and longitude
3. Let earth rotate in a right angle and direction

* Still Work In Progress
1. Create meteor in the universe

[Week 1 XP Core Values (or Lean/Kanban Principle)]

* See the whole
We know we have three part: front end, back end, and database. So we let each one be responsible for at least one part, and go to learn some technique

* Communication
This week, I participate in the meeting and communicate with the team member about the design and technique use of our project, it show the communication value in XP.

* Decide as late as possible
As we are not familiar with the Three.js, we decide to write the prototype first, and then decide what we will do next, this show the decide as late as possible.

[Sept.23.2017] Useful Demo

1. canvas - materials - video (it shows how to implement slice video)
* https://threejs.org/examples/canvas_materials_video.html

2. canvas - particles - sprites (it's like how the universe works.)
* https://threejs.org/examples/canvas_particles_sprites.html

3. webgl - fly controls - earth (it's a demo of earth)
* https://threejs.org/examples/misc_controls_fly.html

4. pointerlock controls (it shows how to let keyboard to control perceptive camera)
* https://threejs.org/examples/misc_controls_pointerlock.html

5. trackball controls (it shows how to use TrackballControls.js library)
* https://threejs.org/examples/misc_controls_trackball.html

6. gltf exporter (Good Camera Position)
* https://threejs.org/examples/misc_exporter_gltf.html

7. software - geometry - earth (earth demo）
* https://threejs.org/examples/software_geometry_earth.html

8. gpgpu - flocking (bird in this demo can be used in our project)
* https://threejs.org/examples/webgl_gpgpu_birds.html

9. gpgpu - protoplanet (it's like planet)
* https://threejs.org/examples/webgl_gpgpu_protoplanet.html

10. multiple elements (how to put multiple elements in one scene and control them seperately)
* https://threejs.org/examples/webgl_multiple_elements.html

11. webgl - adaptive tone-mapping (earth with light)
* https://threejs.org/examples/webgl_shaders_tonemapping.html

12. breaking example (how to break thing)
* https://threejs.org/examples/webgl_physics_convex_break.html
* https://threejs.org/examples/webgl_physics_rope.html

13. webgl - sea3d / sound (3d sounds, use earphone, just for fun)
* https://threejs.org/examples/webgl_loader_sea3d_sound.html

extra. 四斋蒸鹅心
* https://threejs.org/examples/webgl_loader_mmd_audio.html

[Sept.22.2017] Useful Library

* Projector.js
* src code: https://github.com/mrdoob/three.js/blob/dev/examples/js/renderers/Projector.js
* tutorial: https://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects

* TrackballControls.js
* src code: https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/TrackballControls.js
* tutorial: http://benchung.com/trackball-controls-three-js/

[Sept.21.2017] Finished Work Log
Mainly responsible for establish development environment
* Establish basic Spring Boot project
* Establish mock development environment for back end
* Create Front End Structure and link Three.js library
* Add Useful utils to Back end including MySQL utils and maven dependency
