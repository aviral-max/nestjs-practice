import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

// Controller = receives incoming HTTP requests (like /login, /signup)
// and sends back responses.
// It DOES NOT contain business logic. It simply calls the service.
@Controller()
export class AuthController {
  // Injecting the AuthService into this controller.
  // This helps the controller use functions written inside the service.
  constructor(private authService: AuthService) {}

  // Later you will write methods like:
  // @Post('login')
  // login() { return this.authService.login(); }
}
