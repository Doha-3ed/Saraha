

export const validation = (schema) => {
    return (req, res, next) => {
        const validationResult = { ...req.body, ...req.query, ...req.params };
        const result = schema.validate(validationResult, { abortEarly: false });

        if (result?.error) {
            return next(new Error("Validation error"));
        }

        next();
    };
};