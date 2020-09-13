const stripe = require("stripe")("sk_test_51H7djZHYb2WCjh3psbfw166JZNNnBXUtakrRzo4RPEHc5wpVZejlAMW5ep044myOOXu7CO385IHF9KWYGMIlbjo7009wJLz8jp")
const uuid = require("uuid/v4");

exports.makepayment = (req,res) =>{

    const {products,token} = req.body
    console.log("PRODUCTS",products)
    
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });

    const itempotencyKey  = uuid()

    return stripe.cutomers.create({
        email:token.email,
        source:token.id,

    }).then(cutomers =>{
        stripe.charges.create({
            amount:amount*100,
            currency:"usd",
            customer:cutomer.id,
            receipt_email:token.email,
            decripation:"a test account",
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address.city,
                    country:token.card.address.country,
                    postal_code:token.card.address.zip

                }

            }
        },
        {itempotencyKey})
        .then(result =>res.status(200).json(result))
        .catch(err =>console.log(err));
    })

}