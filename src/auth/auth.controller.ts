import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthDto } from './dto';

// Controller = receives incoming HTTP requests (like /login, /signup)
// and sends back responses.
// It DOES NOT contain business logic. It simply calls the service.
@Controller('auth') // All routes inside this controller will start with /auth
export class AuthController {
  // Injecting the AuthService into this controller.
  // This helps the controller use functions written inside the service.
  constructor(private authService: AuthService) {}

  // Later you will write methods like:
  // @Post('login')
  // login() { return this.authService.login(); }

  // This route will handle POST requests to /auth/signup
  // Here we will call authService.signup() to handle the signup logic.
  @Post('signup')
  /**
   * DTO (Data Transfer Object)
   * --------------------------
   * A DTO is a simple class that defines the *shape of data*
   * we expect from the client (request body, query params, etc.).
   *
   * Why we use DTOs in NestJS:
   * 1. Validation – ensures incoming data is correct and safe
   * 2. Consistency – same data structure everywhere
   * 3. Readability – easy to understand what an API expects
   * 4. Separation – keeps controllers clean (no raw objects)
   *
   * DTOs usually:
   * - Contain only properties (no business logic)
   * - Use class-validator decorators for validation
   * - Represent incoming or outgoing data, NOT database models
   *
   * Example:
   * --------
   * If a user sends this JSON:
   * {
   *   "email": "test@test.com",
   *   "password": "123456"
   * }
   *
   * This DTO defines and validates that data before
   * it reaches the controller/service.
   */

  // Use @Body() instead of @Req():
  // It keeps code framework-independent (Express/Fastify)
  // and gives only the data we need, not the whole request.
  signup(@Body() dto: AuthDto) {
    // Later: return this.authService.signup();
    // NestJS automatically converts whatever you return (string, object, array, etc.)
    // into a proper HTTP response, so you don't need to specify the return type manually.
    console.log({
      dto,
    }); // Just to show how to access request data.
    return this.authService.signup();
  }

  // This route will handle POST requests to /auth/signin
  // Here we will call authService.login() or authService.signin().
  @Post('signin')
  signin() {
    // Later: return this.authService.login();
    // Again, no need to mention the type of returned data.
    // NestJS handles serialization and sends the response back in JSON by default.
    return this.authService.signin();
  }
}
