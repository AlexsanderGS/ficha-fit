# FichaFit 💪

Aplicação web para organizar treinos de academia, cadastrar exercícios e acompanhar a rotina semanal de treinamento.

O **FichaFit** foi desenvolvido com HTML, CSS e JavaScript, com foco em uma interface simples, intuitiva e responsiva. O projeto permite organizar os exercícios de cada dia da semana e gerenciar os treinos diretamente pelo navegador.

## ✨ Funcionalidades

- **Cadastro de treinos:** crie treinos informando o nome e o dia da semana.
- **Cadastro de exercícios:** adicione vários exercícios a um mesmo treino.
- **Informações dos exercícios:** registre método, séries, repetições, carga e tempo de descanso.
- **Visualização semanal:** navegue pelos dias da semana e consulte os treinos cadastrados.
- **Edição de treinos:** atualize as informações de um treino existente.
- **Gerenciamento de exercícios:** adicione, edite e exclua exercícios.
- **Exclusão de treinos:** remova treinos cadastrados.
- **Seleção de data:** navegue pelo calendário para consultar a semana desejada.
- **Exportação em PDF:** gere uma versão para impressão dos treinos cadastrados.
- **Armazenamento local:** os dados são salvos no navegador por meio do `localStorage`.
- **Layout responsivo:** interface adaptada para diferentes tamanhos de tela.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da aplicação.
- **CSS3** — estilização, layout e responsividade.
- **JavaScript (ES6+)** — lógica da aplicação, manipulação do DOM e eventos.
- **JavaScript ES Modules** — organização do código em módulos.
- **Web Storage API (`localStorage`)** — persistência dos treinos no navegador.
- **Git e GitHub** — versionamento e hospedagem do código-fonte.
- **Vercel** — publicação da aplicação web.

## 📂 Organização do projeto

O projeto utiliza arquivos separados para organizar a estrutura, os estilos e a lógica da aplicação.

Entre os módulos JavaScript estão:

- `main.js` — inicialização e integração dos módulos.
- `training.js` — cadastro e gerenciamento dos treinos.
- `exercise.js` — gerenciamento dos campos de exercícios.
- `dashboard.js` — exibição dos treinos e exercícios no dashboard.

Os estilos CSS são organizados em arquivos próprios, incluindo estilos globais, componentes e regras de responsividade.

## 💾 Armazenamento dos dados

O FichaFit utiliza o `localStorage` do navegador para salvar os treinos.

Isso significa que:

- Os dados permanecem salvos após atualizar ou fechar a página, no mesmo navegador e dispositivo.
- Não é necessário criar uma conta para utilizar a aplicação.
- Os dados não são sincronizados automaticamente entre dispositivos ou navegadores.
- Limpar os dados do navegador pode apagar os treinos armazenados.

> **Importante:** esta versão não utiliza banco de dados remoto nem sistema de autenticação. Cada navegador mantém seus próprios dados localmente.

## ▶️ Como executar localmente

1. Faça o clone do repositório:

   ```bash
   git clone https://github.com/AlexsanderGS/ficha-fit.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd ficha-fit
   ```

3. Abra a pasta no Visual Studio Code.

4. Execute a aplicação utilizando uma extensão de servidor local, como o **Live Server**.

5. Abra no navegador o endereço local fornecido pela extensão.

> Como o projeto utiliza módulos JavaScript, é recomendado executá-lo por um servidor local, em vez de abrir o arquivo HTML diretamente pelo navegador.

## 🌐 Aplicação online

**Acesse:** [FichaFit — aplicação online](INSIRA_AQUI_A_URL_DA_VERCEL)

> Substitua o endereço acima pela URL gerada após o deploy na Vercel.

## 📱 Responsividade

A interface foi desenvolvida para se adaptar a diferentes resoluções, considerando:

- Dispositivos móveis.
- Tablets.
- Desktops.

## 🎯 Objetivo do projeto

O FichaFit foi desenvolvido como projeto prático de aprendizado e aplicação dos fundamentos de desenvolvimento front-end.

Durante o desenvolvimento, foram trabalhados conceitos como:

- Estruturação de páginas com HTML.
- Estilização e responsividade com CSS.
- Manipulação do DOM.
- Eventos e interação com o usuário.
- Arrays e objetos em JavaScript.
- Organização de código com módulos.
- Persistência de dados com `localStorage`.
- Versionamento com Git e GitHub.
- Publicação de aplicações web.

## 🚀 Próximos passos

O projeto poderá evoluir futuramente com funcionalidades como:

- Banco de dados remoto.
- Autenticação de usuários.
- Sincronização dos treinos entre dispositivos.
- Histórico de evolução de cargas.
- Acompanhamento de desempenho.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Alexsander**.

[GitHub — AlexsanderGS](https://github.com/AlexsanderGS)

---

**FichaFit** — organize seus treinos, acompanhe sua rotina e mantenha o foco nos seus objetivos. 💪
