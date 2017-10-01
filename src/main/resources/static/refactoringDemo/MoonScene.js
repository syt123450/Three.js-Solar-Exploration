/**
 * Created by ss on 2017/10/1.
 */

MoonSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    //call the init function here
    var moonMesh = initMoon();
    var moonRenderer = renderer;
    var moonScene = init();

    this.animate = animateMoon;

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(moonMesh);

        return scene;
    }

    //if universeUtils.js do not support creating the object you want, you can use your own init function to init the object
    function initMoon() {

        var moon = new THREE.Mesh();
        moon.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        moon.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/moonmap2k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/elev_bump_4k.jpg'
            )
        });

        //return an initialized object
        return moon;
    }

    function animateMoon() {

        requestAnimationFrame(animateMoon);
        rotateMoon();
        moonRenderer.render(moonScene, camera);
    }

    function rotateMoon() {

        moonMesh.rotation.y += 0.001;
    }
};