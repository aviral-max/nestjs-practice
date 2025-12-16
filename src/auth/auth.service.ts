import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

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
  // AuthDto is used here to define and validate the expected
  // request body shape for signup.
  // DTOs ensure type safety + validation before business logic runs.
  // Once understood here, the same pattern applies to all services.
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    //return the saved user
    return user;
  }
}
