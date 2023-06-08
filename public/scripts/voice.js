
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;

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

    recognition.onstart = function() {
        console.log('Reconhecimento de voz iniciado.');
    };

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcrição:', transcript);

        // Verifica se a transcrição corresponde a algum item do menu
        var matchedItem = menuItems.find(function(item) {
            return transcript.includes(item.name);
        });

        if (matchedItem) {
            console.log('Navegando para:', matchedItem.action);
            // Redireciona para a página correspondente
            window.location.href = matchedItem.action;
        }
    };

    recognition.start();
    
} else {
    console.log('Reconhecimento de voz não suportado no navegador.');
}