/**
 * Created by ss on 2017/9/25.
 */

CameraSceneController = function (renderer) {

    var cube = initCube();
    var camera = initCamera();
    var renderer = renderer;
    var scene = init();

    this.animate = cameraAnimate;

    function init() {

        var scene = new THREE.Scene();
        scene.add(camera);
        scene.add(cube);

        return scene;
    }

    function cameraAnimate() {

        requestAnimationFrame(cameraAnimate);
        rotateCamera();
        renderer.render(scene, camera);
    }

    function initCamera() {

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        //set y position
        camera.position.y = 4;

        return camera;
    }

    function initCube() {

        var cube = new THREE.Mesh();
        cube.geometry = new THREE.BoxGeometry(1, 1, 1);
        cube.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/crate.jpg')
        });

        return cube;
    }

    //顺时针旋转
    function rotateCamera() {

        var timer = Date.now() * 0.0001;
        //set x and z position to let earthSceneCamera to rotate around the cube
        camera.position.x = Math.cos(timer) * 8;
        camera.position.z = Math.sin(timer) * 8;

        //let earthSceneCamera to look at earthSceneCamera while it is rotating around the cube
        camera.lookAt(scene.position);
    }
};