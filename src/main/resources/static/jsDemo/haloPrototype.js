/************************************
 *
 ************************************/
var container, scene, renderer, camera, light, sphere;


init();

animate();
/**************************
 * helper functions
 **************************/

function init() {

    scene = new THREE.Scene();

    initCamera();

    initLighting();

    initRenderer();

    createCube(20);

    addGlow(sphere);
}

function initRenderer() {
    container = document.getElementById( 'ThreeJS' );

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.color = '#ffffff';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Halo Demo';
    container.appendChild(info);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

}

function initCamera() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
}

function createCube(radius) {

    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var material = new THREE.MeshLambertMaterial({color: 0x009999});
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0,0,0);
    scene.add(sphere);
}

function addGlow(mesh) {

    var loader = new THREE.TextureLoader();
    loader.load(
        '../images/glow.png',
        function(texture) {
            var spriteMaterial = new THREE.SpriteMaterial(
                {
                    map: texture,
                    useScreenCoordinates: false,
                    color: 0x0000ff,
                    transparent: false,
                });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(100, 100, 1);
            mesh.add(sprite);
        });
}

function initLighting() {
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 100, 0);
    scene.add(light);
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    render();
}
