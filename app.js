function abrirMenu() {
    let BarraMenuAberto = document.getElementById('barra-menu');
    let bodyWidth = document.body.clientWidth;
  
    if (bodyWidth < 400) {
      BarraMenuAberto.style.width = "140px";
    } 
    else if (BarraMenuAberto.style.width == "0px") {
      BarraMenuAberto.style.width = "284px";
    } 
    else {
      BarraMenuAberto.style.width = "0px";
    }
  }
  
  function fecharMenu() {
    let BarraMenuFechado = document.getElementById('barra-menu');
    let bodyWidth = document.body.clientWidth;
  
    if (bodyWidth < 400) {
      BarraMenuFechado.style.width = "0px";
    } 
    else if (BarraMenuFechado.style.width == "284px") {
      BarraMenuFechado.style.width = "0px";
    } 
    else {
      BarraMenuFechado.style.width = "284px";
    }
  }
  