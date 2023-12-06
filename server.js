const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, findquoteIndex, genId} = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// mount router
const quoteRouter = express.Router();
app.use('/api/quotes', quoteRouter);

// get random quote
quoteRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.status(200).send({quote: randomQuote});

});

// get all quotes or a person's quotes
quoteRouter.get('/', (req, res, next) => {
    if (req.query.person === undefined) {
        res.status(200).send({quotes: quotes})
    } else {
        const person = req.query.person;
        const personQuotes = quotes.filter(quote => quote.person == person);
        res.status(200).send({quotes: personQuotes});
    }
});

// get a person's quote through id
quoteRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const quoteIndex = findquoteIndex(id);
    if (quoteIndex !== -1) {
        const targetQuote = quotes[quoteIndex];
        res.status(200).send({quote: targetQuote});
    } else {
        res.status(404).send();
    }
});

// create a new quote with new id
quoteRouter.post('/', (req, res, next) => {
    if (req.query.quote !== undefined && req.query.person !== undefined) {
        const person = req.query.person;
        const quote = req.query.quote;
        const newId = genId();
        quotes.push({quote: quote, person: person, id: newId});
        res.status(200).send({quote: {quote: quote, person: person, id: newId}});
    } else {
        res.status(400).send();
    }
});

// update the existing quote
quoteRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const quoteIndex = findquoteIndex(id);
    if (quoteIndex !== -1) {
        if (req.query.quote !== undefined && req.query.person !== undefined) {
            const newPerson = req.query.person;
            const newQuote = req.query.quote;
            quotes[quoteIndex].person = newPerson;
            quotes[quoteIndex].quote = newQuote;
            res.status(200).send(quotes[quoteIndex]);
            } else {
                res.status(400).send();
            }
    } else {
        res.status(400).send();
    } 
});

// delete the existing quote
quoteRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const quoteIndex = findquoteIndex(id);
    if (quoteIndex !== -1) {
        quotes.splice(quoteIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

// server to open for req
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });