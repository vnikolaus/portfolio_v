import { UnauthorizedException } from '@nestjs/common'

export class UnauthorizedError extends Error {}

export class SessionError extends UnauthorizedException {}

export class MockError extends UnauthorizedException {}
