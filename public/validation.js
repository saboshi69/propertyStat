const pattern = {
    phone: /^\d{8}$/,
    username: /^[a-z\d]{5,12}$/i,
    password: /^[\w@-]{8,20}$/,
    email: /^([a-z\d\.-_]{1,35})@([a-z\d-_]+)\.([a-z]{2,10})(\.[a-z]{2,8})?$/

}

const inputs = document.querySelectorAll('.reg >form > input')


function validate(field, regex) {
    if(regex.test(field.value)){
        field.classList.add('valid')
        field.classList.remove('invalid')
    }else{
        field.classList.remove('valid')
        field.classList.add('invalid')
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        //console.log(e.target.attributes.name.value)
        validate(e.target, pattern[e.target.attributes.name.value])
    })
})