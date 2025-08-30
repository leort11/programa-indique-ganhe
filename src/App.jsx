import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import IndicacaoPage from "./components/IndicacaoPage";

function App() {
  return (
    <Router>
      <div className= "w-screen min-h-screen bg-gray-900 flex justify-center p-6">
        <Routes>
          {/* Rota para Login */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rota para Cadastro */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Rota para a página principal */}
          <Route path="/indicacoes" element={<IndicacaoPage />} />

          {/* Rota padrão = Login */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;