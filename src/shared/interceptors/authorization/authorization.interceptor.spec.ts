import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import {
  CallHandler,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

describe('AuthorizationInterceptor', () => {
  let interceptor: AuthorizationInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorizationInterceptor],
    }).compile();

    interceptor = module.get<AuthorizationInterceptor>(
      AuthorizationInterceptor,
    );
  });

  it('should be defined', () => {
    expect(new AuthorizationInterceptor()).toBeDefined();
  });

  it('should pass through when user_id is provided', async () => {
    const contextMock: ExecutionContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          headers: {
            user_id: 1,
          },
        })),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      })),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getType: jest.fn(),
      getArgByIndex: jest.fn(),
    } as ExecutionContext;

    const nextMock: CallHandler = {
      handle: jest.fn(() => new Observable()),
    };

    expect(() => interceptor.intercept(contextMock, nextMock)).not.toThrow();
  });

  it('should be throw UnauthorizedException when user_id has not provided on headers', async () => {
    const contextMock: ExecutionContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({
          headers: {},
        })),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      })),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getType: jest.fn(),
      getArgByIndex: jest.fn(),
    } as ExecutionContext;

    const nextMock: CallHandler = {
      handle: jest.fn(() => new Observable()),
    };

    expect(() => interceptor.intercept(contextMock, nextMock)).toThrow(
      UnauthorizedException,
    );
    expect(() => interceptor.intercept(contextMock, nextMock)).toThrow(
      'Token has not provided',
    );
  });
});
