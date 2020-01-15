import './style.css';
import * as THREE from 'three';

const canvasEl = document.querySelector('.webgl')! as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
const mesh = new THREE.Mesh(geometry, material);

// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = -2;
mesh.position.set(0.7, -0.6, 1);

scene.add(mesh);

// mesh.position.normalize();
// console.log(mesh.position.length());
// -length;

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

console.log(mesh.position.distanceTo(camera.position));

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
