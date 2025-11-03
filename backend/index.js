require("dotenv").config(); // Reads .env file variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
// const axios = require("axios"); // <-- No longer needed

const { LoginModel } = require("./model/user"); 

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL; 
// const HIBP_API_KEY = process.env.HIBP_API_KEY; // <-- No longer needed

if (!uri) {
  console.error("FATAL ERROR: MONGO_URL is not defined in your .env file.");
  process.exit(1); 
}
// Removed the HIBP_API_KEY check

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// --- Auth Routes (No changes) ---

app.post("/signup", async (req, res) => {
  // ... existing signup code ...
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const existingUser = await LoginModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with that email." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new LoginModel({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!", userId: newUser._id });
  } catch (error) {
    console.error("Signup error:", error); 
    res.status(500).json({ message: "Server error during signup." });
  }
});

app.post("/login", async (req, res) => {
  // ... existing login code ...
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await LoginModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    res.status(200).json({ 
      message: "Login successful!",
      userId: user._id,
      email: user.email 
    });
  } catch (error) {
    console.error("Login error:", error); 
    res.status(500).json({ message: "Server error during login." });
  }
});


// --- NEW ANALYSIS ENDPOINTS ---

/**
 * --- MOCK FUNCTION 1: Breaches ---
 */
const mockFetchBreaches = async (email) => {
  console.log(`MOCK: Simulating breach scan for ${email}...`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay

  if (email.startsWith("test@")) {
    return [];
  }
  return [
    { Name: "FakeBreach (2023)", AddedDate: "2023-01-15" },
    { Name: "Mock Data Leak (2021)", AddedDate: "2021-10-30" },
  ];
};

/**
 * --- NEW MOCK FUNCTION 2: Socials ---
 * This function simulates scraping a social media handle.
 */
const mockFetchSocials = async (twitterHandle) => {
  if (!twitterHandle) {
    return { postCount: 0, publicPosts: [] };
  }
  console.log(`MOCK: Simulating social scan for @${twitterHandle}...`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s delay

  // Return realistic fake data based on the handle
  return {
    postCount: 3,
    publicPosts: [
      { id: 1, text: `This is a mock public post from @${twitterHandle}!` },
      { id: 2, text: `Just testing the EyeSee app, this post isn't real.` },
      { id: 3, text: `My favorite hobby is mock data.` },
    ]
  };
};


/**
 * @route   POST /api/analyze/breaches
 * @desc    Scans for breaches AND socials (USING MOCK DATA)
 * @access  Private (should be, but currently just uses email)
 */
app.post("/api/analyze/breaches", async (req, res) => {
  // Now accepts email AND a twitterHandle
  const { email, twitterHandle } = req.body; 

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // --- Run BOTH mock scans in parallel ---
    const [breachData, socialData] = await Promise.all([
      mockFetchBreaches(email),
      mockFetchSocials(twitterHandle)
    ]);
    // --- END OF MOCK SCANS ---

    // --- Combine Results ---
    const totalBreaches = breachData.length;
    const totalPosts = socialData.postCount;

    const stats = [
      { title: 'Overall Footprint Score', value: `${100 - (totalBreaches * 10) - (totalPosts * 5)}/100`, icon: 'shield' },
      { title: 'Connected Accounts', value: twitterHandle ? '2' : '1', icon: 'hub' },
      { title: 'Public Posts Found', value: `${totalPosts}`, icon: 'public' },
      { title: 'Data Breaches', value: `${totalBreaches}`, icon: 'gpp_bad' },
    ];
    
    const breakdown = [
      { name: 'Data Breaches', value: totalBreaches || 0.1 }, // Use 0.1 so pie chart doesn't break
      { name: 'Social Media', value: totalPosts || 0 },
      { name: 'Public Records', value: 0 },
    ];
    
    const breachActivity = breachData.length > 0
      ? breachData.map((breach, i) => ({
          id: `b-${i}`,
          text: `Email found in the "${breach.Name}" breach.`,
          time: new Date(breach.AddedDate).toLocaleDateString()
        }))
      : [{ id: 'b-1', text: 'No breaches found for your email. Good job!', time: 'Just now' }];
      
    const socialActivity = socialData.publicPosts.length > 0
      ? socialData.publicPosts.map((post, i) => ({
          id: `s-${i}`,
          text: `Found public post: "${post.text.substring(0, 30)}..."`,
          time: '1d ago' // Mock time
      }))
      : (twitterHandle ? [{ id: 's-1', text: `No public posts found for @${twitterHandle}.`, time: 'Just now' }] : []);

    const activity = [...breachActivity, ...socialActivity];
      
    const analysisResult = { stats, breakdown, activity, analyzedAt: new Date() };

    // Save this combined result to the user's document in MongoDB
    await LoginModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      { 
        $set: { 
          lastAnalysis: analysisResult,
          // Also save the connected handle
          'connectedAccounts.twitter': twitterHandle 
        } 
      },
      { new: true } // Return the updated document
    );
    
    res.status(200).json({ 
      message: "Analysis complete and saved.",
      data: analysisResult
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ message: "Server error during analysis." });
  }
});


/**
 * @route   GET /api/analysis-results
 * @desc    Get the last saved analysis results for a user
 * @access  Private (should be)
 */
app.get("/api/analysis-results", async (req, res) => {
  const { email } = req.query;

  // **SECURITY NOTE**: Again, this should use an auth token.
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await LoginModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.lastAnalysis) {
      return res.status(404).json({ message: "No analysis found. Please run a scan." });
    }
    
    // --- FIX TYPO ---
    // Send back the saved results
    res.status(200).json(user.lastAnalysis); // Was user.last.analysis
    // --- END FIX ---

  } catch (error) {
    console.error("Get Results Error:", error);
    res.status(500).json({ message: "Server error fetching results." });
  }
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

