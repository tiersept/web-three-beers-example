import { useRef, forwardRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

export const CanvasParent = forwardRef(({ children }, ref) => {
  const localRef = useRef();

  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden bg-default dom'>
      {children}
    </div>
  );
});

CanvasParent.displayName = 'CanvasParent';
