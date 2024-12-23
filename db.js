import mongoose, {Schema, ObjectId} from "mongoose"

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {type: ObjectId, ref: 'admin'},
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseID: ObjectId
});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

export {userModel, adminModel, courseModel, purchaseModel}