import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const msg = this.props.headerMessage;
        return /*html*/`
            <header>
                <h1>${msg}</h1>
            </header>
        `;
    }
}

export default Header;