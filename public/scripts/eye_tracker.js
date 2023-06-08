window.saveDataAcrossSessions = true;

let lookDirection = null;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;
let buttonLookedAtTime = null;
const CLICK_DELAY = 2000; // 2 segundos

// Carregar o webgazer
webgazer
  .setGazeListener((data, timestamp) => {
    if (data == null) return;

    // Verificar a direção do olhar
    if (data.x < LEFT_CUTOFF && lookDirection !== 'LEFT') {
      lookDirection = 'LEFT';
    } else if (data.x > RIGHT_CUTOFF && lookDirection !== 'RIGHT') {
      lookDirection = 'RIGHT';
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      lookDirection = null;
    }

    // Verificar se o olhar está sobre um botão
    if (buttonLookedAtTime === null && isButton(data.x, data.y)) {
      buttonLookedAtTime = timestamp;
    } else if (buttonLookedAtTime !== null && !isButton(data.x, data.y)) {
      // Reiniciar a contagem se o olhar não está mais sobre o botão
      buttonLookedAtTime = null;
    }

    // Verificar se passou o tempo de espera e realizar o clique
    if (buttonLookedAtTime !== null && timestamp - buttonLookedAtTime >= CLICK_DELAY) {
      clickButton(data.x, data.y);
      buttonLookedAtTime = null;
    }

    webgazer.showVideoPreview(false).showPredictionPoints(true);
  })
  .begin();

function isButton(x, y) {
  // Verificar se as coordenadas estão sobre um botão
  const buttonElement = document.querySelector('button'); // Seletor do botão

  // Verificar se o elemento existe
  if (!buttonElement) return false;

  // Obter as coordenadas e dimensões do botão
  const buttonRect = buttonElement.getBoundingClientRect();
  const buttonLeft = buttonRect.left;
  const buttonTop = buttonRect.top;
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;

  // Verificar se as coordenadas estão dentro do retângulo do botão
  if (x >= buttonLeft && x <= buttonLeft + buttonWidth && y >= buttonTop && y <= buttonTop + buttonHeight) {
    return true; // Está sobre o botão
  }

  return false; // Não está sobre o botão
}

function clickButton(x, y) {
  // Verificar se as coordenadas estão dentro dos limites válidos
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;

  if (x < 0 || x >= documentWidth || y < 0 || y >= documentHeight) {
    return; // Coordenadas fora dos limites válidos
  }

  // Obter o elemento na posição das coordenadas
  const element = document.elementFromPoint(x, y);

  // Verificar se o elemento é um botão
  if (element && element.tagName === 'BUTTON') {
    // Clicar no botão
    element.click();
  }
}
