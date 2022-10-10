import { LitElement, html, css } from "lit-element";
import globalCSS from "../styles/global";

class pageShoeCart extends LitElement {
  static get styles() {
    return [
      globalCSS,
      css`
        :host {
          display: block;
          box-sizing: border-box;
        }
        .cart-container {
          display: grid;
          grid-template-columns: 70% 30%;
        }

        .cart-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-table {
          background-color: #fff;
          border-bottom-left-radius: 15px;
          border-top-left-radius: 15px;
          padding: 10px;
          margin: 30px 0;
        }

        .cart-summary {
          background-color: #ddd;
          border-bottom-right-radius: 15px;
          border-top-right-radius: 15px;
          padding: 10px;
          margin: 30px 0;
          text-align: center;
        }

        .cart-summary button {
          background-color: #d74dc6;
          color: #fff;
          cursor: pointer;
          border: none;
          font-size: 15px;
          width: 95%;
          height: 35px;
          text-align: center;
          letter-spacing: 3px;
        }

        table {
          display: table;
          border-collapse: collapse;
          width: 100%;
        }

        thead {
          text-align: justify;
          box-shadow: 0 5px 5px -7px #222;
          height: 50px;
        }
        thead tr th {
          text-transform: uppercase;
          font-size: 12px;
        }

        thead tr th:first-child {
          padding: 0px 15px;
        }

        tbody tr {
          box-shadow: 0 5px 5px -7px #222;
        }

        tbody tr th {
          display: flex;
          align-items: center;
          text-align: justify;
          margin: 15px 0px;
        }

        tbody tr th img {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          background-color: #ddd;
          margin: 0px 15px;
        }

        tbody tr th .title {
          font-size: 13px;
        }

        tbody tr th .category {
          font-size: 10px;
          color: #c1bebe;
        }

        tbody tr th .brand {
          font-size: 10px;
          color: #c1bebe;
        }

        tbody tr td {
          font-size: 12px;
          width: 10%;
        }

        tbody tr .remove {
          color: #d74dc6;
          font-size: 20px;
        }

        .content-summary p {
          margin: 0px;
          font-weight: bold;
          font-size: 15px;
        }

        .content-summary span {
          font-size: 13px;
        }

        .content-summary > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 5px 5px -7px #222;
          padding: 15px 5px;
        }

        .content-summary > div:last-child {
          box-shadow: none;
        }

        @media (max-width: 900px) {
          .cart-container {
            display: block;
            padding: 50px;
          }

          .cart-table {
            border-radius: 15px;
          }

          .cart-summary {
            border-radius: 15px;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      cart: { type: Array },
    };
  }

  constructor() {
    super();
    this.cart = [];
    this.qty = 0;
    /* this.totalCart = 0; */
  }

  render() {
    return html`
      <div class="container">
        <div class="cart-container">
          <div class="cart-table">
            <div class="cart-title">
              <h2>Shopping Shoe Cart</h2>
              <h3>Items(${this._getTotalItem()})</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              ${this.cart.map(
                (product) => html`
                  <tbody>
                    <tr>
                      <th>
                        <img src=${product.image} alt="" />
                        <div>
                          <p class="title">${product.name}</p>
                          <p class="category">
                            <i>Category:</i> ${product.category}
                          </p>
                          <p class="brand"><i>Brand:</i> ${product.brand}</p>
                        </div>
                      </th>
                      <td>
                        <strong>${product.price}</strong>
                      </td>
                      <td>
                        <strong>${product.qty}</strong>
                      </td>
                      <td>
                        <strong>${product.total.toFixed(2)}</strong>
                      </td>
                      <td
                        class="remove"
                        @click="${() => this._handleDelete(product.id)}"
                      >
                        X
                      </td>
                    </tr>
                  </tbody>
                `
              )}
            </table>
          </div>
          <div class="cart-summary">
            <div class="cart-title">
              <h2>Summary</h2>
              <h3>Items(${this._getTotalItem()})</h3>
            </div>
            <div class="content-summary">
              <div>
                <p>Subtotal</p>
                <span>€ ${this._getTotal().toFixed(2)}</span>
              </div>
              <div>
                <p>Discount</p>
                <span>€ 0</span>
              </div>
              <div>
                <p>Shipping</p>
                <span>€ 0</span>
              </div>
              <div>
                <p>Total</p>
                <span>€ ${this._getTotal().toFixed(2)}</span>
              </div>
            </div>
            <div>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _getTotal() {
    return this.cart.reduce((acc, elem) => {
      return acc + elem.total;
    }, 0);
  }

  _getTotalItem() {
    return this.cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
  }

  _handleDelete(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(this.cart));
    this.requestUpdate();
  }
}

customElements.define("page-shoe-cart", pageShoeCart);
