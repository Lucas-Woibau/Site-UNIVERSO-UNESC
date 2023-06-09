if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    var isRecognitionActive = false; // Variável para controlar o estado do reconhecimento
  
    // Mapeamento de correspondência entre os nomes das abas e as ações
    var menuItems = [
      { name: 'início', action: 'index.html' },
      { name: 'equipe', action: 'sobre.html' },
      { name: 'contato', action: 'contato.html' },
      { name: 'facebook', action: 'https://www.facebook.com/UNESC.ES/?locale=pt_BR' },
      { name: 'instagram', action: 'https://www.instagram.com/universounesc/' },
      { name: 'youtube', action: 'https://www.youtube.com/channel/UChMZ78lFNEahIVMCh8IN69Q' },
      { name: 'ao vivo', action: 'https://www.youtube.com/channel/UChMZ78lFNEahIVMCh8IN69Q' }
      // Adicione mais itens do menu conforme necessário
    ];
  
    // Função para verificar se a URL atual corresponde à página de contato
    function isPaginaContato() {
      var paginaAtual = window.location.href;
      var paginaContato = "contato.html"; // Substitua pela URL correta da página de contato
  
      return paginaAtual === paginaContato;
    }
  
    function startRecognition() {
      if (!isRecognitionActive) {
        recognition.start();
        isRecognitionActive = true;
        console.log('Reconhecimento de voz iniciado.');
      }
    }
  
    function stopRecognition() {
      if (isRecognitionActive) {
        recognition.stop();
        isRecognitionActive = false;
        console.log('Reconhecimento de voz foi encerrado.');
      }
    }
  
    recognition.onstart = function() {
      console.log('Reconhecimento de voz iniciado.');
    };
  
    // Evento chamado quando o reconhecimento de voz é encerrado
    recognition.onend = function() {
      console.log('O reconhecimento de voz foi encerrado.');
      // Reinicia o reconhecimento de voz após um curto intervalo
      startRecognition();
    };
  
    recognition.onresult = function(event) {
      var transcript = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript.toLowerCase();
        }
      }
  
      if (transcript !== '') {
        console.log('Transcrição:', transcript);
  
        // Verifica se a transcrição contém o nome de algum item do menu usando expressões regulares
        var matchedItem = menuItems.find(function(item) {
          var regex = new RegExp("\\b" + item.name.toLowerCase() + "\\b"); // Cria uma expressão regular para corresponder à palavra inteira
          return regex.test(transcript);
        });
  
        if (matchedItem) {
          console.log('Navegando para:', matchedItem.action);
          // Redireciona para a página correspondente
          window.location.href = matchedItem.action;
        }
      }
    };
  
    startRecognition();
  } else {
    console.log('Reconhecimento de voz não suportado no navegador.');
  }
  