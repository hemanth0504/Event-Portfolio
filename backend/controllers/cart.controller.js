import Product from "../models/product.model.js";

// GET /api/cart
export const getCartProducts = async (req, res) => {
  try {
    const cartItems = req.user.cartItems;

    const productIds = cartItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const response = cartItems.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.product.toString()
      );

      return {
        ...product.toObject(),
        quantity: item.quantity,
        rentalStart: item.rentalStart,
        rentalEnd: item.rentalEnd,
      };
    });

    res.json(response);
  } catch (error) {
    console.error("getCartProducts error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, rentalStart, rentalEnd } = req.body;

    if (!productId || !rentalStart || !rentalEnd) {
      return res.status(400).json({ message: "Product and rental dates are required" });
    }

    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) =>
        item.product.toString() === productId &&
        new Date(item.rentalStart).toISOString() === new Date(rentalStart).toISOString() &&
        new Date(item.rentalEnd).toISOString() === new Date(rentalEnd).toISOString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({ product: productId, quantity, rentalStart, rentalEnd });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("addToCart error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/cart
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId, rentalStart, rentalEnd } = req.body;
    const user = req.user;

    if (productId && rentalStart && rentalEnd) {
      // Remove specific rental instance
      user.cartItems = user.cartItems.filter(
        (item) =>
          !(
            item.product.toString() === productId &&
            new Date(item.rentalStart).toISOString() === new Date(rentalStart).toISOString() &&
            new Date(item.rentalEnd).toISOString() === new Date(rentalEnd).toISOString()
          )
      );
    } else {
      // Clear entire cart
      user.cartItems = [];
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("removeAllFromCart error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/cart/:id
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity, rentalStart, rentalEnd } = req.body;
    const user = req.user;

    const item = user.cartItems.find(
      (item) =>
        item.product.toString() === productId &&
        new Date(item.rentalStart).toISOString() === new Date(rentalStart).toISOString() &&
        new Date(item.rentalEnd).toISOString() === new Date(rentalEnd).toISOString()
    );

    if (!item) {
      return res.status(404).json({ message: "Product with rental dates not in cart" });
    }

    if (quantity <= 0) {
      user.cartItems = user.cartItems.filter(
        (item) =>
          !(
            item.product.toString() === productId &&
            new Date(item.rentalStart).toISOString() === new Date(rentalStart).toISOString() &&
            new Date(item.rentalEnd).toISOString() === new Date(rentalEnd).toISOString()
          )
      );
    } else {
      item.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("updateQuantity error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
