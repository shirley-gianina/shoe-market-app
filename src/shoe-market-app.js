import { LitElement, html } from "lit-element";
import { router } from "lit-element-router";

import "./app-link";
import "./app-main";
import "./pages/page-shoe-products";
import "./pages/page-shoe-product-detail";
import "./components/lit-header";
import "./pages/page-shoe-cart";

class ShoeMarketApp extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
      products: { type: Array },
    };
  }

  static get routes() {
    return [
      {
        name: "home",
        pattern: "/",
      },
      {
        name: "product-detail",
        pattern: "product-detail/:id",
      },
      {
        name: "cart",
        pattern: "cart",
      },
      {
        name: "not-found",
        pattern: "*",
      },
    ];
  }

  constructor() {
    super();
    this.route = "";
    this.params = {};
    this.query = {};
    this.products = [];
  }

  firstUpdated() {
    const storageData = JSON.parse(localStorage.getItem("data"));
    this.products = [...storageData];
  }

  router(route, params, query, data) {
    this.params = params;
    this.query = query;
    this.route = route;
  }

  render() {
    return html`
      <lit-header
        @event-clicked-cart-icon=${this._handleClickCartIcon}
        .data=${this.data}
      ></lit-header>
      <app-main active-route=${this.route}>
        <page-shoe-products route="home"></page-shoe-products>

        ${this.params.id
          ? html` <page-shoe-product-detail
              route="product-detail"
              productId=${this.params.id}
              @event-add-cart=${(e) => this._handleAddCart(e)}
            ></page-shoe-product-detail>`
          : ""}
        <page-shoe-cart .data=${this.products} route="cart"></page-shoe-cart>
      </app-main>
    `;
  }

  _handleAddCart(e) {
    this.products = [...this.products, e.detail];

    localStorage.setItem("data", JSON.stringify(this.products));
    console.log(localStorage, "soy la data de localstorage");

    this.requestUpdate();
  }
}

customElements.define("shoe-market-app", ShoeMarketApp);
