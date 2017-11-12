/**
 * Created by ss on 2017/9/30.
 */

UniverseUtils = function () {

    var coneRadius = 0.54;
    var coneInitSize = 0.02;
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
        aggregation.mesh = createDefaultSun();
        aggregation.add(aggregation.mesh);

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

        meteors.createSweepTween = function() {

            var meteors = this;

            var sweepTween = new TWEEN.Tween({x: 0})
                .to({x: 1}, 6000);

            sweepTween.onUpdate(function() {

                meteors.forEach(function(meteor) {
                    meteor.position.x -= 0.01;
                    meteor.position.y -= 0.01;
                    if (meteor.position.x <= -4 || meteor.position.y <= -4) {
                        meteor.position.x = 3 * Math.random();
                        meteor.position.y = 3 * Math.random();
                    }
                });
            });

            sweepTween.repeat(Infinity);

            return sweepTween;
        };

        meteors.name = 'meteors';
        return meteors;
    };

    this.createDefaultStars = function () {

        var stars = [];
        for (var i = 0; i < starPositions.length; i++) {
            stars[i] = createOneStar();
            stars[i].position.set(starPositions[i][0], starPositions[i][1], starPositions[i][2]);
        }

        // stars.flashStars = function () {
        //
        //     this.forEach(function (star) {
        //         star.count += Math.random() > 0.5 ? 2 : 3;
        //         if (star.count > 30) {
        //             star.material.color.set(Math.round(Math.random() * 256) * 0x010101);
        //             star.count = 0;
        //         }
        //     });
        // };

        stars.createFlashTween = function () {

            var stars = this;

            var flashTween = new TWEEN.Tween({x: 0})
                .to({x: 1}, 6000);

            flashTween.onUpdate(function() {

                stars.forEach(function(star) {
                    star.count += Math.random() > 0.5 ? 2 : 3;
                    if (star.count > 30) {
                        star.material.color.set(Math.round(Math.random() * 256) * 0x010101);
                        star.count = 0;
                    }
                });
            });

            flashTween.repeat(Infinity);

            return flashTween;
        };

        return stars;
    };

    this.createOneCone = function (coneParameters) {

        // var texture = new THREE.TextureLoader().load('../images/fadeTest2.jpg');
        // texture.flipY = false; //Need to do this to flip texture upside down
        //
        // var coneSide = new THREE.MeshPhongMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide
        // });
        // var green = new THREE.MeshPhongMaterial({color: 0Xff8533});
        // var materialsArray = [];
        // materialsArray.push(coneSide);
        // materialsArray.push(coneSide);
        // materialsArray.push(green);
        //
        // var coneMesh = new THREE.Mesh(
        //     new THREE.ConeGeometry(coneInitSize, 3 * coneInitSize, 3 * coneInitSize, 360 * coneInitSize),
        //     materialsArray
        // );
        //
        // var position = calculatePosition(coneParameters.latitude, coneParameters.longitude);
        // coneMesh.position.set(position.x, position.y, position.z);
        // coneMesh.parameters = coneParameters;
        //
        // coneMesh.rotate = function () {
        //     this.rotateY(0.05);
        // };
        //
        // coneMesh.scaleSize = 1.2;
        // // coneMesh.translateY(0.03);
        //
        // coneMesh.basicPos = [coneMesh.position.x, coneMesh.position.y, coneMesh.position.z];
        //
        // coneMesh.isGrow = true;
        // coneMesh.initSize = coneInitSize;
        // coneMesh.grow = function () {
        //     if (this.scale.x > this.scaleSize) {
        //         this.isGrow = false;
        //     }
        //     if (this.scale.x < 1) {
        //         this.isGrow = true;
        //     }
        //     if (this.isGrow) {
        //         this.scale.x += 0.005;
        //         this.scale.y += 0.005;
        //         this.scale.z += 0.005;
        //         // this.translateY(-this.initSize / 20 / Math.pow(this.scaleSize / 1.2, 3));
        //     } else {
        //         this.scale.x -= 0.005;
        //         this.scale.y -= 0.005;
        //         this.scale.z -= 0.005;
        //         // this.translateY(this.initSize / 20 / Math.pow(this.scaleSize / 1.2, 3));
        //     }
        // };
        //
        // coneMesh.setConeInitPos = function() {
        //     this.position.x = this.basicPos[0];
        //     this.position.y = this.basicPos[1];
        //     this.position.z = this.basicPos[2];
        // };

        var texture = new THREE.TextureLoader().load('../images/fadeTest2.jpg');
        texture.flipY = false;

        var coneSide = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        var green = new THREE.MeshPhongMaterial({color: 0Xff8533});
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
        coneMesh.scaleSize = 1.2;
        coneMesh.basicPos = [coneMesh.position.x, coneMesh.position.y, coneMesh.position.z];
        coneMesh.initSize = coneInitSize;

        coneMesh.setConeInitPos = function() {
            this.position.x = this.basicPos[0];
            this.position.y = this.basicPos[1];
            this.position.z = this.basicPos[2];
        };

        return coneMesh;
    };

    this.createSolarUniverse = function () {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(3, 128, 128);
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

    this.loadAudio = function (audioSource) {

        var sound = new THREE.Audio(SolarEPUtils.listener);
        sound.setLoop(true);
        var loader = new THREE.AudioLoader();

        loader.load(
            audioSource,
            function (audioBuffer) {
                sound.setBuffer(audioBuffer);
            }
        );

        return sound;
    };

    this.loadSolarAudio = function(audioSource) {

        var sound = new THREE.Audio(SolarEPUtils.listener);
        sound.setLoop(true);
        var loader = new THREE.AudioLoader();

        loader.load(
            audioSource,
            function (audioBuffer) {
                sound.setBuffer(audioBuffer);
                sound.play();
            }
        );

        return sound;
    };

    function createDefaultSun() {
        // return new THREE.Mesh(
        //     new THREE.SphereGeometry(SolarConfig.sunRadius, 32, 32),
        //     new THREE.MeshBasicMaterial({
        //         color: 'yellow'
        //     }));

        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(SolarConfig['sun'].radius, 64, 64);
        sphereMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(SolarConfig['sun'].map)
        });
        sphereMesh.castShadow = false;       //default is false
        sphereMesh.receiveShadow = false;    //default is false
        return sphereMesh;
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
        sphereMesh.geometry = new THREE.SphereGeometry(planetParameters.radius, 64, 64);
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
        sphereMesh.geometry = new THREE.SphereGeometry(planetParameters.radius, 64, 64);
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
        var points = [];
        // var material = new THREE.PointCloudMaterial({
        //     color: SolarConfig["asteroidBelt"].color,
        //     size: SolarConfig["asteroidBelt"].size
        // });

        var material = new THREE.PointsMaterial({
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
            points[j] = new THREE.Points(geometry, material);
        }

        return points;
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

        var star = new THREE.Sprite();

        star.material = new THREE.SpriteMaterial({
            color: 0xffffff,
            opacity: 0.9,
            transparent: true,
            map: new THREE.TextureLoader().load('../images/glow.png')
        });

        star.scale.set(0.15, 0.15, 0.0001);
        star.count = 0;

        return star;
    }

    function createOneMeteor() {

        var meteor = new THREE.Mesh();

        meteor.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.001);
        meteor.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/meteor.png'),
            opacity: 0.9,
            transparent: true
        });

        meteor.position.x -= 3 * Math.random();
        meteor.position.y -= 3 * Math.random();
        meteor.position.z = -3;

        return meteor;
    }

    // function addHaloToStar(star) {
    //
    //     var spriteMaterial = new THREE.SpriteMaterial(
    //         {
    //             map: new THREE.TextureLoader().load('../images/glow.png'),
    //             color: 0xffffff,
    //             transparent: true,
    //             opacity: 0.5
    //         });
    //     var sprite = new THREE.Sprite(spriteMaterial);
    //     sprite.scale.set(0.25, 0.25, 1);
    //     star.add(sprite);
    // }
};