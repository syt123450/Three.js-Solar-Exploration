PinController = function (renderer) {
    //-24.716882, 128.226551
    var latitude = 37.3382, longitude = -121.8863;  //TODO change latitude = 37.3382
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
        var size = 10;
        var point, face, color, numberOfSides, vertexIndex;
        var faceIndices = [ 'a', 'b', 'c', 'd' ];
        var texture = new THREE.TextureLoader().load('../images/fadeTest.jpg');
        texture.wrapS =  THREE.RepeatWrapping;
        // texture.wrapT = new THREE.MeshPhongMaterial( { color: 0x085093 } );
        var coneGeometry = new THREE.ConeGeometry( 0.03, 0.1, 0.09, 12 );

        for ( var i = 0; i < coneGeometry.faces.length; i++ )
        {
            face = coneGeometry.faces[ i ];
            // determine if current face is a tri or a quad
            numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
            console.log(face);
            // assign color to each vertex of current face
            for( var j = 0; j < numberOfSides; j++ )
            {
                vertexIndex = face[ faceIndices[ j ] ];
                // store coordinates of vertex
                point = coneGeometry.vertices[ vertexIndex ];
                // initialize color variable
                color = new THREE.Color( 0xffffff );
                color.setRGB( 0.5 + point.x / size, 0.5 + point.y / size, 0.5 + point.z / size );
                face.vertexColors[ j ] = color;
                face.vertexTextures = texture;
            }
        }


        var coneMesh = new THREE.Mesh( coneGeometry

            // new THREE.MeshBasicMaterial ({wireframe: true})
            // new THREE.MeshBasicMaterial({
            //         map: texture
                    // side: THREE.BackSide
                // })
            // new THREE.EquirectangularReflectionMapping
            // new THREE.MeshPhongMaterial( { color: 0x085093 } )

        );



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

        earthMesh.rotation.y += 0.003; //TODO: changeback to 0.003
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateCone() {

        cone.rotateY(0.05);
        // console.log(cone.rotation.x);
    }
};
