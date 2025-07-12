import { forwardRef, ReactNode, Ref } from 'react';

import { Canvas, CanvasProps } from '@react-three/fiber';
import { omit } from 'lodash';

export interface ThreeDCanvasProps extends CanvasProps {
  background?: ReactNode;
}

export const ThreeDCanvas = forwardRef(
  (
    props: ThreeDCanvasProps & React.RefAttributes<HTMLCanvasElement>,
    ref: Ref<HTMLCanvasElement>,
  ) => {
    return (
      <Canvas
        linear={true}
        flat={true}
        {...props}
        gl={{
          alpha: true,
          preserveDrawingBuffer: true,
          antialias: true,
          ...(props.gl || {}),
        }}
        ref={ref}
        {...omit(props, ['children', 'gl'])}
        style={props.style}
      >
        {props.children}
      </Canvas>
    );
  },
);
