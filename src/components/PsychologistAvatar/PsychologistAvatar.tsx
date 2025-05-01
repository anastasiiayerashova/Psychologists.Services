import s from './PsychologistAvatar.module.css'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { PsychologistAvatarProps } from '../../types/PropsTypes';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    top: '4px',
    right: '4px',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const PsychologistAvatar = ({ data }: PsychologistAvatarProps) => {
    
    const { avatar_url, name } = data
    
    return (
        <div className={s.wrapper}>
            <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            variant="dot"
            >
                <Avatar src={avatar_url} alt={name} sx={{
                    borderRadius: '15px',
                        width: {
                            xs: 60,     
                            sm: 66,     
                            lg: 96      
                        },
                        height: {
                            xs: 58,
                            sm: 68,
                            lg: 96
                        }  
                }}
                />
            </StyledBadge>
        </div>
    )
 }

export default PsychologistAvatar