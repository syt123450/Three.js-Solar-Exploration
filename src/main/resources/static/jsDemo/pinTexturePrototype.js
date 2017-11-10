PinController = function (renderer) {
    var coneInitSize = 0.02;
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
    var grow = true; //Allow the cone to grow when loaded

    this.animate = pinAnimate;

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);
        rotateEarth();
        rotateCone();
        growPin();
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

        return position;
    }

    function initCone() {
        var texture = new THREE.TextureLoader().load('../images/fadeTest2.jpg');
        texture.flipY = false; //Need to do this to flip texture upside down
        var coneSide = new THREE.MeshPhongMaterial( { map: texture, side: THREE.DoubleSide } );
        var coneBottom = new THREE.MeshPhongMaterial( { color: 0Xff8533});
        var materialsArray = [];
        materialsArray.push(coneSide);
        materialsArray.push(coneSide);
        materialsArray.push(coneBottom);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry( coneInitSize, 3 * coneInitSize, 3 * coneInitSize, 360 * coneInitSize ),
            materialsArray
        );

        console.log(materialsArray);
        console.log(coneMesh);


        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.lookAt(earthMesh.position);

        coneMesh.rotateX(Math.PI / 2);

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

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateCone() {

        cone.rotateY(0.05);
    }

    function growPin() {

        if(cone.scale.x > 1.2) {
            grow = false;
        }
        if(cone.scale.x < 1) {
            grow = true;
        }
        if(grow) {
            cone.scale.x += 0.005;
            cone.scale.y += 0.005;
            cone.scale.z += 0.005;
            cone.translateY(-coneInitSize/20);
        }else{
            cone.scale.x -= 0.005;
            cone.scale.y -= 0.005;
            cone.scale.z -= 0.005;
            cone.translateY(coneInitSize/20);
        }
    }
};
