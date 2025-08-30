import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [erro, setErro] = useState('');

  // Atualizar dados do formulário
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Buscar usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se o usuário existe e a senha está correta
    const usuarioEncontrado = usuarios.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (usuarioEncontrado) {
      // Login bem-sucedido
      // Salvar dados do usuário logado (sem a senha)
      const usuarioLogado = {
        id: usuarioEncontrado.id,
        name: usuarioEncontrado.name,
        email: usuarioEncontrado.email,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      setErro('');
      
      // Redirecionar para página de indicações
      navigate('/indicacoes');
    } else {
      // Login falhou
      setErro('Email ou senha incorretos');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* LOGO */}
        <img src="/LogoClinicaDaCidade.jpg" alt="Logo" className="rounded-md mx-auto h-20 w-auto"/>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Faça seu login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Endereço de E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                placeholder="Digite seu e-mail"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 sm:text-sm/6 "
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 sm:text-sm/6 "
              />
            </div>
          </div>

          {/* Mostrar erro se houver */}
          {erro && (
            <div className="text-red-400 text-sm text-center">
              {erro}
            </div>
          )}

          {/* Botão de entrar */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>

        {/* Cadastre-se */}
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Não possui uma conta?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;