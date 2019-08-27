import Component from '../Component.js';
import Header from './Header.js';
import ListApp from './ListApp.js';

class App extends Component {

    onRender(dom) {

        const header = new Header();
        dom.prepend(header.renderDOM());

        const list = new ListApp({ items: [] });
        dom.querySelector('main').appendChild(list.renderDOM());

        //const items = getItems();

        const items = [{
            id: 1,
            text: 'Complete lab 11',
            date_added: 1566923916376,
            completed: false
        }, {
            id: 1,
            text: 'Complete lab 11',
            date_added: 1566923916376,
            completed: false
        }];

        list.update({ items });
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