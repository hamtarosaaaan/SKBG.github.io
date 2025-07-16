
const px2mm = 1;
// const px2mm = 3.543307;
const points_distance = 3 * px2mm // 隣の面とどれくらい離すか，mm

export function create_SVG(points1, points2, points3, points4, points5, points6){
  /* SVGを作成する関数 */

  // 全ての面の座標を1つの配列に入れる
  var points_array = [points1, points2, points3, points4, points5, points6];

  //canvasサイズの決定
  const width_size = [points1[0].x, points3[15].x, points5[0].z]
  const height_size = [points1[0].z, points3[0].y, points5[18].y]
  const max_width = (-1*(points1[0].x + points3[15].x + points5[0].z) * 2 + points_distance * 2) * px2mm; //一番左にある点をそれぞれの面で選択
  const max_height = (-1*(points1[0].z + points3[0].y + points5[18].y) * 2 * 2 + points_distance * 1) * px2mm; //一番上にある点をそれぞれの面で選択
  
  // SVGの初期設定
  var forSVG = "<svg width=\"" + String(max_width) + "mm\" ";
  forSVG += "height=\"" +String(max_height)+ "mm\" ";
  forSVG += "viewBox=\"0, 0, "+String(max_width)+", "+String(max_height)+"\" xmlns=\"http://www.w3.org/2000/svg\" > \n";
  
  // どのくらいずらすかの変数
  var cur_width = 0;
  var cur_height = 0;

  // 全ての面をSVGにする
  for(var cnt = 0; cnt < 6; cnt++){

    // 始点座標の計算
    if(cnt % 2 == 0){
      cur_width += width_size[Math.floor(cnt / 2)];
      if(cnt > 1)cur_width += width_size[Math.floor(cnt / 2)-1];
    }
    if(cnt % 2 == 0)cur_height = height_size[Math.floor(cnt / 2)];
    else cur_height = height_size[Math.floor(cnt / 2)] * 3;

    // SVGのスタイルで座標を書き込む
    forSVG += "<polygon points=\"\n";
    forSVG += acc_point(points_array[cnt], cnt % 2, Math.floor(cnt / 2), cur_width, cur_height);
    forSVG += "\" stroke=\"#ff0000\" fill=\"None\" stroke-width=\"0.01\"/>\n";
    
  }

  forSVG += "</svg>"
  console.log(forSVG);
  return forSVG;
}

function acc_point(points, UL, LCR, width, height){
  // UL = 0 or 1, LCR = 0 or 1 or 2
  var ret_str = "";
  for(var i = 0; i < points.length; i++){
    if(LCR == 0){
      ret_str += String((points[i].x - width + points_distance * LCR) * px2mm);
      ret_str += ",";
      ret_str += String((points[i].z - height + points_distance * UL) * px2mm);
    }
    if(LCR == 1){
      ret_str += String((points[i].x - width + points_distance * LCR) * px2mm);
      ret_str += ",";
      ret_str += String((points[i].y - height + points_distance * UL) * px2mm);
    }
    if(LCR == 2){
      ret_str += String((points[i].z - width + points_distance * LCR) * px2mm);
      ret_str += ",";
      ret_str += String((points[i].y - height + points_distance * UL) * px2mm);
    }
    ret_str += " \n";
  }

  return ret_str;
}