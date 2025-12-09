const ServiceListing = require('../models/serviceListing');

exports.createServiceListing = async (req, res) => {
    const { title, description, category, city, startingPrice } = req.body;

    try {
        const serviceListing = new ServiceListing({
            title,
            description,
            category,
            city,
            startingPrice: startingPrice || 'Negotiable',
            ownerId: req.user.id, 
        });

        await serviceListing.save();

        res.status(201).json(serviceListing);

    } catch (error) {

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not save service listing.' });
    }
};

exports.getCurrentProviderListings = async (req, res) => {
    try {
        const listings = await ServiceListing.find({ ownerId: req.user.id });
        res.status(200).json(listings);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not retrive listings.'})
    }
};