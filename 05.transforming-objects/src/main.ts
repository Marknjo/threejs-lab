import './style.css';
import * as THREE from 'three';

const canvasEl = document.querySelector('.webgl')! as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Objects
const group = new THREE.Group();
scene.add(group);

// Axes Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Meshes
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

group.add(cube3);

scene.add(group);

cube1.position.x = 2;
cube3.position.x = -2;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

/// -> Positioning
// mesh.position.normalize();
// console.log(mesh.position.length());
// -length;
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = -2;
// mesh.position.set(0.7, -0.6, 1);

/// -> Scaling
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.75);

/// -> Rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI * 0.75;
// mesh.rotation.x = Math.PI * 0.25;

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.y = 0.5;
camera.position.x = 0.5;

scene.add(camera);

camera.lookAt(cube2.position);

// console.log(cube1.position.distanceTo(camera.position));

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
