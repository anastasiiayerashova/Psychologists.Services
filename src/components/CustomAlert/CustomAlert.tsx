import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { carListSnackbarSx, carListAlertSx } from '../../styles/muiStyles.ts';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions'
import { AlertProps } from '../../types/PropsTypes.ts';

function FadeTransition(props: TransitionProps & { children: React.ReactElement }) {
  return <Fade {...props} />;
}

const CustomAlert = ({children, openSnackbar, handleSnackbarClose, severity = 'warning', alertSx = {}, anchorOrigin}: AlertProps) => {

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            slots={{transition: FadeTransition}}
            anchorOrigin={ anchorOrigin || { vertical: 'top', horizontal: 'center' }} 
            sx={carListSnackbarSx}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={severity}
                // variant="filled"
                sx={{...carListAlertSx, ...alertSx}}>
                {children}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert