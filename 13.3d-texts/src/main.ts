import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

/**
 * Canvas
 */
const canvasEl = document.querySelector(
  '.webgl'
)! as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Axis helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

loadingManager.onLoad = () => {
  console.log('Texture loaded 🚀🚀🚀')
}

loadingManager.onError = () => {
  console.error('Failed to load texture 💥💥💥')
}

const textureLoader = new THREE.TextureLoader(
  loadingManager
)

const matcapTexture = textureLoader.load('/matcaps/1.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    console.log('Font loaded 🚀🚀🚀')

    const textGeometry = new TextGeometry(
      'Hello Three.js',
      {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.025,
        bevelOffset: 0,
        bevelSegments: 4,
      }
    )

    // textGeometry.computeBoundingBox()

    // textGeometry.translate(
    //   -(textGeometry.boundingBox!.max.x - 0.025) * 0.5,
    //   -(textGeometry.boundingBox!.max.y - 0.025) * 0.5,
    //   -(textGeometry.boundingBox!.max.z - 0.025) * 0.5
    // )

    textGeometry.center()

    const material = new THREE.MeshMatcapMaterial()

    // Load matcap
    material.matcap = matcapTexture

    const text = new THREE.Mesh(textGeometry, material)

    // load donuts
    console.time('Loading Donuts')

    const totalDonuts = 100

    for (let i = 0; i <= totalDonuts; i++) {
      const donutMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 16, 32),
        material
      )

      // position
      donutMesh.position.x = (Math.random() - 0.5) * 10
      donutMesh.position.y = (Math.random() - 0.5) * 10
      donutMesh.position.z = (Math.random() - 0.5) * 10

      // rotate
      donutMesh.rotation.x = Math.random() * Math.PI
      donutMesh.rotation.y = Math.random() * Math.PI
      donutMesh.rotation.z = Math.random() * Math.PI
      // scale
      const scale = Math.random()
      donutMesh.scale.set(scale, scale, scale)

      scene.add(donutMesh)
    }

    console.timeEnd('Loading Donuts')
    // add meshes
    scene.add(text)
  }
)

// Mesh
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//   color: '#ff0000',
// })
// const mesh = new THREE.Mesh(geometry, material)

// scene.add(mesh)

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
