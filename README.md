# Test Decorator for NestJs 7

This program is a proof of concept of the test for decorator in NestJs 7.

This program implement the [authentication technique](https://docs.nestjs.com/v7/techniques/authentication) and implement a unit test for the user logged.


## Install

```
npm i 
```

## Start 

```
npm start
```

## Test

For the test is used the package [`node-mocks-http`](https://www.npmjs.com/package/node-mocks-http) and the use of decorator:
```
const req = httpMock.createRequest();
const res = httpMock.createResponse();
const ctx = new ExecutionContextHost([req, res], AppController, appController.Get);
const factory = getParamDecoratorFactory(User);
```

### Launch Test
For launch:

```
npm run test
```

### Launch Test E2E

```
npm run test:e2e
```

