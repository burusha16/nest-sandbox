import { LoggerMiddleware } from '../../../../src/core/middlewares/logger.middleware';

describe('LoggerMiddleware', () => {
  let logger!: LoggerMiddleware;

  beforeEach(() => {
    logger = new LoggerMiddleware();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should be defined', () => {
    const body = 'test';
    const res: any = {body};
    console.log = jest.fn();
    logger.use(res, res, () => {});
    expect(console.log).toBeCalledWith(body);
    expect(console.log).toBeCalledTimes(1);
  });
});
