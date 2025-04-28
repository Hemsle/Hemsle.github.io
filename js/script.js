/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

/**
 * ? representerar negativa tal**/
function init() {

    const display = document.getElementById('lcd')
    const buttons = document.querySelectorAll('#keyBoard button')

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText
            display.value += value
        })
    })


}
window.onload = init