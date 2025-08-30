import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IndicacaoPage() {
  const navigate = useNavigate();
  
  // Estado para os dados do indicador (preenchidos automaticamente)
  const [indicador, setIndicador] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  // Estado para UMA ÚNICA indicação por vez
  const [indicado, setIndicado] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  // Estado para aceite dos termos
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [mostrarTermos, setMostrarTermos] = useState(false);

  // Estados para dashboard
  const [minhasIndicacoes, setMinhasIndicacoes] = useState([]);
  const [mostrarDashboard, setMostrarDashboard] = useState(true);

  // Pegar dados do usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

  // useEffect com dependências específicas
  useEffect(() => {
    // Verificar se usuário está logado
    if (!usuarioLogado.id) {
      navigate('/login');
      return;
    }

    // Preencher dados do indicador automaticamente
    if (usuarioLogado.name) {
      setIndicador({
        nome: usuarioLogado.name,
        email: usuarioLogado.email || '',
        telefone: usuarioLogado.telefone || ''
      });
    }

    // Carregar indicações do usuário
    carregarIndicacoes();
  }, [usuarioLogado.id, usuarioLogado.name, usuarioLogado.email, navigate]);

  // Função para carregar indicações
  const carregarIndicacoes = () => {
    const todasIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    const indicacoesDoUsuario = todasIndicacoes.filter(
      indicacao => indicacao.usuario?.id === usuarioLogado.id
    );
    setMinhasIndicacoes(indicacoesDoUsuario);
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    const totalIndicacoes = minhasIndicacoes.length;
    const indicacoesPendentes = minhasIndicacoes.filter(ind => ind.status === 'pendente').length;
    const indicacoesConvertidas = minhasIndicacoes.filter(ind => ind.status === 'convertida').length;
    const desconto = Math.min(indicacoesConvertidas * 20, 100); // 20% por conversão, máximo 100%
    
    return {
      totalIndicacoes,
      indicacoesPendentes,
      indicacoesConvertidas,
      desconto,
      podeIndicarMais: totalIndicacoes < 5
    };
  };

  const stats = calcularEstatisticas();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  // Atualizar dados do indicado
  const handleIndicadoChange = (field, value) => {
    setIndicado({ ...indicado, [field]: value });
  };

  // Validar formulário
  const validarFormulario = () => {
    if (!indicado.nome.trim() || !indicado.telefone.trim()) {
      alert('Nome e telefone do indicado são obrigatórios!');
      return false;
    }

    if (!aceitouTermos) {
      alert('Você deve aceitar os termos e condições!');
      return false;
    }

    // Verificar se já atingiu o limite de 5 indicações
    if (!stats.podeIndicarMais) {
      alert('Você já atingiu o limite máximo de 5 indicações!');
      return false;
    }

    return true;
  };

  // Salvar indicação
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    const novaIndicacao = {
      id: Date.now(),
      indicador,
      indicado, // Apenas 1 pessoa por indicação
      usuario: usuarioLogado,
      dataIndicacao: new Date().toISOString(),
      status: 'pendente' // pendente, convertida, cancelada
    };

    // Salvar no localStorage
    const indicacoesExistentes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    indicacoesExistentes.push(novaIndicacao);
    localStorage.setItem('indicacoes', JSON.stringify(indicacoesExistentes));

    alert('Indicação cadastrada com sucesso!');
    
    // Resetar formulário
    setIndicado({ nome: '', email: '', telefone: '' });
    setAceitouTermos(false);
    
    // Recarregar indicações
    carregarIndicacoes();
    
    // Voltar para dashboard
    setMostrarDashboard(true);
  };

  // Cancelar indicação pendente
  const cancelarIndicacao = (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja cancelar esta indicação?');
    if (!confirmacao) return;

    const todasIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    const indicacoesAtualizadas = todasIndicacoes.map(indicacao => 
      indicacao.id === id && indicacao.status === 'pendente'
        ? { ...indicacao, status: 'cancelada' }
        : indicacao
    );
    
    localStorage.setItem('indicacoes', JSON.stringify(indicacoesAtualizadas));
    carregarIndicacoes();
    alert('Indicação cancelada com sucesso!');
  };

  // Simular conversão (para demonstração)
  const simularConversao = (id) => {
    const todasIndicacoes = JSON.parse(localStorage.getItem('indicacoes') || '[]');
    const indicacoesAtualizadas = todasIndicacoes.map(indicacao => 
      indicacao.id === id && indicacao.status === 'pendente'
        ? { ...indicacao, status: 'convertida', dataConversao: new Date().toISOString() }
        : indicacao
    );
    
    localStorage.setItem('indicacoes', JSON.stringify(indicacoesAtualizadas));
    carregarIndicacoes();
    alert('Indicação convertida! Seu desconto foi atualizado.');
  };

  // Se não tem usuário logado, não renderiza nada
  if (!usuarioLogado.id) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header com logout */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <img src="/LogoClinicaDaCidade.jpg" alt="Logo" className="rounded-md mx-auto h-20 w-auto mb-4"/>
          <h1 className="text-3xl font-bold text-white mb-2">Programa Indique e Ganhe</h1>
          <p className="text-gray-300">Indique até 5 amigos e ganhe descontos progressivos!</p>
          <p className="text-sm text-gray-400 mt-2">
            Bem-vindo(a), <span className="text-blue-400">{usuarioLogado.name}</span>
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Navegação */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setMostrarDashboard(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mostrarDashboard 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          📊 Meu Dashboard
        </button>
        <button
          onClick={() => setMostrarDashboard(false)}
          disabled={!stats.podeIndicarMais}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !mostrarDashboard 
              ? 'bg-blue-600 text-white' 
              : stats.podeIndicarMais
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          ➕ Nova Indicação {!stats.podeIndicarMais && '(Limite atingido)'}
        </button>
      </div>

      {mostrarDashboard ? (
        /* DASHBOARD */
        <div className="space-y-6">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/50 rounded-lg p-4">
              <h3 className="text-blue-300 text-sm font-medium">Total de Indicações</h3>
              <p className="text-2xl font-bold text-white">{stats.totalIndicacoes}/5</p>
            </div>
            <div className="bg-yellow-900/50 rounded-lg p-4">
              <h3 className="text-yellow-300 text-sm font-medium">Pendentes</h3>
              <p className="text-2xl font-bold text-white">{stats.indicacoesPendentes}</p>
            </div>
            <div className="bg-green-900/50 rounded-lg p-4">
              <h3 className="text-green-300 text-sm font-medium">Convertidas</h3>
              <p className="text-2xl font-bold text-white">{stats.indicacoesConvertidas}</p>
            </div>
            <div className="bg-purple-900/50 rounded-lg p-4">
              <h3 className="text-purple-300 text-sm font-medium">Seu Desconto</h3>
              <p className="text-2xl font-bold text-white">{stats.desconto}%</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Progresso do Desconto</h3>
            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${stats.desconto}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0%</span>
                <span>20%</span>
                <span>40%</span>
                <span>60%</span>
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              {stats.desconto < 100 
                ? `Você precisa de ${Math.ceil((100 - stats.desconto) / 20)} conversões para o próximo nível!`
                : '🎉 Parabéns! Você atingiu o desconto máximo!'
              }
            </p>
          </div>

          {/* Lista de Indicações */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Suas Indicações ({stats.totalIndicacoes}/5)</h3>
            {minhasIndicacoes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Você ainda não fez nenhuma indicação.</p>
                <button
                  onClick={() => setMostrarDashboard(false)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Fazer Primeira Indicação
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {minhasIndicacoes.map((indicacao, index) => (
                  <div key={indicacao.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-medium">Indicação #{index + 1}</h4>
                        <p className="text-gray-300 text-sm">
                          <strong>{indicacao.indicado.nome}</strong> - {indicacao.indicado.telefone}
                        </p>
                        {indicacao.indicado.email && (
                          <p className="text-gray-400 text-sm">{indicacao.indicado.email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block mb-2">
                          {new Date(indicacao.dataIndicacao).toLocaleDateString('pt-BR')}
                        </span>
                        <div className="flex items-center space-x-2">
                          {/* Status Badge */}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            indicacao.status === 'pendente' 
                              ? 'bg-yellow-900/50 text-yellow-300'
                              : indicacao.status === 'convertida'
                                ? 'bg-green-900/50 text-green-300'
                                : 'bg-red-900/50 text-red-300'
                          }`}>
                            {indicacao.status === 'pendente' && '⏳ Pendente'}
                            {indicacao.status === 'convertida' && '✅ Convertida'}
                            {indicacao.status === 'cancelada' && '❌ Cancelada'}
                          </span>
                          
                          {/* Botões de Ação */}
                          {indicacao.status === 'pendente' && (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => simularConversao(indicacao.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                                title="Simular conversão"
                              >
                                ✅
                              </button>
                              <button
                                onClick={() => cancelarIndicacao(indicacao.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                                title="Cancelar indicação"
                              >
                                ❌
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FORMULÁRIO DE NOVA INDICAÇÃO */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Indicador (Bloqueados) */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Seus Dados (Vinculados à sua conta)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={indicador.nome}
                  disabled
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={indicador.email}
                  disabled
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={indicador.telefone}
                  disabled
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              💡 Estes dados vêm da sua conta. Para alterá-los, edite seu perfil.
            </p>
          </div>

          {/* Dados do Indicado */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Pessoa que você quer indicar</h2>
              <span className="text-sm text-gray-400">Indicação {stats.totalIndicacoes + 1}/5</span>
            </div>

            <div className="border border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={indicado.nome}
                    onChange={(e) => handleIndicadoChange('nome', e.target.value)}
                    placeholder="Nome do indicado"
                    className="w-full px-3 py-2 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    E-mail (opcional)
                  </label>
                  <input
                    type="email"
                    value={indicado.email}
                    onChange={(e) => handleIndicadoChange('email', e.target.value)}
                    placeholder="E-mail do indicado"
                    className="w-full px-3 py-2 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={indicado.telefone}
                    onChange={(e) => handleIndicadoChange('telefone', e.target.value)}
                    placeholder="Telefone do indicado"
                    className="w-full px-3 py-2 rounded-md bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Termos e Condições */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="termos"
                checked={aceitouTermos}
                onChange={(e) => setAceitouTermos(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="termos" className="text-sm text-gray-100">
                  Li e aceito os{' '}
                  <button
                    type="button"
                    onClick={() => setMostrarTermos(true)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    termos e condições
                  </button>
                  {' '}do programa Indique e Ganhe *
                </label>
              </div>
            </div>
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={!stats.podeIndicarMais}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
              stats.podeIndicarMais
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {stats.podeIndicarMais ? 'Cadastrar Indicação' : 'Limite de 5 indicações atingido'}
          </button>
        </form>
      )}

      {/* Modal dos Termos */}
      {mostrarTermos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Termos e Condições - Programa Indique e Ganhe</h3>
            <div className="text-sm text-gray-300 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">1. Funcionamento do Programa:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>O indicador pode indicar até 5 pessoas.</li>
                  <li>Cada indicação que se converte em uma consulta gera um desconto de 20% para o indicador.</li>
                  <li>O desconto é progressivo e acumulativo:</li>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>1 indicado convertido = 20% de desconto</li>
                    <li>2 indicados convertidos = 40% de desconto</li>
                    <li>3 indicados convertidos = 60% de desconto</li>
                    <li>4 indicados convertidos = 80% de desconto</li>
                    <li>5 indicados convertidos = 100% de desconto (consulta gratuita)</li>
                  </ul>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">2. Validade do Benefício:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>O indicador receberá o desconto 30 dias após a primeira indicação ser convertida.</li>
                  <li>O benefício tem validade de 60 dias corridos após sua liberação para ser utilizado.</li>
                  <li>Se não for utilizado dentro do prazo, o desconto expira automaticamente.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">3. Regras Gerais:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>O benefício é pessoal, intransferível e validado pelo CPF do indicador.</li>
                  <li>O desconto aplica-se apenas a consultas e não pode ser trocado por dinheiro ou outros serviços.</li>
                  <li>Não é cumulativo com outras promoções vigentes.</li>
                  <li>Cada pessoa indicada só pode ser contabilizada como conversão uma única vez.</li>
                  <li>A clínica se reserva o direito de verificar a autenticidade das indicações e desclassificar fraudes, além de poder alterar ou encerrar o programa mediante comunicação prévia.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">4. Aceitação:</h4>
                <p className="ml-4">Ao participar do programa, o indicador declara estar ciente e de acordo com todos os termos descritos.</p>
              </div>
            </div>
            <button
              onClick={() => setMostrarTermos(false)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndicacaoPage;