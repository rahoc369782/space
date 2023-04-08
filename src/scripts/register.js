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

    document.getElementById("rg_otp_value").addEventListener("keyup", (e) => {
        if (e.target.value.length === 6) {
            e.target.blur()
            document.querySelector(`[${e.target.getAttribute("btn")}]`).click()
        }
    })

    document.getElementById("rg_gender_input").addEventListener("keyup", (e) => {
        if (e.key === "Backspace") {
            e.target.value = "";
            return;
        }
        if (e.key === 'm' || e.key === 'M') {
            e.target.value = 'Male';
            disable_wrong_input();
            return e.target.blur()
        }
        if (e.key === 'f' || e.key === 'F') {
            e.target.value = 'Female';
            disable_wrong_input();
            return e.target.blur()
        }
        if (e.key === 'o' || e.key === 'O') {
            e.target.value = 'Others';
            disable_wrong_input();
            return e.target.blur()
        }
        e.target.value = "";
        return display_messages(e.target, 'Only M , F & O are allowed')
    })
}
function disable_wrong_input() {
    let warning_ele = document.getElementsByClassName('wrong_input')[0];
    warning_ele.classList.remove("wrong_input_active")
    warning_ele.children[0].children[0].innerText = "";
}
function common_btn_clicked_fun(btn) {
    btn.disabled = true
    btn.innerHTML = '<div class="dot-spinner"><div></div><div></div><div></div><div></div></div>';
    btn.classList.add('btn_clicked_animation');
}

function common_btn_unclicked_fun(btn, text) {
    btn.innerHTML = text;
    btn.disabled = false;
    btn.classList.remove('btn_clicked_animation');
}

function display_messages(btn, message) {
    let warning_ele = document.getElementsByClassName('wrong_input')[0]
    warning_ele.children[0].children[0].innerText = message;
    btn.classList.add("wrong_input_highlight")
    warning_ele.classList.add("wrong_input_active")
    setTimeout(() => {
        btn.classList.remove("wrong_input_highlight")
    }, 500)
}



function check_dob(e) {
    let error_element_msg = document.querySelector('[input-error-msg]')
    let dob = e.target.value.split('-');
    if (dob.length < 10) {
        e.target.classList.add("wrong_input_highlight")
        setTimeout(() => {
            e.target.classList.remove("wrong_input_highlight")
            // element.innerText = ''
        }, 500)
        e.target.value = '';

        error_element_msg.innerHTML = 'Please enter correct DOB';
        error_element_msg.classList.add("wrong_input_highlight")
        setTimeout(() => {
            error_element_msg.classList.remove("wrong_input_highlight")
            // element.innerText = ''
        }, 500)
        return false;
    }
    return true;
}
// document.getElementById("rg_dob_value").addEventListener("keyup", (e) => {
//     if (e.key === "Backspace") {
//         return;
//     }
//     let pattern = /^[\d -]+$/
//     if (e.target.value.length === 2) {
//         if (!pattern.test(e.target.value)) {
//             e.target.value = ''
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             return
//         }
//         else if (parseInt(e.target.value) < 31) {
//             e.target.value = e.target.value + '-'
//             return;
//         }
//         else {
//             e.target.value = ''
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             return
//         }
//     }
//     if (e.target.value.length === 5) {
//         let dob_input = e.target.value.split('-')
//         console.log(parseInt(dob_input[1]))
//         if (!pattern.test(dob_input[1])) {
//             e.target.value = dob_input[0] + '-';
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             return
//         }
//         else if (parseInt(dob_input[1]) < 13) {
//             e.target.value = e.target.value + '-';
//             return
//         }
//         else {
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             e.target.value = dob_input[0] + '-';
//             return;
//         }
//     }
//     if (e.target.value.length === 10) {
//         let dob_input = e.target.value.split('-')
//         if (!pattern.test(dob_input[2])) {
//             e.target.value = dob_input[0] + '-' + dob_input[1] + '-';
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             return
//         }
//         else if (parseInt(dob_input[2]) <= new Date().getFullYear()) {
//             return
//         }
//         else {
//             e.target.value = dob_input[0] + '-' + dob_input[1] + '-';
//             e.target.classList.add("wrong_input_highlight")
//             setTimeout(() => {
//                 e.target.classList.remove("wrong_input_highlight")
//                 // element.innerText = ''
//             }, 500)
//             return;
//         }
//     }
// })

var date = document.getElementById('rg_dob_value');

function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
};

date.addEventListener('input', function (e) {
    this.type = 'text';
    var input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + ' / ' : v;
    });
    this.value = output.join('').substr(0, 14);
});

date.addEventListener('blur', function (e) {
    this.type = 'text';
    var input = this.value;
    var values = input.split('/').map(function (v, i) {
        return v.replace(/\D/g, '')
    });
    var output = '';
    if (values.length == 3) {
        var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
        var month = parseInt(values[0]) - 1;
        var day = parseInt(values[1]);
        var d = new Date(year, month, day);
        if (!isNaN(d)) {
            document.getElementById('result').innerText = d.toString();
            var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
            output = dates.map(function (v) {
                v = v.toString();
                return v.length == 1 ? '0' + v : v;
            }).join(' / ');
        };
    };
    this.value = output;
});

async function verifyOtp(event, flow) {
    common_btn_clicked_fun(event.target)
    disable_wrong_input();
    let otp_ele = document.querySelector('#rg_otp_value');
    let otp = otp_ele.value;
    if (!otp || otp.length < 6) {
        otp_ele.value = ''
        common_btn_unclicked_fun(event.target, "Verify");
        return display_messages(event.target, 'Please enter valid OTP')
    }
    await call_api()
    sessionStorage.setItem("rg_status", "password")
    common_btn_unclicked_fun(event.target, "Verify")
    openrgBlock(event, flow)
}

function checkPassword(inputtxt) {
    // To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if (inputtxt.match(decimal)) {
        return true;
    }
    else {
        return false;
    }
}


async function setPassword(event, flow) {
    common_btn_clicked_fun(event.target);
    disable_wrong_input();
    let pass_ele = document.getElementById('rg_pass_value');
    let pass = pass_ele.value
    let conf_pass_ele = document.getElementById('rg_conf_pass_value');
    let conf_pass = conf_pass_ele.value;
    let warning = document.querySelector('[rg-wrong-input-value]')
    if (!checkPassword(pass)) {
        common_btn_unclicked_fun(event.target, "Continue");
        conf_pass_ele.value = '';
        return display_messages(event.target, 'Password should have atleast 6 characters , one uppercase , one lowercase , one numeric & one special character')
    }
    if (pass !== conf_pass) {
        common_btn_unclicked_fun(event.target, "Continue");
        conf_pass_ele.value = '';
        return display_messages(event.target, 'Confirm password field should match with password field')
    }
    sessionStorage.setItem("rg_status", "username")
    await call_api()
    common_btn_unclicked_fun(event.target, "Continue")
    openrgBlock(event, flow)
}

async function setUsername(event, flow) {
    common_btn_clicked_fun(event.target);
    disable_wrong_input();
    let username_ele = document.getElementById('rg_username_value');
    let username = username_ele.value;
    let warning = document.querySelector('[rg-wrong-input-value]')
    if (!username || username.length < 5) {
        common_btn_unclicked_fun(event.target, "Continue");
        username_ele.value = '';
        return display_messages(event.target, 'Confirm password field should match with password field')
    }
    sessionStorage.setItem("rg_status", "personal")
    sessionStorage.setItem("_username_", username)
    await call_api()
    common_btn_unclicked_fun(event.target, "Continue")
    openrgBlock(event, flow)
}

function activate_rg_done() {
    let welcome_block = document.querySelector('[onb-rg-done-block]')
    let register_form = document.querySelector('[register-form]')
    welcome_block.classList.add('onb_rg_done_activate')
}

async function setPersonalinfo(event, flow) {
    common_btn_clicked_fun(event.target)
    // input handling
    await call_api()
    sessionStorage.setItem("rg_status", "done")
    // document.querySelector('[register-form]').style.display = 'none'
    window.location.href = "http://127.0.0.1:5501/src/templates/plans.html"
    common_btn_unclicked_fun(event.target, "Continue")
    // setTimeout(() => {
    //     activation_strip.classList.remove('account_activated')
    // }, 10000)
    // openrgBlock(event, flow)
}


async function sendOtp(event, flow) {
    common_btn_clicked_fun(event.target);
    disable_wrong_input();
    let userId = document.querySelector('#onb_email_input')
    if (!patterns().email.test(userId.value)) {
        common_btn_unclicked_fun(event.target, 'Sent OTP')
        return display_messages(event.target, 'Please enter valid email')
    }
    let userIdElement = document.querySelector('[user-unique-id]');
    if (userIdElement) {
        userIdElement.innerText = userId.value
    }
    await call_api()
    common_btn_unclicked_fun(event.target, 'Sent OTP');
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


