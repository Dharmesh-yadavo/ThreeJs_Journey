import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";
// import GUI from 'lil-gui';

//! Loading the Image:
//~ 1) Using native JavaScript
// const image = new Image();
// image.onload = () => {
//   console.log("image loaded");
//   const texture = new THREE.texture(image);
// };
// image.src = "../static/textures/door/color.jpg";

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.addEventListener("load", () => {
//   texture.needsUpdate = true;
// });
// texture.colorSpace = THREE.SRGBColorSpace;
// image.src = "../static/textures/door/color.jpg";

//~ 2) Using Texture Loader
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('../static/textures/door/color.jpg') ;
//^ 2 line code can be minimised by:
// const texture = new THREE.TextureLoader().load(
//   "../static/textures/door/color.jpg",
//   () => {
//     console.log("onLoad");
//   },
//   () => {
//     console.log("onProgress");
//   },
//   () => {
//     console.log("onError");
//   }
// );

//~ 3) Using Loading Manager
const loadingManager = new THREE.LoadingManager();
// const url = "../static/textures/door/color.jpg";
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("loading Progressing");
};
loadingManager.onError = () => {
  console.log("loading error");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load("../static/textures/door/color.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

//& can use these in map in meshBasicMaterial
const colorTexture = textureLoader.load("../static/textures/door/color.jpg");
const alphaTexture = textureLoader.load("../static/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("../static/textures/door/height.jpg");
const normalTexture = textureLoader.load("../static/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "../static/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load(
  "../static/textures/door/metalness.jpg"
);
const roughnessTexture = textureLoader.load(
  "../static/textures/door/color.jpg"
);

//! Transforming the Texture
//~ Repeat
// texture.repeat.x = 2;
// texture.repeat.y = 3;

//~ WrapS and WrapT {RepeatWrapping}
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

//~ WrapS and WrapT {MirrorRepeatWrapping}
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

//~ Offset
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

//~ Rotation

//! Filtering and Mipmapping

//~ Minification filter:
// texture.minFilter = THREE.NearestFilter;

//~ Magnification filter :
texture.magFilter = THREE.NearestFilter;

//*resizing
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  //renderer
  renderer.setSize(sizes.width, sizes.height);
  //*handle pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//* Scene
const scene = new THREE.Scene();

//* Object (Red Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
//! How Unwrapping is done on different shapes
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.ConeGeometry(1, 1, 32);
// const geometry = new THREE.TorusGeometry(1, 0.175, 32, 100);
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({
  //   color: "red",
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

//* Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//* Controls: we only have to deal with OrbitControls...
const controls = new OrbitControls(camera, canvas);
// for enableDamping : means smooth stop after rotation
controls.enableDamping = true;

const animate = () => {
  //*to update object
  //   mesh.rotation.x += 0.01;

  //* Update Controls: basically it can be used above also bou for enabledamping it has to render again and again
  controls.update();

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
