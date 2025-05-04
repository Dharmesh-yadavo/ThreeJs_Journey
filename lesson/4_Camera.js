import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//! Cursor
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mouseover", (event) => {
//   cursor.x = -(event.clientX / sizes.width - 0.5);
//   cursor.y = event.clientY / sizes.height - 0.5;
//   console.log(cursor.x, cursor.y);
// });

//* Scene
const scene = new THREE.Scene();

//* Object (Red Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//! Camera
//& There are two types of camera for us 1) OrthographicCamera , 2) PerspectiveCamera
//* OrthographicCamera code :
// Syntax: const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
// const aspectRatio = window.innerWidth / innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1 * aspectRatio,
//   -1 * aspectRatio,
//   0.1,
//   100
// );

//* PerspectiveCamera code:
//Sytax: const camera = new THREE.PerspectiveCamera(field of view, aspect ratio, near, far) ;
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 4;
scene.add(camera);

//* Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//! Controls: we only have to deal with OrbitControls...
const controls = new OrbitControls(camera, canvas);
// for enableDamping : means smooth stop after rotation
controls.enableDamping = true;

const animate = () => {
  //*to update object
  // mesh.rotation.y += 0.01;

  //! Camera
  //todo to move the cube left, right, up or down...
  // camera.position.x = cursor.x * 3;
  // camera.position.y = cursor.y * 3;

  //! Update Controls: basically it can be used above also bou for enabledamping it has to render again and again
  // controls.update();

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
