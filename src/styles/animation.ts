export const reviewsVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
  },
  visible: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: {
      duration: 0.3,
    },
  },
}

export const layoutVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const layoutTransition = {
  duration: 0.3,
  ease: 'easeIn',
}

export const leftSlide = {
  hidden: { x: -250, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const rightSlide = {
  hidden: { x: 250, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};