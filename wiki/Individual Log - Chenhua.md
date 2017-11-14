### [Nov. 14th, 2017]
Development:
  * Light for the solar system scene
  * Orbits for the solar system scene
***
### [Nov. 13th, 2017]
Development:
  * Light config for EarthScene
  * Resize for each planet of PlanetScene
***
### [Week 7 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process for both front end and back end
      * Solar scene updates: sun mesh, rotation, lights settings, asteroid belt and scale configs
      * Planet scene updates: camera/object positions
      * Data decorations
      * Refresh DB dump
    * Coordinate the progress among different parts
      * Bugs tracking on scene animations
      * Time estimation towards to the final submission
***
### [Nov. 11th, 2017]
Development:
  * Solar system scale redesign
***
### [Nov. 10th, 2017]
Development:
  * Fix light issue by replacing to basic mesh (thx to Bo)
  * Resize solar system scale (it's now X20 smaller than before) to fix texture issue of the background
***
### [Nov. 9th, 2017]
Development:
  * Coordinate light config - Add 6 Spotlights for the sun
  * Make sun mesh rotation
***
### [Nov. 8th, 2017]
Development:
  * Bug fixing
    * Update deprecated pointCloud to points
    * Fix rotateY conflicts with tween
  * Update sun texture
  * Coordinate solar scene light configs
***
### [Nov. 7th, 2017]
Development:
  * Apply Asteroid Belt to the solar system scene
  * Update camera direction and light settings of solar system scene
***
### [Nov. 6th, 2017]
Development:
  * Add AsteroidBelt Demo
  * Add sample data output for decoration
  * Debug on PlanetSceneControllers
***
### [Week 6 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process for both front (PlanetSceneControllers) and back (FlagPath) ends
    * Coordinate the progress among different parts
      * Generated proper flag path to satisfy front end usage
      * Separate front end planet configurations and back end planet display information
  * Decide as late as possible
    * Finally refactored PlanetSceneControllers with almost all functionality fixed
***
### [Nov. 4th, 2017]
Meeting #6:
  * Exchange ideas on font end UI
  * Find some bugs from Tween
  * Discussed next week tasks:
    * Optimization on loading scenes
    * Combining features into the scene
    * Debugging (Tween, PlanetSceneController)
    * Updates on decorated data
***
### [Nov. 3rd, 2017]
Development:
  * Planet scene light and shadow tests
    * Coordinate the lights combination for the best view for the scene
    * Tried to apply shadow to the ring (though the result is pretty bad)
***
### [Nov. 2nd, 2017]
Development:
  * Refactored PlanetSceneControllers
    * Combined creation of all planets (except Earth)
    * Combined the feature with ring rotation
    * Apply default lights coordination
***
### [Nov. 1st, 2017]
Development:
  * Apply ring prototype to solar system scene
  * Generate flag path of different areas
    * Add ifFlagImage field for the AreaGeography table
    * Update corresponding views
    * Update service implementation to provide proper flag path
  * Test different lights for planet scene
***
### [Oct. 31st, 2017]
Development:
  * Apply ring prototype/demo
    * Add "createRing" to the universeUtil
    * Apply to Saturn and Uranus scene with refactored code
    * Update SolarScene config (apply to solar scene may be applied tomorrow)
***
### [Oct. 30th, 2017]
Development:
  * Update ring prototype/demo
    * Fixed ratio between planet radius and ring radius (inner/outer)
    * Add ring pngs (special thx for Qi Liu)
  * Refactored SolarSystemScene (finally agreed on the version from Yuantian)
***
### [Week 5 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process for different parts
    * Keep the ideas from different parts
    * Coordinate the progress among different parts
  * Decide as late as possible
    * Update prototypes for different scenes
***
### [Oct. 28th, 2017]
Meeting #5:
  * Discussed the process about prototype and scene assemble
  * Exchanged the ideas about information board, timeline bar and halo color config
  * Agreed on the information displayed on the information board
  * Discussed next step problems and progress
***
### [Oct. 27th, 2017]
Development:
  * Update FuelInfoBean
***
### [Oct. 26th, 2017]
Development:
  * Debugged Solar System Scene
  * Reviewed Solar System Scene
  * Reviewed Data generated for Google Globe
***
### [Oct. 25th, 2017]
Development:
  * Apply change scene prototype to solar system scene and planet scenes (with Bo)
  * Add click on prototype to solar system scene and plant scenes (with Bo)
***
### [Oct. 24th, 2017]
Development:
  * Reviewed views for each energy sources
  * Alternate comment style
***
### [Oct. 23rd, 2017]
Development:
  * Update the SQL statement of getGeoAmountData() to catch data for all years as the sum
  * Coordinate the implementation of transferGeoAmountData() method to satisfy:
    * Count the maximum
    * resize the value from 13000+ to around 0.01 ~ 1.8 range
***
### [Oct. 22nd, 2017]
Development:
  * Update total energy view
    * Now, if a year of specific area has no value, but which has values from a different energy source, then the total energy will be calculated by default the nulll value as zero
  * Communicate with YUNTIAN for total value range issue
    * The required value range is around 1.0 (0.5~1.5)
    * The actual values vary from 0.56 to 13000+
***
### [Week 4 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process for different parts
    * Make sure each part is on schedule and ready to serve for other parts
  * Communication
    * Keep communicating with team members for 
      * refactor demo/prototype codes for readability
      * discussed List formats and mesh names visuability
      * discussed MySQLUtils usage
      * Three.js learning experience
  * Decide as late as possible
    * Generated circle orbit prototype and tried the ring prototype
***
### [Oct. 21st, 2017]
Meeting #5:
  * Discussed color designs for halo of planets, main site, background and other scenes
  * Exchanged ideas about how to assemble different scenes and prototypes
  * Agreed on how to present data including information DIV and animations
  * Decided data format for Google API
  * Discussed problems faced from last week.
***
### [Oct. 20th, 2017]
Development:
  * Tried on ring prototye, but decide to freeze the prototype for now
  * Add solar system scene
***
### [Oct. 19th, 2017]
Development:
  * Refactor 8 planet scenes
  * Processing Ring prototype
***
### [Oct. 18th, 2017]
Development:
  * Complete 8 planet scenes of solar system
  * Debug and explore other features
***
### [Oct. 17th, 2017]
Development:
  * 8 planets scene of solar system
***
### [Oct. 16th, 2017]
Development:
  * Parsing SQL ResultSet
  * Generate List<FuelBean>
  * Generate List<Double> (for Google earth demo)
***
### [Oct. 13th, 2017]
Development:
  * Configured MySQL database
  * Setup MySQLUtils for further develpment
***
### [Oct. 12th, 2017]
Development:
  * Add .name property for the scene
***
### [Oct. 9th, 2017]
Development:
  * Coordinated the orbit color
***
### [Oct. 8th, 2017]
Development:
  * Move personal wiki .md file
***
### [Oct. 7th, 2017]
Development:
  * Add circle orbit demo
  * Alternate some solar system scales, including orbit radius, camera positions
  * Provide global variables of each mesh for now. This could be alternated if we find a proper solution on accessing aggregations without touching meshes
***
### [Week 3 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process of different parts (Three.js and back end)
  * Communication
    * Keep communicating with team members for 
      * refactor demo codes for readability
      * generate proper data format for front end
      * Three.js learning experience
  * Decide as late as possible
    * Different database views for selection
    * Solar system scene prototype and rotation/revolution prototype
***
### [Oct. 6th, 2017]
Meeting #4:
  * Exchanged ideas for sperate planet scenes and solar system scene
  * Discussed Front end UI design and color configurations
  * Agreed on some usages of global variables and how to switch scenes
  * Introduced some problems faced and may be faced
***
### [Oct. 4th - 5th, 2017]
Development:
  * Database view
  * total energy calculation
  * Solar system (include orbits)
***
### [Oct. 3rd, 2017]
Development:
  * Refactored demo codes
  * Complete solar system scene creation and planets revolutions
***
### [Oct. 2nd, 2017]
Development:
  * Refactored all my demos
  * Re-orgnized the scene for the Sun, the Earth and the Moon
  * Prepared for the scene of the whole solar system
***
### [Week 2 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Keep the development process of different parts (Three.js, data collection and back end)
  * Communication
    * Keep communicating with team members for 
      * design ideas 
      * Data collection process
      * Three.js learning experience
  * Decide as late as possible
    * Produce prototypes of the solar system
***
### [Sept. 30th, 2017]
Meeting #3:
  * Agreed on refactoring existed demos
  * Agreed on rendering solar system scene and planet scenes separately
  * Discussed next week tasks
***
### [Sept. 29th, 2017]
Development:
  * Update table for areas, longitude and latitude
  * Insert data
  * Create dumped database file
***
### [Sept. 28th, 2017]
Discussion:
  * Present demos for existed Three.js features
  * Exchange ideas for the direction of the general scene setups.
  * Found potential issues
Development:
  * Re-loaded data from the issue of convert doubles into integers
  * Validate and trim existed data
***
### [Sept. 27th, 2017]
Development:
  * Create new tables
  * Insert data
***
### [Sept. 26th, 2017]
Development:
  * Database table design
  * Trim and select raw data
  * Insert data into database
  * Three.js: object movement
***
### [Sept. 25th, 2017]
Development:
  * Database table design
  * Analyze data collection script
  * Analyze front-end API
  * Three.js: object movement
***
### [Sept. 24th, 2017]
Development:
  * Three.js: Object3D
  * Three.js: local coordination and relative movement
***
### [Week 1 XP Core Values (or Lean/Kanban Principle)] 
  * See the whole
    * Discussed on the project landscape, direction, standards and rules
    * Divided the project to different work parts: data collection, front end UI, front end Three.js and back end (Spring boot + MySQL)
  * Communication
    * Keep communicating with team members for design ideas and Three.js learning experience
  * Decide as late as possible
    * Try to get all possible solutions then decide which one is better
***
### [Sept. 23rd, 2017]
Meeting #2:
  * Weekly review
  * Data search summary & Data type decision making
  * Three.js exploration summary
  * Future prototype design

***
### [Sept. 22nd, 2017]
Development
  * Three.js exploration
  * Sphere texture for cloud
  * Sphere inner texture for star field

***
### [Sept. 20th-21st, 2017]  
Development:
  * Three.js exploration
  * Sphere texture, useful links: 
    * http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
    * http://www.shadedrelief.com/natural3/pages/textures.html

***
### [Sept. 19th, 2017]  
Development:
 * Three.js sample code

***
### [Sept. 18th, 2017]  
Development:
 * MySQL local setup
 * Created user and password for project
 * Generate folder and sql script for database

***
### [Sept. 17th, 2017]  
Meeting #1:
 *  Discussion on project direction, standard and rules.
 *  Decide project topic on Data Visualization
 *  Next for:
    * Data search & data collection
    * Project initialization
    * Three.js exploration
       
*** 
### [Sept. 14th, 2017]  
Meeting #0:
 *  Project team set up.
 *  Project topic discussion.
