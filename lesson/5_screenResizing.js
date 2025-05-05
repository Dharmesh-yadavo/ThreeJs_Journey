import * as THREE from "three";

//!resizing
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  //renderer
  renderer.setSize(sizes.width, sizes.height);
  //!handle pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//!full screen
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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
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

const animate = () => {
  //*to update object
  mesh.rotation.x += 0.01;

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
