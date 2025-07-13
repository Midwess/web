'use client';

import { useCallback, useEffect, useRef } from 'react';

import { DotLottie } from '@lottiefiles/dotlottie-web';

export default function Lottie(props: any) {
  // eslint-disable-next-line prefer-const
  let { className = '', file = '' } = props || {};

  file = file.includes('http')
    ? file
    : `${process.env.NEXT_PUBLIC_PATH_PREFIX || ''}${file}`;

  const canvasRef = useRef<HTMLCanvasElement | undefined>(null);

  const lottieFile = useRef<DotLottie>(null);

  if (!file) throw new Error('Lottie file must be defined');

  const onFrameChanged = useCallback(() => {}, []);

  useEffect(() => {
    if (!file || !canvasRef.current) return;

    lottieFile.current = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: canvasRef.current!,
      src: file,
    });

    lottieFile.current.addEventListener('frame', onFrameChanged);

    return () => {
      lottieFile.current?.removeEventListener('frame', onFrameChanged);
    };
  }, [canvasRef.current, file]);

  return (
    <div className={`grid overflow-clip`} style={{ gridArea: '1/1' }}>
      <div style={{ gridArea: '1/1', pointerEvents: 'none' }}>
        <div className="h-full w-full bg-[linear-gradient(to_right,#0A9396_1px,transparent_2px),linear-gradient(to_bottom,#0A9396_1px,transparent_2px)] bg-[size:6rem_4rem] opacity-20"></div>
      </div>
      <div
        className={`h-full w-full ${className} flex flex-col items-center justify-center bg-transparent`}
        style={{ gridArea: '1/1' }}
      >
        <canvas ref={canvasRef as any} className="h-full w-full" />
      </div>
    </div>
  );
}
