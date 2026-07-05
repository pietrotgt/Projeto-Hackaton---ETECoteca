# 📚 ETECoteca

Projeto desenvolvido durante um **Hackathon da Etec**, criado por uma equipe (Equipe 8) formada por alunos do 1º ao 3º ano do curso técnico de **Desenvolvimento de Sistemas**.

## 💡 Sobre o projeto

A biblioteca da nossa Etec ficou sem um bibliotecário responsável, o que dificultava o controle de empréstimos, devoluções e o cadastro de livros e alunos. Para resolver esse problema, desenvolvemos o **ETECoteca**: um sistema web que automatiza as principais tarefas de um bibliotecário, permitindo que a própria comunidade escolar registre empréstimos, consulte perfis e acompanhe prazos sem depender de um funcionário fixo no local.

## ⚙️ Funcionalidades

- **Busca por RM**: consulta o perfil de alunos e professores digitando o RM, com sugestões automáticas de autocompletar enquanto o usuário digita.
- **Perfil do usuário**: exibe nome, RM, ocupação (aluno/professor) e turma, além da lista de livros já retirados e dos empréstimos ativos.
- **Registro de empréstimo**: simula a leitura de código de barras do livro (13 dígitos) junto ao RM do aluno (5 dígitos) para registrar um novo empréstimo.
- **Prazo de devolução dinâmico**: o prazo é calculado automaticamente com base na frequência do aluno — 30 dias para frequência igual ou acima de 75%, e 15 dias para os demais casos.
- **Renovação de empréstimos**: cada empréstimo pode ser renovado até 2 vezes (7 dias a mais por renovação); ao atingir o limite, o empréstimo é marcado como "penalizado".
- **Verificação automática de atrasos**: uma rotina verifica periodicamente os empréstimos ativos e marca como "atrasado" aqueles que passaram da data prevista.
- **Persistência local**: os dados de pessoas e empréstimos são salvos no `localStorage` do navegador, com migração automática de registros salvos em formatos antigos.
- **Validações de entrada**: os campos de RM e código de barras aceitam apenas números e respeitam o tamanho correto, evitando registros inválidos.

## 🖥️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** (puro, sem frameworks)
- **Bootstrap 5.3** (estilização de formulários e componentes)

## 📁 Estrutura do projeto

```
etecoteca/
├── index.html      # Estrutura da página (busca e registro de empréstimos)
├── script.js        # Lógica do sistema (busca, empréstimos, validações, persistência)
├── style.css         # Estilos visuais da aplicação
└── assets/           # Logos e imagens utilizadas no projeto
```

## 🚀 Como executar

Como é um projeto front-end simples (sem back-end ou banco de dados externo), basta:

1. Clonar o repositório:
   ```bash
   git clone https://github.com/pietrotgt/Projeto-Hackaton---ETECoteca.git
   ```
2. Entrar na pasta do projeto:
   ```bash
   cd Projeto-Hackaton---ETECoteca/etecoteca
   ```
3. Abrir o arquivo `index.html` diretamente no navegador.

Os dados de exemplo (alunos, professores e livros) já vêm pré-cadastrados no `script.js` para fins de teste e demonstração.

## 🔮 Possíveis melhorias futuras

- Integração com um banco de dados real (back-end) em vez do `localStorage`.
- Cadastro completo de novos livros e usuários pela interface, sem precisar editar o código.
- Sistema de login e permissões diferentes para alunos, professores e administradores.
- Notificações automáticas de atraso e proximidade da devolução.
- Leitura real de código de barras via câmera/scanner.

## 👥 Equipe

Projeto desenvolvido pela **Equipe 8** durante o Hackathon da Etec, com integrantes do 1º ao 3º ano do curso de Desenvolvimento de Sistemas.

## 📱 Redes

[Instagram do projeto](https://www.instagram.com/etecoteca/)
