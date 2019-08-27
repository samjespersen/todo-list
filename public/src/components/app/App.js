import Component from '../Component.js';
import Header from './Header.js';
import ListApp from './ListApp.js';
import { getList } from '../../services/list-api.js';

class App extends Component {

    onRender(dom) {

        const header = new Header();
        dom.prepend(header.renderDOM());

        const list = new ListApp({ items: [] });
        dom.querySelector('main').appendChild(list.renderDOM());

        getList()
            .then(items => {
                list.update({ items });
            });

    }

    renderHTML() {
        return /*html*/`
            <div id="root">
            <main>
            </main>
            </div>
        `;
    }
}

export default App;