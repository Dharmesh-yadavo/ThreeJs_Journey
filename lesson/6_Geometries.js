import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

//*full screen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//* Scene
const scene = new THREE.Scene();

//* Object (Red Cube)
// const geometry = new THREE.BoxGeometry(1, 1, 1); for see square to divide into triangles
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2, 1, 1, 1); //! it will divide square into 4 parts and then into triangles
//! Float32Array
// const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionAttribute);

//! For printing multiple triangle through Float32Array
const geometry = new THREE.BufferGeometry();
const count = 50;
const positionArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
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
  //   mesh.rotation.y += 0.01;
  //   mesh.rotation.z += 0.01;

  //* Update Controls: basically it can be used above also bou for enabledamping it has to render again and again
  controls.update();

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
