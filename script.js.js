document.addEventListener("DOMContentLoaded", (event) => {
    const botonProcesar = document.getElementById("btn_procesar");
    const botonCopiar = document.getElementById("btn_copiar");
    const textoAProcesar = document.getElementById("txt_informacion");
    const textoProcesado = document.getElementById("txt_resultado");

    textoProcesado.disabled = true;
    botonCopiar.disabled = true;
    textoAProcesar.placeholder = "Ingrese el texto a encriptar";

    let esEncriptado = true;

    const btnEncriptar = document.getElementById("encriptar");
    const btnDesencriptar = document.getElementById("desencriptar");

    btnEncriptar.addEventListener('click', function() {
        textoAProcesar.value = "";
        textoProcesado.value = "";
        botonCopiar.disabled = true;

        textoAProcesar.placeholder = "Ingrese el texto a encriptar";
        esEncriptado = true;
        btnDesencriptar.classList.remove("selected"); 
        btnEncriptar.classList.add("selected");
    });

    btnDesencriptar.addEventListener('click', function() {
        textoAProcesar.value = "";
        textoProcesado.value = "";
        botonCopiar.disabled = true;

        textoAProcesar.innerHTML = "";
        textoAProcesar.placeholder = "Ingrese el texto a desencriptar";
        esEncriptado = false;
        btnDesencriptar.classList.add("selected"); 
        btnEncriptar.classList.remove("selected");   
    });
    
    textoAProcesar.addEventListener('input', function(event) {
        const texto = event.target.value;
        if (!/^[a-zA-Z0-9\s]*$/.test(texto)) {
            event.target.value = texto.replace(/[^a-zA-Z0-9\s]/g, '');
        }
    });

    botonProcesar.addEventListener("click", () => {
        if (textoAProcesar.value === "") {
            alert("Ingrese el texto a encriptar");
            textoProcesado.innerHTML = "";
            botonCopiar.disabled = true;
            return;
        }else{
            textoProcesado.value = procesadorTexto(textoAProcesar.value, esEncriptado? "encriptar" : "desencriptar");
            botonCopiar.disabled = false;
        }
    });

    botonCopiar.addEventListener("click", function() {   
        navigator.clipboard.writeText(textoProcesado.value)
            .then(function() {
                botonCopiar.value = 'Copiado!';
                setInterval(() => {
                    botonCopiar.value = 'Copiar';
                }, 1500);
            })
            .catch(function(err) {
                console.error('Error al copiar el texto:', err);
            });
        window.getSelection().removeAllRanges();
    });
});


function procesadorTexto(texto, funcion) {
    const llaves = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoProcesado = "";

    if (funcion === "encriptar") {
        textoProcesado = texto.replace(/[aeiou]/g, vocal => llaves[vocal]);
    } else if (funcion === "desencriptar") { 
        nuevoTexto = texto.replace(/ai/g,"a");
        nuevoTexto = nuevoTexto.replace(/enter/g,"e");
        nuevoTexto = nuevoTexto.replace(/imes/g,"i");
        nuevoTexto = nuevoTexto.replace(/ober/g,"o");
        nuevoTexto = nuevoTexto.replace(/ufat/g,"u");
        textoProcesado = nuevoTexto;
    }

    return textoProcesado;
}
