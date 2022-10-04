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

        .table-container {
          background-color: rgb(255, 255, 255);
          padding: 10px;
          margin: 30px;
        }

        .table-container p {
          margin: 5px 0;
        }

        table {
          display: table;
          border-collapse: collapse;
          width: 100%;
        }

        thead {
          text-align: justify;
          background-color: #f9f9fa;
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
          background-color: #f3ebec;
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
  }

  render() {
    return html`
      <div class="container">
        <div class="table-container">
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
                      <strong>${product.total}</strong>
                    </td>
                    <td>X</td>
                  </tr>
                </tbody>
              `
            )}
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define("page-shoe-cart", pageShoeCart);
