'use client';

import { Suspense, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';
import { ArrowUpRight } from 'lucide-react';
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
  onClick?: () => void;
}

export const GRID = () => {
  if (typeof window !== 'undefined') {
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
  const { post, onClick } = props;

  const date = new Date(post.publishedDate || '');

  return (
    <div
      onClick={onClick}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card/50 transition-all duration-300 hover:border-orange-500/30 hover:bg-card hover:shadow-2xl hover:shadow-orange-500/5"
    >
      <div className="bg-cream/50 relative aspect-[4/3] w-full overflow-hidden border-b border-dashed border-border transition-colors group-hover:bg-cream">
        <Suspense>
          <ThreeDCanvas
            gl={glSetting as never}
            shadows={false}
            frameloop="always"
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
        
        <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 opacity-0 transition-all duration-300 backdrop-blur-sm group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
          <ArrowUpRight className="h-5 w-5 text-orange-500" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-orange-500 uppercase tracking-wider">
            Article
          </span>
          <span className="text-muted-foreground text-xs font-medium">
            {Math.round(post.readingTime.minutes)} min read
          </span>
        </div>
        
        <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight group-hover:text-orange-500 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-dashed border-border/50">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
        </div>
      </div>
    </div>
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
