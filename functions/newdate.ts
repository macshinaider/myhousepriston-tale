export function getDataDoDiaSeguinte() {
    var dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() + 1);

    var dia = String(dataAtual.getDate()).padStart(2, '0');
    var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses são de 0 a 11, então adicionamos 1 para obter o mês correto.
    var ano = dataAtual.getFullYear();

    return `${ano}-${mes}-${dia}`;
}

console.log(getDataDoDiaSeguinte()); // Deve imprimir a data do dia seguinte no formato 'aaaa-mm-dd'
