import { LitElement, html, css } from "lit-element";

import globalCSS from "../styles/global";

import "../components/lit-card";
import "../components/lit-filters";

export class PageProducts extends LitElement {
  static get properties() {
    return {
      category: { type: String },
      size: { type: String },
      brand: { type: String },
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

        .content {
          display: grid;
          grid-template-columns: 15% 80%;
          gap: 5%;
        }

        .content-filters {
          border-right: 2px solid #a8a9ab;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 100px;
          padding: 25px 0px;
        }

        .active {
          font-weight: bold;
        }

        lit-card img {
          width: 100%;
        }

        lit-card .card-title {
          text-align: center;
          text-transform: uppercase;
          width: 350px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        lit-card .card-price {
          text-align: center;
          color: #d74dc6;
          font-weight: bold;
        }

        lit-card .card-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          transform: rotate(-45deg);
          background-color: #d74dc6;
          color: #fff;
          height: 25px;
          width: 200px;
          text-align: center;
          font-size: 12px;
          top: -2px;
          left: -75px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.products = [];
    this.productsCopy = [];
    this.category = null;
    this.size = null;
    this.brand = null;
  }

  firstUpdated() {
    fetch("https://my-json-server.typicode.com/claumartinezh/training-db/shoes")
      .then((res) => res.json())
      .then((res) => this._handleData(res));
  }

  _handleData(res) {
    this.products = [...res];
    this.productsCopy = [...res];

    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container content">
        <div class="content-filters">
          <lit-filters
            @event-changed-category=${this._handleChangedCategory}
            @event-changed-size=${this._handleChangedSize}
            @event-changed-brand=${this._handleChangedBrand}
          >
          </lit-filters>
        </div>
        <div class="products">
          ${this.productsCopy.map(
            (product) => html`
              <app-link href="product-detail/${product.id}">
                <lit-card>
                  <img slot="header" src=${product.image} />
                  <p class="card-title" slot="body">${product.name}</p>
                  <p class="card-price" slot="footer">${product.price} €</p>
                  ${product.season === "new"
                    ? html`<p class="card-badge">NEW</p>`
                    : ""}
                </lit-card>
              </app-link>
            `
          )}
        </div>
      </div>
    `;
  }

  _handleChangedCategory(event) {
    console.log(event.detail, "category");
    this.category = event.detail;
    this._filterProducts();
    this.requestUpdate();
  }

  _handleChangedSize(event) {
    console.log(event.detail, "size");
    this.size = event.detail;
    this._filterProducts();
    this.requestUpdate();
    
  }

  _handleChangedBrand(event) {
    console.log(event.detail, "brand");
    this.brand = event.detail;
    this._filterProducts();
    this.requestUpdate();
  }

  _filterProducts() {
    this.productsCopy = [...this.products];
    if (this.category) {
      this.productsCopy = this.productsCopy.filter(
        (product) => product.category === this.category
      );
    }

    if (this.size) {
      this.productsCopy = this.productsCopy.filter((product) =>
        product.size.includes(this.size)
      );
    }

    if (this.brand) {
      this.productsCopy = this.productsCopy.filter(
        (product) => product.brand === this.brand
      );
    }
  }
}

customElements.define("page-products", PageProducts);
