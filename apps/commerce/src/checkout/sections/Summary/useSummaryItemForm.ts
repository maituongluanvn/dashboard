import {
	type CheckoutLineFragment,
	useCheckoutLineDeleteMutation,
	useCheckoutLinesUpdateMutation,
} from "@/checkout/graphql";
import { useForm } from "@/checkout/hooks/useForm";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";
import { useSubmit } from "@/checkout/hooks/useSubmit/useSubmit";

export interface ISummaryItemFormProps {
	line: CheckoutLineFragment;
}

export interface ISummaryLineFormData {
	quantity: string;
	languageCode:string;
	checkoutId: string;
}

export const useSummaryItemForm = ({ line }: ISummaryItemFormProps) => {
	const [, updateLines] = useCheckoutLinesUpdateMutation();
	const [, deleteLines] = useCheckoutLineDeleteMutation();

	const onSubmit = useFormSubmit<ISummaryLineFormData, typeof updateLines>({
		scope: "checkoutLinesUpdate",
		onSubmit: updateLines,
		parse: ({ quantity, languageCode, checkoutId }: ISummaryLineFormData) => ({
			languageCode,
			checkoutId,
			lines: [
				{
					quantity: Number(quantity),
					variantId: line.variant.id,
				},
			],
		}),
		onError: ({ formData: { quantity }, formHelpers: { setFieldValue } }: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
			return setFieldValue("quantity", quantity);
		},
	});

	const form = useForm<ISummaryLineFormData>({
		onSubmit,
		initialValues: {
			quantity: line.quantity.toString(),
			languageCode: "",
			checkoutId: ""
		},
	});

	const onLineDelete = useSubmit<{}, typeof deleteLines>({
		scope: "checkoutLinesDelete",
		onSubmit: deleteLines,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
		parse: ({ languageCode, checkoutId }: any) => ({ languageCode, checkoutId, lineId: line.id } as any),
	});

	return { form, onLineDelete };
};
