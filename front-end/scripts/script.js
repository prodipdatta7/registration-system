function showDropdown() {
    let control = document.getElementById("dropdown-list");
    control.classList.toggle("show-dropdown");
    console.log("Dropdown", control);
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (const element of dropdowns) {
            let openDropdown = element;
            if (openDropdown.classList.contains("show-dropdown")) {
                openDropdown.classList.remove("show-dropdown");
            }
        }
    }
};

const token = localStorage.getItem("token");
console.log(token)
if (token) {
    const credentials = parseJwt(token);
    if (!_tokenExpired(credentials.exp)) {
        const user = {
            id: credentials.id,
            email: credentials.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authenticated", true);
    } else {
        localStorage.removeItem("token");
        localStorage.setItem("user", null);
        localStorage.setItem("authenticated", false);
    }
} else {
    localStorage.removeItem("token");
    localStorage.setItem("user", null);
    localStorage.setItem("authenticated", false);
}

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

function _tokenExpired(expiration) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
}
