import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// Service = contains all the business logic.
// This is the place where actual work happens (like saving a user,
// checking passwords, creating tokens, etc.)
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // Function for handling login logic.
  // Later you will add code to validate the user, check password, etc.
  signin() {
    return { message: 'i am signin route!' };
  }

  // Function for handling signup logic.
  // Later you will add code to create the user, hash password, etc.
  signup() {
    return 'i am signup route!';
  }
}
