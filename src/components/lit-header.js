import { LitElement, html, css } from "lit-element";
/* import globalCSS from "../styles/global"; */

class LitHeader extends LitElement {
  static get styles() {
    return [
   /*    globalCSS, */
      css`
        :host {
          display: block;
          box-sizing: border-box;
        }

        header {
          padding: 10px;
          background-color: #353535;
        }

        header .content-logo {
          display: flex;
          justify-content: center;
        }

        .logo {
          width: 80px;
          height: 80px;
          background-color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d74dc6;
        }

        .logo img {
          width: 90%;
          height: 90%;
          padding: 20px;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .content button img {
          width: 25px;
          height: 25px;
        }

        .content h5 {
          margin: 0;
          color: #fff;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div>
          <div class="content-logo">
            <app-link href="/products">
              <div class="logo">
                <img src="/assets/logo-icon.png" alt="logo-img" />
              </div>
            </app-link>
          </div>
          <div class="content">
            <app-link href="/">
              <button>
                <img src="./assets/home-icon.jpg" alt="home-icon-img" />
              </button>
            </app-link>
            <h5>Men´s Lifestyle Sneakers</h5>
            <button>
              <img src="./assets/carrito-icon.png" alt="carrito-icon-img" />
            </button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("lit-header", LitHeader);
