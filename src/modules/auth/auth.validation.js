import joi from "joi";

export const signup = {
  body: joi
    .object({
      userName: joi.string().min(3).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),

      phone: joi.string(),
    })
    .required(),
};

export const login = {
  body: joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
};
