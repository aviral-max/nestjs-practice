import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

// Service = contains all the business logic.
// This is the place where actual work happens (like saving a user,
// checking passwords, creating tokens, etc.)
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // Function for handling login logic.
  // Later you will add code to validate the user, check password, etc.
  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    //compare password
    const isPasswordValid = await argon.verify(user.hash, dto.password);
    //if password incorrect throw exception
    if (!isPasswordValid) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // send back the user
    //excluding the hash
    const { hash, ...safeUser } = user;
    return safeUser;
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

    /**
     * Transformers (usually used with class-transformer) help control
     * how data is returned to the client.
     *
     * Instead of manually selecting fields in every query (like excluding
     * hashed passwords using Prisma `select`), transformers allow us to:
     * - Hide sensitive fields (e.g., password, tokens)
     * - Format or rename response properties
     * - Control what is exposed in API responses
     *
     * They work at the response level, meaning the database can still
     * return full data, but only safe fields are sent to the client.
     *
     * This keeps privacy concerns centralized and makes the code cleaner
     * and more maintainable.
     * Example:
     *
     * class UserResponseDto {
     *   id: number;
     *   email: string;
     *
     *   @Exclude()
     *   password: string;
     * }
     *
     * Only `id` and `email` will be returned to the client,
     * even if `password` exists in the database.
     */

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //return the saved user
      // Destructuring with aliasing to exclude `hash` safely from the response.
      //
      // Why aliasing is needed:
      // - `hash` was already declared earlier (password hash from argon).
      // - Destructuring `const { hash, ...safeUser } = user` would try to
      //   redeclare `hash` in the same block.
      //
      // Error prevented:
      // - "Block-scoped variable 'hash' used before its declaration"
      //
      // Fix:
      // - Rename `user.hash` to `_hash` during destructuring to avoid
      //   the name collision while still excluding it from `safeUser`.
      const { hash: _hash, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          //this error code means there is a unique constraint violation
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }
}
