import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showWaitScreen, setShowWaitScreen] = useState(false);

  const handleClick = async (tipoSenha) => {
    try {
      setShowWaitScreen(true);
      await axios.post(`http://localhost:5000/${tipoSenha}`);
      setTimeout(() => {
        setShowWaitScreen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setShowWaitScreen(false);
    }
  };

  return (
    <div className="App">
      <div><h1 className='titulo'>RETIRE SUA SENHA</h1></div>
      <Button onClick={() => handleClick('geral')} className="geral-btn">GERAL</Button>
      <Button onClick={() => handleClick('preferencial')} className="preferencial-btn">PREFERENCIAL</Button>
      {showWaitScreen && (
      <div className="wait-screen">
        <div className="overlay"></div>
         <div className="conteudo">
      <img src="https://i.imgur.com/JEFysfi.gif" alt="Loading" />
      <p>Aguarde a impressão...</p>
    </div>
  </div>
)}
    </div>
  );
}

export default App;
