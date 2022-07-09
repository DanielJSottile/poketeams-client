import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import useIsOnScreen from '../../../utils/customHooks/useIsOnScreen';

type AnimateOnScrollProps = {
  animateIn: string;
  animateOnce: boolean;
  children: ReactNode;
};

const AnimateOnScroll: FunctionComponent<AnimateOnScrollProps> = ({
  animateIn,
  animateOnce,
  children,
}) => {
  const [animatedIn, setAnimatedIn] = useState(false);
  const rootRef = useRef(null);
  const isOnScreen = useIsOnScreen(rootRef);

  useEffect(() => {
    if (!!animateOnce && !!isOnScreen) {
      setAnimatedIn(true);
    }
  }, [isOnScreen]);

  return (
    <div className={animatedIn ? animateIn : undefined} ref={rootRef}>
      {animatedIn ? children : null}
    </div>
  );
};

export default AnimateOnScroll;
