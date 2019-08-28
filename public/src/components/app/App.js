import Component from '../Component.js';
import Header from './Header.js';
import ListApp from './ListApp.js';
import { getList, addItem, updateItem } from '../../services/list-api.js';

class App extends Component {

    onRender(dom) {

        const listProps = {
            items: [],
            addItem: item => {
                return addItem(item)
                    .then(newItem => {
                        const items = this.state.items;
                        if(items) {
                            items.push(newItem);
                            list.update({ items });
                        }
                    });
            },
            updateItem: item => {
                return updateItem(item)
                    .then(updatedItem => {
                        const items = this.state.items;
                        const index = items.indexOf(item);
                        items.splice(index, 1, updatedItem);
                        list.update({ items });
                    });
            }
        };

        const header = new Header();
        dom.prepend(header.renderDOM());

        const list = new ListApp(listProps);
        dom.querySelector('main').appendChild(list.renderDOM());

        getList()
            .then(items => {
                this.state.items = items;
                list.update({ items });
            })
            .catch(err => {
                console.log(err);
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