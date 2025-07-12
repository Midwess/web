uniform vec3 uColor;
uniform vec3 uPointColor;
uniform vec2 uResolution;
uniform float uGrid;

varying vec3 vPosition;

vec3 directionalLight(vec3 color, float lightIntensity, vec3 lightPosition, vec3 normal) {
    return max(0.0, dot(lightPosition, normal) * lightIntensity) * color;
}

vec3 directionalLightReflect(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    return lightColor * lightIntensity * (shading + specular);
}

vec3 ambientLight(vec3 color, float intensity) {
    return color * intensity;
}

vec3 halftone(
  vec3 color,
  float repetition,
  vec3 lightDirection,
  float smoothL,
  float smoothH,
  vec3 pointColor,
  vec3 normal
) {
    vec2 uv = gl_FragCoord.xy / uResolution.y;

    uv *= repetition;
    uv = mod(uv, 1.0);

    float intensity = dot(vNormal, lightDirection);
    intensity = smoothstep(smoothL, smoothH, intensity);
    float point = distance(vec2(0.5), uv);
    point = 1.0 - step(0.5 * intensity, point);

    float strength = point;

    return mix(color, pointColor, strength);
}

void main() {
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);
  vec3 color = uColor;

  vec3 lightDirection = vec3(1.0, 1.0, 1.0);

  vec3 light = vec3(0.0);

  float lightIntensity = 1.0;

  light += ambientLight(
    vec3(1.0),
    lightIntensity
  );

  light += directionalLightReflect(
    vec3(1.0),
    lightIntensity,
    normal,
    lightDirection, // position
    viewDirection,
    1.0
  );

  color *= light;

  color = halftone(
    color,
    uGrid,
    lightDirection,
    -0.7,
    1.2,
    uPointColor, // point color
    normal
  );

  // Shadow
  color = halftone(
    color,
    uGrid,
    vec3(1.0, -1.0, -1.0),
    -0.7,
    1.2,
    vec3(0.0),
    normal
  );

  csm_FragColor.rgb = color;
  csm_FragColor.a = 1.0;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
