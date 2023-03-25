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
                    cur_btn.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>'
                    cur_btn.click()
                }
            }
        })
    })
}

function display_messages(btn, element, message) {
    element.innerText = message;
    btn.innerText = 'Continue'
    btn.classList.add("wrong_input_highlight")
    setTimeout(() => {
        btn.classList.remove("wrong_input_highlight")
        // element.innerText = ''
    }, 500)
}

async function authenticate_user(event, flow) {
    let username = document.getElementById("lg_email_value").value
    let password = document.getElementById("lg_password_value").value
    let warning = document.querySelector("[auth-wrong-input-value]")
    if (!username) {
        display_messages(event.target, warning, 'Please enter valid username')
        return
    }
    if (!password) {
        display_messages(event.target, warning, 'Please enter passsword');
        return
    }
    await call_api()
    openlgBlock(event, 'n')
}

async function authenticate_user_otp(event, flow) {
    let username = document.getElementById("lg_email_value").value
    let user_otp = document.getElementById("lg_otp_value").value
    let warning = document.querySelector("[otp-wrong-input-value]")
    if (!user_otp) {
        display_messages(event.target, warning, 'Please enter received OTP')
        return
    }
    await call_api()
    localStorage.setItem("_username_", username)
    return window.location.href = 'http://127.0.0.1:5500/src/templates/space.main.html'
}

async function verifyOtp(event, flow) {
    sessionStorage.setItem("rg_status", "password")
    await call_api()
    openrgBlock(event, flow)
}

async function setPassword(event, flow) {
    sessionStorage.setItem("rg_status", "username")
    await call_api()
    openrgBlock(event, flow)
}

async function setUsername(event, flow) {
    sessionStorage.setItem("rg_status", "personal")
    sessionStorage.setItem("_username", "personal")
    await call_api()
    openrgBlock(event, flow)
}

async function setPersonalinfo(event, flow) {
    sessionStorage.setItem("rg_status", "done")
    await call_api()
    openrgBlock(event, flow)
}

window.addEventListener("DOMContentLoaded", (e) => {
    // Check for session storage
    let currentStep = sessionStorage.getItem("rg_status");
    let currentForm = sessionStorage.getItem("current_form");
    let current_user = localStorage.getItem("_username_");
    if (current_user) {
        document.getElementById("lg_email_value").value = current_user;
        document.getElementById("lg_password_value").focus()
    }
    if (currentForm) {
        // document.querySelectorAll(".wrapper_form_active").forEach(item => {
        //     item.classList.remove("wrapper_form_active")
        // })
        let enabledForm = document.querySelector(`[onboarding-${currentForm}-form-container]`)
        if (enabledForm) {
            enabledForm.classList.add("wrapper_form_active")
        }
    } else {
        let enabledForm = document.querySelector(`[
            onboarding-login-form-container]`)
        if (enabledForm) {
            enabledForm.classList.add("wrapper_form_active")
        }
    }
    if (currentStep) {
        document.querySelectorAll(".active_rg_inputblock").forEach(item => {
            item.classList.remove("active_rg_inputblock")
        })
        // Enabled previous block in which user drop
        let enabledBlock = document.querySelector(`[onb-rg-${currentStep}-block]`)
        if (enabledBlock) {
            enabledBlock.classList.add("active_rg_inputblock")
        }
    }
    apply_keypress_event()
})
// window.addEventListener("load", () => {
//     console.log("loaded", content - Date.now())
//     setCockie();
//     checkCockie()
// })

function enableRequiredBlock(track) {
    // Enable required block
    // document.querySelector('[onb-lg-userid-block]').classList.add("active_inputblock")
    if (!track) {
        document.querySelector('[onb-rg-userid-block]').classList.add("active_inputblock")
    } else {
        let enabledBlock = document.querySelector(`[onb-rg-${track.rg_status}-block]`)
        if (enabledBlock) {
            enabledBlock.classList.add("active_inputblock")
        }
        if (enabledBlock.attributes.is_login_allowed) {
            let loginOpt = document.getElementById("onb_login_opt");
            loginOpt.style.display = 'block'
        }
    }

    // if (track.)
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

function openFormWrapper(close, open) {
    let current_wrapper_block = document.querySelector(`[onboarding-${close}-form-container]`)
    let next_wrapper_block = document.querySelector(`[onboarding-${open}-form-container]`)
    if (!current_wrapper_block) {
        return;
    }
    current_wrapper_block.classList.remove("wrapper_form_active")
    next_wrapper_block.classList.add("wrapper_form_active")
    sessionStorage.setItem("current_form", open)
    // if (flow === 'n') {
    //     if (current_wrapper_block.nextElementSibling) {
    //         current_wrapper_block.nextElementSibling.classList.add("wrapper_form_active")
    //         sessionStorage.setItem("current_form",)
    //     }
    // } else if (flow === "p") {
    //     if (current_wrapper_block.previousElementSibling) {
    //         current_wrapper_block.previousElementSibling.classList.add("wrapper_form_active")
    //     }
    // }
}
