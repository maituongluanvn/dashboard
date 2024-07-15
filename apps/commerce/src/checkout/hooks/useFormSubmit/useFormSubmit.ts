import { type CombinedError } from "urql";
import { type CheckoutUpdateStateScope } from "@/checkout/state/updateStateStore";
import { type FormDataBase, type FormHelpers } from "@/checkout/hooks/useForm";
import {
	type MutationBaseFn,
	type MutationData,
	type MutationSuccessData,
	type MutationVars,
	type ParserFunction,
	type SubmitReturnWithErrors,
} from "@/checkout/hooks/useSubmit/types";
import { type ApiErrors } from "@/checkout/hooks/useGetParsedErrors/types";
import { useSubmit, type IUseSubmitProps } from "@/checkout/hooks/useSubmit/useSubmit";

export type FormSubmitFn<TData extends FormDataBase> = (
	formData: TData,
	formHelpers: FormHelpers<TData>,
) => SubmitReturnWithErrors<TData>;

interface ICallbackProps<TData extends FormDataBase> {
	formHelpers: FormHelpers<TData>;
	formData: TData;
}

interface IUseFormSubmitProps<
	TData extends FormDataBase,
	TMutationFn extends MutationBaseFn,
	TErrorCodes extends string = string,
> {
	hideAlerts?: boolean;
	scope: CheckoutUpdateStateScope;
	onSubmit: (vars: MutationVars<TMutationFn>) => Promise<MutationData<TMutationFn>>;
	parse?: ParserFunction<TData, TMutationFn>;
	onAbort?: (props: ICallbackProps<TData>) => void;
	onSuccess?: (props: ICallbackProps<TData> & { data: MutationSuccessData<TMutationFn> }) => void;
	onFinished?: () => void;
	onError?: (
		props: ICallbackProps<TData> & {
			errors: ApiErrors<TData, TErrorCodes>;
			customErrors: any[];
			graphqlErrors: CombinedError[];
		},
	) => void;
	extractCustomErrors?: (data: MutationData<TMutationFn>) => any[];
	onStart?: (props: ICallbackProps<TData>) => void;
	shouldAbort?:
		| ((props: ICallbackProps<TData>) => Promise<boolean>)
		| ((props: ICallbackProps<TData>) => boolean);
}

const useFormSubmit = <
	TData extends FormDataBase,
	TMutationFn extends MutationBaseFn,
	TErrorCodes extends string = string,
>(
	props: IUseFormSubmitProps<TData, TMutationFn, TErrorCodes>,
): FormSubmitFn<TData> => {
	const handleSubmit: FormSubmitFn<TData> = useSubmit<TData, TMutationFn, TErrorCodes>(
		props as IUseSubmitProps<TData, TMutationFn, TErrorCodes>,
	);

	return handleSubmit;
};

export { useFormSubmit };
