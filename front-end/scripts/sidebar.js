const authStatus = localStorage.getItem('authenticated');
let isAuthenticated = authStatus !== null ? JSON.parse(authStatus) : false;
console.log('isAuth: ', isAuthenticated)
let profile = {};

if(isAuthenticated) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    getUser(user).then(() => {
        const authorized = document.getElementById('authorized');
        const unauthorized = document.getElementById('unauthorized');
        authorized.classList.remove('hide');
        authorized.classList.add('show');
        unauthorized.classList.remove('show');
        unauthorized.classList.add('hide');
    }).catch((err) => console.log(err));
}

async function getUser(user) {
    try {
        const url = `http://localhost:3000/users/get-user/${user.id}`;
        const response = await axios.get(url);
        if(response.status === 200) {
            profile = response.data.data;
            console.log('profile: ', profile);
            document.getElementById('firstName').innerHTML = profile.firstName;
        }
        console.log(response);
    } catch (error) {
        console.log('err: ', error);
    }
}

function logout() {
    console.log('logout');
    // isAuthenticated = false;
    localStorage.setItem('user', null);
    localStorage.setItem('authenticated', false) ;
    localStorage.setItem('token', null);
    location.reload();
}