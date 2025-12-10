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

exports.getPublicServices = async (req, res) => {
    try {
        const { city, category } = req.query;
        let filter = {};

        if (city) {
            filter.city = { $regex: new RegExp(city, 'i') };
        }

        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }

        const services = await ServiceListing.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'server Error' });
    }
};

exports.getServiceDetails = async (req, res) => {
    try {
        const service = await ServiceListing.findById(req.params.id);

        if(!service) {
            return res.status(404).json({
            success: false, 
            message: `Service not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: service });

    } catch (error) {
        console.error(error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Invalid service ID format.' });
        }

        res.status(500).json({ success: false, message: 'Server Error' });
    }
};