PinController = function (renderer) {
    //-24.716882, 128.226551
    var latitude = 24.716882, longitude = 128.226551;  //TODO change latitude = 37.3382
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
            new THREE.CubeGeometry( 0.01, 0.01, 0.13, 12 ),
            new THREE.MeshBasicMaterial ({wireframe: true})
            // new THREE.MeshPhongMaterial( { color: 0x085093 } )
        );

        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.lookAt(earthMesh.position);
        // if (latitude === 0){
        //     coneMesh.rotation.x = ((latitude + 90) * Math.PI / 180);
        // }else if (latitude > 0){
        //     coneMesh.rotation.x = ((latitude) * Math.PI / 180);
        // }else if (latitude < 0){
        //     coneMesh.rotation.x = ((latitude + 135) * Math.PI / 180);
        // }
        // coneMesh.rotation.z = (Math.PI * 23.5 / 180);



        //
        //
        // mesh = new THREE.Mesh(new THREE.SphereGeometry(200, 40, 30), new THREE.MeshBasicMaterial);
        // mesh.scale.set( 1.1, 1.1, 1.1 );
        //
        // coneMesh.lookAt(mesh.position);

        // coneMesh.rotation.z = (Math.PI / 2);
        // coneMesh.rotation.z = 1.57/2;
        // coneMesh.rotation.x = -latitude/Math.PI;
        // coneMesh.rotation.z = (Math.PI * 23.5 / 180);
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

        flagMesh.position.set(flagPosition.x, flagPosition.y, flagPosition.z);

        return flagMesh;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.005; //TODO: changeback to 0.003
        atmosphereMesh.rotation.y += 0.005;
    }

    function rotateCone() {

        // cone.rotation.y += 0.05;
        // console.log(cone.rotation.x);
    }
};
