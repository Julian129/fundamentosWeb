//const username = document.getElementById('usuario');
//const password = document.getElementById('password');
//const button = document.getElementById('Ingresar');
function validateUser(a) {
    const b = "jaduran@estudiante.uniajc.edu.co";
    return a === b;
}

function validatePass(a) {
    const b = "fundamentosWeb@";
    return a === b;
}

function login(username,password) {
    if (!username || !password || !button) {
        console.error('Error: No se encontraron algunos elementos en el DOM.');
    } else {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Método para validar campos vacíos
            if (username.value.trim() === '' || password.value.trim() === '') {
                console.error('Error: Nombre de usuario y contraseña no pueden estar vacíos.');
            } else {
                const user = validateUser(username.value);
                const pass = validatePass(password.value);

                if (user && pass) {
                    window.location = "WEB/principal.html";
                } else {
                    alert('Usuario y/o contraseña incorrecta');
                }
            }
        });
    }
}
