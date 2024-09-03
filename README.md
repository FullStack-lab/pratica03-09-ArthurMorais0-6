# Prática da semana - API Rest, CRUD, Server com Node JS

Criar um objeto produto. Produto deve ter um fabricante representado por um elemento fabricante. Utilize detalhes como nome, endereço, etc. como elementos filhos de um elemento fabricante. Cada produto tem os elementos: nome do produto, preço unitário, quantidade e categoria. Insira 3 produtos neste objeto.

Utilize o método GET para através de um enpoint retornar todos os produtos deste objeto.

## Configuração do Ambiente

Criar a pasta lista-de-produtos e inicializar o Node.js

```prompt
mkdir lista-de-produtos // Cria a pasta
cd lista-de-produtos // Entra na pasta
npm init -y // Estrutura básica servidor node.js
npm install express // Instala a dependência express
npm install cors // Instala a dependência cors (Interação multiplataformas)
```

## Desenvolvimento do Backend (Node.js e Express)

- Criar arquivo 'index.js' para configurar o servidor:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Array de objetos produtos - Banco de dados falso
const produtos = [
    {
        nome: "Teclado Gamer",
        precoUnitario: 500,
        quantidade: 50,
        categoria: "Periféricos",
        fabricante: {
            nome: "GamerPro",
            endereco: "Rua das Pedras, 321, São Paulo, SP"
        }
    },
    {
        nome: "Teclado Mecânico",
        precoUnitario: 350,
        quantidade: 100,
        categoria: "Periféricos",
        fabricante: {
            nome: "TecLab",
            endereco: "Av. dos Jumentos, 456, Rio de Janeiro, RJ"
        }
    },
    {
        nome: "Monitor 4K",
        precoUnitario: 2500,
        quantidade: 30,
        categoria: "Eletrônicos",
        fabricante: {
            nome: "UltraVision",
            endereco: "Rua das Gramas, 789, Curitiba, PR"
        }
    }
];

// Endpoint para obter produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
```

- Executar o servidor

```prompt
node index.js
```

## Desenvolvimento do FrontEnd (HTML, CSS & JS)

- Criar o arquivo `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Produtos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Lista de Produtos</h1>
    <div id="produtosContainer" class="produtos-container"></div>

    <script src="script.js"></script>
</body>
</html>
```

- Criar o arquivo `style.css`:

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    color: #007BFF;
    margin-bottom: 20px;
}

.produtos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.produto-card {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

.produto-card h2 {
    margin-top: 0;
    color: #007BFF;
}

.produto-card p {
    margin: 5px 0;
}

.produto-card .fabricante {
    font-style: italic;
    color: #555;
}

```

- Criar o arquivo `script.js`:

```javascript
function consumirAPI() {
    fetch('http://localhost:3000/produtos')
    .then(response => response.json())
    .then(produtos => {
        const produtosContainer = document.getElementById('produtosContainer');
        produtosContainer.innerHTML = '';

        produtos.forEach(produto => {
            const produtoCard = document.createElement('div');
            produtoCard.classList.add('produto-card');

            produtoCard.innerHTML = `
                <h2>${produto.nome}</h2>
                <p><strong>Preço:</strong> R$ ${produto.precoUnitario.toFixed(2)}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Categoria:</strong> ${produto.categoria}</p>
                <p class="fabricante"><strong>Fabricante:</strong> ${produto.fabricante.nome}, ${produto.fabricante.endereco}</p>
            `;

            produtosContainer.appendChild(produtoCard);
        });
    })
    .catch(error => console.log('Erro ao carregar produtos: ', error));
}

window.onload = consumirAPI;
```

Agora, temos nosso frontend integrado à nossa API Rest no servidor backend, explorando o método GET dessa API conseguimos obter os produtos cadastrados no banco de dados simulado.

## **Criando um CRUD - Explorando todos métodos da API Rest**

Adiante, vamos expandir a aplicação anterior adicionando os demais métodos REST para completar a API:

- GET: Obter todos os produtos ou um produto específico.
- POST: Adicionar um novo produto.
- PUT: Atualizar um produto existente.
- DELETE: Remover um produto.
  
**Instalar Dependências**

```prompt
npm install body-parser nodemon
```

Descrição das dependências que usamos até aqui:

- express: Framework web para Node.js.
- cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **body-parser**: Middleware para converter o corpo das requisições.
- **nodemon**: Ferramenta para reiniciar automaticamente o servidor quando alterações são feitas no código.

Estrutura do projeto até aqui

```
lista-de-produtos/
├── backend/
│   └── index.js
    └── node_modules
    ├── package.json
    └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
```

## **Implementando o Servidor Backend**

No arquivo do servidor `backend/index.js`, faça as seguintes alterações:

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dados iniciais (simulando um banco de dados em memória)
const produtos = [
  {
    id: 1,
    nome: "Teclado Gamer",
    precoUnitario: 500,
    quantidade: 50,
    categoria: "Periféricos",
    fabricante: {
      nome: "GamerPro",
      endereco: "Rua das Pedras, 321, São Paulo, SP"
    }
  },
  {
    id: 2,
    nome: "Teclado Mecânico",
    precoUnitario: 350,
    quantidade: 100,
    categoria: "Periféricos",
    fabricante: {
      nome: "TecLab",
      endereco: "Av. dos Jumentos, 456, Rio de Janeiro, RJ"
    }
  },
  {
    id: 3,
    nome: "Monitor 4K",
    precoUnitario: 2500,
    quantidade: 30,
    categoria: "Eletrônicos",
    fabricante: {
      nome: "UltraVision",
      endereco: "Rua das Gramas, 789, Curitiba, PR"
    }
  }
];

// Endpoint para obter produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
})


// Inicia o servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta localhost:${porta}`);
})
```

Explicação:

- Express: Configuramos o servidor utilizando o Express. (Dependência já existente no projeto)
- CORS: Habilitamos o CORS para permitir requisições do frontend. (Nova dependência adicionada)
- Body-Parser: Permite que o servidor interprete o corpo das requisições em JSON. (Nova dependência adicionada)
- Dados Iniciais: Definimos um array de produtos simulando um banco de dados. (Banco de dados simulado que já existia)


## Implementação dos Endpoints REST no servidor Backend

- **GET /produtos - Obter todos os produtos**

```javascript
// Obter todos os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});
```

- **GET /produtos - Obter um produto específico**

```javascript
// Obter um produto específico pelo ID
app.get('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === produtoId);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});
```

- **POST /produtos - Adicionar um novo produto**
  
```javascript
// Adicionar um novo produto
app.post('/produtos', (req, res) => {
    // Recebe os dados do novo produto do corpo da requisição (req.body)
    const novoProduto = req.body;
    // Gerar um ID único para o novo produto
    novoProduto.id = produtos.length + 1; 
    produtos.push(novoProduto);
    // Retorna o novo produto com status 201 (Criado)
    res.status(201).json(novoProduto);
});
```

**OBS:** Para adicionar um novo produto, precisamos de uma requisição no lado do cliente (FrontEnd). Então, vamos tratar isso futuramente, mas nosso endpoint para criação de produtos já está criado. Será na rota `localhost:3000/produtos`

- **PUT /produtos - Atualizar um produto existente**

```javascript
// Atualizar um produto existente pelo ID
app.put('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === produtoId);

    // Verifica se encontrou o produto (índice diferente de -1)
    if (produtoIndex !== -1) {
        // Atualiza o produto existente, com novos dados recebidos no corpo da requisição
        produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
        /* 
            Explicando melhor o spread(...produtos, ...req.body)

            1 - produtos[produtoIndex]: Aqui, você está acessando um item específico na lista produtos usando o índice produtoIndex.,
            2 - { ...produtos[produtoIndex] }: Isso cria um novo objeto que contém todas as propriedades do objeto encontrado em produtos[produtoIndex]. Ou seja, você está "desestruturando" o objeto existente e copiando suas propriedades para um novo objeto.
            3 - { ...req.body }: Isso cria um novo objeto que contém todas as propriedades do objeto req.body. req.body é geralmente utilizado em uma aplicação web para representar os dados enviados no corpo de uma requisição HTTP (por exemplo, quando um formulário é enviado).
            4 - Combinação dos Objetos: A sintaxe { ...obj1, ...obj2 } cria um novo objeto que combina as propriedades de obj1 e obj2. Se houver propriedades com o mesmo nome em ambos os objetos, o valor de obj2 sobrescreverá o valor de obj1.
        */
        // Retorna o produto atualizado com status 200 (sucesso)
        res.status(200).json(produtos[produtoIndex]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});
```

**OBS:** Para atualizar um produto existente, precisamos de uma requisição no lado do cliente (FrontEnd). Então, vamos tratar isso futuramente, mas nosso endpoint para atualizar um produto específico já está criado. Será na rota `localhost:3000/produtos/:id`

- **DELETE /produtos - Remover um produto**

```javascript
// Remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === produtoId);

    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.status(200).json({ message: 'Produto removido com sucesso' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});
```

**OBS:** Para deletar um produto existente, precisamos de uma requisição no lado do cliente (FrontEnd). Então, vamos tratar isso futuramente, mas nosso endpoint para deletar um produto específico já está criado. Será na rota `localhost:3000/produtos/:id`


## Integrando funcionalidades da API de CRUD no FrontEnd

Você pode atualizar o frontend `index.html`, `style.css` & `script.js` para permitir a adição, atualização, e remoção de produtos.

## Adição de produtos - Método POST(API Rest) / Método Create(CRUD)

Adicione no HTML um formulário para criar novos produtos:

```html
<!-- Formulário para adicionar produtos -->
    <form id="produtoForm" class="produto-form">
        <div class="form-group">
            <label for="nome">Nome do Produto:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="precoUnitario">Preço:</label>
            <input type="number" id="precoUnitario" name="precoUnitario" required>
            <label for="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" name="quantidade" required>
            <label for="categoria">Categoria:</label>
            <input type="text" id="categoria" name="categoria" required>
            <label for="fabricante">Nome do Fabricante:</label>
            <input type="text" id="fabricante" name="fabricante" required>
            <button type="submit">Adicionar Produto</button>
        </div>
    </form>
```

Vamnos aproveitar e adicionar a estilização para esse formulário:

```css
.produto-form {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #007BFF;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button[type="submit"] {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

}

button[type="submit"]:hover {
    background-color: #0056b3;
}
```

E no `script.js`, adicione a lógica para enviar o produto à API:

```javascript
document.getElementById('produtoForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const novoProduto = {
        nome: document.getElementById('nome').value,
        precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        categoria: document.getElementById('categoria').value,
        fabricante: document.getElementById('fabricante').value
    };

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(novoProduto)
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto adicionado!');
        consumirAPI(); // Atualiza a lista de produtos
    })
    .catch(error => console.log('Erro ao adicionar produto' , error));
});
```

## Atualização de produtos - Método PUT(API Rest) / Método Update(CRUD)
## Remoção de produtos - Método DELETE(API Rest) / Método Delete(CRUD)

Vamos agora, utilizar os Endpoints da API que estão criados, porém não integrados no FrontEnd. Vamos fazer essa integração agora criando botões de **DELETAR** e **ATUALIZAR** produtos existentes.

Para isso, vamos começar alterando o `produtoCard.innerHTML` localizado na linha 12 do nosso arquivo `script.js`:

```javascript
produtoCard.innerHTML = `
                <h2>${produto.nome}</h2>
                <p><strong>Preço:</strong> R$ ${produto.precoUnitario}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Categoria:</strong> ${produto.categoria}</p>
                <p><strong>Fabricante:</strong> ${produto.fabricante}</p>
                <button class="editar-btn" data-id="${produto.id}">Editar</button>
                <button class="deletar-btn" data-id="${produto.id}">Deletar</button>
            `
```

No arquivo `script.js`, vamos modificar a função consumirAPI para incluir os botões "Editar" e "Deletar" dentro de cada cartão de produto. Adicionaremos também as funções necessárias para manipular esses eventos de clique nos botões:

Dentro do `.then()` da linha 4, após a criação do cardProduto, adicione o seguinte: 

```javascript
 // Adicionar event listeners para os botões "Editar" e "Deletar"
        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', editarProduto);
        });

        document.querySelectorAll('.deletar-btn').forEach(button => {
            button.addEventListener('click', deletarProduto);
        });
```

Após isso podemos criar a função `editarProduto()` responsável por conectar-nos ao endpoint da API Rest criado para essa funcionalidade do CRUD.

```javascript
function editarProduto(event) {
    const produtoId = event.target.getAttribute('data-id');
    fetch(`http://localhost:3000/produtos/${produtoId}`)
        .then(response => response.json())
        .then(produto => {
            // Preencher o formulário com os dados do produto para edição
            document.getElementById('nome').value = produto.nome;
            document.getElementById('precoUnitario').value = produto.precoUnitario;
            document.getElementById('quantidade').value = produto.quantidade;
            document.getElementById('categoria').value = produto.categoria;
            document.getElementById('fabricante').value = produto.fabricante;
            
            // Remover o evento de submit atual e adicionar um novo para atualizar o produto
            const form = document.getElementById('produtoForm');
            form.removeEventListener('submit', adicionarProduto);
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                atualizarProduto(produtoId);
            });
        })
        .catch(error => console.log('Erro ao carregar produto para edição: ', error));
}
```

Agora criaremos a função que envia o produto atualizado para o servidor backend, usando novamente um endpoint da API que criamos:

```javascript
function atualizarProduto(produtoId) {
    const produtoAtualizado = {
        nome: document.getElementById('nome').value,
        precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        categoria: document.getElementById('categoria').value,
        fabricante: document.getElementById('fabricante').value
    };

    fetch(`http://localhost:3000/produtos/${produtoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto atualizado com sucesso!');
        consumirAPI(); // Atualiza a lista de produtos

        // Restaurar o formulário para adicionar novos produtos
        const form = document.getElementById('produtoForm');
        form.reset();
        form.removeEventListener('submit', atualizarProduto);
        form.addEventListener('submit', adicionarProduto);
    })
    .catch(error => console.log('Erro ao atualizar produto', error));
}
```

Após isso, podemos criar mais uma função para utilizar o endpoint criado para remover produtos do fake banco de dados.

```javascript
function deletarProduto(event) {
    const produtoId = event.target.getAttribute('data-id');

    fetch(`http://localhost:3000/produtos/${produtoId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto removido com sucesso!');
        consumirAPI(); // Atualiza a lista de produtos
    })
    .catch(error => console.log('Erro ao deletar produto', error));
}
```

Para finalizar com chave de ouro, podemos reorganizar esse uso do endpoint POST para criar produtos, vamos transformá-lo também numa função:

```javascript
function adicionarProduto(event) {
    event.preventDefault();

    const novoProduto = {
        nome: document.getElementById('nome').value,
        precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
        categoria: document.getElementById('categoria').value,
        fabricante: document.getElementById('fabricante').value
    };

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto)
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto adicionado!');
        consumirAPI(); // Atualiza a lista de produtos
    })
    .catch(error => console.log('Erro ao adicionar produto', error));
}

document.getElementById('produtoForm').addEventListener('submit', adicionarProduto);
window.onload = consumirAPI;
```


Perfeito! Estamos utilizando os métodos GET, POST, PUT, DELETE da API Rest & os métodos Create, Update, Read, Delete do CRUD no Backend e Frontend integrados uns aos outros!

## Conclusão

Agora, você tem uma aplicação completa que utiliza Node.js e Express para fornecer uma **API RESTful** com suporte completo para operações **CRUD**. O frontend interage com a API para permitir a **visualização**, **adição**, **atualização** e **remoção** de produtos. Essa prática oferece uma excelente introdução ao desenvolvimento de aplicações web com backend em Node.js.

Parábens por chegar até aqui! Tenho certeza que o esforço e dedicação de vocês nas aulas práticas fazem diferença em suas formações. Por isso venho buscando sempre criar práticas envolvendo conceitos o mais voltados pro mercado possível! Espero que tenham gostado dessa prática e a partir do momento que vocês entrar neste link, o repositório é de vocês. Recomendo fortemente que refaçam o que foi feito na prática seguindo o roteiro preparado pra vocês, qualquer dúvida falem comigo!

Fernando Zuchi - (32) 99164-1182

Até mais, dev's!
