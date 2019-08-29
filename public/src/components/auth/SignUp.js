import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formDaddy = new FormData(form);

            const user = {
                displayName: formDaddy.get('name'),
                email: formDaddy.get('email'),
                password: formDaddy.get('password')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </p>
                    
                <p>
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" required placeholder="your@email.com">
                </p>
                
                <p>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required>
                </p>

                <p>
                    <button>Sign Up</button>
                </p>

            </form>
        `;
    }
}

export default SignUp;