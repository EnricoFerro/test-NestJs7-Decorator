import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as httpMock from 'node-mocks-http';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { User } from './auth/user.decorator';

describe('AppController', () => {
  let appController: AppController;
  let user;

  function getParamDecoratorFactory(decorator: Function) {
      class TestDecorator {
          public test(@User() value) { }
      }

      const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, 'test');
      return args[Object.keys(args)[0]].factory;
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

  });

  describe('root', () => {
    it('check John', () => {
      /**
       * Build the mock data for the decorator User John
       */
      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      req.user = {userId: 1, username: 'john'};
      const mockDecoratorData = new ExecutionContextHost([req, res], AppController, appController.getUser);
      const factory = getParamDecoratorFactory(User);
      user = factory(null, mockDecoratorData);
      expect(appController.getUser(user)).toStrictEqual(req.user);
    });
    it('check Chris', () => {
      /**
       * Build the mock data for the decorator User John
       */
      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      req.user = {userId: 2, username: 'chris'};
      const mockDecoratorData = new ExecutionContextHost([req, res], AppController, appController.getUser);
      const factory = getParamDecoratorFactory(User);
      user = factory(null, mockDecoratorData);
      expect(appController.getUser(user)).toStrictEqual(req.user);
    });
    it('check Maria', () => {
      /**
       * Build the mock data for the decorator User John
       */
      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      req.user = {userId: 3, username: 'maria'};
      const mockDecoratorData = new ExecutionContextHost([req, res], AppController, appController.getUser);
      const factory = getParamDecoratorFactory(User);
      user = factory(null, mockDecoratorData);
      expect(appController.getUser(user)).toStrictEqual(req.user);
    });
  });
});
