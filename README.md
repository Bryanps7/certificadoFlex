# CertificadoFlex

Aplicação web para gerar certificados personalizados a partir de imagens de fundo, com upload de arquivos, visualização de imagens e exportação em PDF.

## Funcionalidades

- Upload de imagens de fundo para usar nos certificados
- Seleção de imagem para cada certificado
- Geração de certificados em PDF
- Painel para cadastrar, listar, atualizar e apagar certificados salvos localmente
- Interface responsiva com modo claro/escuro

## Tecnologias

- Node.js
- Express
- Multer
- PDF-lib
- CORS
- HTML/CSS/JavaScript

## Estrutura do projeto

- `index.js` — servidor Express e endpoints de upload/listagem
- `index.html` — página inicial
- `public/` — frontend e assets
  - `criar-certificado.html` — página para criar certificados
  - `upload-background.html` — página para enviar imagens
  - `painel.html` — painel de gerenciamento
  - `assets/css/` — estilos
  - `assets/js/` — scripts da interface
  - `assets/uploads/` — imagens armazenadas

## Instalação

1. Clone o repositório
2. Entre na pasta do projeto
3. Instale as dependências:

```bash
npm install
```

## Execução

Para iniciar o servidor local:

```bash
node index.js
```

Ou com reinicialização automática durante desenvolvimento:

```bash
npm run cunha
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Uso

1. Acesse a página inicial
2. Faça upload de uma imagem na página de upload
3. Vá para a página de criação de certificados
4. Selecione a imagem desejada
5. Preencha os dados do certificado
6. Gere o PDF

## Observações

- Os certificados são salvos no `localStorage` do navegador no painel de gerenciamento.
- As imagens enviadas são armazenadas na pasta `public/assets/uploads`.

