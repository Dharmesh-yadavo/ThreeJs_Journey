import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);

//* Scene
const scene = new THREE.Scene();

//* Object (Red Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//* Camera
const sizes = {
  width: 1800,
  height: 900,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

//* Renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//! Animate
//gsap library:
gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
//buildin clock
const clock = new THREE.Clock();
// let time = Date.now();
const animate = () => {
  // const curTime = Date.now();
  // let deltaTime = curTime - time;
  // // console.log(deltaTime);
  // time = curTime;

  const elapsedTime = clock.getElapsedTime();

  //*to update object
  // mesh.rotation.x += 0.003 * deltaTime;
  // mesh.rotation.y = elapsedTime;
  // mesh.position.x = Math.sin(elapsedTime);
  //for circle:
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
