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
                <p><strong>Preço:</strong> R$ ${produto.precoUnitario}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Categoria:</strong> ${produto.categoria}</p>
                <p><strong>Fabricante:</strong> ${produto.fabricante}</p>
                <button class="editar-btn" data-id="${produto.id}">Editar</button>
                <button class="deletar-btn" data-id="${produto.id}">Deletar</button>
            `

            produtosContainer.appendChild(produtoCard);

            
        });
         // Adicionar event listeners para os botões "Editar" e "Deletar"
         document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', editarProduto);
        });

        document.querySelectorAll('.deletar-btn').forEach(button => {
            button.addEventListener('click', deletarProduto);
        });
    })
    .catch(error => console.log('Erro ao carregar produtos: ', error));
}

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