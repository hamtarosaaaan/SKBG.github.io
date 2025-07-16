import * as THREE from "three";

export function make_top_surface(X, Z, Y, Atsusa, Kagi, kirikaki = 0){
  var X = X; 
  var Z = Z; 
  var Y = Y / 2 + Atsusa; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (X / 2); // BoxCenter
  var BH = A + (Z / 2); // BoxCenter

  var BWK = BW-K-kirikaki;
  var BWA = BW-A-kirikaki;
  var BHK = BH-K-kirikaki;
  var BHA = BH-A-kirikaki;

  const points = [];

  // point1(上面)
  points.push( new THREE.Vector3( -BW, Y, -BH ) );
  points.push( new THREE.Vector3( -(BWK), Y, -BH ) );
  points.push( new THREE.Vector3( -(BWK), Y, -(BHA) ) );
  points.push( new THREE.Vector3( (BWK), Y, -(BHA) ) );
  points.push( new THREE.Vector3( (BWK), Y, -(BH) ) );
  points.push( new THREE.Vector3( (BW), Y, -(BH) ) );
  points.push( new THREE.Vector3( (BW), Y, -(BHK) ) );
  points.push( new THREE.Vector3( (BWA), Y, -(BHK) ) );
  points.push( new THREE.Vector3( (BWA), Y, (BHK) ) );
  points.push( new THREE.Vector3( (BW), Y, (BHK) ) );
  points.push( new THREE.Vector3( (BW), Y, (BH) ) );
  points.push( new THREE.Vector3( (BWK), Y, (BH) ) );
  points.push( new THREE.Vector3( (BWK), Y, (BHA) ) );
  points.push( new THREE.Vector3( -(BWK), Y, (BHA) ) );
  points.push( new THREE.Vector3( -(BWK), Y, (BH) ) );
  points.push( new THREE.Vector3( -(BW), Y, (BH) ) );
  points.push( new THREE.Vector3( -(BW), Y, (BHK) ) );
  points.push( new THREE.Vector3( -(BWA), Y, (BHK) ) );
  points.push( new THREE.Vector3( -(BWA), Y, -(BHK) ) );
  points.push( new THREE.Vector3( -(BW), Y, -(BHK) ) );
  points.push( new THREE.Vector3( -(BW), Y, -(BH) ) );

  return points
}

export function make_bottom_surface(X, Z, Y, Atsusa, Kagi, kirikaki = 0){
  var X = X; 
  var Z = Z; 
  var Y = Y / 2 + Atsusa; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (X / 2); // BoxCenter
  var BH = A + (Z / 2); // BoxCenter

  var BWK = BW-K-kirikaki;
  var BWA = BW-A-kirikaki;
  var BHK = BH-K-kirikaki;
  var BHA = BH-A-kirikaki;


  const points = [];

  points.push( new THREE.Vector3( -BW, -Y, -BH ) );
  points.push( new THREE.Vector3( -(BWK), -Y, -BH ) );
  points.push( new THREE.Vector3( -(BWK), -Y, -(BHA) ) );
  points.push( new THREE.Vector3( (BWK), -Y, -(BHA) ) );
  points.push( new THREE.Vector3( (BWK), -Y, -(BH) ) );
  points.push( new THREE.Vector3( (BW), -Y, -(BH) ) );
  points.push( new THREE.Vector3( (BW), -Y, -(BHK) ) );
  points.push( new THREE.Vector3( (BWA), -Y, -(BHK) ) );
  points.push( new THREE.Vector3( (BWA), -Y, (BHK) ) );
  points.push( new THREE.Vector3( (BW), -Y, (BHK) ) );
  points.push( new THREE.Vector3( (BW), -Y, (BH) ) );
  points.push( new THREE.Vector3( (BWK), -Y, (BH) ) );
  points.push( new THREE.Vector3( (BWK), -Y, (BHA) ) );
  points.push( new THREE.Vector3( -(BWK), -Y, (BHA) ) );
  points.push( new THREE.Vector3( -(BWK), -Y, (BH) ) );
  points.push( new THREE.Vector3( -(BW), -Y, (BH) ) );
  points.push( new THREE.Vector3( -(BW), -Y, (BHK) ) );
  points.push( new THREE.Vector3( -(BWA), -Y, (BHK) ) );
  points.push( new THREE.Vector3( -(BWA), -Y, -(BHK) ) );
  points.push( new THREE.Vector3( -(BW), -Y, -(BHK) ) );
  points.push( new THREE.Vector3( -(BW), -Y, -(BH) ) );

  return points
}





export function make_side1_surface_A(X, Y, Z, Atsusa, Kagi, kirikaki = 0){
  var X = X; 
  var Z = Z / 2 + Atsusa; 
  var Y = Y; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (X / 2); // BoxWidth
  var BH = A + (Y / 2); // BoxHeight

  var BWK = BW-K+kirikaki;
  var BWA = BW-A+kirikaki;
  var BHK = BH-K+kirikaki;
  var BHA = BH-A+kirikaki;

  const points = [];

  points.push( new THREE.Vector3( -(BWK), -BH, Z) );
  points.push( new THREE.Vector3( BWK, -BH, Z) );
  points.push( new THREE.Vector3( BWK, -(BHA), Z) );
  points.push( new THREE.Vector3( BWA, -(BHA), Z) );
  points.push( new THREE.Vector3( BWA, -(BHK), Z) );
  points.push( new THREE.Vector3( BW, -(BHK), Z) );
  points.push( new THREE.Vector3( BW, (BHK), Z) );
  points.push( new THREE.Vector3( BWA, (BHK), Z) );
  points.push( new THREE.Vector3( BWA, (BHA), Z) );
  points.push( new THREE.Vector3( BWK, (BHA), Z) );
  points.push( new THREE.Vector3( BWK, BH, Z) );
  points.push( new THREE.Vector3( -(BWK), BH, Z) );
  points.push( new THREE.Vector3( -(BWK), BHA, Z) );
  points.push( new THREE.Vector3( -(BWA), BHA, Z) );
  points.push( new THREE.Vector3( -(BWA), BHK, Z) );
  points.push( new THREE.Vector3( -(BW), BHK, Z) );
  points.push( new THREE.Vector3( -(BW), -(BHK), Z) );
  points.push( new THREE.Vector3( -(BWA), -(BHK), Z) );
  points.push( new THREE.Vector3( -(BWA), -(BHA), Z) );
  points.push( new THREE.Vector3( -(BWK), -(BHA), Z) );
  points.push( new THREE.Vector3( -(BWK), -BH, Z) );


  return points
}

export function make_side1_surface_B(X, Y, Z, Atsusa, Kagi, kirikaki = 0){
  var X = X; 
  var Z = Z / 2 + Atsusa; 
  var Y = Y; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (X / 2); // BoxWidth
  var BH = A + (Y / 2); // BoxHeight

  var BWK = BW-K+kirikaki;
  var BWA = BW-A+kirikaki;
  var BHK = BH-K+kirikaki;
  var BHA = BH-A+kirikaki;

  const points = [];

  points.push( new THREE.Vector3( -(BWK), -BH, -Z) );
  points.push( new THREE.Vector3( BWK, -BH, -Z) );
  points.push( new THREE.Vector3( BWK, -(BHA), -Z) );
  points.push( new THREE.Vector3( BWA, -(BHA), -Z) );
  points.push( new THREE.Vector3( BWA, -(BHK), -Z) );
  points.push( new THREE.Vector3( BW, -(BHK), -Z) );
  points.push( new THREE.Vector3( BW, (BHK), -Z) );
  points.push( new THREE.Vector3( BWA, (BHK), -Z) );
  points.push( new THREE.Vector3( BWA, (BHA), -Z) );
  points.push( new THREE.Vector3( BWK, (BHA), -Z) );
  points.push( new THREE.Vector3( BWK, BH, -Z) );
  points.push( new THREE.Vector3( -(BWK), BH, -Z) );
  points.push( new THREE.Vector3( -(BWK), BHA, -Z) );
  points.push( new THREE.Vector3( -(BWA), BHA, -Z) );
  points.push( new THREE.Vector3( -(BWA), BHK, -Z) );
  points.push( new THREE.Vector3( -(BW), BHK, -Z) );
  points.push( new THREE.Vector3( -(BW), -(BHK), -Z) );
  points.push( new THREE.Vector3( -(BWA), -(BHK), -Z) );
  points.push( new THREE.Vector3( -(BWA), -(BHA), -Z) );
  points.push( new THREE.Vector3( -(BWK), -(BHA), -Z) );
  points.push( new THREE.Vector3( -(BWK), -BH, -Z) );


  return points
}

export function make_side2_surface_A(Y, Z, X, Atsusa, Kagi, kirikaki = 0){
  var Z = Z; 
  var X = X / 2 + Atsusa; 
  var Y = Y; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (Z / 2); // BoxWidth
  var BH = A + (Y / 2); // BoxHeight

  var BWK = BW-K+kirikaki;
  var BWA = BW-A+kirikaki;
  var BHK = BH-K-kirikaki;
  var BHA = BH-A-kirikaki;

  const points = [];

  // point1(上面)
  points.push( new THREE.Vector3( X, -(BHA), -BW) );
  points.push( new THREE.Vector3( X, -(BHK), -BW) );
  points.push( new THREE.Vector3( X, -(BHK), -(BWA)) );
  points.push( new THREE.Vector3( X, BHK, -(BWA)) );
  points.push( new THREE.Vector3( X, BHK, -BW) );
  points.push( new THREE.Vector3( X, BHA, -BW) );
  points.push( new THREE.Vector3( X, BHA, -(BWK)) );
  points.push( new THREE.Vector3( X, BH, -(BWK)) );
  points.push( new THREE.Vector3( X, BH, BWK) );
  points.push( new THREE.Vector3( X, BHA, BWK) );
  points.push( new THREE.Vector3( X, BHA, BW) );
  points.push( new THREE.Vector3( X, BHK, BW) );
  points.push( new THREE.Vector3( X, BHK, BWA) );
  points.push( new THREE.Vector3( X, -(BHK), BWA) );
  points.push( new THREE.Vector3( X, -(BHK), BW) );
  points.push( new THREE.Vector3( X, -(BHA), BW) );
  points.push( new THREE.Vector3( X, -(BHA), BWK) );
  points.push( new THREE.Vector3( X, -BH, BWK) );
  points.push( new THREE.Vector3( X, -BH, -(BWK)) );
  points.push( new THREE.Vector3( X, -(BHA), -(BWK)) );
  points.push( new THREE.Vector3( X, -(BHA), -BW) );

  return points
}

export function make_side2_surface_B(Y, Z, X, Atsusa, Kagi ,kirikaki = 0){
  var Z = Z; 
  var X = X / 2 + Atsusa; 
  var Y = Y; 
  var A = Atsusa; // Atsusa
  var K = Kagi; // Kagi
  var BW = A + (Z / 2); // BoxWidth
  var BH = A + (Y / 2); // BoxHeight

  var BWK = BW-K+kirikaki;
  var BWA = BW-A+kirikaki;
  var BHK = BH-K+kirikaki;
  var BHA = BH-A+kirikaki;

  const points = [];

  // point1(上面)
  points.push( new THREE.Vector3( -X, -(BHA), -BW) );
  points.push( new THREE.Vector3( -X, -(BHK), -BW) );
  points.push( new THREE.Vector3( -X, -(BHK), -(BWA)) );
  points.push( new THREE.Vector3( -X, BHK, -(BWA)) );
  points.push( new THREE.Vector3( -X, BHK, -BW) );
  points.push( new THREE.Vector3( -X, BHA, -BW) );
  points.push( new THREE.Vector3( -X, BHA, -(BWK)) );
  points.push( new THREE.Vector3( -X, BH, -(BWK)) );
  points.push( new THREE.Vector3( -X, BH, BWK) );
  points.push( new THREE.Vector3( -X, BHA, BWK) );
  points.push( new THREE.Vector3( -X, BHA, BW) );
  points.push( new THREE.Vector3( -X, BHK, BW) );
  points.push( new THREE.Vector3( -X, BHK, BWA) );
  points.push( new THREE.Vector3( -X, -(BHK), BWA) );
  points.push( new THREE.Vector3( -X, -(BHK), BW) );
  points.push( new THREE.Vector3( -X, -(BHA), BW) );
  points.push( new THREE.Vector3( -X, -(BHA), BWK) );
  points.push( new THREE.Vector3( -X, -BH, BWK) );
  points.push( new THREE.Vector3( -X, -BH, -(BWK)) );
  points.push( new THREE.Vector3( -X, -(BHA), -(BWK)) );
  points.push( new THREE.Vector3( -X, -(BHA), -BW) );

  return points
}

