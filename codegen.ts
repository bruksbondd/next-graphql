import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://swivelt.mintsplash.net/graphql',
  documents: ['documents/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'generates/gql/': {
      preset: 'client',
    },
  },
};

export default config;
