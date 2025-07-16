import * as THREE from "three";
import { LineMaterial } from "/three.js/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "/three.js/examples/jsm/lines/Line2.js";
import { LineGeometry } from "/three.js/examples/jsm/lines/LineGeometry.js";
// import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

export function makeLine2(points){
  var egom = new THREE.BufferGeometry().setFromPoints(points);
  var line2_geometry = new LineGeometry()
  var firstMat = new THREE.LineBasicMaterial({ color: "yellow"});
  var topSerface = new THREE.Line(egom, firstMat);
  var fromTopSerface = line2_geometry.fromLine(topSerface);
  var matLine = new LineMaterial({linewidth: 2, color: "rgb(0, 0, 0)"});
  var line2_test = new Line2(fromTopSerface, matLine);

  return line2_test
}
