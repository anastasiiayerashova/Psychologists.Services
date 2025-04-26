import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { carListSnackbarSx, carListAlertSx } from '../../styles/muiStyles.js';
import Fade from '@mui/material/Fade';

function FadeTransition(props) {
  return <Fade {...props} direction="up" />;
}

const CustomAlert = ({children, openSnackbar, handleSnackbarClose, severity = 'warning', alertSx = {}, anchorOrigin}) => {

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