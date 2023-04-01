'use strict';

// On Domcontent loaded first we will check for session
// if session for current_block is available then we will open that respetive block
// else we will open default block
// after fetching from 

function patterns() {
    return {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    }
}
let allowedPagesForLoginOpt = {
    userid: true,
    otp: true,
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

document.getElementById("rg_otp_value").addEventListener("keyup", (e) => {
    if (e.target.value.length === 6) {
        e.target.blur()
        document.querySelector(`[${e.target.getAttribute("btn")}]`).click()
    }
})

document.getElementById("rg_dob_value").addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
        return;
    }
    if (e.target.value.length === 2) {
        if (parseInt(e.target.value) < 31) {
            e.target.value = e.target.value + '-'
            return;
        } else {
            e.target.value = ''
            e.target.classList.add("wrong_input_highlight")
            setTimeout(() => {
                e.target.classList.remove("wrong_input_highlight")
                // element.innerText = ''
            }, 500)
            return
        }
    }
    if (e.target.value.length === 5) {
        let dob_input = e.target.value.split('-')
        if (parseInt(dob_input[1]) < 13) {
            e.target.value = e.target.value + '-';
            return
        } else {
            e.target.classList.add("wrong_input_highlight")
            setTimeout(() => {
                e.target.classList.remove("wrong_input_highlight")
                // element.innerText = ''
            }, 500)
            e.target.value = dob_input[0] + '-';
            return;
        }
    }
})

async function verifyOtp(event, flow) {
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    sessionStorage.setItem("rg_status", "password")
    await call_api()
    event.target.innerHTML = 'Continue'
    openrgBlock(event, flow)
}

async function setPassword(event, flow) {
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    sessionStorage.setItem("rg_status", "username")
    await call_api()
    event.target.innerHTML = 'Continue'
    openrgBlock(event, flow)
}

async function setUsername(event, flow) {
    let username = document.getElementById('rg_username_value').value
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    await call_api()
    sessionStorage.setItem("rg_status", "personal")
    sessionStorage.setItem("_username_", username)
    event.target.innerHTML = 'Continue'
    openrgBlock(event, flow)
}

function activate_rg_done() {
    let account_msg = document.querySelector('[account-status-msg]')
    let welcome_block = document.querySelector('[onb-rg-done-block]')
    let register_form = document.querySelector('[register-form]')
    account_msg.innerText = `Welcome ${sessionStorage.getItem("_username_")}, your account is created successfully`
    register_form.classList.remove('wrapper_form_active')
    document.querySelector('[regular-status-strip]').style.display = 'none'
    let activation_strip = document.querySelector('[process-status-strip]')
    activation_strip.classList.add('account_activated')
    welcome_block.classList.add('onb_rg_done_activate')
}

async function setPersonalinfo(event, flow) {
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    await call_api()
    // sessionStorage.setItem("rg_status", "done")
    // document.querySelector('[register-form]').style.display = 'none'
    activate_rg_done()
    event.target.innerHTML = 'Continue'
    // setTimeout(() => {
    //     activation_strip.classList.remove('account_activated')
    // }, 10000)
    // openrgBlock(event, flow)
}


async function sendOtp(event, flow) {
    event.target.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
    let userId = document.querySelector('#onb_email_input')
    let warning = document.querySelector('[rg-email-input-value]')
    if (!patterns().email.test(userId.value)) {
        event.target.innerHTML = 'Send OTP'
        return display_messages(event.target, warning, 'Please enter correct email')
    }
    let userIdElement = document.querySelector('[user-unique-id]');
    if (userIdElement) {
        userIdElement.innerText = userId.value
    }
    await call_api()
    event.target.innerHTML = 'Send OTP'
    openrgBlock(event, flow)
}

function openrgBlock(event, flow) {
    let current_input_block = event.target.closest(".input_group_block");
    if (!current_input_block) {
        return
    }
    if (current_input_block) {
        current_input_block.classList.remove("active_rg_inputblock")
    }
    if (flow === 'n') {
        if (current_input_block.nextElementSibling) {
            current_input_block.nextElementSibling.classList.add("active_rg_inputblock")
            current_input_block.nextElementSibling.children[1].children[0].focus()
        }
    } else if (flow === "p") {
        if (current_input_block.previousElementSibling) {
            current_input_block.previousElementSibling.classList.add("active_rg_inputblock")
            current_input_block.previousElementSibling.children[1].children[0].focus()
        }
    }
}


