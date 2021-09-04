const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')

const p1 = document.querySelector('#message-1')
const p2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = searchForm.value
    
    p1.textContent = 'Loading Weather Info'
    p2.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                p1.textContent = data.error
            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
})