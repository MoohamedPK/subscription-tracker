import Subscription from "../models/subscription.model.js"

export const createSubscription = async(req, res, next) => {

    try {
        const subscription = await Subscription.create({...req.body, user: req.user._id})
        res.status(201).json({success: true, data: subscription});
        
    } catch (error) {
        next(error);
    }
} 

export const getUserSubscription = async(req, res, next) => {

    try {
        
        // we chekc if the user is the same one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error("Your aren't the owner of this account");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id})
        res.status(200).json({success: true, data: subscriptions});

    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {

    try {
        
        const subscriptions = await Subscription.find();
        res.status(200).json({success:true, data: subscriptions});

    } catch (error) {
        next(error);
    }
}

export const getSpecificSubscription = async(req, res, next) => {

    try {

        const specificSubscription = await Subscription.findById(req.params.id);
        res.status(200).json({success: true, data: specificSubscription});
        
    } catch (error) {
        next(error);
    }
}