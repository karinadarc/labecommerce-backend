function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const escolhaDoUsuario = process.argv[2];
// console.log(`Você escolheu:${escolhaDoUsuario}`);
const numeroEscolhido = process.argv[3];
// console.log(`O número escolhido foi: ${numeroEscolhido}`);

const escolhaDoPc = escolhaDoUsuario === "par" ? "impar" : "par";
// console.log(`O computador escolheu:${escolhaDoPc}`);
const numeroDoPc = getRndInteger(0,10);
// console.log(`Número Computador: ${numeroDoPc}`);

const total = Number (numeroEscolhido) + Number(numeroDoPc)
// console.log(`O resultado foi: ${total}`)

const checaSeEPar = total % 2 === 0? 'par': 'impar'

// console.log(checaSeEPar === escolhaDoUsuario? (`Você venceu!`): (`Você perdeu!`)) 

console.log(`Você escolheu ${escolhaDoUsuario}, ${numeroEscolhido} e o computador escolheu ${escolhaDoPc}, ${numeroDoPc}. O resultado foi ${total}. ${checaSeEPar === escolhaDoUsuario? (`Você venceu!`): (`Você perdeu!`)}`)

