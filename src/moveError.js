class MoveError extends Error {
  constructor(msg) {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MoveError);
    }

    this.name = 'MoveError';
    this.msg = msg;
    this.date = new Date();
  }
}

module.exports = MoveError;
