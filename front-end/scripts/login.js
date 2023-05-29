const form = document.querySelector("form");

form.onsubmit = (event) => {
    event.preventDefault();
    console.log(form);
    const email = form.querySelector('input[type="email"]').value;
    const pass = form.querySelector('input[type="password"]').value;
    console.log(email, pass);
    const payload = {
        email: email,
        password: pass,
    };
    login(payload)
        .then()
        .catch((err) => console.log(err));
};

async function login(payload) {
    const url = "http://localhost:3000/users/login";
    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "no-cors",
        cache: "default",
    };
    const response = await axios.post(url, payload, options);
    if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log(parseJwt(token));
        window.location.href = 'index.html';
    }
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
