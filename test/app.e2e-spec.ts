import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/ (GET) : Unauthorized', () => {
    const password = new Buffer('john:error').toString('base64');
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Basic ${password}`)
      .expect(401)
      .expect('Content-Type', /json/)
      .expect('{"statusCode":401,"message":"Unauthorized"}');
  });
  it('/ (GET) : John Authenticate', () => {
    const password = new Buffer('john:changeme').toString('base64');
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Basic ${password}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('{"userId":1,"username":"john"}');
  });
  it('/ (GET) : Chris Authenticate', () => {
    const password = new Buffer('chris:secret').toString('base64');
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Basic ${password}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('{"userId":2,"username":"chris"}');
  });
  it('/ (GET) : Maria Authenticate', () => {
    const password = new Buffer('maria:guest').toString('base64');
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Basic ${password}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('{"userId":3,"username":"maria"}');
  });
});
