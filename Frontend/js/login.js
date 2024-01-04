const formLogin = document.querySelector('#login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // if (email !== '' && password !== '') {
    //     postLogin(email, password);
    //     return;
    // }
    // alert('Identifiant ou Mot de passe vide');        
    
    
    postLogin(email, password);
})

async function postLogin(user, password) {
    // const req = await fetch(`https://api.corentin-beaudet.fr/user`, {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         user: user,
    //         password: password
    //     })
    // });

    // const res = await req.json();

    // if (!res.token) {
    //     alert('Identifiant ou Mot de passe incorrecte');
    //     return;
    // }

    // sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('token', 'TOKEN');
    window.location.href = './../index.html';
}