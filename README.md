# Course MEAN Stack
Repository to Course of MEAN Stack - Locadora de movies

## 1. Intro ao MEAN e a primeira rota

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
mkdir catalogo-movies
cd catalogo-movies
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
  "name": "catalogo-movies",
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
catalogo-movies
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
      <title>Course MEAN by Laisson</title>
    </head>
    <body>
        <h1>Bem vindo ao treinamento de MEAN Stack - Movies!</h1>
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

Para acessar a aplicação abriremos a URL http://localhost:3000 no navegador. Deve aparecer a mensagem Bem vindo ao treinamento de MEAN Stack - Locadora de movies!.

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
      <title>Course MEAN by Laisson</title>
    </head>
    <body>
        <h1>Bem vindo ao treinamento de MEAN Stack - Movies!</h1>
    </body>
</html>
```
index.js
```js
exports.index = function(req, res) {
    res.render('index');
}
```

## 2. Angular com Express

Aprendemos no capítulo anterior como configurar o Express e criar rotas. Neste capítulo nos aprofundaremos um pouco mais no Express, inclusive utilizaremos o AngularJS para consumir e enviar dados para nosso servidor.

### Preparando nosso backend para retornar um movie

Primeiro, precisamos criar no Express uma função que retorne um movie. Para isso, vamos editar o arquivo routes/index.js adicionando mais uma rota, desta vez a /list:

```js
// routes/index.js
// no final do arquivo
exports.list = function(req, res) {
    res.json({
        title: 'Gangues de Nova Iorque', 
        director: 'Martin Scorsese', 
        year: 2002
    });
};
```
Nela, no lugar de usarmos a função res.render, utilizamos res.json que permite escrever para o navegador uma saída no formato JSON. Enviamos para o navegador informações como title, director e year do movie.

Lembre-se que isso ainda não é suficiente. Nossas funções precisam estar associados a URL's para que funcionem. Realizamos essa associação no arquivo app.js:

```js
// app.js
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', routes.index);
app.get('/list', routes.list); // nova associação da URL com a função
app.set('port', process.env.port || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
Vamos reiniciar nosso servidor e logo em seguida acessar o endereço: http://localhost:3000/list que deve exibir em seu navegador o JSON:

```json
{ "title" :  "Gangues de Nova Iorque", "director" : "Martin Scorsese", "year" : 2002 }
```
### Compartilhando a pasta public

Nosso próximo passo será compartilhar publicamente uma pasta de nosso servidor. Fazemos isso pelo próprio express adicionando o middleware express.static. Middlewares são utilizados para processar requisições. Cada middleware vai passando seu resultado para o próximo até que todos sejam aplicados:
```js
// app.js
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // compartilha a pasta public
app.get('/', routes.index);
app.get('/list', routes.list);
app.set('port', process.env.port || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
Compartilhamos a pasta public para permitir que scripts sejam acessados pelo navegador sem a necessidade de criarmos uma rota para cada um deles. Mas qual script nossa página index.ejs baixará? O AngularJS! Neste treinamento utilizaremos o Angular 1.2, porém no último capítulo veremos como migrar nosso código para sua versão 1.3. Por isso é importante utilizar esta [versão](https://s3.amazonaws.com/caelum-online-public/mean/angular.js).

### Ativando o AngularJS em nossa página

Em nossa página index.ejs importamos o AngularJS como último script antes do fechamento da tag body de index.ejs:

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html ng-app>
<head>
    <meta charset="UTF-8">
    <title>Course MEAN by Laisson</title>
</head>
<body ng-controller="MoviesController">
    <h1>Welcome to course of MEAN Stack - Movies</h1>
    <script src="/javascripts/angular.js"></script>
</body>
</html>
```
Adicionamos o atributo ng-app, que na verdade é uma diretiva do AngularJS. Ela indica que o elemento no qual ela foi adicionada será controlado pelo AngularJS. Diretivas ensinam novos truques para o navegador.

Como o AngularJS é um framework MVC, criaremos um controller que será responsável em disponibilizar um movie para a nossa view.

### Controller do AngularJS

Vamos criar o arquivo MoviesController.js dentro da pasta 'public/javascript'. Para não esquecermos, vamos importá-lo em nossa página index.ejs, inclusive vamos indicar que este controller será responsável pelo gerenciamento da tag body através da diretiva ng-controller. Nosso arquivo public/javascript/MoviesController.js fica assim:
```js
// public/javascript/MoviesController.js
function MoviesController() {
}
```
DICA: Até a versão 1.2 do AngularJS é possível declarar controllers desta forma. No último capítulo veremos a forma mais atual, porém o formato da versão 1.2 é bem didático para começarmos.

### Requisições Ajax com $http

Queremos que nosso controller do AngularJS chame a rota /list que retorna um movie. Porém, para que seja possível realizar requisições Ajax,utilizamos o serviço $http. Para termos acesso a esta serviço, precisamos recebê-lo como parâmetro em nosso Controller. É através da função $http.get que passamos o endereço que desejamos acessar. Mas onde obter o resultado da função? Fazemos isso encadeando uma chamada à função success que recebe como parâmetro um callback que nos dará acesso ao retorno do servidor:
```js
// public/javascript/MoviesController.js
function MoviesController($http) {
    $http.get('/list')
    .success(function(retorno) {
    });
}
```
Porém, precisamos disponibilizar para a view o retorno, em nosso caso, um movie. Fazemos isso através do objeto $scope, que também recebemos como parâmetro em nosso controller. Tudo que for adicionado nele estará disponível em nossa view através da Angular Expression (AE):
```js
// public/javascript/MoviesController.js
function MoviesController($http, $scope) {
    $http.get('/list')
    .success(function(retorno) {
        $scope.movie = retorno;
    });
}
```

### Associando Controller e View

Agora, em nossa view index.ejs usamos a Angular Expression (AE) para acessá-lo:
```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html ng-app>
<head>
    <meta charset="UTF-8">
    <title>Bem-vindo</title>
</head>
<body ng-controller="MoviesController">
    <h1>Bem-vindo ao treinamento de MEAN Stack - Movies!</h1>
    <p>{{movie}}<p>
    <script src="/javascript/angular.js"></script>
    <script src="/javascript/MoviesController.js"></script>
</body>
</html>
```
Excelente. Agora, basta acessarmos a URL http://localhost:3000. No lugar de vermos {{movie}} veremos impresso o JSON disponibilizado em $scope pelo AngularJS.

O que deve ser destacado é que $http será chamado quando nosso controller for inicializado pelo AngularJS. Sabendo disso, criaremos uma requisição que envia um movie para nosso servidor para depois imprimirmos seus dados no terminal, mas desta vez usando a função $http.post:
```js
// public/javascript/MoviesController.js
function MoviesController($http, $scope) {
    $http.get('/list')
    .success(function(retorno) {
        $scope.movie = retorno;
    });
    $http.post('/insert', { title: 'Gattaca', director:  'Andrew Nicool', year: 1997 })
    .success(function(retorno) {
        console.log(retorno);
    });
}
```
### Criando novas rotas no Express

Agora, precisamos criar uma resposta no Express para a URL /insert:
```js
// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.get('/list', routes.list);
app.post('/insert', routes.insert); // reposta para a URL /insert
app.set('port', process.env.port || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
Lembre-se que precisamos criar em routes/index.js a função insert:
```js
// routes/index.js
exports.index = function(req, res) {
    res.render('index');
};
exports.list = function(req, res) {
    res.json({
        title: 'Gangues de Nova Iorque', 
        director: 'Martin Scorsese', 
        year: 2002
    });
};
exports.insert = function(req, res) {
    var movie = req.body;
    console.log(movie);
    res.send('movie ' + movie.title  + ' recebido no servidor.');
};
```
### O middleware bodyParser

Repare que em nossa função estamos acessando através de req.body os dados enviados. Porém, isso só funcionará se tivermos o middleware body-parser ativado. Por isso precisamos realizar sua instalação primeiro no terminal através do npm:

```sh
npm install body-parser --save
```
Agora, precisamos ativar este middleware em nosso arquivo app.js, mas antes do middleware express.static:
```js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// adicionando o middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.get('/list', routes.list);
app.post('/insert', routes.insert);
app.set('port', process.env.port || 3000);
var server = app.listen(app.get('port'), function() {
    console.log('Servidor foi startado na porta ' + server.address().port);
});
```
Reiniciando o servidor, quando abrirmos a página http://localhost:3000, além de ser exibido os dados do movie trazidos do servidor, no terminal será impresso os dados do movie que enviamos para o servidor através do AngularJS.