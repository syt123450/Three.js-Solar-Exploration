/**
 * Created by ss on 2017/9/30.
 */

UniverseUtils = function () {

    var coneRadius = 0.52;
    var coneInitSize = 0.01;
    var starPositions = [
        [-7, 3, -15], [-8, 4, -16],
        [-9, 2, -14], [-10, 3, -15], [-8, 4, -10],
        [-9, 5, -15],
        [-6, -3, -15], [-6, -4, -15], [-7, -2, -15],
        [-10, 0, -15], [-8, -4, -13],
        [7, 3, -15], [8, 4, -16], [9, 2, -14],
        [12, 3, -15], [3, 4, -11], [9, 5, -15],
        [8, -4, -15], [7, -2, -15], [10, 0, -15],
        [8, -4, -13], [6, -3, -15]];

    this.createSolarAggregation = function () {
        var aggregation = new THREE.Object3D();
        aggregation.add(createDefaultSun());

        return aggregation;
    };

    this.createDefaultUniverse = function () {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(90, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });
        universeMesh.name = 'universeMesh';
        return universeMesh;
    };

    this.createDefaultCamera = function () {

        var camera = new THREE.PerspectiveCamera();
        camera.fov = 45;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1500;
        camera.position.set(0, 0, 1.5);
        camera.updateProjectionMatrix();
        camera.name = 'defaultCamera';
        return camera;
    };

    this.createDefaultEarthMesh = function () {

        var earthMesh = new THREE.Mesh();
        earthMesh.geometry = new THREE.SphereGeometry(0.5, 64, 64);
        earthMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap: new THREE.TextureLoader().load(
                '../images/earthbump1k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap: new THREE.TextureLoader().load(
                '../images/water_4k.png'
            )
        });
        earthMesh.name = 'defaultEarthMesh';
        return earthMesh;
    };

    this.createDefaultAtmosphere = function () {

        var atmosphereMesh = new THREE.Mesh();
        atmosphereMesh.geometry = new THREE.SphereGeometry(0.51, 64, 64);
        atmosphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        });
        atmosphereMesh.name = 'atmosphereMesh';
        return atmosphereMesh;
    };

    this.createDefaultMoon = function () {

        var moonMesh = new THREE.Mesh();
        moonMesh.geometry = new THREE.SphereGeometry(0.05, 64, 64);
        moonMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/moonmap2k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/elev_bump_4k.jpg'
            )
        });
        moonMesh.name = 'moonMesh';
        return moonMesh;
    };

    this.createDefaultMeteors = function () {

        var meteors = [];
        meteors[0] = createOneMeteor();
        meteors[1] = createOneMeteor();

        // meteors.sweepMeteors = function () {
        //
        //     this.forEach(function (meteor) {
        //
        //         if (meteor.position.x <= -4) {
        //             meteor.position.x = 3 * Math.random();
        //             meteor.position.y = 3 * Math.random();
        //         }
        //
        //         meteor.position.x -= 0.01;
        //         meteor.position.y -= 0.01;
        //     });
        // };

        meteors.forEach(function(meteor) {
	        var startPosition = {x: 0};
	        // console.log(meteor);
	        var tween = new TWEEN.Tween(startPosition)
		        .to({ x: -4 }, 6000);
            tween.onUpdate(function() {
			        if ( meteor.position.x <= -4) {
				        meteor.position.x = 3 * Math.random();
				        meteor.position.y = 3 * Math.random();
			        }
			        meteor.position.x = startPosition.x;
		        });
	        tween.start();
        });

        meteors.initSweepTween = function() {
            this.forEach(function(meteor) {
                meteor.tween.start();
            })
        };
        meteors.name = 'meteors';
        return meteors;
    };

    this.createDefaultStars = function () {

        var stars = [];
        for (var i = 0; i < starPositions.length; i++) {
            stars[i] = createOneStar();
            stars[i].position.x = starPositions[i][0];
            stars[i].position.y = starPositions[i][1];
            stars[i].position.z = starPositions[i][2];
        }

        stars.flashStars = function () {
            this.forEach(function (star) {
                star.count += Math.random() > 0.5 ? 2 : 3;
                if (star.count > 40) {
                    star.material.color.set(star.material.color.getHex() == 0x727272 ? 0xffffff : 0x727272);
                    star.count = 0;
                }
            });
        };
        return stars;
    };

    this.createOneCone = function (coneParameters) {

        var coneSide = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/fadeTest.jpg'
            ),
            side: THREE.DoubleSide
        });
        var green = new THREE.MeshPhongMaterial({color: 0X008000});
        var materialsArray = [];
        materialsArray.push(coneSide);
        materialsArray.push(coneSide);
        materialsArray.push(green);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry(coneInitSize, 3 * coneInitSize, 3 * coneInitSize, 360 * coneInitSize),
            materialsArray
        );

        var position = calculatePosition(coneParameters.latitude, coneParameters.longitude);
        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.parameters = coneParameters;

        coneMesh.rotate = function () {
            this.rotateY(0.05);
        };

        coneMesh.isGrow = true;
        coneMesh.initSize = coneInitSize;
        coneMesh.grow = function () {
            if (this.scale.x > 1.2) {
                this.isGrow = false;
            }
            if (this.scale.x < 1) {
                this.isGrow = true;
            }
            if (this.isGrow) {
                this.scale.x += 0.005;
                this.scale.y += 0.005;
                this.scale.z += 0.005;

                this.translateY(-this.initSize / 20);
            } else {
                this.scale.x -= 0.005;
                this.scale.y -= 0.005;
                this.scale.z -= 0.005;
                this.translateY(this.initSize / 20);
            }
        };

        return coneMesh;
    };

    this.createSolarUniverse = function () {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(100, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/background_2.jpg'
            ),
            side: THREE.BackSide
        });

        return universeMesh;
    };

    this.createPlanetsList = function () {

        var planetsList = {
            "mercury": {},
            "venus": {},
            "earth": {},
            "mars": {},
            "jupiter": {},
            "saturn": {},
            "uranus": {},
            "neptune": {},
            "pluto": {}
        };

        planetsList["mercury"].mesh = createTerrestrialPlanet(SolarConfig.mercury);
        planetsList["venus"].mesh = createTerrestrialPlanet(SolarConfig.venus);
        planetsList["earth"].mesh = createTerrestrialPlanet(SolarConfig.earth);
        planetsList["mars"].mesh = createTerrestrialPlanet(SolarConfig.mars);
        planetsList["jupiter"].mesh = createJovianPlanet(SolarConfig.jupiter);
        planetsList["saturn"].mesh = createJovianPlanet(SolarConfig.saturn);
        planetsList["uranus"].mesh = createJovianPlanet(SolarConfig.uranus);
        planetsList["neptune"].mesh = createJovianPlanet(SolarConfig.neptune);
        planetsList["pluto"].mesh = createTerrestrialPlanet(SolarConfig.pluto);

        for (var planet in planetsList) {
            planetsList[planet].orbit = createOrbit(SolarConfig[planet].orbitRadius);
            planetsList[planet].mesh.position.x = SolarConfig[planet].orbitRadius;
        }

        // Add ring to Saturn and Uranus
        planetsList["saturn"].mesh.add(createRing(SolarConfig.saturn));
        planetsList["uranus"].mesh.add(createRing(SolarConfig.uranus));

        return planetsList;
    };

    this.createPlanetMesh = createPlanetMesh;
    this.createTerrestrialPlanet = createTerrestrialPlanet;
    this.createJovianPlanet = createJovianPlanet;

    this.createRing = createRing;
    this.createAsteroidBelt = createAsteroidBelt;

    this.addDoubleHalos = function (target, innerColor, outerColor) {
        // innerGlowMesh settings
        var _innerGlowMesh;
        var INNER_GLOW_MESH_COLOR = innerColor;
        var INNER_GLOW_MESH_OPACITY = 0.2;
        var INNER_GLOW_MESH_RADIUS = 0.504;
        var innerFragmentShaderIntensity = 'float intensity = pow( 0.55 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 7.0 );';

        var _outerGlowMesh;
        var OUTER_GLOW_MESH_COLOR = outerColor;
        var OUTER_GLOW_MESH_OPACITY = 0.2;
        var OUTER_GLOW_MESH_RADIUS = 0.504;
        var outerFragmentShaderIntensity = 'float intensity = pow( 0.3 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 1.2 );';

        _init();

        /*************************
         * @private
         ************************/
        function _init() {
            if (innerColor !== '') {
                _initInnerGlowMesh(INNER_GLOW_MESH_COLOR, INNER_GLOW_MESH_OPACITY, INNER_GLOW_MESH_RADIUS);
                target.add(_innerGlowMesh);
            }

            if (outerColor !== '') {
                _initOuterGlowMesh(OUTER_GLOW_MESH_COLOR, OUTER_GLOW_MESH_OPACITY, OUTER_GLOW_MESH_RADIUS);
                target.add(_outerGlowMesh);
            }
        }

        //The init function is used to put object into the scene
        function _initInnerGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
            _innerGlowMesh = new THREE.Mesh();
	        _innerGlowMesh.name = 'inner glow mesh';
            _innerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
            _innerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, innerFragmentShaderIntensity);
            _innerGlowMesh.scale.set(1.2, 1.2, 1.2);
        }

        function _initOuterGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
            _outerGlowMesh = new THREE.Mesh();
	        _outerGlowMesh.name = 'outer glow mesh';
            _outerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
            _outerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, outerFragmentShaderIntensity);
            _outerGlowMesh.scale.set(1.2, 1.2, 1.2);
        }

        function _getShaderMaterial(glowMeshColor, opacity, intensityFunc) {
            var shaders = _getShader(new THREE.Color(glowMeshColor), intensityFunc);
            shader = shaders['atmosphere'];
            return new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(shader.uniforms),
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: opacity
            });
        }

        function _getShader(color, intensityFunc) {
            var colorR = color.r;
            var colorG = color.g;
            var colorB = color.b;
            return Shaders = {
                'atmosphere': {
                    uniforms: {},
                    vertexShader: [
                        'varying vec3 vNormal;',
                        'void main() {',
                        'vNormal = normalize( normalMatrix * normal );',
                        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                        '}'
                    ].join('\n'),
                    fragmentShader: [
                        'varying vec3 vNormal;',
                        'void main() {',
                        intensityFunc,
                        'gl_FragColor = vec4(' + colorR + ', ' + colorG + ', ' + colorB + ', 1.0 ) * intensity;',
                        '}'
                    ].join('\n')
                }
            };
        }

    };

    function createDefaultSun() {
        return new THREE.Mesh(
            new THREE.SphereGeometry(SolarConfig.sunRadius, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 'yellow'
            }));
    }

    function createPlanetMesh(planetParameters){
        if(planetParameters.bumpMap){
            return createTerrestrialPlanet(planetParameters);
        }
        else {
            return createJovianPlanet(planetParameters);
        }
    }

    function createTerrestrialPlanet(planetParameters) {
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(planetParameters.radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(planetParameters.map),
            bumpScale: 0.05,
            bumpMap: new THREE.TextureLoader().load(planetParameters.bumpMap)
        });
        sphereMesh.castShadow = true;       //default is false
        sphereMesh.receiveShadow = true;    //default is false

        return sphereMesh;
    }

    function createJovianPlanet(planetParameters) {
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(planetParameters.radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(planetParameters.map)
        });
        sphereMesh.castShadow = true;       //default is false
        sphereMesh.receiveShadow = true;    //default is false

        return sphereMesh;
    }

    function createRing(planetParameters) {
        var ringMesh = new THREE.Mesh();
        ringMesh.geometry = new THREE.RingGeometry(planetParameters.ringInnerRadius, planetParameters.ringOuterRadius, 64, 16, 0, Math.PI * 2);
        ringMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                planetParameters.ringMap
            ),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65
        });
        ringMesh.castShadow = true;         //default is false
        ringMesh.receiveShadow = true;      //default is false
        ringMesh.rotateX( 0.5 * Math.PI );  //rotate to fit actual angle

        return ringMesh;
    }

    function createAsteroidBelt(){
        var pointClouds = [];
        var material = new THREE.PointCloudMaterial({
            color: SolarConfig["asteroidBelt"].color,
            size: SolarConfig["asteroidBelt"].size
        });

        var i, j, r, theta, x, y, z;
        for (j =0; j <SolarConfig["asteroidBelt"].cloudNumber; j++){
            var geometry = new THREE.Geometry();
            for (i =0; i <SolarConfig["asteroidBelt"].cloudSize; i++){
                r = SolarConfig["asteroidBelt"].orbitRadius + (Math.random() *  SolarConfig["asteroidBelt"].orbitRadiusWidth);
                theta =  (Math.random() * 2 * Math.PI);
                x = Math.cos(theta) * r;
                y = ( -1 * Math.random() +0.5) * SolarConfig["asteroidBelt"].orbitRadiusThickness;
                z = Math.sin(theta) * r;

                geometry.vertices.push(new THREE.Vector3(x, y, z));
            }
            pointClouds[j] = new THREE.PointCloud(geometry, material);
        }

        return pointClouds;
    }

    function createOrbit(radius) {
        var geometry = new THREE.CircleGeometry(radius, 256, 0, 2.01 * Math.PI);
        geometry.vertices.shift();
        var orbit = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({color: 0x6d4587, linewidth: 0.2})
        );
        orbit.rotateX(0.5 * Math.PI);
        return orbit;
    }

    function calculatePosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((coneRadius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((coneRadius) * Math.cos(phi));
        var pointZ = ((coneRadius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function createOneStar() {

        var star = new THREE.Mesh();
        star.geometry = new THREE.SphereGeometry(0.03, 32, 32);
        star.material = new THREE.MeshBasicMaterial({color: 0x727272});
        star.count = 0;
        addHaloToStar(star);
        return star;
    }

    function createOneMeteor() {

        var meteor = new THREE.Sprite();
        // var meteor = new THREE.Mesh();

        // meteor.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.001);
        // // meteor.material = new THREE.MeshBasicMaterial({
        // //     map: new THREE.TextureLoader().load('../images/meteor.png'),
        // //     opacity: 0.9,
        // //     transparent: true
        // // });

        meteor.material = new THREE.SpriteMaterial({
            opacity: 0.9,
            transparent: true,
            map: new THREE.TextureLoader().load('../images/meteor.png')
        });

        meteor.position.z = -3;

        meteor.scale.set(0.4, 0.4, 0.001);

        var initSeed = 3 * Math.random();

        meteor.tween = new TWEEN.Tween({x: initSeed})
            .to({x: -4}, 6000);
        meteor.tween.onUpdate(function() {
            meteor.position.x = meteor.initX - (initSeed - this.x);
            meteor.position.y = meteor.initY - (initSeed - this.x);
            if (this.x == -4) {
                meteor.initX = 3 * Math.random();
                meteor.initY = 3 * Math.random();
            }
        });

        meteor.tween.repeat(Infinity);

        return meteor;
    }

    function addHaloToStar(star) {

        var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.TextureLoader().load('../images/glow.png'),
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.25, 0.25, 1);
        star.add(sprite);
    }
};