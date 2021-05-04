const titulo = document.getElementById('titulo');

let errores = {}

titulo.addEventListener('blur',function (event) {
    checkInputs()
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length > 0) {
         event.preventDefault();  
    }
    
})

function checkInputs() {
    const tituloValue = titulo.value.trim();
    
    if (tituloValue === '') {
        setError(titulo,'El campo nombre no puede estar vacio')
    }else{
        setSucces(titulo)
    }
    console.log(errores);

}

function setError(input ,message){
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    
    small.innerText = message
    formControl.className = 'form-control error'
    errores[input.name] = message 
 
}

function setSucces(input) {
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    
    formControl.className = 'form-control succes'
    small.innerText = ''
    
    delete errores[input.name] 
}