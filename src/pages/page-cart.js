import { LitElement, html, css } from "lit-element";

import globalCSS from "../styles/global";

export class PageCart extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [
      globalCSS,
      css`
        :host {
          display: block;
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container">
        <p>cart</p>
      </div>
    `;
  }
}

customElements.define("page-cart", PageCart);
