// Localiza explicitamente os campos, os botões e a área de resultado.
const numero1 = document.getElementById('numero1');
const numero2 = document.getElementById('numero2');
const operacao = document.getElementById('operacao');
const calcular = document.getElementById('calcular');
const limpar = document.getElementById('limpar');
const resultado = document.getElementById('resultado');

calcular.addEventListener('click', () => {
  const valor1 = numero1.valueAsNumber;
  const valor2 = numero2.valueAsNumber;
  const op = operacao.value;

  // Campos vazios ou inválidos produzem NaN ao utilizar valueAsNumber.
  if (!Number.isFinite(valor1) || !Number.isFinite(valor2)) {
    resultado.textContent = 'Preencha os dois números corretamente.';
    return;
  }

  let result;

  // Realiza a operação selecionada.
  switch (op) {
    case '+':
      result = valor1 + valor2;
      break;
    case '-':
      result = valor1 - valor2;
      break;
    case '*':
      result = valor1 * valor2;
      break;
    case '/':
      // Valida divisão por zero.
      if (valor2 === 0) {
        resultado.textContent = 'Erro: Não é possível dividir por zero!';
        return;
      }
      result = valor1 / valor2;
      break;
    default:
      resultado.textContent = 'Operação inválida!';
      return;
  }

  // Evita apresentar Infinity caso o resultado ultrapasse o limite do tipo Number.
  if (!Number.isFinite(result)) {
    resultado.textContent = 'O resultado ultrapassou o limite numérico do JavaScript.';
    return;
  }

  resultado.textContent = `Resultado: ${result}`;
});

// Complemento da atividade: apaga os valores e devolve o foco ao primeiro campo.
limpar.addEventListener('click', () => {
  numero1.value = '';
  numero2.value = '';
  operacao.value = '+';
  resultado.textContent = '';
  numero1.focus();
});
