// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css'

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
    </>
  )
}

export default App
