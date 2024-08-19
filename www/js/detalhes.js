//RECUPERAR O ID DETALHE NO LOCALSTORAGE

var id = parseInt(localStorage.getItem('detalhe'));
console.log(id);

//PEGAR OS PRODUTOS DO LOCALSTORAGE

var produtos = JSON.parse(localStorage.getItem('produtos'));

//VALIDAR SE O ID DO ITEM É IGUAL AO ID DO LOCALSTORAGE (SE BATER = TRUE SE NÃO = FALSE)
var item = produtos.find(produto => produto.id === id);

if(item) {
    //ENCONTROU ALGUM PRODUTO
    console.log('Produto encontrado: ',item);
    //ALIMENTAR OS CAMPOS DO FRONT-END
    $("#img-detail").attr('src', item.imagem);
    $("#name-detail").html(item.nome);
    $("#rates-detail").html(item.rating);
    $("#likes-detail").html(item.likes);
    $("#reviews-detail").html(item.reviews + ' Reviews');
    $("#descricao-detail").html(item.descricao);
    $("#caracteristica-detail").attr('td', item.detalhes.caracteristica);
    $('#price-detail').html(item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    $('#price-promo-detail').html(item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));

    var tabelaDetalhes = $("#tabdetalhes");

    item.detalhes.forEach(detalhe=>{
        var linha = `
                <tr>
                    <td>${detalhe.caracteristica}</td>
                    <td>${detalhe.detalhes}</td>
                </tr>
            `;

        tabelaDetalhes.append(linha);
    });

}else {
    //NÃO ENCONTROU NENHUM PRODUTO, O PRODUTOS.FIND RETORNOU FALSE
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//FUNÇÃO PARA ADICIONAR O ITEM NO CARRINHO
function addCart(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);
    if(itemNoCarrinho) {
        //JÁ TEM O ITEM NO CARRINHO
        //ADICIONAR A QUANTIDADE
        itemNoCarrinho.quantidade += quantidade,
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional

    }else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }

    //ATUALIZAR O LOCALSTORAGE DO CARRINHO
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

//CLICOU NO ADICIONAR CARRINHO
    $(".add-cart").on('click', function(){
    addCart(item, 1);

    var toastCenter = app.toast.create({
            text: `${item.nome} adicionado ao carrinho`,
            position: 'center',
            closeTimeout: 2000,
    });
        toastCenter.open();
});