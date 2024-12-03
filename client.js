const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDefinition = protoLoader.loadSync('./protos/test.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const service = grpc.loadPackageDefinition(packageDefinition).requestshistory;

// Start the client
function main() {
   const client = new service.RequestsHistoryService('localhost:5556', grpc.credentials.createInsecure());

  const call = client.Create();

  // Receive messages from the server
  call.on('data', (response) => {
    console.log(response)
    //
  });

  call.on('error', (err) => {
    console.log(err)
  })

  call.on('end', () => {
    console.log('Stream ended.');
  });

  call.write({
    "request_id": "1"
  })
  
  call.write({
    "request_id": "2"
  })
  call.write({
    "request_id": "3"
  })
  call.write({
    "request_id": "4"
  })
  // Close the stream after sending messages
  call.end();
}

main();
