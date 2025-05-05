import TaskAltIcon from '@mui/icons-material/TaskAlt';
import s from './PasswordHint.module.css'
import { PasswordHintProps } from '../../types/PropsTypes';
import { motion } from 'framer-motion'


const PasswordHint = ({ condition, text }: PasswordHintProps) => {

    return (
       <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          exit={{ opacity: 0, x: -10 }}
          className={s.hintRow}>
            <TaskAltIcon sx={{ color: condition ? 'var(--green)' : '#9e9e9e', fontSize: 16 }} />
            <p style={{ color: condition ? 'var(--green)' : '#9e9e9e', marginLeft: 8 }}>{text}</p>
      </motion.div>
    )
 }

export default PasswordHint