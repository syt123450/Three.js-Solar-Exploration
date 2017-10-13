/**
 * Created by ss on 2017/10/6.
 */

PinController = function (renderer) {

    var radius = 0.55;

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var pinRenderer = renderer;
    var pinScene = init();
    //parameter to hold all cone object
    var coneList = [];

    this.animate = pinAnimate;

    //API to set a several cones to the earth
    this.addCones = function (cones) {
        cones.forEach(function (cone) {
            addOneCone(cone);
        });
    };

    //API to remove all cones on earth
    this.clearCones = function () {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    };

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);
        rotateEarth();
        rotateCones();
        pinRenderer.render(pinScene, camera);
    }

    //add a new cone, remember that a cone need to be add to earthMesh and coneList both
    function addOneCone(cone) {
        var coneObject = initOneCone(cone);
        coneList[coneList.length] = coneObject;
        earthMesh.add(coneObject);
    }

    function init() {

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

    function initOneCone(coneParameters) {

        var position = calculatePosition(coneParameters[0], coneParameters[1]);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.03, 0.1, 0.09, 12),
            new THREE.MeshPhongMaterial({color: 0x085093})
        );

        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.lookAt(earthMesh.position);

        coneMesh.rotateX(Math.PI / 2);

        return coneMesh;
    }

    function calculatePosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = ((radius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    //function to control rotation of all cones on the earth
    function rotateCones() {

        coneList.forEach(function (cone) {
            cone.rotateY(0.05);
        });
    }
};
