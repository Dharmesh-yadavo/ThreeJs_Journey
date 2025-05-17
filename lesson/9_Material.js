import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { metalness } from "three/tsl";

//! Debug:
const gui = new dat.GUI();
console.log(gui);

//! Textures
const textureLoader = new THREE.TextureLoader();

//~ cube texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load(
  "../static/textures/door/color.jpg"
);
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const doorAlphaTexture = textureLoader.load(
  "../static/textures/door/alpha.jpg"
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "../static/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load(
  "../static/textures/door/height.jpg"
);
const doorNormalTexture = textureLoader.load(
  "../static/textures/door/normal.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "../static/textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "../static/textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("../static/textures/matcaps/8.png");
const gradientTexture = textureLoader.load(
  "../static/textures/gradients/3.jpg"
);
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

const matcaps8 = textureLoader.load("../static/textures/matcaps/8.png");

matcaps8.colorSpace = THREE.SRGBColorSpace;

//~ texture for environmentMap:
const environmentMapTexture = cubeTextureLoader.load([
  "../static/textures/environmentMap/px.png",
  "../static/textures/environmentMap/nx.png",
  "../static/textures/environmentMap/py.png",
  "../static/textures/environmentMap/ny.png",
  "../static/textures/environmentMap/pz.png",
  "../static/textures/environmentMap/nz.png",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
//! MeshBasicMaterial:
// const material = new THREE.MeshBasicMaterial({
// color: "cyan",
// wireframe: true,
// map: matcaps8,
// });
// material.map = matcaps8;
// material.color.set("#ff00ff");
// material.color = new THREE.Color("white");
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.side = THREE.DoubleSide;

//! MeshNormalMaterial:
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

//! MeshMatacapMaterial:
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.wireframe = true;

//! MeshDepthMaterial:
// const material = new THREE.MeshDepthMaterial();

//! MeshLambertMaterial:
// const material = new THREE.MeshLambertMaterial();

//! MeshPhongMaterial:
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("red");

//! MeshToonMaterial:
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

//! MeshStandardMaterial:
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(1, 1);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

//! creating a environment map:
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
//~ using environment map texture:
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(1);
gui.add(material, "displacementScale").min(0).max(1).step(0.05);

// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
//~updated for displacementScale:
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
//~ao map
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
// const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
//~updated for displacementScale:
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
//~ao map
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

// const torus = new THREE.Mesh(
//   new THREE.TorusGeometry(0.3, 0.2, 16, 32),
//   material
// );
//~updated for displacementScale:
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;
//ao map
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

//! Lights:
//~ 1) Ambient Light:
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//~ 2) Point Light:
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
