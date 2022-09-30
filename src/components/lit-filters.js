import { LitElement, html, css } from "lit-element";

class LitFilters extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }
      .active {
        font-weight: bold;
      }

      .filters {
        padding: 20px;
      }

      .filters ul li {
        list-style: none;
        line-height: 2;
        color: #40423fbd;
        cursor: pointer;
      }

      .filters p {
        font-weight: bold;
        text-transform: capitalize;
      }

      .filters .size ul {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
      }

      .filters .size ul li {
        width: 30%;
        text-align: center;
        border: 1px solid #a8a9ab;
      }

      .filters .clear-filters {
        margin-top: 30px;
      }

      .filters .clear-filters button {
        padding: 10px 15px;
        background-color: #353535;
        color: #fff;
        border: none;
        border-radius: 20px;
        font-size: 12px;
        margin: 0 auto;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.categories = ["Basketball", "Tennis", "Skate", "Hiking"];
    this.sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];
    this.brands = [
      "Nike",
      "Jordan",
      "Lacoste",
      "Converse",
      "Vans",
      "Salomon",
      "Timberland",
    ];
    this.category = null;
    this.size = null;
    this.brand = null;
    this.clearFilters = null;
  }

  render() {
    return html`
      <div class="filters">
        <h3>Filter</h3>

        <div class="category">
          <p>category</p>
          <ul>
            ${this.categories.map(
              (category) =>
                html` <li
                  class=${this.category === category ? "active" : ""}
                  @click=${(e) => this._handleClickCategory(category)}
                >
                  ${category}
                </li>`
            )}
          </ul>
        </div>
        <div class="size">
          <p>size</p>
          <ul>
            ${this.sizes.map(
              (size) =>
                html`<li
                  class=${this.size === size ? "active" : ""}
                  @click=${(e) => this._handleClickSize(size)}
                >
                  ${size}
                </li>`
            )}
          </ul>
        </div>
        <div class="brand">
          <p>brand</p>
          <ul>
            ${this.brands.map(
              (brand) =>
                html`<li
                  class=${this.brand === brand ? "active" : ""}
                  @click=${(e) => this._handleClickBrand(brand)}
                >
                  ${brand}
                </li>`
            )}
          </ul>
        </div>
        <div class="clear-filters">
          <button @click=${(clearFilters) => this._handleClickFilters(clearFilters)}>
            Clear Filter
          </button>
        </div>
      </div>
    `;
  }

  _handleClickCategory(category) {
    this.dispatchEvent(
      new CustomEvent("event-changed-category", { detail: category })
    );

    this.category = category;
    this.requestUpdate();
  }

  _handleClickSize(size) {
    this.dispatchEvent(new CustomEvent("event-changed-size", { detail: size }));
    this.size = size;
    this.requestUpdate();
  }

  _handleClickBrand(brand) {
    this.dispatchEvent(
      new CustomEvent("event-changed-brand", { detail: brand })
    );
    this.brand = brand;
    this.requestUpdate();
  }

  _handleClickFilters(clearFilters) {
    this.dispatchEvent(
      new CustomEvent("event-clear-filters", { detail: clearFilters})
    );
/*     console.log(clearFilters, "clear evento"); */
  }
}

customElements.define("lit-filters", LitFilters);
