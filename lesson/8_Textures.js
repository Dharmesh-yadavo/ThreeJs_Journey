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

const image = new Image();
const texture = new THREE.Texture(image);
image.addEventListener("load", () => {
  texture.needsUpdate = true;
});
texture.colorSpace = THREE.SRGBColorSpace;
image.src = "../static/textures/door/color.jpg";

//~ 2) Using Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.window //*resizing
  .addEventListener("resize", () => {
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
