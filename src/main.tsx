import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './components/App.tsx'
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './redux/store.ts';
import { HeadProvider } from 'react-head';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <BrowserRouter>
            <StyledEngineProvider>
                <HeadProvider>
                    <App />
                </HeadProvider>
          </StyledEngineProvider>
      </BrowserRouter>
  </Provider>
)
