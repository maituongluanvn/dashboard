import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { getRepository } from 'typeorm';

export function UniqueFieldValidator(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/explicit-function-return-type
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'uniqueFieldValidator',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: {
				async validate(value: any, args: ValidationArguments) {
					const repository = getRepository(args.object.constructor as any);
					const count = await repository.count({ where: { [propertyName]: value } });
					return count === 0;
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must be unique!`;
				},
			},
		});
	};
}
