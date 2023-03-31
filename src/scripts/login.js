'use strict';
function patterns() {
    return {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    }
}

async function call_api() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done")
        }, 2000)
    })
}

function apply_keypress_event() {
    document.querySelectorAll("[common-input]").forEach(input => {
        input.addEventListener("keypress", (e) => {
            let cur_btn = document.querySelector(`[${input.getAttribute("btn")}]`)
            if (e.keyCode === 13) {
                if (cur_btn) {
                    cur_btn.style.cursor = 'not-allowed'
                    cur_btn.click()
                }
            }
        })
    })
}

function display_messages(btn, element, message) {
    element.innerText = message;
    btn.classList.add("wrong_input_highlight")
    setTimeout(() => {
        btn.classList.remove("wrong_input_highlight")
        // element.innerText = ''
    }, 500)
}

async function authenticate_user(event, flow) {
    event.target.style.opacity = .6
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    event.target.disabled = true
    let username = document.getElementById("lg_email_value").value
    let password = document.getElementById("lg_password_value").value
    let warning = document.querySelector("[auth-wrong-input-value]")
    if (!username) {
        event.target.innerHTML = 'Login'
        display_messages(event.target, warning, 'Please enter valid username',)
        event.target.style.opacity = 1
        event.target.style.cursor = 'pointer';
        event.target.disabled = false
        return
    }
    if (!password) {
        event.target.innerHTML = 'Login'
        display_messages(event.target, warning, 'Please enter passsword');
        event.target.style.opacity = 1
        event.target.style.cursor = 'pointer';
        event.target.disabled = false
        return
    }
    await call_api()
    event.target.style.cursor = 'pointer';
    event.target.disabled = false
    event.target.innerHTML = 'Login'
    openlgBlock(event, 'n')
}

document.getElementById("lg_otp_value").addEventListener("keyup", (e) => {
    if (e.target.value.length === 5) {
        console.log('hit')
        e.target.blur()
        document.querySelector(`[${e.target.getAttribute("btn")}]`).click()
    }
})

async function authenticate_user_otp(event, flow) {
    event.target.style.opacity = .6
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    let username = document.getElementById("lg_email_value").value
    let user_otp = document.getElementById("lg_otp_value").value
    let warning = document.querySelector("[otp-wrong-input-value]")
    if (!user_otp) {
        display_messages(event.target, warning, 'Please enter received OTP')
        return
    }
    await call_api()
    localStorage.setItem("_username_", username)
    return window.location.href = 'http://127.0.0.1:5501/src/templates/login.html'
}



// common function for checking cookie and make necessary restrictions;
function checkCockie() {
    let cookie = document.cookie;
    if (!cookie) {
        return enableRequiredBlock(null)
    }
    let c_obj = cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
    return enableRequiredBlock(c_obj)
}
async function sendOtp(event, flow) {
    let userId = document.querySelector('#onb_email_input')
    let warning = document.querySelector('[rg-email-input-value]')

    if (!patterns().email.test(userId.value)) {
        return display_messages(event.target, warning, 'Please enter correct email')
    }
    let userIdElement = document.querySelector('[user-unique-id]');
    if (userIdElement) {
        userIdElement.innerText = userId.value
    }
    await call_api()
    openrgBlock(event, flow)
}

function openlgBlock(event, flow) {
    let current_input_block = event.target.closest(".input_group_block");
    if (!current_input_block) {
        return
    }
    if (current_input_block) {
        current_input_block.classList.remove("active_lg_inputblock")
    }
    if (flow === 'n') {
        if (current_input_block.nextElementSibling) {
            current_input_block.nextElementSibling.classList.add("active_lg_inputblock")
            current_input_block.nextElementSibling.children[1].children[0].focus()
        }
    } else if (flow === "p") {
        if (current_input_block.previousElementSibling) {
            current_input_block.previousElementSibling.classList.add("active_lg_inputblock")
            current_input_block.previousElementSibling.children[1].children[0].focus()
        }

    }

}
