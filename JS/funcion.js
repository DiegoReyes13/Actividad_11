class Paciente {
  constructor(nombre, oxigenacion, ritmoCardiaco) {
    this.nombre = nombre;
    this.oxigenacion = Number(oxigenacion);
    this.ritmoCardiaco = Number(ritmoCardiaco);
    this.nivelRiesgo = calcularRiesgo(this.oxigenacion, this.ritmoCardiaco);
  }
}

function calcularRiesgo(oxigeno, ritmo) {
  if (oxigeno < 90 || ritmo > 130) {
    return "Rojo (Crítico)";
  } else if (oxigeno >= 90 && oxigeno <= 94) {
    return "Amarillo (Urgente)";
  } else {
    return "Verde (Estable)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("nombreP");
  const inputOxigeno = document.getElementById("oxigenoP");
  const inputRitmo = document.getElementById("ritmoP");
  const btnRegistrar = document.getElementById("btnRegistrar");
  const tbodyTabla = document.getElementById("listaPacientes");

  let historialPacientes = JSON.parse(localStorage.getItem("pacientesTriage")) || [];

  function renderizarTabla() {
    if (!tbodyTabla) return;

    tbodyTabla.innerHTML = "";

    historialPacientes.forEach((paciente) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${paciente.nombre}</td>
        <td>${paciente.oxigenacion}</td>
        <td>${paciente.ritmoCardiaco}</td>
        <td>${paciente.nivelRiesgo}</td>
      `;

      tbodyTabla.appendChild(fila);
    });
  }

  renderizarTabla();

  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", () => {
      const nombre = inputNombre ? inputNombre.value.trim() : "";
      const oxigeno = inputOxigeno ? inputOxigeno.value : "";
      const ritmo = inputRitmo ? inputRitmo.value : "";

      if (!nombre || !oxigeno || !ritmo) return;

      const nuevoPaciente = new Paciente(nombre, oxigeno, ritmo);

      historialPacientes.push(nuevoPaciente);
      localStorage.setItem("pacientesTriage", JSON.stringify(historialPacientes));

      renderizarTabla();
      
      inputNombre.value = "";
      inputOxigeno.value = "";
      inputRitmo.value = "";
    });
  }
});