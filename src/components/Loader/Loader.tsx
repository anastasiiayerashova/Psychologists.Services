import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgressWithLabelProps } from '../../types/PropsTypes';


function CircularProgressWithLabel({value}: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        color="success"
        sx={{
          color: 'var(--green)',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',     
          },
        }}
        size="3rem"
        thickness={4} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--green)',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'var(--green)' }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Loader() {
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <CircularProgressWithLabel value={progress} />
}