import fs from "fs";
import path from "path";
import crypto from "crypto";
import __dirname from './utils.js';
const currentDir = __dirname;
class UserManager {
    constructor() {
        const __filename = new URL(import.meta.url).pathname;
        this.filePath = path.join(path.dirname(__filename), 'files/users.json');

        this.users = [];
        this.loadUsers();
    }

    generateId() {
        const id = crypto.randomBytes(6).toString('hex');
        return id;
    }

    create(data) {
        const newUser = {
            id: this.generateId(),
            ...data,
        };

        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    read() {
        console.log("Reading all users:", this.users);
        return this.users;
    }

    readOne(id) {
        console.log("Reading user with ID:", id);
        return this.users.find(user => user.id === id);
    }

    destroy(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.saveUsers();
            return true; // Éxito en la eliminación
        } else {
            return false; // No se encontró el usuario
        }
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            console.error('Error loading users:', error.message);
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
}

export default UserManager;
