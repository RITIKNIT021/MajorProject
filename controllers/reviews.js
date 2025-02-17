const Review=require("../models/review");
const Listing=require("../models/listing");


module.exports.createReview=async (req, res) => {
    
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
     newReview.author=req.user._id;
    // Push the new review into the listing's reviews array
    listing.reviews.push(newReview);

    // Save the new review and update the listing
    await newReview.save();
    await listing.save();
    req.flash("success","New review created!");
    // Redirect to the listing page
    res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview=async(req,res)=>{
    let {id , reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});

    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`)
}