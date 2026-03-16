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

// GET activity by ID
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

// POST - Create new activity
app.post("/activities", (req, res) => {
    try{
        let collection = db.collection("Activities");
        let result = collection.insertOne(req.body);
        res.json(result);
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: "Error creating activity"});
    }
});

// PUT - Update activity
app.put("/activities/:id", (req, res) => {
    try{
        let collection = db.collection("Activities");
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
        res.status(500).json({error: "Error updating activity"});
    }
});

// DELETE - Remove activity
app.delete("/activities/:id", (req, res) => {
    try{
        let collection = db.collection("Activities");
        let id = new ObjectId(req.params.id);
        let result = collection.deleteOne({"_id": id});
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
// DATABASE CONNECTION
// =====================================================

async function connectDB(){
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try{
        await client.connect();
        db = client.db("CommunityCompetition");
        console.log("Connected to MongoDB!");
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
