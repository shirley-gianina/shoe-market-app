import { LitElement, html, css } from "lit-element";

class LitCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }

      .card {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 10px;
        position: relative;
        overflow: hidden;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot name="body"></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("lit-card", LitCard);
