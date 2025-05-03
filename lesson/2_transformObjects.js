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

//! Transform Object:
// mesh.position.x = -1;
// mesh.position.y = 1;
// mesh.position.z = 0.7;
// mesh.position.set(-1, 1, 0.7); // if we want to change all the positions together
// console.log(mesh.position.length());
// console.log(mesh.position.distanceTo(camera.position));
// console.log(mesh.position.normalize());
// mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.scale.z = 2;
// mesh.scale.set(1.7, 1, 2);
// mesh.rotation.x = 1;
// mesh.rotation.y = 2;
mesh.rotation.z = 2;

//! Axes Helper:
const axeshelper = new THREE.AxesHelper(2);
scene.add(axeshelper);

//! Group:
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "pink" })
);
cube1.position.x = -2;
group.add(cube1);

//* Renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
