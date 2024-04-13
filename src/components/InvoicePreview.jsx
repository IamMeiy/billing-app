const InvoicePreview = (invoiceData) => {
  const { date, customerName, totalPrice, cart } = invoiceData;

  const handlePrint = () => {
    window.print();
  };

  const invoiceHtml = `
  <html>
    <head>
      <title>Invoice Preview</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 10px;
        }
        p {
          margin: 10px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .total {
          font-weight: bold;
        }
        .btn-container {
          margin-top: 20px;
        }
        .btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Invoice Preview</h1>
        <p>Date: ${date}</p>
        <p>Customer Name: ${customerName}</p>
        <h2>Cart:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>${item.discount}%</td>
                <td>₹${item.subtotal}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p class="total">Total Price: ₹${totalPrice}</p>
        <div class="btn-container">
          <button class="btn" onclick="(${handlePrint})()">Print</button>
        </div>
      </div>
    </body>
  </html>
`;

  
  const newWindow = window.open('', '_blank');
  newWindow.document.write(invoiceHtml);
  newWindow.document.close();
};

export default InvoicePreview;
