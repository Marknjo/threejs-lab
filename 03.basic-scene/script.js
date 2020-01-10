/// elements
const canvasEl = document.querySelector('.webgl');

// 1). Add A Scene
const scene = new THREE.Scene();

// 2). Add a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' }); // red
const mesh = new THREE.Mesh(geometry);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// 4). Add A Camera to the scene
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
