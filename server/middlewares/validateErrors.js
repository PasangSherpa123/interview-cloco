import { validationResult } from 'express-validator'

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
        status:0,
        message:'Validation Error.',
        data:errors.array()
    });
  }
  return next()
}

export default validationMiddleware
