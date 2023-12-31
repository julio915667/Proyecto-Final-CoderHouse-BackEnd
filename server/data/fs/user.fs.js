import fs from "fs"
import path from "path"
import crypto from "crypto"
class UserManager {
    constructor() {
        const __filename = new URL(import.meta.url).pathname;
        this.filePath = path.join(path.dirname(__filename), 'data', 'fs', 'files', 'user.json');
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
        const id = crypto.randomBytes(6).toString('hex'); // Mantener los primeros 12 caracteres
        return id;
    }
    
    destroy(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.saveUsers();
            return true; // Indicar que la eliminación fue exitosa
        } else {
            return false; // Indicar que el usuario no fue encontrado
        }
    }
}
export default UserManager 