
SolarSystemSceneController = function(renderer) {
    var sunRadius = 50,

        mercuryOrbitRadius = sunRadius +20,
        mercuryOrbitAngle = 0,
        mercuryOrbitSpeed = - 3,

        venusOrbitRadius = sunRadius +45,
        venusOrbitAngle = 0,
        venusOrbitSpeed = - 1.9,

        earthOrbitRadius = sunRadius +75,
        earthOrbitAngle = 0,
        earthOrbitSpeed = - 1,

        marsOrbitRadius = sunRadius +110,
        marsOrbitAngle = 0,
        marsOrbitSpeed = - 0.5,

        jupiterOrbitRadius = sunRadius +160,
        jupiterOrbitAngle = 0,
        jupiterOrbitSpeed = - 0.3,

        saturnOrbitRadius = sunRadius +210,
        saturnOrbitAngle = 0,
        saturnOrbitSpeed = - 0.17,

        uranusOrbitRadius = sunRadius +255,
        uranusOrbitAngle = 0,
        uranusOrbitSpeed = - 0.12,

        neptuneOrbitRadius = sunRadius +300,
        neptuneOrbitAngle = 0,
        neptuneOrbitSpeed = - 0.08,

        plutoOrbitRadius = sunRadius +335,
        plutoOrbitAngle = 0,
        plutoOrbitSpeed = - 0.04;

    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1, 0);
    var camera = universeUtils.createDefaultCamera();

    var universeMesh = createUniverseMesh();

    var sunAggregation = createAggregation(
        new THREE.Mesh(
        new THREE.SphereGeometry(sunRadius, 32, 32),
        new THREE.MeshBasicMaterial({
            color: 'yellow'
        }))
    );

    var mercuryAggregation = createAggregation(
        createBumpSphereMesh('../images/planets/mercurymap.jpg', '../images/planets/mercurybump.jpg', 5)
    );
    var venusAggregation = createAggregation(
        createBumpSphereMesh('../images/planets/venusmap.jpg', '../images/planets/venusbump.jpg', 8)
    );
    var earthAggregation = createAggregation(
        createBumpSphereMesh('../images/earthmap1k.jpg', '../images/earthbump1k.jpg', 9)
    );
    var marsAggregation = createAggregation(
        createBumpSphereMesh('../images/planets/marsmap1k.jpg', '../images/planets/marsbump1k.jpg', 5.5)
    );
    var jupiterAggregation = createAggregation(
        createSphereMesh('../images/planets/jupitermap.jpg' , 20)
    );
    var saturnAggregation = createAggregation(
        createSphereMesh('../images/planets/saturnmap.jpg' , 18)
    );
    var uranusAggregation = createAggregation(
        createSphereMesh('../images/planets/uranusmap.jpg' , 12)
    );
    var neptuneAggregation = createAggregation(
        createSphereMesh('../images/planets/neptunemap.jpg' , 12)
    );
    var plutoAggregation = createAggregation(
        createBumpSphereMesh('../images/planets/plutomap1k.jpg', '../images/planets/plutobump1k.jpg', 3)
    );

    var solarSystemRenderer = renderer;
    var solarSystemScene = init();

    this.animate = solarSystemAnimate;

    function solarSystemAnimate() {
        requestAnimationFrame(solarSystemAnimate);

        rotationAndRevolution();

        solarSystemRenderer.render(solarSystemScene, camera);
    }

    function init() {
        var scene = new THREE.Scene();

        // Lights
        scene.add(new THREE.AmbientLight(0x222222));
        scene.add(light);
        light.position.set(0, 0, 0);

        // Camera
        scene.add(camera);
        camera.position.set(0, 275, 700);
        camera.lookAt(sunAggregation.position);

        // Background
        scene.add(universeMesh);

        // Apply the Sun
        initSystemPositions();
        scene.add(sunAggregation);

        return scene;
    }

    function initSystemPositions() {
        sunAggregation.add(mercuryAggregation);
        sunAggregation.add(venusAggregation);
        sunAggregation.add(earthAggregation);
        sunAggregation.add(marsAggregation);
        sunAggregation.add(jupiterAggregation);
        sunAggregation.add(saturnAggregation);
        sunAggregation.add(uranusAggregation);
        sunAggregation.add(neptuneAggregation);
        sunAggregation.add(plutoAggregation);

        mercuryAggregation.position.x = (mercuryOrbitRadius);
        venusAggregation.position.x = (venusOrbitRadius);
        earthAggregation.position.x = (earthOrbitRadius);
        marsAggregation.position.x = (marsOrbitRadius);
        jupiterAggregation.position.x = (jupiterOrbitRadius);
        saturnAggregation.position.x = (saturnOrbitRadius);
        uranusAggregation.position.x = (uranusOrbitRadius);
        neptuneAggregation.position.x = (neptuneOrbitRadius);
        plutoAggregation.position.x = (plutoOrbitRadius);

    }

    function rotationAndRevolution() {
        var radians = 0;
        mercuryOrbitAngle += mercuryOrbitSpeed;
        venusOrbitAngle += venusOrbitSpeed;
        earthOrbitAngle += earthOrbitSpeed;
        marsOrbitAngle += marsOrbitSpeed;
        jupiterOrbitAngle += jupiterOrbitSpeed;
        saturnOrbitAngle += saturnOrbitSpeed;
        uranusOrbitAngle += uranusOrbitSpeed;
        neptuneOrbitAngle += neptuneOrbitSpeed;
        plutoOrbitAngle += plutoOrbitSpeed;

        radians = mercuryOrbitAngle * Math.PI / 180;
        mercuryAggregation.position.x = Math.cos(radians) * mercuryOrbitRadius;
        mercuryAggregation.position.z = Math.sin(radians) * mercuryOrbitRadius;

        radians = venusOrbitAngle * Math.PI / 180;
        venusAggregation.position.x = Math.cos(radians) * venusOrbitRadius;
        venusAggregation.position.z = Math.sin(radians) * venusOrbitRadius;

        radians = earthOrbitAngle * Math.PI / 180;
        earthAggregation.position.x = Math.cos(radians) * earthOrbitRadius;
        earthAggregation.position.z = Math.sin(radians) * earthOrbitRadius;

        radians = marsOrbitAngle * Math.PI / 180;
        marsAggregation.position.x = Math.cos(radians) * marsOrbitRadius;
        marsAggregation.position.z = Math.sin(radians) * marsOrbitRadius;

        radians = jupiterOrbitAngle * Math.PI / 180;
        jupiterAggregation.position.x = Math.cos(radians) * jupiterOrbitRadius;
        jupiterAggregation.position.z = Math.sin(radians) * jupiterOrbitRadius;

        radians = saturnOrbitAngle * Math.PI / 180;
        saturnAggregation.position.x = Math.cos(radians) * saturnOrbitRadius;
        saturnAggregation.position.z = Math.sin(radians) * saturnOrbitRadius;

        radians = uranusOrbitAngle * Math.PI / 180;
        uranusAggregation.position.x = Math.cos(radians) * uranusOrbitRadius;
        uranusAggregation.position.z = Math.sin(radians) * uranusOrbitRadius;

        radians = neptuneOrbitAngle * Math.PI / 180;
        neptuneAggregation.position.x = Math.cos(radians) * neptuneOrbitRadius;
        neptuneAggregation.position.z = Math.sin(radians) * neptuneOrbitRadius;

        radians = plutoOrbitAngle * Math.PI / 180;
        plutoAggregation.position.x = Math.cos(radians) * plutoOrbitRadius;
        plutoAggregation.position.z = Math.sin(radians) * plutoOrbitRadius;
    }

    function createUniverseMesh() {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(800, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });

        return universeMesh;
    }

    function createSphereMesh(path, radius) {
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(path)
        });

        return sphereMesh;
    }

    function createBumpSphereMesh(path, bumpPath, radius){
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(path),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(bumpPath)
        });

        return sphereMesh;
    }

    function createAggregation(sphereMesh) {
        var aggregation = new THREE.Object3D();
        aggregation.add(sphereMesh);
        aggregation.add(new THREE.AxisHelper(0.5));

        return aggregation;
    }

}