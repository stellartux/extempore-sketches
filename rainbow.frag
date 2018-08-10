#define COLOR gl_FragColor
#define TIME u_time

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
vec3 rainbow(vec2 _uv) {
  return hsv2rgb(vec3(_uv.x, 1., 1.));
}
void main() {
  vec2 UV = gl_FragCoord.xy / u_resolution.xy;
  COLOR = vec4(rainbow(UV+TIME), 1.);
}
