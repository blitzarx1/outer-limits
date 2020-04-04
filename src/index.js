const THREE = require('three');
const OrbitControls = require('three-orbitcontrols')


$ = require('jquery')

var camera, scene, renderer, controls;

$.getJSON('/static/result.json', function (data) {
    init(data);
    animate();
})


function init(data) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 25;
    camera.position.y = 25;
    camera.position.x = 25;

    scene = new THREE.Scene();

    createStars(data)

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true
    controls.enablePan = false

}

function createStars(data) {

    group = new THREE.Group();

    for (props of data) {

        var starSize = parseFloat(props.solar_size) / 25
        var geometry = new THREE.SphereBufferGeometry(starSize, 16, 16);
        var loader = new THREE.TextureLoader();
        var texture = loader.load('/static/textures/' + props.texture)

        var material = new THREE.MeshBasicMaterial({ map: texture });

        console.log(props)

        if (props.l == "-" && props.b == "-") {
            props.l = 0;
            props.b = 0;
        }

        var mesh = new THREE.Mesh(geometry, material);

        sph = new THREE.Spherical(
            parseFloat(props.dist_ly),
            parseFloat(props.l) * Math.PI / 180,
            parseFloat(props.b) * Math.PI / 180
        )
        cart = new THREE.Vector3()
        cart.setFromSpherical(sph)

        mesh.position.x = cart.x;
        mesh.position.y = cart.y;
        mesh.position.z = cart.z;

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