import * as THREE from "three";

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
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const animate = () => {
  //*to update object
  mesh.rotation.x += 0.01;

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
