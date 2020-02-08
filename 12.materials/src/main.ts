import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Canvas
 */
const canvasEl = document.querySelector(
  '.webgl'
)! as HTMLCanvasElement

/**
 * Textures
 */
const loaderManager = new THREE.LoadingManager()

loaderManager.onLoad = () => {
  console.log('Texture loaded')
}

loaderManager.onError = () => {
  console.error('Error loading texture')
}

const textureLoader = new THREE.TextureLoader(loaderManager)

const doorColorTexture = textureLoader.load(
  'textures/door/color.jpg'
)
const doorAlphaTexture = textureLoader.load(
  'textures/door/alpha.jpg'
)
const alpahTexture = textureLoader.load(
  'textures/door/color.jpg'
)
const doorAmbientOcclusionTexture = textureLoader.load(
  'textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load(
  'textures/door/height.jpg'
)
const doorMetalnessTexture = textureLoader.load(
  'textures/door/metalness.jpg'
)
const doornNormalTexture = textureLoader.load(
  'textures/door/normal.jpg'
)
const doorRoughnessTexture = textureLoader.load(
  'textures/door/roughness.jpg'
)

const matcap01Texture = textureLoader.load(
  'textures/matcaps/8.png'
)

const gradient03Texture = textureLoader.load(
  'textures/gradients/3.jpg'
)

// Scene
const scene = new THREE.Scene()

/**
 * Meshes
 */
// const material = new THREE.MeshBasicMaterial()

// material.map = doorColorTexture
// // material.color = new THREE.Color(0x00ff00)
// // material.wireframe = true

// // material.opacity = 0.5
// material.transparent = true

// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcap01Texture
// material.flatShading = true

const material = new THREE.MeshDepthMaterial()

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
)
camera.position.z = 3

scene.add(camera)

// Handle auto resize of the canvas in the viewport
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  )
})

// handle fullscreen
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvasEl.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvasEl)
// controls.enabled = true;
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasEl,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animation
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.1 * elapsedTime
  plane.rotation.x = 0.1 * elapsedTime
  torus.rotation.x = 0.1 * elapsedTime

  // update controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
