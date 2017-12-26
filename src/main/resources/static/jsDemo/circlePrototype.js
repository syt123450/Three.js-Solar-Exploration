
CircleController = function(renderer){

    var sunAggregation = createAggregation(
        new THREE.Mesh(
            new THREE.SphereGeometry(4, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 'yellow'
            }))
    );

    var circle = createOrbit(8);
    var universeMesh = createUniverseMesh();

    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1.2, 0);
    var camera = universeUtils.createDefaultCamera();

    var circleRenderer = renderer;
    var circleScene = init();

    this.animate = circleAnimate;

    function circleAnimate() {
        requestAnimationFrame(circleAnimate);

        circleRenderer.render(circleScene, camera);
    }

    function init() {
        var scene = new THREE.Scene();

        // Lights
        scene.add(new THREE.AmbientLight(0x222222));
        scene.add(light);
        light.position.set(0, 0, 0);

        // Camera
        scene.add(camera);
        camera.position.set(0, 30, 30);
        camera.lookAt(sunAggregation.position);

        // Background
        scene.add(universeMesh);

        // Apply the Sun
        // initSystemPositions();
        // sunAggregation.add(circle);
        scene.add(sunAggregation);

        return scene;
    }

    function createAggregation(sphereMesh) {
        var aggregation = new THREE.Object3D();
        aggregation.add(sphereMesh);
        aggregation.add(createOrbit(8));

        return aggregation;
    }

    function createOrbit(radius){
        var geometry = new THREE.CircleGeometry( radius, 64, 0, 2.1*Math.PI ) ;
        geometry.vertices.shift();
        var orbit = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial( { color: 0xddddff } )
        );
        return orbit;
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

}