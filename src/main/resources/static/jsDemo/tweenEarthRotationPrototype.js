/**
 * Created by ss on 2017/10/31.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        TWEEN.update();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());
        initEarthTween();
        initAtmosphereTween();

        return scene;
    }

    var rotateTween;

    function initEarthTween() {

        rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function() {

            earthMesh.rotation.y += 0.001;
        });

        rotateTween.repeat(Infinity);
        rotateTween.start();
    }

    function initAtmosphereTween() {
        rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function() {

            atmosphereMesh.rotation.y += 0.0013;
        });

        rotateTween.repeat(Infinity);
        rotateTween.start();
    }


    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }
};