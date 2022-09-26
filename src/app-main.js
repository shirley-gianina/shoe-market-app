import { LitElement, html, css } from "lit-element";
import { outlet } from "lit-element-router";

class Main extends outlet(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define("app-main", Main);
