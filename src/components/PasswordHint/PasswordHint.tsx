import TaskAltIcon from '@mui/icons-material/TaskAlt';
import s from './PasswordHint.module.css'
import { PasswordHintProps } from '../../types/PropsTypes';


const PasswordHint = ({ condition, text }: PasswordHintProps) => {

    return (
         <div className={s.hintRow}>
            <TaskAltIcon sx={{ color: condition ? 'var(--green)' : '#9e9e9e', fontSize: 16 }} />
            <p style={{ color: condition ? 'var(--green)' : '#9e9e9e', marginLeft: 8 }}>{text}</p>
         </div>
    )
 }

export default PasswordHint