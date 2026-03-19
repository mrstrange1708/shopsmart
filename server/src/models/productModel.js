const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        oldPrice: {
            type: Number,
            required: [true, 'Please add an old price'],
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        tag: {
            type: String,
            required: [true, 'Please add a tag'],
        },
        isTrending: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 4.9,
        },
    },
    {
        timestamps: true,
    }
);

// Rename _id to id for frontend compatibility
productSchema.method('toJSON', function () {
    const object = this.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
});

module.exports = mongoose.model('Product', productSchema);
