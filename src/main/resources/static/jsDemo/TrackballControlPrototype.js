/**
 * Created by ss on 2017/9/25.
 */

TrackController = function (renderer) {

    var camera = initCamera();
    var controls = initTrackballControls();
    var cube = initCube();
    var renderer = renderer;
    //get domElement from renderer
    var domElement = renderer.domElement;
    var scene = init();

    this.animate = animateControls;

    function animateControls () {

        requestAnimationFrame(animateControls);
        //set update
        controls.update();
        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(camera);
        scene.add(cube);

        return scene;
    }

    function initCamera() {

        var aspect = window.innerWidth / window.innerHeight;
        var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.z = 3;

        return camera;
    }

    function initTrackballControls() {

        //create controls object
        //also need to set some parameter in the library, see TrackballControl.js file
        var controls = new THREE.TrackballControls(camera, domElement);
        controls.minDistance = 2;
        controls.maxDistance = 3;

        return controls;
    }

    function initCube() {

        var cube = new THREE.Mesh();
        cube.geometry = new THREE.BoxGeometry(1, 1, 1);
        cube.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/crate.jpg')
        });

        return cube;
    }
};