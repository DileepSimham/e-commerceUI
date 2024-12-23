export class AppUser {
    id: number;
    username: string;
    password: string;
    email: string | null;
    role: string | null;
    createdAt: string;
  
    constructor(id: number, username: string, password: string, email: string | null, role: string | null, createdAt: string) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
    }
  }
  