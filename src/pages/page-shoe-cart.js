import { LitElement, html, css } from "lit-element";

class pageShoeCart extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.dataLocalStorage = [];
    this.dataStorage = [];
  }

  firstUpdated() {
    this.dataStorage = JSON.parse(localStorage.getItem("data"));
    this.dataLocalStorage = [...this.dataStorage];
  }

  render() {
    console.log(this.dataLocalStorage, "soy la data de localstorage");

    return html` ${this.dataLocalStorage?.map((product) => html` <p>${product.name}</p>`)}`;
  }
}

customElements.define("page-shoe-cart", pageShoeCart);
