import { LitElement, html } from "lit-element";
import { router } from "lit-element-router";

import "./app-link";
import "./app-main";
import "./pages/page-cart";
import "./pages/page-products";
import "./pages/page-product-detail";
import "./components/lit-header";

class ShoeMarketApp extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object },
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
  }

  router(route, params, query, data) {
    this.params = params;
    this.query = query;
    this.route = route;
  }

  render() {
    return html`
      <lit-header></lit-header>
      <app-main active-route=${this.route}>
        <page-products route="home"></page-products>

        ${this.params.id
          ? html` <page-product-detail
              route="product-detail"
              productId=${this.params.id}
            ></page-product-detail>`
          : ""}
          <page-cart route="cart"></page-cart>
      </app-main>
    `;
  }
}

customElements.define("shoe-market-app", ShoeMarketApp);
