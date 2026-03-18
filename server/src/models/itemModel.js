const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            default: 'Uncategorized',
        },
    },
    {
        timestamps: true,
    }
);

// Rename _id to id for frontend compatibility
itemSchema.method('toJSON', function () {
    const object = this.toObject();
    object.id = object._id;
    delete object._id;
    delete object.__v;
    return object;
});

module.exports = mongoose.model('Item', itemSchema);
