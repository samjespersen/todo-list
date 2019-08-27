import Component from '../Component.js';
import Item from '../Item/Item.js';

class ListApp extends Component {
    onRender(dom) {
        const items = this.props.items;
        items.forEach(item => {
            const itemRender = new Item({ item }).renderDOM();
            dom.querySelector('#items').appendChild(itemRender);
        });
    }

    renderHTML() {
        return /*html*/`
            <section id="list">
                    <section id="add-item">
                        Put something on the list plz
                        <div><input type="text" id="input"><button
                                id="add-button">Add</button></div>
                    </section>
                    <section id="items">
                    </section>
                </section>
        `;
    }
}

export default ListApp;