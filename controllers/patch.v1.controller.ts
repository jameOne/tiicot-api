// test PATCH router functionality
exports.test = (req: any, res: { json: (arg0: { response: string; }) => object; }): object => {
    return res.json({
        response: 'PUT router is functional'
    });
};
