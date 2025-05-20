export const chatWindowVariants = {
  open: {
    height: 500,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  minimized: {
    height: 60,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const lottieVariants = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
  hidden: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};
