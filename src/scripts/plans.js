window.addEventListener('DOMContentLoaded', () => {
    let account_msg = document.querySelector('[account-status-msg]')
    account_msg.innerText = `Welcome ${sessionStorage.getItem("_username_")}, your account is created successfully`
})