$(document).ready(function () {
  let perguntas;
  let perguntaIndex = 0;
  let respostas = []; // Array para armazenar as respostas dos participantes

  // Ocultar o quiz e mostrar a tela inicial
  $("#quiz").hide();

  // Manipulador de evento para o botão "Iniciar"
  $("#btnIniciar").click(function () {
    $("#tela-inicial").hide();
    $("#quiz").show();
    carregarPerguntasEMostrarPrimeira();
  });

  // Função para carregar as perguntas do arquivo JSON e mostrar a primeira pergunta
  function carregarPerguntasEMostrarPrimeira() {
    // Carregar as perguntas do arquivo JSON
    $.getJSON("perguntas.json", function (data) {
      perguntas = data;
      mostrarPergunta();
    });
  }

  // Função para mostrar a próxima pergunta
  function mostrarPergunta() {
    if (perguntaIndex < perguntas.length) {
      const pergunta = perguntas[perguntaIndex].pergunta;
      const opcoesResposta = getPossiveisRespostas(pergunta); // Função para obter as opções de resposta com base na pergunta

      $("#pergunta").text(pergunta);
      $("#opcoes-resposta").empty();

      opcoesResposta.forEach(function (opcao, index) {
        const checkbox = $("<input>")
          .attr("type", "checkbox")
          .attr("id", "opcao-" + index)
          .attr("name", "respostas")
          .val(opcao);
        const label = $("<label>")
          .text(opcao)
          .attr("for", "opcao-" + index);

        $("#opcoes-resposta").append(checkbox, label);
        $("#opcoes-resposta").append("<br>");
      });

      $("#btnProxima").show();
    } else {
      // Todas as perguntas foram respondidas
      $("#pergunta").text("Parabéns! Você completou o quiz.");
      $("#opcoes-resposta").empty();
      $("#btnProxima").hide(); // Remover o botão "Próxima"

      // Exemplo: exibir as respostas registradas no console
      console.log("Respostas dos participantes:", respostas);
    }
  }

  // Capturar envio do formulário
  $("#formRespostas").submit(function (event) {
    event.preventDefault(); // Impedir o envio do formulário padrão

    // Coletar respostas dos checkboxes selecionados
    const respostasSelecionadas = [];
    $("input[name='respostas']:checked").each(function () {
      respostasSelecionadas.push($(this).val());
    });

    // Registrar as respostas dos participantes
    respostas.push({
      pergunta: perguntas[perguntaIndex].pergunta,
      respostas: respostasSelecionadas,
    });

    // Avançar para a próxima pergunta
    perguntaIndex++;
    mostrarPergunta();
  });

  // Função para obter as opções de resposta com base na pergunta
  function getPossiveisRespostas(pergunta) {
    switch (pergunta) {
      case "Quer receber outros conteúdos da Piraporiando por e-mail?":
        return ["Sim", "Não"];
      case "Qual a sua raça/cor?":
        return ["Branca", "Preta", "Parda", "Amarela", "Indígena"];
      case "Qual o seu gênero?":
        return ["Homem Cis", "Mulher Cis", "Outro"];
      case "Qual sua faixa etária?":
        return [
          "Até 18 anos",
          "19 a 24 anos",
          "25 a 30 anos",
          "31 a 40 anos",
          "41 anos a 50 anos",
          "Mais de 51 anos",
        ];
      case "Quer receber outros conteúdos da Piraporiando por e-mail?": // Correção para a última pergunta
        return ["Sim", "Não"];
      default:
        return ["Sim", "Não"];
    }
  }
});
