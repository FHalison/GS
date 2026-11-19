# PLUVIA — Soluções Anti-Inundação

**Global Solution 2026 | FIAP — Análise e Desenvolvimento de Sistemas**

O **Pluvia** é um projeto acadêmico voltado ao monitoramento de condições relacionadas a alagamentos. A plataforma web permite consultar e gerenciar regiões monitoradas, visualizar sensores e leituras hidrológicas e acompanhar os níveis de risco fornecidos pela API.

> **Aviso:** o Pluvia é um projeto acadêmico e não substitui alertas oficiais da Defesa Civil ou orientações de autoridades competentes.

## Acessos

- **Aplicação publicada (Vercel):** https://pluvia-xi.vercel.app/
- **Repositório do front-end (GitHub):** https://github.com/FHalison/GS
- **API Java (Render):** https://pluvial-api.onrender.com
- **Endpoint de regiões:** https://pluvial-api.onrender.com/api/regioes

A consulta e o cadastro de dados dependem da disponibilidade da API Java e do banco de dados conectado ao servidor. O serviço hospedado pode apresentar tempo de inicialização.

## Integrantes

| Integrante | RM | Atuação |
| --- | --- | --- |
| Francisco Halison | 573616 | Front-end React e módulo administrativo Python |
| Pedro Martins | 573299 | Inteligência Artificial e Banco de Dados |
| Gustavo Santos | 572560 | API Java e Engenharia de Software |

## Tecnologias do front-end

- React e TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Fetch API para comunicação HTTP com a API REST
- Vercel para hospedagem da interface

**Tecnologias utilizadas em outros módulos da solução:** Java com Spring Boot, Oracle, Python e modelos de aprendizado de máquina. Esses módulos possuem responsabilidades distintas e não estão necessariamente integrados à interface React.

## Funcionalidades

### Páginas da aplicação

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial e navegação para as principais funcionalidades |
| `/sobre` | Contexto, objetivo e tecnologias do projeto |
| `/regioes` | Consulta e gerenciamento de regiões cadastradas |
| `/monitoramento` | Consulta de sensores e leituras; cadastro de sensores e de novas leituras |
| `/faq` | Perguntas frequentes sobre o Pluvia |
| `/contato` | Formulário que prepara uma mensagem no aplicativo de e-mail do usuário |
| `/equipe` | Identificação dos integrantes, RMs e responsabilidades |

### Regiões

A página **Regiões** disponibiliza operações CRUD por meio da API Java:

- **GET** `/api/regioes`: listar regiões;
- **POST** `/api/regioes`: cadastrar uma região;
- **PUT** `/api/regioes/{id}`: atualizar uma região;
- **DELETE** `/api/regioes/{id}`: excluir uma região, respeitando as regras do backend.

A interface também oferece busca por nome ou cidade, sinalização do nível de risco e mensagens de carregamento ou erro.

### Monitoramento

A página **Monitoramento** consulta as regiões, os sensores e as leituras cadastradas. Permite:

- listar sensores (`GET /api/sensores`) e leituras (`GET /api/leituras`);
- cadastrar sensores (`POST /api/sensores`), vinculados a uma região;
- registrar leituras (`POST /api/sensores/{id}/leituras`) para sensores ativos;
- acompanhar a quantidade de regiões, sensores e leituras retornada pela API.

A classificação de risco da região é determinada pelas regras do backend Java a partir das informações recebidas. Os níveis apresentados são **NORMAL, ATENCAO, ALERTA e EMERGENCIA** (a grafia interna da API pode não conter acento).

## Arquitetura resumida

```text
Usuário / Navegador
        |
        v
React + TypeScript + Tailwind (Vercel)
        |
        | Requisições HTTP / JSON
        v
API REST Java / Spring Boot (Render)
        |
        v
Banco de dados Oracle
```

Além da aplicação web, o projeto contempla um módulo **Python** para cadastro, moderação, pesquisa e relatórios de ocorrências, com persistência JSON e exportação CSV; e um módulo de **Inteligência Artificial** voltado à análise e à previsão de condições hidrológicas. Esses módulos são complementares; este repositório documenta principalmente a interface React.

## Como executar localmente

### Pré-requisitos

- Node.js em versão compatível com o Vite instalado;
- npm;
- acesso à internet para consumir a API hospedada.

```bash
git clone https://github.com/FHalison/GS.git
cd GS
npm install
npm run dev
```

Abra a URL local indicada pelo terminal (geralmente `http://localhost:5173/`).

### Comandos disponíveis

```bash
npm run dev      # Ambiente de desenvolvimento
npm run build    # Verificação TypeScript e build de produção
npm run preview  # Prévia do build gerado
npm run lint     # Verificação estática com ESLint
```

### Endereço da API

O projeto usa, por padrão, a URL `https://pluvial-api.onrender.com`. É possível indicar outro servidor por meio da variável de ambiente do Vite:

```env
VITE_API_URL=https://pluvial-api.onrender.com
```

Crie o arquivo `.env.local` na raiz do projeto caso precise alterar a URL. Reinicie o servidor de desenvolvimento após modificar variáveis de ambiente. **Não inclua senhas ou credenciais nesse arquivo do front-end.**

## Roteiro rápido de demonstração

1. Abra a aplicação publicada e navegue pelas páginas **Início**, **Sobre**, **FAQ** e **Equipe**.
2. Entre em **Regiões** e aguarde o carregamento dos dados da API.
3. Cadastre uma região de teste, localize-a na listagem, edite seus dados e, se não possuir sensores vinculados, exclua-a.
4. Em **Monitoramento**, selecione uma região existente e cadastre um sensor de teste.
5. Registre uma leitura em um sensor ativo e verifique a atualização dos dados apresentados.
6. Se a API estiver indisponível, observe as mensagens de erro em vez de assumir que o front-end armazena registros localmente.

## Limitações e observações

- A disponibilidade dos dados depende da API Java e do banco Oracle.
- O projeto não deve ser utilizado como sistema oficial de alerta ou tomada de decisão em emergências.
- A tela de contato **não possui backend de envio de mensagens**: ela abre a composição de um e-mail no cliente configurado pelo usuário.
- A interface web consome dados da API Java; o módulo Python e os modelos de IA não são apresentados aqui como serviços integrados diretamente ao React.
- O backend pode impedir a exclusão de regiões que tenham sensores associados e o registro de leituras em sensores inativos.

---

**FIAP — Global Solution 2026 | Pluvia**
