import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { carListSnackbarSx, carListAlertSx } from '../../styles/muiStyles.js';

const CustomAlert = ({children, openSnackbar, handleSnackbarClose, severity = 'warning', alertSx = {}, anchorOrigin}) => {

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={ anchorOrigin || { vertical: 'top', horizontal: 'center' }} 
            sx={carListSnackbarSx}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={severity}
                variant="filled"
                sx={{...carListAlertSx, ...alertSx}}>
                {children}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert