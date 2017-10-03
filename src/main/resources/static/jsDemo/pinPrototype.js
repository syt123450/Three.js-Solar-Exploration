// /**
//  * Created by ss on 2017/9/27.
//  */
//
// var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
//
// var aspect = window.innerWidth / window.innerHeight;
// var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
// camera.position.set(0, 0, 1.5);
//
// var scene = new THREE.Scene();
// scene.add(new THREE.AmbientLight(0xffffff));
//
// var textureLoader = new THREE.TextureLoader();
//
// var earthMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshPhongMaterial({
//             map: textureLoader.load(
//                 '../images/2_no_clouds_4k.jpg'
//             ),
//             bumpScale: 0.05,
//             bumpMap: textureLoader.load(
//                 '../images/earthbump1k.jpg'
//             ),
//             specular: new THREE.Color('grey'),
//             specularMap: textureLoader.load(
//                 '../images/water_4k.png'
//             )
//         }
//     )
// );
//
// var atmosphereMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(0.504, 32, 32),
//     new THREE.MeshPhongMaterial({
//             map: textureLoader.load(
//                 '../images/fair_clouds_4k.png'
//             ),
//             transparent: true
//         }
//     )
// );
//
// var starMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(90, 64, 64),
//     new THREE.MeshBasicMaterial({
//             map: textureLoader.load(
//                 '../images/galaxy_starfield.png'
//             ),
//             side: THREE.BackSide
//         }
//     )
// );
//
// var coneMesh = new THREE.Mesh(
//     new THREE.CylinderGeometry( 0.03, 0, 0.09, 0.12, 0.03 ),
//     // new THREE.MeshBasicMaterial ({wireframe: true})
//     new THREE.MeshPhongMaterial( { color: 0x085093 } )
// );
//
// var flagMesh = new THREE.Mesh(
//     new THREE.BoxGeometry( 0.12, 0.052, 0.012 ),
//     new THREE.MeshBasicMaterial({
//             map: textureLoader.load(
//                 '../images/californiaFlag.png'
//             ),
//             side: THREE.BackSide
//         }
//     )
// );
//
// //you can use my addPoint function to add a cube to earth, as we need to add a flag to the earth, I will change the function latter
// var addPoint = function(Latitude, Longitude, Radius, earthMesh, object) {
//     var phi = (90 - Latitude) * (Math.PI / 180);
//     var theta = (Longitude + 180) * (Math.PI / 180);
//
//     var pointX = -((Radius) * Math.sin(phi) * Math.cos(theta));
//     var pointY = ((Radius) * Math.cos(phi));
//     var pointZ = ((Radius) * Math.sin(phi) * Math.sin(theta));
//
//     // cube = object;
//     earthMesh.add(object);
//     object.position.x = pointX;
//     object.position.y = pointY;
//     object.position.z = pointZ;
//     object.rotation.x = phi;
//
//     return object;
// };
//
// var addFlag = function(Latitude, Longitude, Radius, earthMesh, object) {
//     var phi = (90 - Latitude) * (Math.PI / 180);
//     var theta = (Longitude + 180) * (Math.PI / 180);
//
//     var pointX = -((Radius) * Math.sin(phi) * Math.cos(theta));
//     var pointY = ((Radius) * Math.cos(phi));
//     var pointZ = ((Radius) * Math.sin(phi) * Math.sin(theta));
//
//     // cube = object;
//     earthMesh.add(object);
//     object.position.x = pointX+0.02;
//     object.position.y = pointY+0.04;
//     object.position.z = pointZ+0.13;
//     object.rotation.x = phi;
//
//     return object;
// };
//
// //base on latitude and longitude, you can call my addPoint function to add a point to the earth
// var latitude = 37.3382;
// var longitude = -121.8863;
// var radius = 0.55;
// var cubeObject = addPoint(latitude, longitude, radius, earthMesh, coneMesh);
// // new addPoint(latitude, longitude, radius, earthMesh, coneMesh);
// addFlag(latitude, longitude, radius, earthMesh, flagMesh);
// // var coneObject = addPoint(latitude, longitude, radius, earthMesh);
//
//
// //this is the demo how to remove the point from the earth, in this demo, the point will be removed in 5 seconds
// // setTimeout(function () {
// //     earthMesh.remove(cubeObject);
// // }, 5000);
//
// var aggregation = new THREE.Object3D();
// aggregation.add(earthMesh);
// aggregation.add(atmosphereMesh);
// aggregation.rotateZ(-Math.PI * 23.5 / 180);
//
// scene.add(aggregation);
// scene.add(starMesh);
// // scene.add(coneMesh);
// // coneMesh.translateZ(1);
//
//
//
// var animate = function () {
//
//     requestAnimationFrame(animate);
//     earthMesh.rotation.y += 0.007;
//     atmosphereMesh.rotation.y += 0.007;
//
//     coneMesh.rotation.y += 0.05;
//
//     renderer.render(scene, camera);
//
// };
//
// animate();

PinController = function (renderer) {

    var latitude = 37.3382, longitude = -121.8863;
    var radius = 0.55;
    var position = initPosition(latitude, longitude);

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var cone = initCone();
    var flag = initFlag();

    var pinRenderer = renderer;
    var pinScene = init();

    this.animate = pinAnimate;

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);
        rotateEarth();
        rotateCone();
        pinRenderer.render(pinScene, camera);
    }

    function init() {

        earthMesh.add(cone);
        earthMesh.add(flag);

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

    function initPosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = ((radius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        console.log(position);

        return position;
    }

    function initCone() {

        var coneMesh = new THREE.Mesh(
            new THREE.CylinderGeometry( 0.03, 0, 0.09, 0.12, 0.03 ),
            // new THREE.MeshBasicMaterial ({wireframe: true})
            new THREE.MeshPhongMaterial( { color: 0x085093 } )
        );

        // coneMesh.position.set(position);

        coneMesh.position.x = position.x;
        coneMesh.position.y = position.y;
        coneMesh.position.z = position.z;

        return coneMesh;
    }

    function initFlag() {

        var flagMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 0.12, 0.052, 0.012 ),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(
                        '../images/californiaFlag.png'
                    ),
                    side: THREE.BackSide
                }
            )
        );

        var flagPosition = new THREE.Vector3();
        flagPosition.x = position.x + 0.02;
        flagPosition.y = position.y + 0.04;
        flagPosition.z = position.z + 0.14;

        flagMesh.position.set(flagPosition);

        return flagMesh;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateCone() {

        cone.rotation.y += 0.05;
    }
};
