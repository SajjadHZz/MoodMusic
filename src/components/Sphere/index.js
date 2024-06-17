"use client";

import { useRef, useMemo, useEffect, Suspense, useContext, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { AudioListener, Audio, AudioAnalyser, AudioLoader } from "three";
import { MusicContext } from "@/context/MusicContext";

const vertexShader = `
uniform float u_time;

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

uniform float u_frequency;

      void main(){
          float noise = 2.0 * pnoise(position + u_time, vec3(10.0));
          float displacement = (u_frequency / 30.0) * (noise / 10.0);
          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
`;

const fragmentShader = `
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.35 ,1.0);
}
`;

export default function CanvasSphere() {
  return (
    <Suspense fallback={<div className="bg-black w-full h-full"></div>}>
      <Canvas className="bg-black" style={{ height: "100vh" }}>
        <Sphere />

        <EffectComposer multisampling={1.0} disableNormalPass={true}>
          <Bloom mipmapBlur luminanceThreshold={0.1} luminanceSmoothing={0.99} intensity={1.0} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

const Sphere = () => {
  const uniforms = useMemo(() => {
    return {
      u_time: {
        type: "f",
        value: 0.0,
      },
      u_frequency: {
        type: "f",
        value: 0.0,
      },
    };
  }, []);

  const musicContext = useContext(MusicContext);

  const mesh = useRef();
  const modelRef = useRef();
  const audioLoader = new AudioLoader();
  const listener = new AudioListener();
  const sound = new Audio(listener);
  const [analyser, setAnalyser] = useState(new AudioAnalyser(sound, 32));
  let currentMusicTime;
  let time = 0;

  useEffect(() => {
    setAnalyser(new AudioAnalyser(sound, 32));
    if (musicContext.musicSelected) {
      audioLoader.load(musicContext.musicSelected, function (buffer) {
        sound.setBuffer(buffer);
        if (musicContext.musicDuration !== null)
          musicContext.musicDuration.innerText = new Date(sound.buffer.duration * 1000)
            .toISOString()
            .slice(14, 19);
        sound.play();
        if (musicContext.playButtonMusic) musicContext.playButtonMusic.checked = true;
      });

      currentMusicTime = setInterval(durationHandler, 1000);

      if (musicContext.playButtonMusic)
        musicContext.playButtonMusic.addEventListener("click", playPauseHandler);
    }

    return () => {
      if (musicContext.playButtonMusic)
        musicContext.playButtonMusic.removeEventListener("click", playPauseHandler, false);
      clearInterval(currentMusicTime);
      sound.pause();
    };
  }, [musicContext.musicSelected]);

  function playPauseHandler(e) {
    if (e.target.checked) {
      sound.play();
    } else {
      sound.pause();
    }
  }

  function durationHandler(e) {
    if (sound.isPlaying) {
      time++;
      musicContext.progressMusic.style.width = `${(time / sound.buffer.duration) * 100}%`;
      if (musicContext.musicCurrent !== null)
        musicContext.musicCurrent.innerText = new Date(time * 1000).toISOString().slice(14, 19);
    }
  }

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    if (analyser.data) mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    const frequencyAverage = analyser && analyser.getAverageFrequency();
    mesh.current.material.uniforms.u_frequency.value = frequencyAverage;
    mesh.current.scale.x = 0.75 + frequencyAverage / 1000;
    mesh.current.scale.y = 0.75 + frequencyAverage / 1000;
    mesh.current.scale.z = 0.75 + frequencyAverage / 1000;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry args={[3, 15]} scale={1.5} ref={modelRef} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
};
