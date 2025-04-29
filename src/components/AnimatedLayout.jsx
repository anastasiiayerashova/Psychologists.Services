import { motion } from "framer-motion"
import { layoutVariants, layoutTransition } from "../utils/animation.js"

const AnimatedLayout = ({ children }) => {
    
    return (
        <motion.div initial='hidden' animate='enter' exit='exit' variants={layoutVariants} transition={layoutTransition}>
            {children}
        </motion.div>
    )
}

export default AnimatedLayout