const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Portfolio_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema with explicit collection name
const portfolioSchema = new mongoose.Schema({
    summary: String,
    skills: [String],
    experience: [
        {
            role: String,
            period: String,
            organization: String,
            details: [String],
        },
    ],
    education: [
        {
            institute: String,
            graduationDate: String,
            details: [String],
        },
    ],
    languages: [
        { language: String, proficiency: String }
    ],
}); // Explicitly set collection name

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Populate Database
// Populate Database with new example data
async function populateDatabase() {
    try {
        const portfolio = new Portfolio({
            summary: "A highly motivated software engineer with expertise in full-stack development.",
            skills: [
                "JavaScript (React, Node.js)",
                "Database Management (MongoDB, PostgreSQL)",
                "Cloud Computing (AWS, Azure)",
                "Machine Learning (TensorFlow, Scikit-learn)"
            ],
            experience: [
                {
                    role: "Full-Stack Developer",
                    period: "01/2023 - 06/2023",
                    organization: "TechCorp Solutions",
                    details: [
                        "Built and maintained web applications using React and Node.js.",
                        "Integrated RESTful APIs to enhance application functionality.",
                        "Optimized database queries to improve application performance by 20%."
                    ]
                },
            ],
            education: [
                {
                    institute: "University of Technology",
                    graduationDate: "06/2026",
                    details: [
                        "Bachelor of Technology in Computer Science and Engineering.",
                        "Current Grade : (GPA: 8.5)."
                    ]
                }
            ],
            languages: [
                { language: "English", proficiency: "Fluent" },
                { language: "Telugu", proficiency: "Fluent" },
                { language: "Hindi", proficiency: "Fluent" },
            ]
        });

        await portfolio.save();
        console.log("Portfolio data saved to Portfolio_data collection!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error populating database:", err);
    }
}

populateDatabase();
