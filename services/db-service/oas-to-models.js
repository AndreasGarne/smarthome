const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
    input: path.resolve(process.cwd(), './src/openapi.yaml'),
    output: path.resolve(process.cwd(), './src/controllers'),
    name: 'storage-models.ts',
    generateClient: false,
    extractEnums: true,
});