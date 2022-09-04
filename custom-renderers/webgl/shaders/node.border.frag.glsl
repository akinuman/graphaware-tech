// precision mediump float;

// varying vec4 v_color;
// varying float v_border;

// const float radiusCircle = 0.35;
// const float borderLimit = 0.50;

// void main(void) {
//   vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
//   vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
//   float distToCenter = length(gl_PointCoord - vec2(.5, .5));

//   if(distToCenter < radiusCircle)
//     gl_FragColor = v_color;
//   else if(distToCenter < borderLimit)
//     gl_FragColor = red;
//   else
//     gl_FragColor = transparent;
// }
// precision mediump float;

// varying vec4 v_color;
// varying float v_border;

// const float radius = 0.5;
// const float halfRadius = 0.35;

// void main(void) {
//   vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
//   vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
//   vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
//   float distToCenter = length(gl_PointCoord - vec2(0.5, 0.5));

//   float t = 0.0;
//   if(distToCenter < halfRadius - v_border)
//     gl_FragColor = white;
//   else if(distToCenter < halfRadius )
//     gl_FragColor = mix(v_color, white, (halfRadius - distToCenter) / v_border);
//   else if(distToCenter < radius - v_border)
//     gl_FragColor = v_color;
//   else if(distToCenter < radius)
//     gl_FragColor = mix(transparent, v_color, (radius - distToCenter) / v_border);
//   else
//     gl_FragColor = transparent;
// }

precision mediump float;

varying vec4 v_color;
varying float v_border;

const float radius = 0.5;

void main(void) {
  vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);
  vec2 m = gl_PointCoord - vec2(0.5, 0.5);
  float dist = radius - length(m);

  float t = 0.0;
  if(dist > v_border)
    t = 1.0;
  else if(dist > 0.0)
    t = dist / v_border;
  gl_FragColor = mix(color0, v_color, t);
}
