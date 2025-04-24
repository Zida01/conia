const { boolean } = require("joi");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    trim: true,
  },
  reset: {
    resetString: { type: String },
    expireAt: { type: Date },
  },
  Mfa: {
    type: Boolean,
    default: false,
  },
  Mfacode: {
    pin: { type: Number },
    expireAt: { type: date },
  },
  verifiedCode:{
    type:Boolean,    
  },
  
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateMfaCode = function () {
  const pin = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const expireTime = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes

  this.Mfacode = {
    pin,
    expireAt: expireTime,
  };

  return pin; // you can return this if you want to send it to the user
};

const User = model.mongoose("User", UserSchema);

module.exports = User;
