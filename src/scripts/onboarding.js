'use strict';
let allowedPagesForLoginOpt = {
    userid: true,
    otp: true,
}
function verifyOtp(event, flow) {
    document.cookie = "current_step=password"
    sessionStorage.setItem("last_step", "password")
    openBlock(event, flow)
}

// setCockie for registration tracking purpose
function setCockie() {
    // document.cookie = "last_step= password; path=/"
    // document.cookie = "current_step=userid"
}

window.addEventListener("load", () => {
    setCockie();
    checkCockie()
})

function enableRequiredBlock(track) {
    // Enable required block
    // document.querySelector('[onb-lg-userid-block]').classList.add("active_inputblock")
    if (!track) {
        document.querySelector('[onb-rg-userid-block]').classList.add("active_inputblock")
    } else {
        let enabledBlock = document.querySelector(`[onb-rg-${track.current_step}-block]`)
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
function sendOtp(event, flow) {
    let userId = document.querySelector('#onb_email_input')
    let userIdElement = document.querySelector('[user-unique-id]');
    if (userIdElement) {
        userIdElement.innerText = userId.value
    }
    openBlock(event, flow)
}

function openBlock(event, flow) {
    let current_input_block = event.target.closest(".input_group_block");
    if (!current_input_block) {
        return
    }

    if (current_input_block) {
        current_input_block.classList.remove("active_inputblock")
    }
    if (flow === 'n') {
        if (current_input_block.nextElementSibling) {
            current_input_block.nextElementSibling.classList.add("active_inputblock")
            let loginOpt = document.getElementById("onb_login_opt");
            if (current_input_block.nextElementSibling.attributes.is_login_allowed) {
                loginOpt.style.display = 'block'
            } else {
                loginOpt.style.display = 'none'
            }
        }
    } else if (flow === "p") {
        if (current_input_block.previousElementSibling) {
            current_input_block.previousElementSibling.classList.add("active_inputblock")
        }
        let loginOpt = document.getElementById("onb_login_opt");
        if (current_input_block.previousElementSibling.attributes.is_login_allowed) {
            loginOpt.style.display = 'block'
        } else {
            loginOpt.style.display = 'none'
        }
    }

    // document.querySelectorAll(".input_group_block").forEach(block => {
    //     block.classList.remove("active_inputblock")
    // })
    // document.querySelector(selector).classList.add("active_inputblock")

}

function openFormWrapper(event, flow) {
    let current_wrapper_block = event.target.closest("[onboarding-form-container]");

    current_wrapper_block.classList.remove("wrapper_form_active")
    if (flow === 'n') {
        console.log(current_wrapper_block.nextElementSibling)

        if (current_wrapper_block.nextElementSibling) {
            current_wrapper_block.nextElementSibling.classList.add("wrapper_form_active")
        }
    } else if (flow === "p") {
        if (current_wrapper_block.previousElementSibling) {
            current_wrapper_block.previousElementSibling.classList.add("wrapper_form_active")
        }
    }
}
