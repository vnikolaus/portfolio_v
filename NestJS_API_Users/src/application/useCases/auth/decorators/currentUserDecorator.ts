import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "../../user/entities/user.entity";
import { AuthRequest } from "../auth.controller";

export const CurrentUser = createParamDecorator(
    (data:unknown, context: ExecutionContext): User => { 
        const req = context.switchToHttp().getRequest<AuthRequest>();

        return req.user
    }
)