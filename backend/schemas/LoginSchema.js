const { Schema } = require("mongoose");

const LoginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,    
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  
  // --- Fields for your ProfilePage.js ---
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },

  // --- Fields for connected accounts ---
  connectedAccounts: {
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    google: { type: String, default: null },
  },

  // --- Fields to store the last analysis result ---
  // Your backend/index.js writes to this object
  lastAnalysis: {
    stats: [Object],
    breakdown: [Object],
    activity: [Object],
    analyzedAt: { type: Date }
  }

}, { timestamps: true });

module.exports = { LoginSchema };

