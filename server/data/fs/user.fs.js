import fs from "fs"
import path from "path"
import crypto from "crypto"
class UserManager {
    constructor() {
        this.filePath = path.join(__dirname, 'data', './files/user.json');
        this.loadUsers();
    }

    create(data) {
        const user = {
            id: this.generateId(),
            name: data.name,
            photo: data.photo,
            email: data.email
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    read() {
        return this.users;
    }

    readOne(id) {
        return this.users.find(user => user.id === id);
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            this.users = [];
        }
    }

    saveUsers() {
        try {
            const data = JSON.stringify(this.users, null, 2);
            fs.writeFileSync(this.filePath, data, 'utf8');
        } catch (error) {
            console.log('Error saving users to file:', error.message);
        }
    }

    generateId() {
        const id = crypto.randomBytes(6).toString('hex'); // Generate a 12-character hex ID
        return id;
    }
}
export default UserManager 