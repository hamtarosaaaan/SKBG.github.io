  import * as THREE from "three";
  import { make_top_surface, make_bottom_surface, make_side1_surface_A, make_side1_surface_B, make_side2_surface_A, make_side2_surface_B } from "./makeSurface.js";
  import { create_SVG } from "./createSVG.js";

  import { makeLine2 } from "./makeLine2.js";
  import { LineMaterial } from "/three.js/examples/jsm/lines/LineMaterial.js";
  // import { Line2 } from "https://unpkg.com/three@0.119.1/examples/jsm/lines/Line2.js";
  // import { LineGeometry } from "https://unpkg.com/three@0.119.1/examples/jsm/lines/LineGeometry.js";
  import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#myCanvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(250, 125, 250);
    camera.lookAt(new THREE.Vector3(0,0,0));
    const controls = new OrbitControls(camera, renderer.domElement)

    // 箱を作成
    
    const color1 = new THREE.Color("rgb(150, 255, 255)");
    var A = 3; // Atsusa
    var X = 100; // Xsize
    var Y = 100; // Ysize
    var Z = 100; // Zsize
    var K = 30; // Kagi


    var startBoxSize = X;

    const geometry = new THREE.BoxGeometry(startBoxSize, startBoxSize, startBoxSize);
    const material_normal = new THREE.MeshNormalMaterial({color: color1}); // ずっと輝くやつ
    const material_lamber = new THREE.MeshLambertMaterial({color: color1}); // 影があるやつ（ライト必須）
    const material_basic = new THREE.MeshBasicMaterial({color: color1}); // のっぺりとしたやつ，影無し
    const box = new THREE.Mesh(geometry, material_basic);
    scene.background = new THREE.Color( 0xAAAAAA );
    scene.add(box);
    console.log(box.geometry.parameters.width);
    box.scale.x = (X + 2*A)/ startBoxSize;
    box.scale.y = (Y + 2*A)/ startBoxSize;
    box.scale.z = (Z + 2*A)/ startBoxSize;

      // 枠線を作成
    const icosahedronLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry), // 線を生成する元になるgeometry
      new THREE.LineBasicMaterial({ color: 0xff0000 }) // 線のmaterial
    );
    // box.add(icosahedronLine);

    const material = new THREE.LineBasicMaterial( { color: 0x0000ff  } );
    const Linematerial = new LineMaterial( {color: 0xff0000, linewidth: 2} );


    var points1 = make_top_surface(X, Z, Y, A, K); // 上面
    var points2 = make_bottom_surface(X, Z, Y, A, K); // 下面
    var points3 = make_side1_surface_A(X, Y, Z, A, K); // 側面1A
    var points4 = make_side1_surface_B(X, Y, Z, A, K); // 側面1B
    var points5 = make_side2_surface_A(Y, Z, X, A, K); // 側面2A
    var points6 = make_side2_surface_B(Y, Z, X, A, K); // 側面2B
    
    // const line_geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
    // const line_geometry1_new = new LineGeometry();
    // line_geometry1_new.setPositions(points1)

    // https://codepen.io/prisoner849/pen/ZEayOxO
    // Line2を動的に動かす設定

    // Line2の宣言，定義
    var line2_top = makeLine2(points1);
    line2_top.computeLineDistances();
    scene.add(line2_top);

    var line2_bottom = makeLine2(points2);
    line2_bottom.computeLineDistances();
    scene.add(line2_bottom);

    var line2_sideA1 = makeLine2(points3);
    line2_sideA1.computeLineDistances();
    scene.add(line2_sideA1);

    var line2_sideB1 = makeLine2(points4);
    line2_sideB1.computeLineDistances();
    scene.add(line2_sideB1);

    var line2_sideA2 = makeLine2(points5);
    line2_sideA2.computeLineDistances();
    scene.add(line2_sideA2);

    var line2_sideB2 = makeLine2(points6);
    line2_sideB2.computeLineDistances();
    scene.add(line2_sideB2);

    // const line_geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
    // const line_geometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
    // const line_geometry4 = new THREE.BufferGeometry().setFromPoints( points4 );
    

    //const line1 = new Line2( line_geometry1_new, Linematerial );
    // const line_2 = new THREE.Line( line_geometry2, material );
    // const line3 = new THREE.Line( line_geometry3, material );
    // const line4 = new THREE.Line( line_geometry4, material );


    console.log(line2_top);
    //scene.add( line1 );
    // scene.add( line_2 );
    // scene.add( line3 );
    // scene.add( line4 );


    tick();

    // 毎フレーム時に実行されるループイベントです
    var rotationStop = 0;
    function tick() {      
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }


  var boxSizeXElement = document.getElementById("boxSizeX"); // inputタグの情報元
  var boxSizeXValueElement = document.getElementById("boxSizeXValue"); // spanタグの情報元
  boxSizeXElement.addEventListener("input", (e) =>{
    boxSizeXValueElement.value=boxSizeXElement.value; //inputの数字をスライダーに合わせる
    var valueNumber = Number(boxSizeXElement.value); // スライダーの値を取得 
    box.scale.x = (valueNumber + 2*A)/ startBoxSize; // ボックスのスケールを合わせる
    X = valueNumber; // Xを変更

    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  });
  boxSizeXValueElement.addEventListener("input", ()=>{
    boxSizeXElement.value=boxSizeXValueElement.value;
    var valueNumber = Number(boxSizeXElement.value); // スライダーの値を取得 
    box.scale.x = (valueNumber + 2*A)/ startBoxSize; // ボックスのスケールを合わせる
    X = valueNumber; // Xを変更
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  })

  var boxSizeYElement = document.getElementById("boxSizeY");
  var boxSizeYValueElement = document.getElementById("boxSizeYValue");
  boxSizeYElement.addEventListener("input", (e) =>{
    boxSizeYValueElement.value=boxSizeYElement.value;
    var valueNumber = Number(boxSizeYElement.value);
    box.scale.y = (valueNumber + 2*A)/ startBoxSize;

    Y = valueNumber; // Yを変更

    // Line2の再設定
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  });
  boxSizeYValueElement.addEventListener("input", ()=>{
    boxSizeYElement.value=boxSizeYValueElement.value;
    var valueNumber = Number(boxSizeYElement.value); // スライダーの値を取得 
    box.scale.y = (valueNumber + 2*A)/ startBoxSize; // ボックスのスケールを合わせる
    Y = valueNumber; // Yを変更
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  })

  var boxSizeZElement = document.getElementById("boxSizeZ");
  var boxSizeZValueElement = document.getElementById("boxSizeZValue");
    boxSizeZElement.addEventListener("input", (e) =>{
    boxSizeZValueElement.value=boxSizeZElement.value;
    var valueNumber = Number(boxSizeZElement.value);
    box.scale.z = (valueNumber + 2*A)/ startBoxSize;
    console.log(e);

    Z = valueNumber; // Zを変更

    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  });
  boxSizeZValueElement.addEventListener("input", ()=>{
    boxSizeZElement.value=boxSizeZValueElement.value;
    var valueNumber = Number(boxSizeZElement.value); // スライダーの値を取得 
    box.scale.z = (valueNumber + 2*A)/ startBoxSize; // ボックスのスケールを合わせる
    Z = valueNumber; // Yを変更
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    K = Math.min(K, Math.min(X, Y, Z) / 2)
  })

  var kagi_size_element = document.getElementById("kagiSize");
  var kagi_size_value = document.getElementById("kagiValue")
  kagi_size_element.max = Math.min(X, Y, Z) / 2;
  kagi_size_element.addEventListener("input", (e)=> {
    kagi_size_value.value = Number.parseFloat(kagi_size_element.value).toFixed(1);
    K = Number.parseFloat(kagi_size_element.value).toFixed(1);
    K = Number(K);
    
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()

    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    kagi_size_element.min = A + 0.5;
  });

  kagi_size_value.addEventListener("input", (e)=> {
    kagi_size_element.value = Number.parseFloat(kagi_size_value.value).toFixed(1);
    K = Number.parseFloat(kagi_size_element.value).toFixed(1);
    K = Number(K);
    
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()

    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    kagi_size_element.min = A + 0.5;
  });

  var tickness_size_element = document.getElementById("ticknessSize");
  var tickness_size_value = document.getElementById("ticknessValue")
  tickness_size_element.addEventListener("input", (e)=> {
    tickness_size_value.value = Number.parseFloat(tickness_size_element.value).toFixed(1);
    A = Number.parseFloat(tickness_size_element.value).toFixed(1);
    A = Number(A);
    
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()

    kagi_size_element.min = A;

    box.scale.x = (X + 2*A)/ startBoxSize;
    box.scale.y = (Y + 2*A)/ startBoxSize;
    box.scale.z = (Z + 2*A)/ startBoxSize;
    
    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    kagi_size_element.min = A + 0.5;
  });

  tickness_size_value.addEventListener("input", ()=>{
    tickness_size_element.value=tickness_size_value.value;
    A = Number.parseFloat(tickness_size_value.value).toFixed(1);
    A = Number(A);
    
    set_topbottom_serface()
    set_side1_serface()
    set_side2_serface()

    box.scale.x = (X + 2*A)/ startBoxSize;
    box.scale.y = (Y + 2*A)/ startBoxSize;
    box.scale.z = (Z + 2*A)/ startBoxSize;

    kagi_size_element.max = Math.min(X, Y, Z) / 2;
    kagi_size_element.min = A + 0.5;
  })

  var kirikaki = 0
  var kirikaki_size_element = document.getElementById("kirikakiSize");
  var kirikaki_size_value = document.getElementById("kirikakiValue")
  kirikaki_size_element.addEventListener("input", (e)=> {
    kirikaki_size_value.value = Number.parseFloat(kirikaki_size_element.value).toFixed(2);
    kirikaki = Number.parseFloat(kirikaki_size_element.value).toFixed(2);
    kirikaki = Number(kirikaki);
  });

  kirikaki_size_value.addEventListener("input", ()=>{
    kirikaki_size_element.value=kirikaki_size_value.value;
    kirikaki = Number.parseFloat(kirikaki_size_value.value).toFixed(2);
    kirikaki = Number(kirikaki);
  })


  const set_topbottom_serface = () => {

    // 上面，下面の大きさ変更
    points1 = make_top_surface(X, Z, Y, A, K); // 各点の配列を再作成
    points2 = make_bottom_surface(X, Z, Y, A, K);
    line2_top.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）
    line2_bottom.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）

    // Line2の再設定
    scene.remove(line2_top);
    line2_top = makeLine2(points1)
    line2_top.computeLineDistances();
    scene.add(line2_top);

    scene.remove(line2_bottom);
    line2_bottom = makeLine2(points2)
    line2_bottom.computeLineDistances();
    scene.add(line2_bottom);
  };

  const set_side1_serface = () => {

    // 側面1の大きさ変更
    points3 = make_side1_surface_A(X, Y, Z, A, K); // 側面1A
    points4 = make_side1_surface_B(X, Y, Z, A, K); // 側面1B
    line2_sideA1.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）
    line2_sideB1.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）

    // Line2の再設定
    scene.remove(line2_sideA1);
    line2_sideA1 = makeLine2(points3)
    line2_sideA1.computeLineDistances();
    scene.add(line2_sideA1);

    scene.remove(line2_sideB1);
    line2_sideB1 = makeLine2(points4)
    line2_sideB1.computeLineDistances();
    scene.add(line2_sideB1);
  };

  const set_side2_serface = () => {
    console.log(Y, Z, X, A, K);
    // 側面2の大きさ変更
    points5 = make_side2_surface_A(Y, Z, X, A, K); // 側面2A
    points6 = make_side2_surface_B(Y, Z, X, A, K); // 側面2B
    line2_sideA2.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）
    line2_sideB2.geometry.attributes.position.needsUpdate = true; // 変更することを知らせる（変更するたびfalseになるらしい）

    scene.remove(line2_sideA2);
    line2_sideA2 = makeLine2(points5)
    line2_sideA2.computeLineDistances();
    scene.add(line2_sideA2);

    scene.remove(line2_sideB2);
    line2_sideB2 = makeLine2(points6)
    line2_sideB2.computeLineDistances();
    scene.add(line2_sideB2);
  };

  var DL_button_element = document.getElementById("download_button");
  DL_button_element.addEventListener("click", (e)=> {

    add_kirikaki();
    var SVG_string = create_SVG(points1, points2, points3, points4, points5, points6)

    var filename = "SKBG" + String(yyyymmdd.format( new Date() ))+".svg";
    console.log(filename);
    downloadFile(SVG_string, filename)
  })

  function add_kirikaki(){
    points1 = make_top_surface(X, Z, Y, A, K, kirikaki); // 上面
    points2 = make_bottom_surface(X, Z, Y, A, K, kirikaki); // 下面
    points3 = make_side1_surface_A(X, Y, Z, A, K, kirikaki); // 側面1A
    points4 = make_side1_surface_B(X, Y, Z, A, K, kirikaki); // 側面1B
    points5 = make_side2_surface_A(Y, Z, X, A, K, kirikaki); // 側面2A
    points6 = make_side2_surface_B(Y, Z, X, A, K, kirikaki); // 側面2B
  }
  
  function downloadFile(SVG_string, filename) {
    const blob = new Blob([SVG_string], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const yyyymmdd = new Intl.DateTimeFormat(
  undefined,
  {
    year:   'numeric',
    month:  '2-digit',
    day:    '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  }
)