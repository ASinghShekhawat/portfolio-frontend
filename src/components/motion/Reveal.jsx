import { motion, useReducedMotion } from "framer-motion";

const directions = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export const Reveal = ({
  as: Component = "div",
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.2,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const offset = reduce ? directions.none : directions[direction] || directions.up;
  const MotionTag = motion[Component] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
