import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
  signup() {
    // Later: return this.authService.signup();
    // NestJS automatically converts whatever you return (string, object, array, etc.)
    // into a proper HTTP response, so you don't need to specify the return type manually.
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
