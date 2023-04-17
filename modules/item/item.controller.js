const Item = require('../../models/item.model');
const Brand = require('../../models/brand.model');

async function getItems(req, res) {
    try {
        // Parse query parameters for pagination and filtering by brand code
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
        const skip = (page - 1) * limit;
        const brandCodes = req.query.brandCode ? req.query.brandCode.split(',') : [];

        let query = Item.find();
        let countQuery = Item.countDocuments();

        // Filter by brand codes if provided
        if (brandCodes.length > 0) {
            const brands = await Brand.find({ code: { $in: brandCodes } });
            if (brands.length === 0) {
                return res.status(400).json({ message: 'Invalid brand codes' });
            }
            const brandIds = brands.map(brand => brand._id);
            query = query.where('brand_id').in(brandIds);
            countQuery = countQuery.where('brand_id').in(brandIds);
        }

        // Get the total number of items
        const count = await countQuery;

        // Get a list of items with pagination and optional filtering by brand code
        const items = await query.skip(skip).limit(limit).populate('brand_id');

        // Return the list of items as a JSON response
        res.json({
            count,
            page,
            limit,
            items
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getItems
}