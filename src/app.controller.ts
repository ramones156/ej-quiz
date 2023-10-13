import { Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('/api/login')
  login() {
    return { role: 'ROLE_ADMIN' };
  }

  @Post('/api/logout')
  logout() {
    return { message: 'Successfully logged out' };
  }
}
