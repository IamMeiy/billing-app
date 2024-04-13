import { useState } from 'react';
import { Button, Grid, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import InvoicePreview from './InvoicePreview';

const Billing = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);

  const handleAddToCart = () => {
    const newItem = {
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      discount: productDiscount,
      subtotal: calculateSubtotal(productPrice, productQuantity, productDiscount)
    };
    setCart([...cart, newItem]);
    setProductName('');
    setProductQuantity(0);
    setProductPrice(0);
    setProductDiscount(0);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateSubtotal = (price, quantity, discount) => {
    return (price * quantity * (1 - discount / 100)).toFixed(2);
  };

  const calculateOverallPrice = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.subtotal);
    }, 0);
  };

  const previewInvoice = () => {
    const invoiceData = {
      date: new Date().toLocaleDateString(),
      customerName: customerName,
      totalPrice: calculateOverallPrice(),
      cart: cart
    };

    InvoicePreview(invoiceData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Customer Name:</Typography>
        <TextField
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Product Details:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              fullWidth
              variant="outlined"
              label="Name"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              fullWidth
              variant="outlined"
              label="Quantity"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              fullWidth
              variant="outlined"
              label="Price"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              value={productDiscount}
              onChange={(e) => setProductDiscount(e.target.value)}
              fullWidth
              variant="outlined"
              label="Discount (%)"
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={previewInvoice}>Preview Invoice</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Cart:</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.subtotal}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveFromCart(index)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Total: {calculateOverallPrice().toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

export default Billing;
