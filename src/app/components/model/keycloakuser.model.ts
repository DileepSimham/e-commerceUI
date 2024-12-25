export class KeycloakUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    totp: boolean;
    createdTimestamp: number;
  
    constructor(
      id: number,
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      emailVerified: boolean,
      enabled: boolean,
      totp: boolean,
      createdTimestamp: number
    ) {
      this.id = id;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.emailVerified = emailVerified;
      this.enabled = enabled;
      this.totp = totp;
      this.createdTimestamp = createdTimestamp;
    }
  }
  