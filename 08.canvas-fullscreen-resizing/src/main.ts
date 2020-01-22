import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvasEl = document.querySelector('.webgl')! as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvasEl);
// controls.enabled = true;
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});

renderer.setSize(sizes.width, sizes.height);

/**
 * Animation
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update controls
  controls.update();

  // Renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
