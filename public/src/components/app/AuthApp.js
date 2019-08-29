import Component from '../Component.js';
import Header from '../app/Header.js';
import SignIn from '../auth/SignIn.js';
import SignUp from '../auth/SignUp.js';
import { userSignUp, userSignIn } from '../../services/list-api.js';
import store from '../../services/store.js';

function verifySuccess(user) {
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './index.html';
}



class AuthApp extends Component {

    onRender(dom) {
        const headerMessage = 'Yous better log in or else!';
        const header = new Header({ headerMessage });
        dom.prepend(header.renderDOM());

        const error = dom.querySelector('.error');
        const signUpBox = dom.querySelector('#signup-box');
        const signInBox = dom.querySelector('#signin-box');

        const signUp = new SignUp({
            onSignUp: newUser => {
                error.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        verifySuccess(user);
                    })
                    .catch(err => {
                        error.textContent = err;
                    });
            }
        });
        signUpBox.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: userCred => {
                error.textContent = '';

                return userSignIn(userCred)
                    .then(user => {
                        verifySuccess(user);
                    })
                    .catch(err => {
                        error.textContent = err;
                    });
            }
        });

        signInBox.appendChild(signIn.renderDOM());

        dom.querySelector('#signin-button').addEventListener('click', () => {
            signInBox.classList.remove('hidden');
            signUpBox.classList.add('hidden');
            dom.querySelector('#signin-button').classList.add('selected');
            dom.querySelector('#signup-button').classList.remove('selected');
            error.textContent = '';


        });

        dom.querySelector('#signup-button').addEventListener('click', () => {
            signInBox.classList.add('hidden');
            signUpBox.classList.remove('hidden');
            dom.querySelector('#signin-button').classList.remove('selected');
            dom.querySelector('#signup-button').classList.add('selected');
            error.textContent = '';

        });


    }


    renderHTML() {
        return /*html*/`
             <div id="root">
                <main>
                    <div id="auth-container">
                 <section id="button-box"> 
                        <button id="signin-button" class="option selected">Sign In</button>
                        <button id="signup-button" class="option">Sign Up</button>
                        </section>
                 <section id="auth-box">
                    <section id="signin-box">
                    </section>
                    <section id="signup-box" class="hidden">
                    </section>
                    </section>
                    <p class="error"></p>
                    </div>

                </main>
            </div>
        `;
    }
}

export default AuthApp;