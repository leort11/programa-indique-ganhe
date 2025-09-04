# 🎯 Programa Indique e Ganhe

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-cyan?style=for-the-badge&logo=tailwindcss)

### Sistema web para cadastro de indicações com descontos progressivos

[🚀 Como Executar](#-como-executar) • [✨ Funcionalidades](#-funcionalidades) • [💻 Como Usar](#-como-usar) • [🎯 Demo](#-testando-a-aplicação)

</div>

---

## 📖 Sobre o Projeto

Aplicação web desenvolvida como **desafio técnico** que permite aos usuários indicar amigos e ganhar descontos progressivos em consultas médicas.

### 🎯 Objetivo

Criar uma aplicação web onde o usuário pode cadastrar e logar em uma conta, indicar até 5 amigos, acompanhar os status das indicações com uma interface intuitiva e ganhando 20% de desconto por conversão (máximo 1000%).

---

## 🛠️ Tecnologias

  Framework: React.
  Estilização: TailWind CSS.
  Percistencia de dados: LocalStorage.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ e npm
- Navegador moderno

### Instalação
```bash
# Clone e acesse o projeto
git clone https://github.com/leort11/programa-indique-ganhe.git
cd programa-indique-ganhe

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev
# Acesse: http://localhost:3000
```

---

## 💻 Como Usar

1. Primeiro crie uma conta no botão **Cadastre-se** ou na URL: `/register`
3. Acesse sua conta na tela de login com email/senha que você usou no cadastro
4. Veja as estatísticas e histórico no seu Dashboard
5. vá para a area de indicação e preencha os dados da pessoa indicada
6. Acompanhe, Monitore status e descontos novamente no dashboard

---

## ✨ Funcionalidades

### 🔐 Autenticação Completa
- ✅ Cadastro com validação (senha: 6+ caracteres + 1 número)
- ✅ Login/logout funcionais
- ✅ Proteção de rotas privadas
- ✅ Emails únicos no sistema

### 📊 Dashboard Interativo
- ✅ Estatísticas em tempo real
- ✅ Barra de progresso dos descontos
- ✅ Histórico completo de indicações
- ✅ Gerenciamento de status

### 👥 Sistema de Indicações
- ✅ Máximo 5 indicações por usuário
- ✅ Campos obrigatórios: Nome e Telefone
- ✅ Email opcional
- ✅ Dados do indicador preenchidos automaticamente

### 💰 Descontos Progressivos
- 1 conversão = 20% desconto
- 2 conversões = 40% desconto
- 3 conversões = 60% desconto
- 4 conversões = 80% desconto
- 5 conversões = 100% desconto (consulta gratuita)

### 🎛️ Gerenciamento
- ✅ Status: Pendente/Convertida/Cancelada
- ✅ Cancelar indicações pendentes
- ✅ Simular conversões (demo)
- ✅ Termos e condições completos

---


## 🎯 Testando a Aplicação

### Fluxo Completo
```bash
1. Cadastre-se: nome@teste.com / senha123
2. Faça login
3. Crie indicações (máximo 5), aceitando os termos de condição
4. Simule conversões clicando no ✅
5. Observe o desconto aumentar
```

### Verificar Dados
```javascript
// Console do navegador (F12)
localStorage.getItem('usuarios')      // Usuários
localStorage.getItem('usuarioLogado') // Sessão atual
localStorage.getItem('indicacoes')    // Indicações
```
Existem apenas essas formas de consultar os dados, outros meios não vão ser desenvolvidos.

---

## 📞 Informações

**Desenvolvido como a solução de um Desafio Técnico para vaga de Desenvolvedor.**

Agosto 2025  

---

<div align="center">

**Desenvolvido por Leonardo Ângelo Figueiredo Muniz**

</div>
