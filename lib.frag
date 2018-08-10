#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TAU 6.28318530718

mat2 rotate2d(in float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float circle(in vec2 _st, in vec2 _pos, in float _radius){
  vec2 _c = _st - _pos;
	return step(dot(_c,_c), _radius);
}

float circle(in vec2 _st, in vec2 _pos, in float _radius, in float _thickness){
  vec2 _c = _st - _pos;
	return step(_radius, dot(_c,_c))*step(dot(_c, _c), _radius + _thickness);
}

float ngon(in vec2 _st, in vec2 _pos, in float _radius, in int _sides, in float _angle) {
  /*
  ngon()
  Draws a shape with as many sides as you need.

  _st : the global st coords
  _pos : position to draw the ngon
  _radius : inner radius of the ngon (i.e. the radius of the circle it encloses)
  _sides : the number of sides the ngon
  _angle : angle to rotate the ngon by (in radians)
  */

  vec2 p = rotate2d(_angle) * (_st - _pos);
  // Angle and radius from the current pixel
  float a = atan(p.y,p.x)+PI;
  float r = TAU/float(_sides);
  // Shaping function that modulate the distance
  float d = cos(floor(0.5+a/r)*r-a)*length(p);
  return 1.0-step(_radius, d);
}

float ngon(in vec2 _st, in vec2 _pos, in float _radius, in int _sides) {
  return ngon(_st, _pos, _radius, _sides, 0.0);
}

void main() {
  vec2 st = 2. * gl_FragCoord.xy / u_resolution.xy - 1.;
  st.x *= u_resolution.x/u_resolution.y;
	vec3 color = vec3(0.);

  color = mix(color, vec3(.0, .5, .7), ngon(st, vec2(0.), .65, 7, -u_time));
  color = mix(color, vec3(.7, .7, .0), circle(st, vec2(.4*cos(u_time), .4*sin(u_time)), 0.01));
  color = mix(color, vec3(.7, .7, .0), circle(st, vec2(0.), .3, .01));

  gl_FragColor = vec4(color, 1.);
}
