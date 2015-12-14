# Course MEAN Stack
Repository to Course of MEAN Stack

## Intro ao MEAN e a primeira rota

### Introdução ao MEAN-Stack
Bem vindo ao treinamento do MEAN-Stack. Durante desse treinamento usaremos algumas ferramentas como o node.js, mongoDB, AngularJS e Express. Essa interessante pilha de ferramentas nos permite trabalhar com JavaScript End-To-End, ou seja, do cliente até o banco de dados.

### Preparação do node.js e Express
A primeira coisa que precisamos é o node.js. Entraremos na página dele: http://nodejs.org, onde podemos fazer o download do node.

Ao fazermos o download do node.js, baixaremos também automaticamente o npm, que é o gerenciador de pacotes do node.

O node é um ambiente de execução JavaScript que funciona sem o navegador. Basta rodar no terminal o comando node para executar algum código JavaScript, por exemplo:
```sh
console.log(4+1)
```
Queremos criar uma aplicação web mas apenas com o node.js não conseguiremos fazer muita coisa, então usaremos um framework para node, usaremos o famoso EXPRESS que se encontra no http://express.com.

Para usar Express, primeiro vamos criar o diretório da aplicação. No terminal:
```sh
mkdir catalogo-filmes
cd catalogo-filmes
```
> Observação: Nesse treinamento usaremos o editor Sublime para escrever o código fonte. Fique a vontade de usar o seu editor de texto favorito.

Dentro do diretório da nossa aplicação vamos usar o comando npm init para ter uma forma fácil de controlar quais módulos estamos utilizando no projeto. Esse comando criou automaticamente para nós o arquivo package.json na raiz do projeto.

Observação: Ao executar npm init aparecem algumas perguntas no terminal que você pode confirmar e deixar em branco para utilizar os valores padrões.

Para instalarmos o módulo do Express usaremos o comando:
```sh
npm install express --save
```
Usamos a opção --save para salvar este módulo no arquivo package.json.

Ao abrirmos o arquivo package.json podemos perceber a dependência do Express nele, na última linha:
```json
{
  "name": "catalogo-filmes",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.9.6"
  }
}
```
Também temos agora um diretório node_modulos e dentro dele todos os arquivos do Express:
```
catalogo-filmes
 |
 --node-modules
   |
   --express
      |
      --...
 package.json
```
### Inicializando o Express

Vamos começar a utilizar o Express. Criaremos um novo arquivo que chamamos de app.js. Nesse arquivo precisamos importar a dependência do Express. Para isso usaremos:
```js
var express = require('express');
```
O retorno express representa uma função que quando executada retorna o objeto da nossa aplicação:
```js
var app = express();
```
Criaremos um novo diretório chamado views, onde ficará toda a camada de visualização da nossa aplicação. Temos que declarar que o caminho para a camada views será o diretório que criamos views. Para isso usaremos o objeto path:
```js
app.set('views', path.join(__dirname, 'views'));
```
Só temos que importar também a nova dependência do path:
```js
var path = require('path');
```
Segue uma vez o código completo:
```js
var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
```
### Template Engine EJS

Para tirarmos o máximo aproveito do Express não utilizaremos HTML puro. Ao invés disso usaremos uma engine de template. Diversas engines estão disponíveis para Express, nesse treinamento usaremos o ejs. Adicione no arquivo app.js:

```js
app.set('view engine', 'ejs');
```
Para o ejs funcionar no nosso projeto temos que também instalar o módulo. No terminal digite:
```sh
npm install ejs --save
```
### Preparando a aplicação

Queremos que a nossa aplicação fique escutando a porta 3000. Mas quando deployamos a aplicação pode ser que a porta não esteja disponível, por isso usaremos process.env.PORT, que pegará a porta de uma variável de ambiente. Caso ela não exista, usaremos a porta 3000 mesmo:
```js
app.set('port', process.env.PORT || 3000);
```
Para podermos iniciar o servidor usaremos o método app.listen(..) e passaremos para ele a porta que definimos anteriormente:
```js
var server = app.listen(app.get('port'));
```
Usaremos uma função de callback para exibir uma mensagem indicando que o servidor foi iniciado:
```js
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
### A primeira view

Vamos agora criar nossa página principal no diretório views que chamaremos de index.ejs. No arquivo fica por enquanto um simples HTML:

```html
<!DOCTYPE html>
<html>
    <head>
    <head>
    <body>
        <h1>Bem vindo ao treinamento de MEAN Stack do Alura!</h1>
    </body>
</html>
```
### Roteando a view

Queremos mapear essa view para uma rota. Para isso criaremos o diretório routes e dentro dele o arquivo index.js. Repare na extensão que estamos usando agora, apenas .js e não .ejs.

Dentro do arquivo index.js criaremos a função index que receberá uma requisição e uma resposta. Essa função será responsável por renderizar a nossa view index:

Agora precisamos mapear essa função index para uma URL. Em nosso arquivo app.js importaremos o nosso arquivo de rotas:
```js
var routes = require('./routes');
```
E como recebemos uma requisição do tipo GET na URL /, invocaremos o método routes.index:
```js
app.get('/', routes.index);
```
### Iniciando nosso servidor
Vamos voltar para o terminal e testar a nossa aplicação:
```sh
node app
```
No terminal aparece a mensagem que o servidor foi iniciado na porta 3000.

Para acessar a aplicação abriremos a URL http://localhost:3000 no navegador. Deve aparecer a mensagem Bem vindo ao treinamento de MEAN Stack do Alura!.

### Conteúdo dos arquivos
app.js
```js
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', routes.index);
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
index.ejs
```html
<!DOCTYPE html>
<html>
    <head>
    <head>
    <body>
        <h1>Bem vindo ao treinamento de MEAN Stack do Alura!</h1>
    </body>
</html>
```
index.js
```js
exports.index = function(req, res) {
    res.render('index');
}
```
