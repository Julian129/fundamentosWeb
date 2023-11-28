document.addEventListener("DOMContentLoaded", function () {
  checkValidity(); // Llamar para establecer el estado inicial al cargar la página

  // Agregar eventos de input para actualizar dinámicamente las clases
  document.getElementById("email").addEventListener("input", checkValidity);
  document.getElementById("password").addEventListener("input", checkValidity);

  // Evitar el envío del formulario para este ejemplo
  document.getElementById("registrationForm").addEventListener("submit", function (event) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar que el correo electrónico y la contraseña cumplan con los criterios
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);

    if (!isValidEmail || !isPasswordValid) {
      event.preventDefault();
      alert("El correo electrónico o la contraseña no cumplen con los criterios. Por favor, inténtalo de nuevo.");
    } else {
      alert("Registro exitoso. ¡Bienvenido!");
      window.location = "./index.html"
    }
  });
});

function checkValidity() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailCriteria = document.getElementById("emailCriteria");
  const lengthCriteria = document.getElementById("length");
  const lowercaseCriteria = document.getElementById("lowercase");
  const uppercaseCriteria = document.getElementById("uppercase");
  const numberCriteria = document.getElementById("number");

  // Verificar el formato del correo electrónico utilizando una expresión regular
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  updateCriteriaClass(emailCriteria, isValidEmail);

  // Verificar las condiciones de la contraseña
  const isLengthValid = password.length >= 8;
  const isLowercaseValid = /[a-z]/.test(password);
  const isUppercaseValid = /[A-Z]/.test(password);
  const isNumberValid = /\d/.test(password);

  updateCriteriaClass(lengthCriteria, isLengthValid);
  updateCriteriaClass(lowercaseCriteria, isLowercaseValid);
  updateCriteriaClass(uppercaseCriteria, isUppercaseValid);
  updateCriteriaClass(numberCriteria, isNumberValid);
}

function updateCriteriaClass(criteriaElement, isValid) {
  criteriaElement.classList.remove("valid", "invalid");

  if (isValid) {
    criteriaElement.classList.add("valid");
  } else {
    criteriaElement.classList.add("invalid");
  }
}
