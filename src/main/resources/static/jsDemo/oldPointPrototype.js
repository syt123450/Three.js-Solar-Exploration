/**
 * Created by ss on 2017/9/30.
 */

PointController = function (renderer) {

    //base on latitude and longitude, you can call my addPoint function to add a point to the earth
    var latitude = 37.3382, longitude = 121.8863;
    //you can change this parameter to let the point above the earth surface
    var radius = 0.5;

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var point = initPoint();

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;
    this.removePoint = remove;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        rotateEarth();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        earthMesh.add(point);

        var scene = new THREE.Scene();
        scene.add(light);
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

    function initPoint() {

        var point = new THREE.Mesh();
        point.geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
        point.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        setPointPosition(point);

        return point;
    }

    //you can use my setPointPosition function to add a cube to earth, as we need to add a flag to the earth, I will change the function latter
    function setPointPosition(point) {

        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = -((radius) * Math.sin(phi) * Math.sin(theta));

        point.position.x = pointX;
        point.position.y = pointY;
        point.position.z = pointZ;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.001;
        atmosphereMesh.rotation.y += 0.001;
    }

    function remove() {
        earthMesh.remove(point);
    }
};