let form = document.forms.registration
let allInps = form.querySelectorAll('input')
let reqs = form.querySelectorAll('.required')
let info_views = document.querySelectorAll('.info p')

info_views[0].innerHTML = `All: ${allInps.length}`
info_views[1].innerHTML = `Need: ${reqs.length}`


const nameRE = /^[a-zA-Zа-яА-Я]+$/

let pattern = {
    name: nameRE,
    mom: nameRE,
    dad: nameRE,
    surname: /^[a-z ,.'-]+$/i,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[-+_!@#$%^&*.,?])).{6,12}/,
    phone: /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    aboutYou: /^[a-z ,.'-]*$/i,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    html: /^[a-z ,.'-]+$/i,
    css: /^[a-z ,.'-]+$/i,
    js: /^[a-z ,.'-]+$/i,
    favouriteCar: /^[a-z ,.'-]+$/i,
}

allInps.forEach(inp => {
    let parent = inp.parentElement
    inp.onkeyup = () => {
        if (!pattern[inp.name].test(inp.value)) {
            parent.classList.add('error')
        } else {
            parent.classList.remove('error')
        }
    }
})


form.onsubmit = (event) => {
    event.preventDefault();
    let error = false
    let errorCount = 0

    
    allInps.forEach(inp => {
        let parent = inp.parentElement
        if (inp.value.length === 0 && parent.classList.contains('required') || inp.value.length && parent.classList.contains('error')) {
            parent.classList.add('error')
            error = true
            errorCount++
        } else {
            parent.classList.remove('error')
        }
    })

    info_views[3].innerHTML = `Error: ${errorCount}/${allInps.length}`
    info_views[2].innerHTML = `Success: ${allInps.length - errorCount}/${allInps.length}`

    if (error) return alert('Error')
    submit(form)
}

function submit(form) {
    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);
}