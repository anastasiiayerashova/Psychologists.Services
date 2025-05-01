import { motion } from "framer-motion"
import { layoutVariants, layoutTransition } from "../utils/animation.ts"
import { AnimatedLayoutProps } from "../types/PropsTypes.ts"

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => {
    
    return (
        <motion.div initial='hidden' animate='enter' exit='exit' variants={layoutVariants} transition={layoutTransition}>
            {children}
        </motion.div>
    )
}

export default AnimatedLayout