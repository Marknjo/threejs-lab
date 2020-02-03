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
// const image = new Image()

// let texture = new THREE.Texture(image)

// image.onload = () => {
//   texture.needsUpdate = true
// }

// image.src = '/textures/door/color.jpg'
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(
//   '/textures/door/color.jpg',
//   () => {
//     console.log('load')
//   },
//   () => {
//     console.log('progress')
//   },
//   () => {
//     console.log('error')
//   }
// )
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('Start')
}
loadingManager.onLoad = () => {
  console.log('load')
}
loadingManager.onProgress = () => {
  console.log('Progress')
}
loadingManager.onError = () => {
  console.error('Error')
}

const textureLoader = new THREE.TextureLoader(
  loadingManager
)
const colorTexture = textureLoader.load(
  '/textures/door/color.jpg'
)
// const alphaTexture = textureLoader.load(
//   '/textures/door/alpha.jpg'
// )
// const heightTexture = textureLoader.load(
//   '/textures/door/height.jpg'
// )
// const normalTexture = textureLoader.load(
//   '/textures/door/normal.jpg'
// )
// const ambientOcclusionTexture = textureLoader.load(
//   '/textures/door/ambientOcclusion.jpg'
// )
// const metalnessTexture = textureLoader.load(
//   '/textures/door/metalness.jpg'
// )
// const roughnessTexture = textureLoader.load(
//   '/textures/door/roughness.jpg'
// )

colorTexture.repeat.x = 2
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping

colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5

// Scene
const scene = new THREE.Scene()

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: '#ff0000',
  map: colorTexture!,
})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

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

  // update controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
