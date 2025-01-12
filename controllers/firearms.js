const Firearm = require('../models/firearm');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken });


module.exports.index = async (req, res) => {            //This shows everyone who is registered
    const firearms = await Firearm.find({})
    res.render('gunsee/commerce', {firearms})
}; 

module.exports.renderNewForm = (req, res) => {   //Add a new registered route
    res.render('gunsee/new')
};

module.exports.createFirearm = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.firearm.locationbought,
        limit: 1
    }).send()
    const firearm = new Firearm(req.body.firearm);
    firearm.geometry = geoData.body.features[0].geometry;
    await firearm.save();
    console.log(firearm);
    req.flash('success', 'Successfully made a new register!');
    res.redirect(`/gunsee/${firearm._id}`);
};

module.exports.showFirearm = async (req, res) => {
    const firearm = await Firearm.findById(req.params.id)
    if (!firearm) {
        req.flash('error', 'Cannot find registered!');
        return res.redirect('/gunsee');
    }
    res.render('gunsee/show', {firearm});

};

module.exports.renderEditForm = async (req, res) => {
    const firearm = await Firearm.findById(req.params.id)
    if (!firearm) {
        req.flash('error', 'Cannot find registered!');
        return res.redirect('/gunsee');
    }
    res.render('gunsee/edit', {firearm});

};

module.exports.updateFirearm = async(req, res) => {
    const { id } = req.params;
    const firearm = await Firearm.findByIdAndUpdate(id, { ...req.body.firearm})
    req.flash('success', 'Successfully updated registered!');
    res.redirect(`/gunsee/${firearm._id}`)
};

module.exports.deleteFirearm = async (req, res) => {
    const {id} = req.params;
    await Firearm.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted registered!');
    res.redirect('/gunsee');
};
