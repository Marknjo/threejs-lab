/// elements
const canvasEl = document.querySelector('.webgl');

// 1). Add A Scene
const scene = new THREE.Scene();

// 2). Add a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' }); // red
const mesh = new THREE.Mesh(geometry);
scene.add(mesh);
