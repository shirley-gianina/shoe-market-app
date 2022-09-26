import { LitElement, html, css } from "lit-element";
import globalCSS from "../styles/global";

export class PageProductDetail extends LitElement {
  static get properties() {
    return {
      productId: { type: String },
    };
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
    this.productId = null;
    this.product = null;
  }

  firstUpdated() {
    fetch(
      `https://my-json-server.typicode.com/claumartinezh/training-db/shoes/${this.productId}`
    )
      .then((response) => response.json())
      .then((res) => this._handleData(res));
  }

  /*   shouldUpdate(changedProperties) {
    console.log("should update", changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return true;
  }
 */
  render() {
    return html`
      <p>ID: ${this.productId}</p>
      <div>
        <!--    detail Products ${this.id} -->
        <div>
          ${this.product
            ? html`
                <div class="container box-detail">
                  <div class="detail-text">
                    <p>${this.product.category}</p>
                    <h3>${this.product.name}</h3>
                    <div>
                      <span>${this.product.price}</span>
                      <span>select</span>
                      <button>Add to cart</button>
                    </div>
                  </div>
                  <div class="detail-image">
                    <img src=${this.product.image} />
                  </div>
                  <div class="detail-images">
                    <img src=${this.product["image-side"]} />
                    <img src=${this.product["image-behind"]} />
                  </div>
                </div>
              `
            : html`<p>loading...</p>`}
        </div>
      </div>
    `;
  }

  _handleData(res) {
    this.product = { ...res };
    console.log(this.product.name, "soy el product");
    this.requestUpdate();
  }
}

customElements.define("page-product-detail", PageProductDetail);
