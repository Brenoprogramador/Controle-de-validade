// Array para armazenar os produtos cadastrados
let products = [];

// Função para verificar a proximidade da data de validade
function checkExpirationDate(expirationDate) {
  const today = new Date();
  const warningDays = 7; // Número de dias de aviso desejado (por exemplo, 7 dias)

  const differenceInTime = expirationDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays <= warningDays) {
    alert("O produto está próximo do vencimento!");
  }
}

// Evento de envio do formulário
document.getElementById("productForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const barcode = document.getElementById("barcode").value;
  const name = document.getElementById("name").value;
  const expirationDate = new Date(document.getElementById("expirationDate").value);

  checkExpirationDate(expirationDate);

  // Criar o objeto de produto
  const product = {
    id: Date.now(),
    barcode: barcode,
    name: name,
    expirationDate: expirationDate.toISOString().split('T')[0] // Convertendo a data para o formato "yyyy-mm-dd"
  };

  // Adicionar o produto à lista
  addProductToList(product);

  // Limpar os campos do formulário
  document.getElementById("barcode").value = "";
  document.getElementById("name").value = "";
  document.getElementById("expirationDate").value = "";

  // Adicionar o produto ao array de produtos
  products.push(product);
});

// Função para adicionar um produto à lista
function addProductToList(product) {
  const productList = document.getElementById("productList");

  const listItem = document.createElement("li");
  listItem.setAttribute("id", product.id);

  listItem.innerHTML = `
    <div class="product-info">
      <span class="infos">Código de Barras:</span> ${product.barcode}<br>
      <span class="infos">Nome:</span> ${product.name}<br>
      <span class="infos">Data de Validade:</span> ${product.expirationDate}
    </div>
    <div class="product-actions">
      <button class="btn-edit" onclick="editProduct(${product.id})">Editar</button>
      <button class="btn-delete" onclick="deleteProduct(${product.id})">Excluir</button>
    </div>
  `;

  productList.appendChild(listItem);
}

// Função para editar um produto na lista
function editProduct(id) {
  const product = products.find(p => p.id === id);

  if (product) {
    // Preencher os campos do formulário com os dados do produto
    document.getElementById("barcode").value = product.barcode;
    document.getElementById("name").value = product.name;
    document.getElementById("expirationDate").value = product.expirationDate;

    // Remover o produto da lista
    deleteProduct(id);
  }
}

// Função para excluir um produto da lista
function deleteProduct(id) {
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex !== -1) {
    // Remover o produto do array de produtos
    products.splice(productIndex, 1);

    // Remover o produto da lista HTML
    const listItem = document.getElementById(id);
    listItem.remove();
  }
}