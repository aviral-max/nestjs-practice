import { Injectable } from '@nestjs/common';

// Service = contains all the business logic.
// This is the place where actual work happens (like saving a user,
// checking passwords, creating tokens, etc.)
@Injectable()
export class AuthService {
  // Function for handling login logic.
  // Later you will add code to validate the user, check password, etc.
  login() {}

  // Function for handling signup logic.
  // Later you will add code to create the user, hash password, etc.
  signup() {}
}
