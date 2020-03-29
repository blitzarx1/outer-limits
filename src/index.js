const THREE = require('three');
const OrbitControls = require('three-orbitcontrols')

var camera, scene, renderer, controls;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 0.5;
    camera.position.y = 0.5;
    camera.position.x = 0.5;

    scene = new THREE.Scene();

    createStars()

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true

}

function createStars() {
    var geometry = new THREE.SphereBufferGeometry(0.01, 16, 16);
    var loader = new THREE.TextureLoader();
    var texture = loader.load('/static/textures/2k_sun.jpg')

    var material = new THREE.MeshBasicMaterial({ map: texture });

    group = new THREE.Group();

    for (var i = 0; i < 133; i++) {

        var mesh = new THREE.Mesh(geometry, material, );
        mesh.position.x = Math.random() - 0.5;
        mesh.position.y = Math.random() - 0.5;
        mesh.position.z = Math.random() - 0.5;


        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        group.add(mesh);

    }

    scene.add(group);

}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}