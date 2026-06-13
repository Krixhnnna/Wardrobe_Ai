const bcrypt = require("bcryptjs");

// Seed the default Admin user with password "123456"
const adminPasswordHash = bcrypt.hashSync("123456", 10);

const users = [
  {
    _id: "admin-id",
    id: "admin-id",
    name: "Admin",
    email: "admin",
    passwordHash: adminPasswordHash,
    gender: "other",
    bodyType: "average",
    stylePreference: []
  }
];

class MockUser {
  static async findOne({ email }) {
    const cleanEmail = email.toLowerCase().trim();
    const user = users.find(u => 
      u.email.toLowerCase() === cleanEmail || 
      (u.email.toLowerCase() === "admin" && (cleanEmail === "admin@example.com" || cleanEmail === "admin@test.com"))
    );
    if (!user) return null;
    
    // Support chainable methods or query options if any exist
    return {
      ...user,
      select: () => user
    };
  }

  static async create({ name, email, passwordHash }) {
    const user = {
      _id: "user-" + Date.now() + Math.random().toString(36).substr(2, 5),
      name,
      email: email.toLowerCase(),
      passwordHash,
      gender: "other",
      bodyType: "average",
      stylePreference: []
    };
    user.id = user._id;
    users.push(user);
    return user;
  }

  static async findById(id) {
    const user = users.find(u => u._id === id);
    if (!user) return null;
    return {
      ...user,
      select: () => user
    };
  }
}

module.exports = MockUser;
