import Component from '../Component.js';

class Item extends Component {

    onRender(dom) {
        const updateItem = this.props.updateItem;
        const input = dom.querySelector('input');
        input.addEventListener('change', () => {
            const date = new Date().getTime();
            const item = this.props.item;
            item.date_completed = date;
            updateItem(item);
        });
    }

    renderHTML() {
        const item = this.props.item;
        const date = new Date(+item.date_added).toLocaleString();
        return /*html*/`
             <div class="item">
                <div>
                    <input type="checkbox" value="${item.id}" ${item.completed ? 'checked' : null}>
                    <p>${item.text}</p>
                </div> 
                <span class="date">${date}</span>
             </div>
        `;
    }
}

export default Item;