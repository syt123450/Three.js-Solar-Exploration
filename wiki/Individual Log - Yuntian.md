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
