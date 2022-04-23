const express = require('express');
const { getPlaiceholder } = require("plaiceholder");
const app = express();
const port = process.env.PORT || 3001

app.get('/', async (req, res) => {
    const { src, type } = req.query;
    if (!src) res.status(400).send('No source provided');
    try {
        const image = await getPlaiceholder(src);

        if (type) {
            res.send({
                img: image['img'],
                [type]: image[type]
            });
        } else {
            res.send(image);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});