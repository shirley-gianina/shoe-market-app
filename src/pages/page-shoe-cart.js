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
    this.data = [];
  }

  render() {
    return html` ${this.data?.map((product) => html` <p>${product.name}</p>`)}`;
  }
}

customElements.define("page-shoe-cart", pageShoeCart);
