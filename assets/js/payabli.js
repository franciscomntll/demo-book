var token =
  "o.8eJsOHAYhsbhPXHqNOkg8dlZ3o9d4IgHgRoqRnmErqXtnky/wbH/HdtY/foN88hp8Rse3FQfixsBfyeTqq43sSw/PCfZ0xeG9/YlOZS/Ow19LiO/NoKJ8VMZq9XIZ+PwEfMmaHnQ2BwXNa3mCrJ0kuM4Skq/whhTuQQOeZ0kpwdskfDYt7gejC5qA9T6crdKQ3Lshz8cRKgRMZ7uCr5rcFIMVTPKti8GfPi6Pc62ywpvh96IjTaO+DLIY4BF6R+gkWaWCFRiPChjEZltVPg7ZezaeyIG0njt9yPLlPSoJebOl9Jq/LE3v3rUr1nXvobso9GeMdDgUJxLzJkYzJ6nGT15KhaWs5LwQpvj5JPgOp4pqDGxIJDdKFsg53jogOtzdU7aZF0/BMaXslP6dRY+aR/r4g6NSI8T0CDDACeMM74bgcQ8FyRwsJdYB221l/H1pq4KMAbuNcZ+SKVbalQ11Q==.mnyeHRmQJMg1micjgClYWpw8GpY1cLss2YiYHpaWVTE=";
var entryPoint = "8dfdf2aa47";
// Express Checkout config object
var expressCheckoutConfig = {
  token: token,
  type: "expressCheckout",
  entryPoint: entryPoint,
  rootContainer: "express-checkout",
  expressCheckout: {
    amount: 39,
    fee: 2,
    currency: "USD",
    supportedNetworks: ["mastercard", "visa"],
    columns: 1,
    applePay: {
      enabled: true,
      buttonStyle: "black",
      buttonType: "pay",
      language: "en-US",
    },
    appearance: {
      buttonHeight: 50, // optional
      buttonBorderRadius: 10, // optional
      padding: {
        x: 10, // optional
        y: 10, // optional
      },
    },
  },
  customerData: {
    customerNumber: "12412424",
    firstName: "Book demo",
    lastName: "Customer",
    billingEmail: "bookdemo@customer.com",
  },

  functionCallBackReady: function (data) {
    console.log("Express Checkout ready: ", data);
    const container = document.querySelector("#express-checkout");
    const separator = document.querySelector("#separator-checkout");
    container.classList.remove("hidden");
    separator.classList.remove("hidden");
  },
  functionCallBackSuccess: function (data) {
    console.log("Express Checkout Success: ", data);
    const container = document.querySelector("#container-payment");
    const purchaseSuccess = document.querySelector("#purchase-success");
    container.classList.add("hidden");
    purchaseSuccess.classList.remove("hidden");
  },
  functionCallBackError: function (data) {
    console.log("Express Checkout Error: ", data);
  },
  functionCallBackCancel: function (data) {
    console.log("Express Checkout Cancel: ", data);
  },
};
const component = new PayabliComponent(expressCheckoutConfig);

// Card Checkout config object
var cardCheckoutConfig = {
  type: "methodEmbedded",
  rootContainer: "pay-component-card",
  defaultOpen: "card",
  token: token,
  entryPoint: entryPoint,
  card: {
    enabled: true,
    amex: false,
    discover: true,
    visa: true,
    mastercard: true,
    inputs: {
      //here we are customizing the input fields
      cardHolderName: {
        label: "Card Holder Name",
        placeholder: "",
        floating: false,
        value: "John Doe",
        size: 12,
        row: 0,
        order: 0,
      },
      cardNumber: {
        label: "Card number",
        placeholder: "1234 1234 1234 1234",
        floating: false,
        size: 6,
        row: 1,
        order: 0,
      },
      cardExpirationDate: {
        label: "Exp Date",
        placeholder: "MM/YY",
        floating: false,
        size: 6,
        row: 1,
        order: 1,
      },
      cardCvv: {
        label: "CVV/CVC",
        placeholder: "CVV/CVC",
        floating: false,
        size: 6,
        row: 2,
        order: 0,
      },
      cardZipcode: {
        label: "Zip Code",
        placeholder: "Zip/Postal Code",
        floating: false,
        size: 6,
        row: 2,
        order: 1,
      },
    },
  },
  ach: {
    enabled: false,
  },
  customerData: {
    customerNumber: "00001",
    firstName: "John",
    lastName: "Doeee",
    billingEmail: "johndoe@email.com",
  },
  functionCallBackSuccess: function (response) {
    // paycomponentCard.removeListener();
    const container = document.querySelector("#container-payment");
    const purchaseSuccess = document.querySelector("#purchase-success");
    container.classList.add("hidden");
    purchaseSuccess.classList.remove("hidden");
    paycomponentCard.payabliExec("reinit");
  },
  functionCallBackReady: function (data) {
    const container = document.querySelector("#pay-component-card");
    container.classList.remove("hidden");
  },
  functionCallBackError: function (errors) {
    alert("Error!");
    console.log(errors);
  },
};

const paycomponentCard = new PayabliComponent(cardCheckoutConfig);

const makePayment = (amount) => {
  paycomponentCard.payabliExec("pay", {
    paymentDetails: {
      totalAmount: amount,
      serviceFee: 2,
      categories: [
        {
          label: "payment",
          amount: amount,
          qty: 1,
        },
      ],
    },
  });
};
