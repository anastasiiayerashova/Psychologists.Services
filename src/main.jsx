import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './components/App.jsx'
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
          <StyledEngineProvider>
              <App />
          </StyledEngineProvider>
      </BrowserRouter>
  </Provider>
)
