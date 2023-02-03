import { GraphQLInt, GraphQLInterfaceType, GraphQLNonNull, GraphQLString } from 'graphql';

import { getIdEncodeResolver, IDENTIFIER_TYPES } from '../identifiers';
import URL from '../scalar/URL';

export const fileInfoFields = {
  id: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Unique identifier for the file',
    resolve: getIdEncodeResolver(IDENTIFIER_TYPES.UPLOADED_FILE, 'id'),
  },
  url: {
    type: new GraphQLNonNull(URL),
    description: 'URL to access the file',
  },
  name: {
    type: GraphQLString,
    description: 'Name of the file',
    resolve: file => file.fileName,
  },
  type: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Mime type of the file',
    resolve: file => file.fileType,
  },
  size: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Size of the file in bytes',
    resolve: file => file.fileSize || 0,
  },
};

export const FileInfo = new GraphQLInterfaceType({
  name: 'FileInfo',
  description: 'Exposes information about an uploaded file (image, pdf, etc.)',
  fields: () => fileInfoFields,
});