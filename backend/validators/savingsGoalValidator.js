import Joi from 'joi';

export const validateCreateSavingsGoal = (req, res, next) => {
  const schema = Joi.object({
    goalName: Joi.string().min(3).required().messages({
      'string.base': 'Goal name should be a string',
      'string.min': 'Goal name should have at least 3 characters',
      'any.required': 'Goal name is required',
    }),
    goalAmount: Joi.number().min(1).required().messages({
      'number.base': 'Goal amount should be a number',
      'number.min': 'Goal amount should be greater than or equal to 1',
      'any.required': 'Goal amount is required',
    }),
    targetDate: Joi.date().required().messages({
      'date.base': 'Target date should be a valid date',
      'any.required': 'Target date is required',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

export const validateUpdateSavingsGoal = (req, res, next) => {
  const schema = Joi.object({
    goalName: Joi.string().min(3).messages({
      'string.base': 'Goal name should be a string',
      'string.min': 'Goal name should have at least 3 characters',
    }),
    goalAmount: Joi.number().min(1).messages({
      'number.base': 'Goal amount should be a number',
      'number.min': 'Goal amount should be greater than or equal to 1',
    }),
    targetDate: Joi.date().messages({
      'date.base': 'Target date should be a valid date',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
