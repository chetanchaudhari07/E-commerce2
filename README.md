# React Redux E-Commerce Store

A simple e-commerce website built with **React**, **Redux**, and **Tailwind CSS**, using the Fake Store API as a backend. Users can view products, filter by category, view product details, add products to the cart, and place orders.

## Features

- Fetch products from Fake Store API.
- Display products in a responsive grid layout using Tailwind CSS.
- Product detail page with image, description, price, and “Add to Cart” button.
- Shopping cart with add, remove, and clear cart functionalities.
- Filter products by category using a dropdown.
- Place an order with a simple checkout form (name, email, address) and clear cart on submission.
- Routing using React Router DOM.

## Technologies Used

- **React** – Frontend library
- **Redux** – State management
- **Redux Thunk** – Async actions for API calls
- **React Router DOM** – Routing
- **Tailwind CSS** – Styling
- **Fake Store API** – Sample product data
- **Axios** – HTTP requests

## Installation

Clone the repository:
```bash
git clone https://github.com/chetanchaudhari07/E-commerce2/tree/main
cd  my-ecommerce
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Productdetails.jsx
│   └── Cart.jsx
├── store/
│   ├── action.js
│   ├── reducer.js
│   └── store.js
├── App.jsx
└── main.jsx
```

## Usage

### Home Page

- Displays all products in a responsive grid.
- Category dropdown filters products by category.
- Click a product to view the details page.

### Product Details Page

- Shows product images, title, description, price.
- Add the product to the cart.

### Cart Page

- Shows all products added to the cart.
- Remove individual products or place the order to clear the cart.
- Checkout form with name, email, and address with validation.

## Redux Store

### Actions

- `fetchProducts()` – Fetch all products from API.
- `addToCart(product)` – Add product to cart.
- `removeFromCart(productId)` – Remove product from cart.
- `clearCart()` – Clear all items from cart on order submission.

### Reducer

- Manages products and cart state.

## Screenshots

*(Optional: Add screenshots of your Home, Product Details, and Cart pages here.)*

## License

This project is open-source and free to use.