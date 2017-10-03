/**
 * 10/1/2017
 * Bo
 */


/**************************************************
 * This demo is to show how to use lighting to create
 * to give the earth a more stereoscopic feeling
 *
 * Note:
 * 1. Use two DirecrtionalLight sources
 * 2. Cast light from the x-y plane
 * 3. earthMesh
 *      specular: grey -> 0x444444
 *
 * @param renderer
 * @constructor
 **************************************************/
LightingController = function (renderer) {

    var universeUtils = new UniverseUtils();

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, -1);
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight2.position.set(-4, -4, -3);

    var camera = universeUtils.createDefaultCamera();

    var universeMesh = universeUtils.createDefaultUniverse();

    universeUtils.createDefaultEarthMesh = function() {
        var earthMesh = new THREE.Mesh();
        earthMesh.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        earthMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/elev_bump_4k.jpg'
            ),
            specular: new THREE.Color(0x555555),
            specularMap: new THREE.TextureLoader().load(
                '../images/water_4k.png'
            )
        });

        return earthMesh;
    };
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var earthRenderer = renderer;
    var earthScene = init();

    //the animate function is called by the outer js code, in this demo, I use index.js to call as an example
    this.animate = earthAnimate;
    this.render = render;

    function render() {
        earthRenderer.render(earthScene, camera);
    }

    function earthAnimate() {
        requestAnimationFrame(earthAnimate);
        render();
    }

    //The init function is used to put object into the scene
    function init() {

        var scene = new THREE.Scene();
        scene.add(directionalLight);
        scene.add(directionalLight2);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());
        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }
};