import { registerDecorator, ValidationOptions, ValidationArguments, isEmail } from 'class-validator';

export function IsNotAllowed(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotAllowed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === null || value === undefined;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not allowed to have a value.`;
        }
      }
    });
  };
}


export function IsUsernameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUsernameOrEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          const isUsername = /^[a-zA-Z0-9_.-]+$/.test(value);
          return isEmail(value) || isUsername;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Username or Email must be a valid email address or a valid username (letters, numbers, underscores, hyphens, and periods only).';
        }
      }
    });
  };
}
