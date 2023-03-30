function changes_in_css_vars(var_key, value) {
    var css_vars = document.querySelector(':root');
    css_vars.style.setProperty(var_key, value - 3 + 'px');
    return;
}
window.addEventListener('load', () => {
    setTimeout(() => {
        let plans_wrapper_height = document.querySelector('[g-strip-container]')
        changes_in_css_vars('--plans-strip-actual-height', plans_wrapper_height.clientHeight)
    }, 2000)

})

document.addEventListener("mouseover", async (e) => {
    let nav_tab_element = '[g-strip-container]'
    let check_for_navtab_ele = e.target.matches(nav_tab_element);
    if (!check_for_navtab_ele && e.target.closest("[g-nav-container]") != null) {
        // Means Inside g-nav-container but not on nav_tab_element
        return
    }
    if (check_for_navtab_ele) {
        if (e.target.nextElementSibling) {
            document.querySelectorAll("[g-navbar-flyer]").forEach(ele => {
                ele.classList.remove("nav_flyer_active")
            })
            e.target.nextElementSibling.classList.add("nav_flyer_active")
            // Means If on nav_tab_element
            document.querySelector("[data=login-overlay]").classList.add("active_overlay")
            //document.querySelector("[activate-navbar-flyer=true]").classList.add("nav_flyer_active")
            return
        }
        return
    }
    // Means Outside g-nav-container but not on nav_tab_element
    document.querySelectorAll("[g-navbar-flyer]").forEach(ele => {
        ele.classList.remove("nav_flyer_active")
    })
    document.querySelector("[data=login-overlay]").classList.remove("active_overlay")

})