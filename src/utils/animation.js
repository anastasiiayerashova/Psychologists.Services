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
      duration: 0.4,
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