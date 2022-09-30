import { LitElement, html, css } from "lit-element";
import globalCSS from "../styles/global";

export class PageShoeProductDetail extends LitElement {
  static get properties() {
    return {
      productId: { type: String },
/*       data: { type: Array }, */
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

        .product-detail {
          display: grid;
          grid-template-columns: 30% 50% 20%;
          align-items: center;
          padding: 0px 100px;
          background-color: #fff;
        }

        .product-detail .description p {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 15px;
          color: #a8a9ab;
        }

        .product-detail .description h3 {
          font-weight: bold;
          font-size: 30px;
        }

        .product-detail .description span {
          color: #d74dc6;
          font-weight: bold;
        }

        .product-detail .description > div {
          display: flex;
          align-items: center;
        }

        .product-detail .description select {
          margin: 0px 15px;
          padding: 5px;
        }

        .product-detail .description button {
          padding: 10px 15px;
          background-color: #353535;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 12px;
        }

        .product-detail .image img {
          width: 100%;
        }

        .product-detail .images img {
          width: 100%;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.productId = null;
    this.product = null;
    this.productCard = null;
 /*    this.data = []; */
  }

  firstUpdated() {
    fetch(
      `https://my-json-server.typicode.com/claumartinezh/training-db/shoes/${this.productId}`
    )
      .then((response) => response.json())
      .then((res) => this._handleData(res));
  }

  render() {
    return html`
      <div>
        ${this.product?.id
          ? html`
              <div class="container">
                <div class="product-detail">
                  <div class="description">
                    <p>${this.product.category}</p>
                    <h3>${this.product.name}</h3>
                    <div>
                      <span>${this.product.price}</span>
                      <select
                        name="select"
                        Form.Select
                        type="text"
                        @change=${this._onChangeSelect}
                        aria-label="Default select example"
                      >
                        ${this.product.size.map(
                          (elem) =>
                            html`<option value="${elem}">${elem}</option>`
                        )}
                      </select>
                      <button
                        @click=${() =>
                          this._handleDataCart()}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div class="image">
                    <img src=${this.product.image} />
                  </div>
                  <div class="images">
                    <img src=${this.product["image-side"]} />
                    <img src=${this.product["image-behind"]} />
                  </div>
                </div>
              </div>
            `
          : html`<p>loading...</p>`}
      </div>
    `;
  }

  _handleData(res) {
    this.product = { ...res };
/*     console.log(res, "res"); */


    this.requestUpdate();
  }

  _onChangeSelect(e) {
    console.log(e.target.value);
  }

  _handleDataCart() {
/*     this.data.push(this.product); */
    this.dispatchEvent(
      new CustomEvent("event-add-cart", { detail: this.product })
    );

/*     console.log(this.data, "soy data desde el hijo"); */
  }
}

customElements.define("page-shoe-product-detail", PageShoeProductDetail);
