/**
 * Created by ss on 2017/9/30.
 */

var UniverseUtils = (function () {

    var coneRadius = 0.55;
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

    function createSolarAggregation() {
        var aggregation = new THREE.Object3D();
        aggregation.mesh = createDefaultSun();
        aggregation.add(aggregation.mesh);

        return aggregation;
    }

    function createDefaultUniverse() {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(90, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });
        universeMesh.name = 'universeMesh';
        return universeMesh;
    }

    function createDefaultCamera() {

        var camera = new THREE.PerspectiveCamera();
        camera.fov = 45;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1500;
        camera.position.set(0, 0, 1.5);
        camera.updateProjectionMatrix();
        camera.name = 'defaultCamera';
        return camera;
    }

    function createDefaultEarthMesh() {

        var earthMesh = new THREE.Mesh();
        earthMesh.geometry = new THREE.SphereGeometry(0.5, 64, 64);
        earthMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/earth/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap: new THREE.TextureLoader().load(
                '../images/earth/earthbump1k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap: new THREE.TextureLoader().load(
                '../images/earth/water_4k.png'
            )
        });
        earthMesh.name = 'defaultEarthMesh';

        return earthMesh;
    }

    function createDefaultAtmosphere() {

        var atmosphereMesh = new THREE.Mesh();
        atmosphereMesh.geometry = new THREE.SphereGeometry(0.51, 64, 64);
        atmosphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/earth/fair_clouds_4k.png'
            ),
            transparent: true
        });
        atmosphereMesh.name = 'atmosphereMesh';

        return atmosphereMesh;
    }

    function createDefaultMoon() {

        var moonMesh = new THREE.Mesh();
        moonMesh.geometry = new THREE.SphereGeometry(0.05, 64, 64);
        moonMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/earth/moonmap2k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/earth/elev_bump_4k.jpg'
            )
        });
        moonMesh.name = 'moonMesh';

        return moonMesh;
    }

    function createDefaultMeteors() {

        var meteors = [];
        meteors[0] = createOneMeteor();
        meteors[1] = createOneMeteor();

        meteors.createSweepTween = function () {
            return TweenUtils.createMeteorsSweepTween(this);
        };

        meteors.name = 'meteors';

        return meteors;
    }

    function createDefaultStars() {

        var stars = [];
        for (var i = 0; i < starPositions.length; i++) {
            stars[i] = createOneStar();
            stars[i].position.set(starPositions[i][0], starPositions[i][1], starPositions[i][2]);
        }

        stars.createFlashTween = function () {
            return TweenUtils.createStarFlashingTween(this);
        };

        return stars;
    }

    function createOneCone(coneParameters) {

        var texture = new THREE.TextureLoader().load('../images/earth/coneFadeTexture.jpg');
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

        coneMesh.setConeInitPos = function () {
            this.position.x = this.basicPos[0];
            this.position.y = this.basicPos[1];
            this.position.z = this.basicPos[2];
        };

        return coneMesh;
    }

    function createSolarUniverse() {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(3, 128, 128);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy/solar_background.jpg'
            ),
            side: THREE.BackSide
        });

        return universeMesh;
    }

    function createPlanetsList() {

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

        // Add ring to Saturn and Uranus
        planetsList["saturn"].mesh.ring = createRing(SolarConfig.saturn);
        planetsList["saturn"].mesh.add(planetsList["saturn"].mesh.ring);
        planetsList["uranus"].mesh.ring = createRing(SolarConfig.uranus);
        planetsList["uranus"].mesh.add(planetsList["uranus"].mesh.ring);

        for (var planet in planetsList) {
            planetsList[planet].orbit = createOrbit(SolarConfig[planet].orbitRadius);
            planetsList[planet].mesh.position.z = SolarConfig[planet].orbitRadius;
            planetsList[planet].mesh.rotateZ(SolarConfig[planet].inclination * Math.PI / 180);
        }

        return planetsList;
    }

    function addDoubleHalos(target, innerColor, outerColor) {

        var _innerGlowMesh;
        var INNER_GLOW_MESH_COLOR = innerColor;
        var INNER_GLOW_MESH_OPACITY = 0.2;
        var INNER_GLOW_MESH_RADIUS = target.children[0].geometry.parameters.radius * 1.008;
        var innerFragmentShaderIntensity = 'float intensity = pow( 0.45 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 10.0 );';

        var _outerGlowMesh;
        var OUTER_GLOW_MESH_COLOR = outerColor;
        var OUTER_GLOW_MESH_OPACITY = 0.2;
        var OUTER_GLOW_MESH_RADIUS = target.children[0].geometry.parameters.radius * 1.008;
        var outerFragmentShaderIntensity = 'float intensity = pow( 0.3 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 1.2 );';

        _init();

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

    }

    function loadAudio(audioSource) {

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
    }

    function loadSolarAudio(audioSource) {

        var sound = new THREE.Audio(SolarEPUtils.listener);
        sound.setLoop(true);
        var loader = new THREE.AudioLoader();

        loader.load(
            audioSource,
            function (audioBuffer) {
                sound.setBuffer(audioBuffer);
                var magnifyVolumeTween = TweenUtils.createMagnifyVolumeTween(sound);
                magnifyVolumeTween.start();
            }
        );

        return sound;
    }

    function createDefaultSun() {

        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(SolarConfig['sun'].radius, 64, 64);
        sphereMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(SolarConfig['sun'].map)
        });
        sphereMesh.castShadow = false;
        sphereMesh.receiveShadow = false;
        return sphereMesh;
    }

    function createPlanetMesh(planetParameters) {
        if (planetParameters.bumpMap) {
            return createTerrestrialPlanet(planetParameters);
        } else {
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
        sphereMesh.castShadow = true;
        sphereMesh.receiveShadow = true;

        return sphereMesh;
    }

    function createJovianPlanet(planetParameters) {
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(planetParameters.radius, 64, 64);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(planetParameters.map)
        });
        sphereMesh.castShadow = true;
        sphereMesh.receiveShadow = true;

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
        ringMesh.castShadow = true;
        ringMesh.receiveShadow = true;
        ringMesh.rotateX(0.5 * Math.PI);

        return ringMesh;
    }

    function createAsteroidBelt() {
        var points = [];

        var material = new THREE.PointsMaterial({
            color: SolarConfig["asteroidBelt"].color,
            size: SolarConfig["asteroidBelt"].size
        });

        var i, j, r, theta, x, y, z;
        for (j = 0; j < SolarConfig["asteroidBelt"].cloudNumber; j++) {
            var geometry = new THREE.Geometry();
            for (i = 0; i < SolarConfig["asteroidBelt"].cloudSize; i++) {
                r = SolarConfig["asteroidBelt"].orbitRadius + (Math.random() * SolarConfig["asteroidBelt"].orbitRadiusWidth);
                theta = (Math.random() * 2 * Math.PI);
                x = Math.cos(theta) * r;
                y = ( -1 * Math.random() + 0.5) * SolarConfig["asteroidBelt"].orbitRadiusThickness;
                z = Math.sin(theta) * r;

                geometry.vertices.push(new THREE.Vector3(x, y, z));
            }
            points[j] = new THREE.Points(geometry, material);
        }

        return points;
    }

    function createSolarLights(solarAggregation) {
        // Lights
        var lights = [];

        // lights for university environment
        lights[0] = new THREE.PointLight(0xffffff, 0.9, 0);
        lights[0].position.set(0, 0, 0);
        lights[1] = new THREE.AmbientLight(0xf7f7f7, 0.45);

        // lights for lightening the sun
        var density = 1;
        lights[2] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 1);
        lights[2].position.set(0, (SolarConfig.sunRadius * Math.sqrt(2)), 0);
        lights[2].target = solarAggregation;
        lights[3] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 1);
        lights[3].position.set(0, -(SolarConfig.sunRadius * Math.sqrt(2)), 0);
        lights[3].target = solarAggregation;
        lights[4] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 0);
        lights[4].position.set(0, 0, (SolarConfig.sunRadius * Math.sqrt(2)));
        lights[4].target = solarAggregation;
        lights[5] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 0);
        lights[5].position.set(0, 0, -(SolarConfig.sunRadius * Math.sqrt(2)));
        lights[5].target = solarAggregation;
        lights[6] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 0);
        lights[6].position.set((SolarConfig.sunRadius * Math.sqrt(2)), 0, 0);
        lights[6].target = solarAggregation;
        lights[7] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI / 2, 0);
        lights[7].position.set(-(SolarConfig.sunRadius * Math.sqrt(2)), 0, 0);
        lights[7].target = solarAggregation;

        return lights;
    }

    function createPlanetLights(planetAggregation) {

        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xf3f3f3, 0x1e1e1e, 0.75);

        lights[1] = new THREE.DirectionalLight(0xf7f7f7, 0.6);
        lights[1].position.set(30, 12, 3);
        lights[1].target = planetAggregation;
        lights[1].castShadow = true;

        return lights;
    }

    function createEarthLights() {
        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xffffff, 0x000000, 1.3);
        lights[1] = new THREE.DirectionalLight(0xf9f9f9, 0.45);
        lights[1].position.set(-25, 12, -2);
        lights[1].castShadow = true;

        return lights;
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
            map: new THREE.TextureLoader().load('../images/galaxy/glow.png')
        });

        star.scale.set(0.15, 0.15, 0.0001);
        star.count = 0;

        return star;
    }

    function createOneMeteor() {

        var meteor = new THREE.Mesh();

        meteor.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.001);
        meteor.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/galaxy/meteor.png'),
            opacity: 0.9,
            transparent: true
        });

        meteor.position.x -= 3 * Math.random();
        meteor.position.y -= 3 * Math.random();
        meteor.position.z = -3;

        return meteor;
    }

    this.createSolarAggregation = createSolarAggregation;
    this.createDefaultUniverse = createDefaultUniverse;
    this.createDefaultCamera = createDefaultCamera;
    this.createDefaultEarthMesh = createDefaultEarthMesh;
    this.createDefaultAtmosphere = createDefaultAtmosphere;
    this.createDefaultMoon = createDefaultMoon;
    this.createDefaultMeteors = createDefaultMeteors;
    this.createDefaultStars = createDefaultStars;
    this.createOneCone = createOneCone;
    this.createSolarUniverse = createSolarUniverse;
    this.createPlanetsList = createPlanetsList;
    this.createPlanetMesh = createPlanetMesh;
    this.createTerrestrialPlanet = createTerrestrialPlanet;
    this.createJovianPlanet = createJovianPlanet;
    this.createRing = createRing;
    this.createAsteroidBelt = createAsteroidBelt;
    this.addDoubleHalos = addDoubleHalos;
    this.loadAudio = loadAudio;
    this.loadSolarAudio = loadSolarAudio;

    //interface for create lights in scenes
    this.createSolarLights = createSolarLights;
    this.createPlanetLights = createPlanetLights;
    this.createEarthLights = createEarthLights;

    return this;
})();