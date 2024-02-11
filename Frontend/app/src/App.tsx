import { useEffect, useState } from 'react';
import './main-styles/App.css'
import AppRoutes from './Routes';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <h1>data:</h1>
      <h1>{data}</h1>
      <AppRoutes/>
    </>
  )
}

export default App
