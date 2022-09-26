import { LitElement, html, css } from "lit-element";
import { navigator } from "lit-element-router";

class Link extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }

  static get styles() {
    return css`
      a {
        text-decoration: none;
        color: #000;
      }
    `;
  }

  constructor() {
    super();
    this.href = "";
  }
  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

customElements.define("app-link", Link);
