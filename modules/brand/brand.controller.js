const Brand = require('../../models/brand.model');

async function getBrands(req, res) {
    try {
        // Parse query parameters for pagination
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
        const skip = (page - 1) * limit;

        // Get the total number of brands
        const count = await Brand.countDocuments();

        // Get a list of brands with pagination
        const brands = await Brand.find().skip(skip).limit(limit);

        // Return the list of brands as a JSON response
        res.json({
            count,
            page,
            limit,
            brands
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong' });
    }

}

async function addBrand(req, res) {
    try {
        const { code, name } = req.body
        // Create a new brand with the data from the request body
        const brand = new Brand({
            code,
            name
        });

        // Save the new brand to the database
        await brand.save();

        // Return the new brand as a JSON response
        res.status(201).send({
            message: "Brand created successfully",
            brand: brand
        });
    } catch (error) {
        res.status(400).send({
            message: 'Something went wrong'
        })
    }
}

async function updateBrand(req, res) {
    try {
        const { code, name } = req.body
        // Find the brand by ID
        const brand = await Brand.findById(req.params.id);

        // If the brand doesn't exist, return a 404 status code with an error message
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Update the brand with the data from the request body
        brand.code = code;
        brand.name = name;

        // Save the updated brand to the database
        await brand.save();

        // Return the updated brand as a JSON response
        res.status(200).send({
            message: "Brand Updated successfully",
            brand
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Server error' });
    }
}


module.exports = {
    getBrands,
    addBrand,
    updateBrand
}