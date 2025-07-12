uniform vec3 uColor;
uniform vec3 uPointColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main()
{
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vPosition = csm_Position.xyz;
    vUv = uv;
}
