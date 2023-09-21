import { OrbitControls } from '../../OrbitControls.js';
import { Scene } from './Scene.js';
import * as THREE from 'three';

const rootElement = document.querySelector('#root');

let camera;
let controls;
let scene;
let renderer;
let demoScene;

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
    camera.position.set(0.024318913205115755, 2.263085369169634, 2.2461082450972363);
    camera.quaternion.set(-0.31211109312645235, 0.05162137245260911, 0.016986581102126804, 0.9484900397558116);

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
    controls.target.set(-0.2541900499948175, 0.3691053582677349, -0.30497185048955555);

    window.addEventListener('resize', onResize, false);

    rootElement.appendChild(renderer.domElement);

    demoScene = new Scene(scene, camera, renderer);
    demoScene.build();
};

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    demoScene.update();
    renderer.render(scene, camera);
    demoScene.render();
};

initThreeJS().then(() => animate());
