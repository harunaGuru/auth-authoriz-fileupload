const stripeKey =
  "sk_test_51MHVCaG4ONlqz3xksUediF0uB6kqxDTxyDhsQc7yUFihnrNXiKN9Sqt86ylpHOS1LB7lTS6WsJlE19e1S4o8hZa600CDXWBdra";

module.exports = stripeKey;

// curl https://api.stripe.com/v1/payment_methods \
//   -u sk_test_51MHVCaG4ONlqz3xksUediF0uB6kqxDTxyDhsQc7yUFihnrNXiKN9Sqt86ylpHOS1LB7lTS6WsJlE19e1S4o8hZa600CDXWBdra: \
//   -d type=card \
//   -d "card[number]"=4242424242424242 \
//   -d "card[exp_month]"=8 \
//   -d "card[exp_year]"=2023 \
//   -d "card[cvc]"=314

//https://discordapp.com/api/webhooks/1055853160910041192/MR7U9wq_OkhdE0GiRufCMhYXkHyLFSGIuJk-UejnY40LshCGqY7x9G-T0TnnlN1_RzpU
//https://discordapp.com/api/webhooks/1055494825870381066/_ZuyLm7hULuG8Hh6MA_Ri-TVKv10gKjk44gK58ebUr748rYUNEeS9ODceAiWf5jAaK9y