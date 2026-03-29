const express = require('express');
const app = express();


//needed to facilitate MongoDB integration
const { MongoClient, ObjectId } = require('mongodb');


//needed for cross-origin resource sharing
const cors = require('cors');
app.use(cors());


//needed to extract info in request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = 8080;
let db;


// =====================================================
// TEST ROUTES
// =====================================================


app.get("/", (req, res) => {
   res.send("Community Competition API is running!");
});


// =====================================================
// USERS ROUTES
// =====================================================


// GET all users
app.get("/users", async (req, res) => {
   try{
       let collection = db.collection("Users");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching users"});
   }
});


// GET user by ID
app.get("/users/:id", async (req, res) => {
   try{
       let collection = db.collection("Users");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching user"});
   }
});


// POST - Create new user
app.post("/users", (req, res) => {
   try{
       let collection = db.collection("Users");
       let result = collection.insertOne(req.body);
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating user"});
   }
});


// PUT - Update user
app.put("/users/:id", (req, res) => {
   try{
       let collection = db.collection("Users");
       let id = new ObjectId(req.params.id);
       let result = collection.updateOne(
           {"_id": id},
           {$set: req.body},
           {upsert: false}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating user"});
   }
});


// DELETE - Remove user
app.delete("/users/:id", (req, res) => {
   try{
       let collection = db.collection("Users");
       let id = new ObjectId(req.params.id);
       let result = collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting user"});
   }
});


// =====================================================
// COMMUNITIES ROUTES
// =====================================================


// GET all communities
app.get("/communities", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching communities"});
   }
});


// GET community by ID
app.get("/communities/:id", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community"});
   }
});


// POST - Create new community
app.post("/communities", (req, res) => {
   try{
       let collection = db.collection("Communities");
       let result = collection.insertOne(req.body);
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating community"});
   }
});


// PUT - Update community
app.put("/communities/:id", (req, res) => {
   try{
       let collection = db.collection("Communities");
       let id = new ObjectId(req.params.id);
       let result = collection.updateOne(
           {"_id": id},
           {$set: req.body},
           {upsert: false}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating community"});
   }
});


// DELETE - Remove community
app.delete("/communities/:id", (req, res) => {
   try{
       let collection = db.collection("Communities");
       let id = new ObjectId(req.params.id);
       let result = collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting community"});
   }
});


// =====================================================
// CATEGORIES ROUTES
// =====================================================


// GET all categories
app.get("/categories", async (req, res) => {
   try{
       let collection = db.collection("Categories");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching categories"});
   }
});


// GET category by ID
app.get("/categories/:id", async (req, res) => {
   try{
       let collection = db.collection("Categories");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching category"});
   }
});


// GET categories by community ID
app.get("/categories/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Categories");
       let result = await collection.find({"communityId": new ObjectId(req.params.communityId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community categories"});
   }
});


// POST - Create new category
app.post("/categories", (req, res) => {
   try{
       let collection = db.collection("Categories");
       let result = collection.insertOne(req.body);
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating category"});
   }
});


// PUT - Update category
app.put("/categories/:id", (req, res) => {
   try{
       let collection = db.collection("Categories");
       let id = new ObjectId(req.params.id);
       let result = collection.updateOne(
           {"_id": id},
           {$set: req.body},
           {upsert: false}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating category"});
   }
});


// DELETE - Remove category
app.delete("/categories/:id", (req, res) => {
   try{
       let collection = db.collection("Categories");
       let id = new ObjectId(req.params.id);
       let result = collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting category"});
   }
});


// =====================================================
// ACTIVITIES ROUTES
// =====================================================


// GET all activities
app.get("/activities", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching activities"});
   }
});


// GET activity by ID (must be before :userId routes)
app.get("/activities/:id", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching activity"});
   }
});


// GET activities for user in specific community (MUST be before /activities/user/:userId)
app.get("/activities/user/:userId/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find({
           userId: new ObjectId(req.params.userId),
           communityId: new ObjectId(req.params.communityId)
       }).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching user community activities"});
   }
});


// GET activities by user ID
app.get("/activities/user/:userId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find({"userId": new ObjectId(req.params.userId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching user activities"});
   }
});


// GET activities by community ID
app.get("/activities/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find({"communityId": new ObjectId(req.params.communityId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community activities"});
   }
});


// POST - Create new activity
app.post("/activities", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.insertOne({
           userId: new ObjectId(req.body.userId),
           communityId: new ObjectId(req.body.communityId),
           goalId: new ObjectId(req.body.goalId),
           value: req.body.value,
           points: req.body.points,
           date: new Date()
       });
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating activity"});
   }
});


// PUT - Update activity
app.put("/activities/:id", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let id = new ObjectId(req.params.id);
       let result = await collection.updateOne(
           {"_id": id},
           {$set: req.body},
           {upsert: false}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating activity"});
   }
});


// DELETE - Remove activity
app.delete("/activities/:id", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let id = new ObjectId(req.params.id);
       let result = await collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting activity"});
   }
});
// =====================================================
// COMMUNITIES ROUTES
// =====================================================


// GET all communities
app.get("/communities", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching communities"});
   }
});


// GET community by ID
app.get("/communities/:id", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community"});
   }
});


// POST - Create new community (admin only)
app.post("/communities", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let newCommunity = {
           name: req.body.name,
           description: req.body.description,
           createdBy: new ObjectId(req.body.createdBy),
           members: []
       };
       await collection.insertOne(newCommunity);
       res.json({message: "Community created", community: newCommunity});
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating community"});
   }
});


// POST - Join community
app.post("/communities/:id/join", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let userId = new ObjectId(req.body.userId);
       let communityId = new ObjectId(req.params.id);
      
       let result = await collection.updateOne(
           {"_id": communityId},
           {$addToSet: {members: userId}}
       );
       res.json({message: "Joined community", result: result});
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error joining community"});
   }
});


// PUT - Update community
app.put("/communities/:id", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let id = new ObjectId(req.params.id);
       let result = await collection.updateOne(
           {"_id": id},
           {$set: req.body}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating community"});
   }
});


// DELETE - Remove community
app.delete("/communities/:id", async (req, res) => {
   try{
       let collection = db.collection("Communities");
       let id = new ObjectId(req.params.id);
       let result = await collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting community"});
   }
});
// =====================================================
// GOALS ROUTES
// =====================================================


// GET all goals
app.get("/goals", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching goals"});
   }
});


// GET goals by community
app.get("/goals/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let result = await collection.find({"communityId": new ObjectId(req.params.communityId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community goals"});
   }
});


// GET goal by ID
app.get("/goals/:id", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let result = await collection.findOne({"_id": new ObjectId(req.params.id)});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching goal"});
   }
});


// POST - Create new goal (admin only)
app.post("/goals", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let newGoal = {
           communityId: new ObjectId(req.body.communityId),
           name: req.body.name,
           description: req.body.description,
           type: req.body.type, // "yes_no" or "numeric"
           points: req.body.points
       };
       await collection.insertOne(newGoal);
       res.json({message: "Goal created", goal: newGoal});
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error creating goal"});
   }
});


// PUT - Update goal
app.put("/goals/:id", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let id = new ObjectId(req.params.id);
       let result = await collection.updateOne(
           {"_id": id},
           {$set: req.body}
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error updating goal"});
   }
});


// DELETE - Remove goal
app.delete("/goals/:id", async (req, res) => {
   try{
       let collection = db.collection("Goals");
       let id = new ObjectId(req.params.id);
       let result = await collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting goal"});
   }
});
// =====================================================
// USER GOAL TARGETS
// =====================================================


// POST - Set user's target for a goal
app.post("/user-goal-targets", async (req, res) => {
   try{
       let collection = db.collection("UserGoalTargets");
       let result = await collection.updateOne(
           {
               userId: new ObjectId(req.body.userId),
               goalId: new ObjectId(req.body.goalId)
           },
           {
               $set: {
                   userId: new ObjectId(req.body.userId),
                   goalId: new ObjectId(req.body.goalId),
                   targetPoints: req.body.targetPoints
               }
           },
           { upsert: true }
       );
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error setting target"});
   }
});


// GET - Get user's target for a goal
app.get("/user-goal-targets/user/:userId/goal/:goalId", async (req, res) => {
   try{
       let collection = db.collection("UserGoalTargets");
       let result = await collection.findOne({
           userId: new ObjectId(req.params.userId),
           goalId: new ObjectId(req.params.goalId)
       });
      
       if (!result) {
           res.json({ targetPoints: 0 });
       } else {
           res.json(result);
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching target"});
   }
});


// GET - Get all targets for user in a community
app.get("/user-goal-targets/user/:userId/community/:communityId", async (req, res) => {
   try{
       let targetsCollection = db.collection("UserGoalTargets");
       let goalsCollection = db.collection("Goals");
      
       // Get all goals in this community
       let goals = await goalsCollection.find({
           communityId: new ObjectId(req.params.communityId)
       }).toArray();
      
       let goalIds = goals.map(g => g._id);
      
       // Get user's targets for these goals
       let targets = await targetsCollection.find({
           userId: new ObjectId(req.params.userId),
           goalId: { $in: goalIds }
       }).toArray();
      
       res.json(targets);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching targets"});
   }
});
// =====================================================
// ACTIVITIES ROUTES (Log progress)
// =====================================================


// GET all activities
app.get("/activities", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find().toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching activities"});
   }
});


// GET activities by user
app.get("/activities/user/:userId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find({"userId": new ObjectId(req.params.userId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching user activities"});
   }
});


// GET activities by community
app.get("/activities/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.find({"communityId": new ObjectId(req.params.communityId)}).toArray();
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community activities"});
   }
});


// POST - Log activity
app.post("/activities", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let newActivity = {
           userId: new ObjectId(req.body.userId),
           communityId: new ObjectId(req.body.communityId),
           goalId: new ObjectId(req.body.goalId),
           value: req.body.value, // true/false for yes_no, number for numeric
           date: new Date(),
           points: req.body.points
       };
       await collection.insertOne(newActivity);
       res.json({message: "Activity logged", activity: newActivity});
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error logging activity"});
   }
});


// DELETE - Remove activity
app.delete("/activities/:id", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let id = new ObjectId(req.params.id);
       let result = await collection.deleteOne({"_id": id});
       res.json(result);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error deleting activity"});
   }
});
// =====================================================
// AUTH ROUTES
// =====================================================


// POST - Register new user
app.post("/register", async (req, res) => {
   try{
       let collection = db.collection("Users");
       let existing = await collection.findOne({username: req.body.username});
      
       if(existing){
           res.status(400).json({error: "Username already exists"});
       } else {
           let newUser = {
               username: req.body.username,
               password: req.body.password,
               isAdmin: false
           };
           await collection.insertOne(newUser);
           res.json({message: "User created successfully", user: newUser});
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error registering user"});
   }
});


// POST - Login user
app.post("/login", async (req, res) => {
   try{
       let collection = db.collection("Users");
       let result = await collection.findOne({username: req.body.username, password: req.body.password});
      
       if(result){
           res.json({message: "Login successful", user: result});
       } else {
           res.status(401).json({error: "Invalid username or password"});
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error logging in"});
   }
});
// =====================================================
// SEED DATA (Create sample communities and goals)
// =====================================================


async function seedData(db) {
   try {
       let communitiesCollection = db.collection("Communities");
       let count = await communitiesCollection.countDocuments();
      
       if (count === 0) {
           let communities = await communitiesCollection.insertMany([
               {
                   name: "Gym",
                   description: "Fitness and workout competition",
                   createdBy: new ObjectId(),
                   members: []
               },
               {
                   name: "Gaming",
                   description: "Video game competition",
                   createdBy: new ObjectId(),
                   members: []
               },
               {
                   name: "Study",
                   description: "Academic goals and learning",
                   createdBy: new ObjectId(),
                   members: []
               }
           ]);


           console.log("Communities created:", communities.insertedIds);


           let goalsCollection = db.collection("Goals");
           await goalsCollection.insertMany([
               // GYM GOALS
               {
                   communityId: communities.insertedIds[0],
                   name: "Weight Loss",
                   description: "Log pounds lost",
                   type: "numeric",
                   points: 0.5
               },
               {
                   communityId: communities.insertedIds[0],
                   name: "2 Mile Run",
                   description: "Complete a 2 mile run",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[0],
                   name: "Weight Lifting",
                   description: "Complete a weight lifting session",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[0],
                   name: "30 Minute Stairmaster/Treadmill",
                   description: "Complete 30 minutes on stairmaster or treadmill",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[0],
                   name: "10k Steps",
                   description: "Log 10,000 steps completed",
                   type: "yes_no",
                   points: 1
               },
               // GAMING GOALS
               {
                   communityId: communities.insertedIds[1],
                   name: "Game Session",
                   description: "Complete a gaming session",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[1],
                   name: "New Game Started",
                   description: "Start a new game",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[1],
                   name: "MVP in a Game",
                   description: "Achieve MVP in a game match",
                   type: "yes_no",
                   points: 2
               },
               {
                   communityId: communities.insertedIds[1],
                   name: "Complete Campaign",
                   description: "Complete a game campaign",
                   type: "yes_no",
                   points: 5
               },
               {
                   communityId: communities.insertedIds[1],
                   name: "Hours Played",
                   description: "Hours spent gaming",
                   type: "numeric",
                   points: 0.5
               },
               // STUDY GOALS
               {
                   communityId: communities.insertedIds[2],
                   name: "1 Hour Study Sesh",
                   description: "Complete a 1 hour study session",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[2],
                   name: "Practice Quiz",
                   description: "Complete a practice quiz",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[2],
                   name: "Chapters Completed",
                   description: "Complete reading assigned chapters",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[2],
                   name: "Podcast/Video Lesson",
                   description: "Watch educational podcast or video",
                   type: "yes_no",
                   points: 1
               },
               {
                   communityId: communities.insertedIds[2],
                   name: "Assignments Completed",
                   description: "Complete an assignment",
                   type: "yes_no",
                   points: 3
               }
           ]);


           console.log("Goals created!");
       }
   } catch (e) {
       console.log("Error seeding data:", e);
   }
}


// =====================================================
// DATABASE CONNECTION
// =====================================================
// =====================================================
// STATS & LEADERBOARD ROUTES
// =====================================================


// GET user's total points across all communities
app.get("/users/:userId/stats", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.aggregate([
           {
               $match: { userId: new ObjectId(req.params.userId) }
           },
           {
               $group: {
                   _id: null,
                   totalPoints: { $sum: "$points" },
                   totalActivities: { $sum: 1 }
               }
           }
       ]).toArray();
      
       if (result.length === 0) {
           res.json({ totalPoints: 0, totalActivities: 0 });
       } else {
           res.json(result[0]);
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching user stats"});
   }
});


// GET user's points by community
app.get("/users/:userId/stats/community/:communityId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.aggregate([
           {
               $match: {
                   userId: new ObjectId(req.params.userId),
                   communityId: new ObjectId(req.params.communityId)
               }
           },
           {
               $group: {
                   _id: null,
                   totalPoints: { $sum: "$points" },
                   totalActivities: { $sum: 1 }
               }
           }
       ]).toArray();
      
       if (result.length === 0) {
           res.json({ totalPoints: 0, totalActivities: 0 });
       } else {
           res.json(result[0]);
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching community stats"});
   }
});


// GET user's activities for a specific goal
app.get("/users/:userId/stats/goal/:goalId", async (req, res) => {
   try{
       let collection = db.collection("Activities");
       let result = await collection.aggregate([
           {
               $match: {
                   userId: new ObjectId(req.params.userId),
                   goalId: new ObjectId(req.params.goalId)
               }
           },
           {
               $group: {
                   _id: null,
                   totalPoints: { $sum: "$points" },
                   timesLogged: { $sum: 1 }
               }
           }
       ]).toArray();
      
       if (result.length === 0) {
           res.json({ totalPoints: 0, timesLogged: 0 });
       } else {
           res.json(result[0]);
       }
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching goal stats"});
   }
});


// GET leaderboard for a community (ranked by points)
app.get("/leaderboard/community/:communityId", async (req, res) => {
   try{
       let activitiesCollection = db.collection("Activities");
       let usersCollection = db.collection("Users");
      
       // Get all activities in this community grouped by user
       let leaderboard = await activitiesCollection.aggregate([
           {
               $match: { communityId: new ObjectId(req.params.communityId) }
           },
           {
               $group: {
                   _id: "$userId",
                   totalPoints: { $sum: "$points" },
                   totalActivities: { $sum: 1 }
               }
           },
           {
               $sort: { totalPoints: -1 }
           },
           {
               $lookup: {
                   from: "Users",
                   localField: "_id",
                   foreignField: "_id",
                   as: "userInfo"
               }
           },
           {
               $unwind: "$userInfo"
           },
           {
               $project: {
                   userId: "$_id",
                   username: "$userInfo.username",
                   totalPoints: 1,
                   totalActivities: 1,
                   _id: 0
               }
           }
       ]).toArray();
      
       res.json(leaderboard);
   }
   catch(e){
       console.log(e);
       res.status(500).json({error: "Error fetching leaderboard"});
   }
});


async function connectDB(){
   const uri = "mongodb://localhost:27017/";
   const client = new MongoClient(uri);


   try{
       await client.connect();
       db = client.db("CommunityCompetition");
       console.log("Connected to MongoDB!");
      
       // Seed sample data
       await seedData(db);
   }
   catch(error){
       console.log(error);
       return null;
   }
}


connectDB();


app.listen(PORT, () => {
   console.log("Now listening on port " + PORT);
});



