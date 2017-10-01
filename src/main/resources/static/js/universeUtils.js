/**
 * Created by ss on 2017/9/30.
 */

UniverseUtils = function () {

    this.createDefaultUniverse = function () {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(90, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });

        return universeMesh;
    };

    this.createDefaultCamera = function () {

        var camera = new THREE.PerspectiveCamera();
        camera.fov = 45;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1500;
        camera.position.set(0, 0, 1.5);
        camera.updateProjectionMatrix();

        return camera;
    };

    this.createDefaultEarthMesh = function () {

        var earthMesh = new THREE.Mesh();
        earthMesh.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        earthMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap: new THREE.TextureLoader().load(
                '../images/earthbump1k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap: new THREE.TextureLoader().load(
                '../images/water_4k.png'
            )
        });

        return earthMesh;
    };

    this.createDefaultAtmosphere = function () {

        var atmosphereMesh = new THREE.Mesh();
        atmosphereMesh.geometry = new THREE.SphereGeometry(0.504, 32, 32);
        atmosphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        });

        return atmosphereMesh;
    };

    this.createDefaultMoon = function () {

        var moonMesh = new THREE.Mesh();
        moonMesh.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        moonMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/moonmap2k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/elev_bump_4k.jpg'
            )
        });

        return moonMesh;
    };

    this.createDefaultMeteors = function () {

        var meteors = [];
        meteors[0] = createMeteor();
        meteors[1] = createMeteor();

        return meteors;
    };

    function createMeteor() {

        var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.001);
        var material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/meteor.png')
        });

        var meteor = new THREE.Mesh(geometry, material);

        meteor.position.x = 3 * Math.random();
        meteor.position.y = 3 * Math.random();
        meteor.position.z = -3;

        return meteor;
    }
};