'use strict';

exports.ok = funtcion(values, res) {
    const data = {
        'status': 200,
        'values': values
    };

    res.json(data);
    resizeTo.end();
};