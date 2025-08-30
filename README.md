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
- Indicar até 5 amigos para consultas
- Acompanhar status das indicações em tempo real
- Ganhar **20% de desconto por conversão** (máximo 100%)
- Interface moderna e intuitiva

---

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **React Router DOM** - Roteamento client-side
- **Tailwind CSS** - Estilização moderna
- **LocalStorage** - Persistência de dados
- **JavaScript ES6+** - Linguagem

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ e npm
- Navegador moderno

### Instalação
```bash
# Clone e acesse o projeto
git clone [URL_DO_REPOSITORIO]
cd indicacao

# Instale dependências
npm install

# Execute em desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build para produção
npm run build
```

---

## 💻 Como Usar

1. **Cadastro**: Crie conta em `/register`
2. **Login**: Acesse com email/senha
3. **Dashboard**: Veja estatísticas e histórico
4. **Nova Indicação**: Preencha dados da pessoa indicada
5. **Acompanhar**: Monitore status e descontos

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
3. Crie indicações (máximo 5)
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

---

## 📋 Regras de Negócio

- **Limite**: 5 indicações por usuário
- **Validação**: Email único, senha segura
- **Desconto**: 20% por conversão (máx. 100%)
- **Estados**: Pendente → Convertida/Cancelada
- **Termos**: Aceite obrigatório por indicação

---

## 📞 Informações

**Desenvolvido como:** Desafio Técnico - Desenvolvedor  
**Data:** Agosto 2025  

---

<div align="center">

**Desenvolvido como desafio técnico**

</div>