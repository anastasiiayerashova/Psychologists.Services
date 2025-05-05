export const carListSnackbarSx = {
    width: '85%', 
    height: '50px', 
    marginTop: '10px',
    fontSize: '14px',
    justifySelf: 'center',
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 'fit-content'
}


export const carListAlertSx = {
    width: '100%',
    height: '100%',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: 1.25,
    fontWeight: 400,
    borderRadius: '24px',
    color: 'var(--main)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiAlert-icon': {
    alignSelf: 'center',
    padding: 0,
  },
  '& .MuiAlert-message': {
    flexGrow: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  '& .MuiAlert-action': {
    alignSelf: 'center',
    padding: 0,
    marginRight: 0,
  },
}