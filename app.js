function abrirMenu()
{
    let BarraMenuAberto = document.getElementById('barra-menu');

    if(BarraMenuAberto.style.width == "0px")
    {
        BarraMenuAberto.style.width = "284px";
    }
    else
    {
        BarraMenuAberto.style.width = "0px";
    }
}

function fecharMenu(){
    let BarraMenuFechado = document.getElementById('barra-menu');

    if(BarraMenuFechado.style.width == "284px"){
        BarraMenuFechado.style.width = "0px";
    }
    else{
        BarraMenuFechado.style.width = "284px";
    }
}