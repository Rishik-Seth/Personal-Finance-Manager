import Joi from 'joi';

export const validateCreateTransaction = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().min(1).required().messages({
      'number.base': 'Amount should be a number',
      'number.min': 'Amount should be greater than or equal to 1',
      'any.required': 'Amount is required',
    }),
    categoryId: Joi.string().required().messages({
      'string.base': 'Category ID should be a string',
      'any.required': 'Category ID is required',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

export const validateUpdateTransaction = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().min(1).messages({
      'number.base': 'Amount should be a number',
      'number.min': 'Amount should be greater than or equal to 1',
    }),
    categoryId: Joi.string().messages({
      'string.base': 'Category ID should be a string',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
