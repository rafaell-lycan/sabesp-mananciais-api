export class WebError extends Error {
  name: string
  status: number

  constructor(message?: string, name?: string, status?: number) {
      super(message)
      this.name = name || 'WebError'
      this.status = status || 500
  }

  toObject() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    }
  }
}

export class NotFoundError extends WebError {
  constructor(message?: string) {
      super(message, 'NotFoundError', 404)
  }
}
