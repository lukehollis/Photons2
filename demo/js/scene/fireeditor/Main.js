import { OrbitControls } from '../../OrbitControls.js';
import { Fire } from './Fire.js';
import * as THREE from 'three';

const rootElement = document.querySelector('#root');

let camera;
let controls;
let scene;
let renderer;
let fire;
let cube;
let sphere;
let floor;

const onResize = () => {
    renderer.setSize(1, 1);
    const renderWidth = window.innerWidth;
    const renderHeight =  window.innerHeight;
    camera.aspect = renderWidth / renderHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(renderWidth, renderHeight);
};

const initThreeJS = async () => {
    const renderWidth = window.innerWidth;
    const renderHeight =  window.innerHeight;

    camera = new THREE.PerspectiveCamera(70, renderWidth / renderHeight, 0.1, 100);
    camera.position.set(2.5, 2, 5);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(renderWidth, renderHeight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = (0.9 * Math.PI) / 2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;

    window.addEventListener('resize', onResize, false);

    rootElement.appendChild(renderer.domElement);

    // test fire at 0,0,0 
    fire = new Fire(scene, camera, renderer, new THREE.Vector3());

    // floor for measuring flicker fx 
    floor = new THREE.Mesh(
            new THREE.BoxGeometry(50, 0.1, 50), 
            new THREE.MeshStandardMaterial({ color: 0xeeeeee })
        );
    floor.position.set(0, -2, 0); 
    floor.receiveShadow = true;
    scene.add(floor);

    // objects to help test lighting 
    cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1), 
            new THREE.MeshStandardMaterial({ color: 0xeeeeee })
        );
    cube.position.set(5, -1, 0); 
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32), 
            new THREE.MeshStandardMaterial({ color: 0xeeeeeee })
        );
    sphere.position.set(-5, 0, 0);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

};

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    fire.update();

    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;

    renderer.render(scene, camera);
    fire.render();
};

initThreeJS().then(() => animate());
