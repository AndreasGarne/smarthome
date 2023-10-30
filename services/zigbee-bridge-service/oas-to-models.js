const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
    input: path.resolve(process.cwd(), '../db-service/src/openapi.yaml'),
    output: path.resolve(process.cwd(), './src/repositories'),
    name: 'storage-models.ts',
    generateClient: false,
    extractEnums: true,
});