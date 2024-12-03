import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions = (): ClientOptions => {
  return {
    transport: Transport.GRPC,
    options: {
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
      url: `0.0.0.0:5556`,
      package: ['requestshistory'],
      protoPath: ['./protos/test.proto'],
    },
  };
};
