import Component from '../Component.js';

class Item extends Component {

    renderHTML() {
        const item = this.props.item;
        const date = new Date(+item.date_added).toLocaleString();
        return /*html*/`
             <div class="item">
                <div>
                    <input type="checkbox" value="${item.id}">
                    <p>${item.text}</p>
                </div> 
                <span class="date">${date}</span>
             </div>
        `;
    }
}

export default Item;