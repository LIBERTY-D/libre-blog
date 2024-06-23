import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QueryUserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request:Request = ctx.switchToHttp().getRequest();
    return request.query
  },
);