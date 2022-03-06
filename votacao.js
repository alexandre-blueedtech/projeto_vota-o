const prompt = require("prompt-sync")();

//Lista de Objetos dos candidatos

let brancos = 0;
let nulos = 0;
const candidatos = [
  { nome: "Luis Lula", votos: 0 },
  { nome: "João Guloso", votos: 0 },
  { nome: "Ivonete Canivete", votos: 0 },
];
let escolha = 0;
const anoPresente = new Date().getFullYear();

//Estrutura da votação principal
while (escolha != 2) {
  console.clear();
  console.log(`Eleições de ${anoPresente}\n`);
  prompt("Aperte ENTER para iniciar!");

  console.clear();
  let anoNasc = parseInt(prompt("Ano Nascimento: "));
  if (isNaN(anoNasc) || anoNasc < 1919 || anoNasc > anoPresente) {
    msgErr("Ano inválido!");
    continue;
  }

  let voto = pedeVoto();
  votacao(autorizaVoto(anoNasc), voto);

  //Pergunta usuario se quer repetir ou encerrar
  do {
    console.clear();
    console.log("O que deseja fazer ?");
    console.log("1) Novo eleitor \n2) Encerrar e apurar os votos\n");
    escolha = prompt("Escolha uma opção: ");
    if (escolha != 1 && escolha != 2) {
      msgErr("Opção inválida!");
      continue;
    }
  } while (escolha != 1 && escolha != 2);
}

exibirResultados();

// Funções

// Função que exibe mensagem de Erro
function msgErr(msg) {
  console.clear();
  console.log(msg);
  prompt("Pressione ENTER para voltar!");
}

// Função que verifica idade do eleitor
function autorizaVoto(anoNascimento) {
  let idade = anoPresente - anoNascimento;
  if (idade < 16) {
    return "NEGADO";
  } else if (idade >= 18 && idade < 65) {
    return "OBRIGATÓRIO";
  } else {
    return "OPCIONAL";
  }
}
// Confirmação do voto
function confirmaVoto(nomeVoto) {
  console.clear();
  console.log("Comprovante de voto: ", nomeVoto);
  prompt("(ENTER)");
}

//Função de escolha de voto
function pedeVoto() {
  let voto;
  do {
    console.clear();
    console.log(`Escolha uma das opções abaixo:
    
  1)  ${candidatos[0].nome}  2)  ${candidatos[1].nome}  3)  ${candidatos[2].nome}

            4)  Nulo      5)  Branco
	`);
    voto = +prompt("Informe seu voto: ");

    if (isNaN(voto) || voto < 1 || voto > 5) {
      msgErr("Opção inválida!");
    }
  } while (isNaN(voto) || voto < 1 || voto > 5);

  return voto;
}



// Função que valida e contabiliza os votos
function votacao(autorizacao, voto) {
  if (autorizacao == "Você não pode votar") {
    voto = 0;
  }
  switch (voto) {
    case 1:
      confirmaVoto(candidatos[0].nome);
      candidatos[0].votos++;
      break;
    case 2:
      confirmaVoto(candidatos[1].nome);
      candidatos[1].votos++;
      break;
    case 3:
      confirmaVoto(candidatos[2].nome);
      candidatos[2].votos++;
      break;
    case 4:
      confirmaVoto("Nulo");
      nulos++;
      break;
    case 5:
      confirmaVoto("Branco");
      brancos++;
      break;
    default:
      msgErr("VOTO NEGADO");
  }
}

function exibirResultados() {
  const maisVoto = candidatos.sort((a, b) => a.votos - b.votos)[
    candidatos.length - 1
  ].votos;
  const ganhador = candidatos.filter((a) => a.votos === maisVoto);
  console.clear();
  console.log("RESULTADO DAS ELEIÇÕES: \n");
  for (const c of candidatos) console.log(`${c.nome} recebeu ${c.votos} votos`);
  console.log("\nVotos nulos: ", nulos);
  console.log("Votos em branco: ", brancos);
  if (ganhador.length == 1) {
    console.log(
      `\nO ${ganhador[0].nome} foi eleito com ${ganhador[0].votos} votos!`
    );
  } else {
    console.log(`\nHaverá 2º turno! \nOs candidatos empataram: `);
    for (const v of ganhador) console.log(`${v.nome}`);
  }
}
