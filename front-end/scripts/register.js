const form = document.querySelector("form");
const firstName = form.querySelector(".fName");
const lastName = form.querySelector(".lName");
const email = form.querySelector(".email");
const password = form.querySelector(".password");
const city = form.querySelector(".city");
const zip = form.querySelector(".zip");
const apartment = form.querySelector(".apartment");
const street = form.querySelector(".street");
const division = form.querySelector(".division");
const country = form.querySelector(".country");

form.onsubmit = (event) => {
    event.preventDefault();
    // form.getElementsByTagName('register').Style.display = 'none';
    const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        city: city.value,
        zip: zip.value,
        apartment: apartment.value,
        street: street.value,
        division: division.value,
        country: country.value,
    };
    register(payload);
};

async function register(payload) {
    console.log(payload);
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            mode: "no-cors",
            cache: "default",
        };
        const url = "http://localhost:3000/users/register";
        const response = await axios.post(url, payload, options);
        console.log(response);
        if (response && response.data && response.data.success) {
            const field = document.getElementById("error");
            field.classList.remove("hide");
            field.innerHTML = "Registration successful";
            field.style.color = "green";
            field.style.fontWeight = "bold";
            setTimeout(() => {
                field.classList.add("hide");
                window.location.href = "login.html";
            }, 2000);
        } else {
            const field = document.getElementById("error");
            field.classList.remove("hide");
            field.innerHTML = "Something went wrong! Try again.";
            field.style.color = "red";
            field.style.fontWeight = "bold";
            setTimeout(() => {
                field.classList.add("hide");
            }, 4000);
        }
    } catch (error) {
        console.log(error);
    }
}
