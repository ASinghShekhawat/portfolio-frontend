import { motion, useReducedMotion } from "framer-motion";

export const Stagger = ({
  as: Component = "div",
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0.1,
  once = true,
  amount = 0.15,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[Component] || motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: reduce
            ? {}
            : { staggerChildren: stagger, delayChildren },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export const StaggerItem = ({
  as: Component = "div",
  children,
  className = "",
  y = 18,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[Component] || motion.div;

  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Stagger;
