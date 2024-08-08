enum ErrorMessageEnum {
  COMMUNICATION_SERVER = 'Communication Server Error',
  INPUT_DATA_VALIDATION = 'Input Data Validation Error',
  INTERNAL_SERVER = 'Error Interno do Servidor',
  ENTITY_VALIDATION = 'Entity Validation Error'
}

enum HTTPCodeEnum {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  PRECONDITION_FAILED = 412,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502
}

export { ErrorMessageEnum, HTTPCodeEnum }