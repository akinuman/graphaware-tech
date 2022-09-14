precision mediump float;

varying vec4 v_color;
varying float v_donut;

const float radiusCircle = 0.35;
const float borderLimit = 0.50;

float draw_circle(vec2 coord, float radius) {
    return step(length(coord), radius);
}

float arc_segment(vec2 coord, float startAngle, float endAngle) {
    const float kInvPi = 1.0 / 3.14159265;
    float angle = atan(coord.x, coord.y) * kInvPi * 0.5;
    angle = fract(angle - startAngle);
    float segment = step(angle, endAngle);
    segment *= step(0.0, angle);
    return mix(segment, 1.0, step(1.0, endAngle));
}

float draw_arc(vec2 coord, float radius, float startAngle, float endAngle) {
    float circle = draw_circle(coord, radius);
    circle *= arc_segment(coord, startAngle, endAngle);
    return circle;
}

void main(void) {
    vec4 transparent = vec4(1.0, 0.0, 0.0, 0.0);
    vec2 coord = gl_PointCoord;
    vec2 offset = vec2(0.5, 0.5);
    vec2 arcCoord = offset - coord;
    // We can use donut attribute here for drawing like (1 - v_donut)
    //float arc = draw_arc(arcCoord, 0.5, 0.0, 1.0 - v_donut);
    // I had a bit trouble to pass to donut attribute beacuse of I used hardcoded attribute.
    float arc = draw_arc(arcCoord, 0.5, 0.0, 0.8);
    vec3 color = vec3(arc);
    color.x = 1.0;
    float distToCenter = length(gl_PointCoord - vec2(.5, .5));
    if(distToCenter < radiusCircle)
    //paint inner circle
        gl_FragColor = v_color;
    else if(distToCenter < borderLimit)
    //paint border
        gl_FragColor = vec4(color, 1.0);
    else
        gl_FragColor = transparent;
}
