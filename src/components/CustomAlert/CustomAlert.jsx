import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { carListSnackbarSx, carListAlertSx } from '../../styles/muiStyles.js';

const CustomAlert = ({children, openSnackbar, handleSnackbarClose}) => {

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            sx={carListSnackbarSx}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity="warning"
                variant="filled"
                sx={carListAlertSx}>
                {children}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert