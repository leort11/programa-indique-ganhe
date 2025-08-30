import { Link, useNavigate } from 'react-router-dom';
import {  useState } from 'react';

function RegisterPage() {
    const navigate = useNavigate();

    // Estados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        referralCode: ''
    });
    const [erro, setErro] = useState('');

    // Função para validar a senha
    const validarSenha = (senha) => {
        if (senha.length < 6) {
            return 'A senha deve ter pelo menos 6 caracteres';
        }
        if (!/[0-9]/.test(senha)) {
            return 'A senha deve ter pelo menos 1 número';
        }
        return '';
    };

    // Atualizar dados do formulário
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar senha
        const erroSenha = validarSenha(formData.password);
        if (erroSenha) {
            setErro(erroSenha);
            return;
        }

        // Verifica se as senhas são iguais
        if (formData.password !== formData.confirmPassword) {
            setErro('As senhas não coincidem');
            return;
        }

        // Verificar se o email já existe
        const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const emailJaExiste = usuariosExistentes.find(user => user.email === formData.email);
        
        if (emailJaExiste) {
            setErro('Este email já está cadastrado');
            return;
        }

        // Criar novo usuário
        const novoUsuario = {
            id: Date.now(), // ID simples baseado no timestamp
            name: formData.name,
            email: formData.email,
            password: formData.password, 
            referralCode: formData.referralCode,
            dataCadastro: new Date().toISOString()
        };

        // Salvar no localStorage
        usuariosExistentes.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

        // Limpar erro e mostrar sucesso
        setErro('');
        alert('Conta criada com sucesso!');
        console.log('Usuário cadastrado:', novoUsuario);

        // Redirecionar para login
        navigate('/login');
    };

    return (
        <div className="w-full max-w-md mx-auto mt-16">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/LogoClinicaDaCidade.jpg" alt="Logo" className="rounded-md mx-auto h-20 w-auto"/>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Criar Conta
                    </h2>
                    <p className="text-gray-300 text-sm">
                        Preencha os dados para se cadastrar
                    </p>
                </div>

                {/* Formulário */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Nome */}
                    <div>
                        <label 
                            htmlFor="name"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Nome Completo
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            autoComplete="name"
                            placeholder="Digite seu nome completo"
                            className="w-full px-3 py-1.5 rounded-md bg-white/5  text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label 
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Digite seu e-mail"
                            className="w-full px-3 py-1.5 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label 
                            htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Digite sua senha"
                            className="w-full px-3 py-1.5 rounded-md bg-white/5  text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {/* Feedback visual */}
                        {formData.password && (
                            <div className="text-xs text-gray-400 mt-1">
                                <span className={formData.password.length >= 6 ? 'text-green-400' : 'text-red-400'}>
                                    {formData.password.length >= 6 ? '✓' : '✗'} Pelo menos 6 caracteres
                                </span>
                                {' | '}
                                <span className={/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}>
                                    {/[0-9]/.test(formData.password) ? '✓' : '✗'} Pelo menos 1 número
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirmar Senha */}
                    <div>
                        <label 
                            htmlFor="confirmPassword"
                            className="block text-sm/6 font-medium text-gray-100">
                            Confirmar Senha
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirme sua senha"
                            className="w-full px-3 py-1.5 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Mostrar erro se houver */}
                    {erro && (
                        <div className="text-red-400 text-sm">
                            {erro}
                        </div>
                    )}

                    {/* Código de Indicação (Opcional) */}
                    <div>
                        <label 
                            htmlFor="referralCode"
                            className="block text-sm/6 font-medium text-gray-100">
                            Código de Indicação (Opcional)
                        </label>
                        <input
                            id="referralCode"
                            type="text"
                            name="referralCode"
                            value={formData.referralCode}
                            onChange={handleInputChange}
                            placeholder="Digite o código se você foi indicado"
                            className="w-full px-3 py-1.5 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Botão de Cadastro */}
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Criar Conta
                    </button>
                </form>

                {/* Link para Login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;