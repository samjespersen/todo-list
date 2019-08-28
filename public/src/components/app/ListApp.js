import Component from '../Component.js';
import Item from '../Item/Item.js';


class ListApp extends Component {
    onRender(dom) {
        const items = this.props.items;
        const addItem = this.props.addItem;

        items.forEach(item => {
            const itemRender = new Item({ item: item, updateItem: this.props.updateItem }).renderDOM();
            dom.querySelector('#items').appendChild(itemRender);
        });

        dom.querySelector('#add-button').addEventListener('click', () => {
            const error = dom.querySelector('#error');
            error.textContent = '';
            const text = dom.querySelector('#input').value;
            const date = new Date().getTime();
            const item = {
                text: text,
                date_added: date,
                updateItem: this.props.items.updateItem
            };
            addItem(item)
                .catch(err => {
                    error.textContent = err;
                });
        });


    }

    renderHTML() {
        return /*html*/`
            <section id="list">
                    <section id="add-item">
                        Put something on the list plz
                        <div><input type="text" id="input"><button
                                id="add-button">Add</button></div>
                                <p id="error"></p>
                    </section>
                    <section id="items">
                    </section>
                </section>
        `;
    }
}

export default ListApp;