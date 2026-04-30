import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RigCalcPro from './RigCalcPro.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RigCalcPro />
  </StrictMode>
);
