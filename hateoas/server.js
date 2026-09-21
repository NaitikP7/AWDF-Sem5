const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

// Fake database
const users = [
  {
    id: 1,
    name: "Naitik",
    email: "naitik@example.com"
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@example.com"
  }
];

// GET all users
app.get("/users", (req, res) => {
  const result = users.map(user => ({
    ...user,

    _links: {
      self: {
        href: `/users/${user.id}`
      }
    }
  }));

  res.json({
    users: result,

    _links: {
      self: {
        href: "/users"
      }
    }
  });
});

// GET a single user
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json({
    ...user,

    _links: {
      self: {
        href: `/users/${user.id}`
      },
      allUsers: {
        href: "/users"
      },
      orders: {
        href: `/users/${user.id}/orders`
      }
    }
  });
});

// Fake orders endpoint
app.get("/users/:id/orders", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json({
    userId: id,
    orders: [
      {
        id: 101,
        product: "Laptop",
        price: 70000
      },
      {
        id: 102,
        product: "Mouse",
        price: 1500
      }
    ],

    _links: {
      self: {
        href: `/users/${id}/orders`
      },
      user: {
        href: `/users/${id}`
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});