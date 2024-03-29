const Order = require('../models/order');

exports.createOrder = (req, res) => {
    const { name, ingredients, client } = req.body;

    let order;

    order = new Order({
        name: name,
        ingredients: ingredients,
        status: "créée",
        client: client
    })

    order
        .save()
        .then(() => {
            res.status(201).json({msg: `Commande créée`});
        })
        .catch((error) => {
            console.error(err)
            res.status(500).json({error: 'Une erreur est survenue lors de la création de la commande'})
        })
};

exports.readyOrder = (req, res) => {
    const { id } = req.params;
    const { name, ingredients, client } = req.body;

    Order
        .findByIdAndUpdate(
            id,
            {
                name: name,
                ingredients: ingredients,
                status: "en cours",
                client: client
            }
        )
        .then((order) => {
            if (!order) {
              return res.status(404).json({ error: 'Commande inconnue' });
            }
            res.json(order);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          });
};

exports.archiveOrder = (req, res) => {
    const { id } = req.params;
    const { name, ingredients, client } = req.body;

    Order
        .findByIdAndUpdate(
            id,
            {
                name: name,
                ingredients: ingredients,
                status: "prête",
                client: client
            }
        )
        .then((order) => {
            if (!order) {
              return res.status(404).json({ error: 'Commande inconnue' });
            }
            res.json(order);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          });
};