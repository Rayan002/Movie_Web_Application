// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAcBTa0Ui2Ltr255lN2qa75JOiN20Lxkxk",
    authDomain: "moviewebapp-68e1b.firebaseapp.com",
    projectId: "moviewebapp-68e1b",
    storageBucket: "moviewebapp-68e1b.appspot.com",
    messagingSenderId: "178388644896",
    appId: "1:178388644896:web:fedf20ddee473346853845"
    
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            console.log('Signed Up', userCredential.user);
            // window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing Up', error);
            alert(error.message);
        });
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            console.log('Signed In', userCredential.user);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error('Error Signing In', error);
            alert(error.message);
        });
});

document.getElementById('signUp').addEventListener('click', () => {
    document.querySelector('.container').classList.add("right-panel-active");
});

document.getElementById('signIn').addEventListener('click', () => {
    document.querySelector('.container').classList.remove("right-panel-active");
});
