import { ErrorMessageEnum, HTTPCodeEnum } from "../enum/error"

class ErrorHandle {
  private code: number
  private message: string

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }

  public get getCode(): number {
    return this.code
  }

  public get getMessage(): string {
    return this.message
  }
}

class InternalServerError extends ErrorHandle {
  constructor(message?: string) {
    super(HTTPCodeEnum.INTERNAL_SERVER_ERROR, message || ErrorMessageEnum.INTERNAL_SERVER)
  }

  logErrorMessage(erroMessage?: string): string {
    return `[${ErrorMessageEnum.INTERNAL_SERVER}] - ${erroMessage || this.getMessage}`
  }
}

class PreConditionServerError extends ErrorHandle {
  constructor(message: string) {
    super(HTTPCodeEnum.PRECONDITION_FAILED, message)
  }

  logErrorMessage(): string {
    return `[${ErrorMessageEnum.INPUT_DATA_VALIDATION}] - ${this.getMessage}`
  }
}

class ErrorUseCaseOutput {
  readonly error: ErrorHandle | null

  constructor(error: ErrorHandle | null) {
    this.error = error
  }
}

export {
  ErrorHandle,
  ErrorUseCaseOutput,
  InternalServerError,
  PreConditionServerError
}