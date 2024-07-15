/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import clsx from 'clsx';
import React, { type FC } from 'react';
import { Button } from '@/checkout/components/Button';
import { TextInput } from '@/checkout/components/TextInput';
import { useCheckoutAddPromoCodeMutation } from '@/checkout/graphql';
import { type IClasses } from '@/checkout/lib/globalTypes';
import { useFormSubmit } from '@/checkout/hooks/useFormSubmit';
import { FormProvider } from '@/checkout/hooks/useForm/FormProvider';
import { useForm } from '@/checkout/hooks/useForm';

interface IPromoCodeFormData {
	promoCode: string;
}

export const PromoCodeAdd: FC<IClasses> = ({ className }) => {
	const [, checkoutAddPromoCode] = useCheckoutAddPromoCodeMutation();

	const onSubmit = useFormSubmit<IPromoCodeFormData, typeof checkoutAddPromoCode>({
		scope: 'checkoutAddPromoCode',
		onSubmit: checkoutAddPromoCode,
		parse: ({ promoCode, languageCode, checkoutId }: any) =>
			({
				promoCode,
				checkoutId,
				languageCode,
			}) as any,
		onSuccess: ({ formHelpers: { resetForm } }: any) => resetForm(),
	});

	const form = useForm<IPromoCodeFormData>({
		onSubmit,
		initialValues: { promoCode: '' },
	});
	const {
		values: { promoCode },
	} = form;

	const showApplyButton = promoCode.length > 0;

	return (
		<FormProvider form={form}>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
			<div className={clsx('relative my-4', className)}>
				<TextInput required={false} name="promoCode" label="Add gift card or discount code" />
				{showApplyButton && (
					<Button
						className="absolute bottom-2.5 right-3"
						variant="tertiary"
						ariaLabel="apply"
						label="Apply"
						type="submit"
					/>
				)}
			</div>
		</FormProvider>
	);
};
