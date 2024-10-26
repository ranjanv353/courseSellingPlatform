import mongoose, {Schema, ObjectId} from "mongoose"

// await mongoose.connect("mongodb+srv://ranjanv353:pKc46JkwbOXj4oS8@cluster0.c1reb.mongodb.net/courseSellingPlatform");

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
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