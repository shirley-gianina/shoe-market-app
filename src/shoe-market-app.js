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
      cart: { type: Array },
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
    this.cart = [];
  }

  firstUpdated() {
    const storageData = JSON.parse(localStorage.getItem("data"));
    this.cart = [...storageData];
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
        <page-shoe-cart .cart=${this.cart} route="cart"></page-shoe-cart>
      </app-main>
    `;
  }

  _handleAddCart(e) {
    const product = e.detail;
    const foundProduct = this.cart.find((elem) => elem.id === product.id);
    if (foundProduct === undefined) {
      const cartItem = {
        ...product,
        qty: 1,
        total: product.price,
      };
      this.cart = [...this.cart, cartItem];
    } else {
      foundProduct.qty++;
      foundProduct.total = foundProduct.price.toFixed(2) * foundProduct.qty;
      this.cart = [...this.cart];
    }

    localStorage.setItem("data", JSON.stringify(this.cart));
    console.log(localStorage, "soy la data de localstorage");

    this.requestUpdate();
  }
}

customElements.define("shoe-market-app", ShoeMarketApp);
