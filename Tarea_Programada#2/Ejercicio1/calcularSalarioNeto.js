function calculate() {
  const salarioBruto = parseFloat(document.getElementById('salarioBruto').value);
  if (isNaN(salarioBruto) || salarioBruto <= 0) {
    alert("Por favor, ingrese un salario bruto válido.");
    return;
  }

  // Cargas sociales (10.67%)
  const cargasSociales = salarioBruto * 0.1067;


  const salarioNet = salarioBruto - cargasSociales;

  // Definición de tramos de impuesto segun la ley
  const tramosImpuestos = [
    { limite: 941000, tasa: 0.10 },
    { limite: 1381000, tasa: 0.15 },
    { limite: 2423000, tasa: 0.20 },
    { limite: 4845000, tasa: 0.25 }
  ];

  let impuestoRenta = 0;
  let salarioAnterior = 0;

  // Cálculo del impuesto sobre la renta según tramos de la ley
  for (const tramo of tramosImpuestos.reverse()) {
    if (salarioNet > tramo.limite) {
      impuestoRenta += (salarioNet - salarioAnterior) * tramo.tasa;
      salarioAnterior = tramo.limite;
    }
  }

  // Cálculo del salario neto y resultados de cada rubro
  const salarioNeto = salarioBruto - cargasSociales - impuestoRenta;
  document.getElementById('cargSoc').textContent = cargasSociales.toFixed(2).toLocaleString('es-ES');
  document.getElementById('impRent').textContent = impuestoRenta.toFixed(2).toLocaleString('es-ES');
  document.getElementById('saltNeto').textContent = salarioNeto.toFixed(2).toLocaleString('es-ES'); 
}

  