import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SaltRounds = 10;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {

        const document = this;

        bcrypt.hash(document.password, SaltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

export default mongoose.model("User", userSchema);