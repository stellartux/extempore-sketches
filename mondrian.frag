#define time 0.
#ifndef time
#define time u_time
#endif

float column(float p, float x) {
	float w = 0.013;
	return step(p-w, x)*step(x, p+w);
}

float row(float p, float y) {
	float w = 0.015;
	return step(p-w, y)*step(y, p+w);
}

void main() {
		float w2 = .24 + .1 * sin(time);
		float w1 = w2/3.;
		float w3 = .6 + .1 * cos(time);
		float w4 = 1. - (1. - w3)/4.;
		float h1 = .12 + .07 * sin(time - .5);
		float h2 = .55 + .08 * cos(time - .5);
		float h3 = h2 + (1. - h2)/2.;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.95,0.93,0.88);
		vec3 red = vec3(.6, 0.13, 0.16);
		vec3 yellow = vec3(.9, .72, .0);
		vec3 blue = vec3(0., .35, 0.6);
		vec3 black = vec3(.1);
		float redblend = step(st.x, w2) * step(h2, st.y);
		float yellowblend = step(w4, st.x) * step(h2, st.y);
		float blueblend = step(w3, st.x) * step(st.y, h1);
		color = mix(color, red, redblend);
		color = mix(color, yellow, yellowblend);
		color = mix(color, blue, blueblend);
		color = mix(color, black, column(w2, st.x));
		color = mix(color, black, column(w3, st.x));
		color = mix(color, black, column(w4, st.x));
		color = mix(color, black, row(h1, st.y) * step(w2, st.x));
		color = mix(color, black, row(h2, st.y));
		color = mix(color, black, row(h3, st.y));
		color = mix(color, black, column(w1, st.x) * step(h2, st.y));

    gl_FragColor = vec4(color,1.0);
}
