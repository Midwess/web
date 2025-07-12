'use client';

import { Suspense, useCallback, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';

import GLSL from './glsl';
import { Post } from 'contentlayer/generated';

import { ThreeDCanvas } from '@/components/threejs/canvas';
import useWindowSize from '@/hooks/use-window-size';
import { Responsive, responsiveMatch } from '@/utils/responsive-match';

const MAIN_COLOR = '#F8F4E7';
const HALFTON_COLOR = '#737373';
const HAFLTON_POINT_COLOR = MAIN_COLOR;

export interface PostItemProps {
  post: Post;
}

export const GRID = () => {
  if (global.window) {
    return ((Math.max(window.innerHeight, window.innerWidth) *
      window.devicePixelRatio) /
      responsiveMatch(4, [Responsive.XL, 4.5])) as number;
  }

  return 1000;
};

const glSetting: unknown = {
  alpha: true,
  pixelRatio: 1,
  antialias: false,
  powerPreference: 'high-performance',
};

export function PostItem(props: PostItemProps) {
  const { post } = props;

  const onClick = useCallback(() => {
    window.location.href = post.url;
  }, [post.url]);

  const date = new Date(post.publishedDate || '');

  return (
    <>
      <div
        onClick={onClick}
        className={
          'flex h-fit w-full cursor-pointer flex-col items-center justify-start gap-24 rounded-lg p-1 md:flex-row'
        }
      >
        <div
          className={
            'bg-cream border-border h-full w-full flex-2/5 rounded-3xl border border-dashed sm:w-[230px] md:aspect-square'
          }
        >
          <Suspense>
            <ThreeDCanvas
              gl={glSetting as never}
              shadows={false}
              frameloop={'always'}
              dpr={[1, 1]}
              style={{
                background: 'transparent',
                height: '100%',
                width: '100%',
              }}
            >
              <ThreeDModel post={post} />
            </ThreeDCanvas>
          </Suspense>
        </div>
        <div className={'flex flex-2/3 flex-col gap-2'}>
          <p className="mt-5 text-xl font-medium md:text-2xl lg:text-3xl">
            {post.title}
          </p>
          <p className="text-muted-foreground text-sm md:text-lg">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </p>
          <p className="text-muted-foreground text-sm md:text-lg">
            {post.description}
          </p>
          <p className="text-muted-foreground text-sm opacity-80">
            {Math.round(post.readingTime.minutes)} minutes
          </p>
        </div>
      </div>
    </>
  );
}

export function ThreeDModel(props: PostItemProps) {
  const { post } = props;
  const sizes = useWindowSize();

  const model = useMemo(() => {
    const geometry = eval(post.geometryCode)(THREE);
    const material = new CustomShaderMaterial({
      baseMaterial: THREE.MeshBasicMaterial as never,
      vertexShader: GLSL.PostGeometryVertexShader,
      fragmentShader: GLSL.PostGeometryFragmentShader,
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(
            sizes.pixelRatio * sizes.width,
            sizes.pixelRatio * sizes.height,
          ),
        },
        uPointColor: { value: new THREE.Color(HAFLTON_POINT_COLOR) },
        uColor: { value: new THREE.Color(HALFTON_COLOR) },
        uGrid: { value: GRID() },
      },
    });

    return new THREE.Mesh(geometry, material as never);
  }, [post.geometryCode, sizes]);

  useFrame((tick) => {
    const clock = tick.clock;
    const elapsed = clock.getElapsedTime();
    if (model) {
      model.rotation.x = elapsed * 0.2;
      model.rotation.y = elapsed * 0.1;
      model.rotation.z = elapsed * 0.1;
    }
  });

  return (
    <>
      <primitive
        object={model}
        scale={responsiveMatch(
          2.2,
          [Responsive.XXL, 1.8],
          [Responsive.MEDIUM, 1.5],
        )}
      />
    </>
  );
}
