/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { object, string } from "yup";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { type AccountErrorCode } from "@/checkout/graphql";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { useGetParsedErrors } from "@/checkout/hooks/useGetParsedErrors";
import { useForm } from "@/checkout/hooks/useForm";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";

interface ISignInFormData {
	email: string;
	password: string;
}

interface ISignInFormProps {
	onSuccess: () => void;
	// shared between sign in form and guest user form
	initialEmail: string;
}

export const useSignInForm = ({ onSuccess, initialEmail }: ISignInFormProps) => {
	const { getParsedApiError } = useGetParsedErrors<ISignInFormData, AccountErrorCode>();
	const { errorMessages } = useErrorMessages();
	const { signIn } = useSaleorAuthContext();

	const validationSchema = object({
		password: string().required(errorMessages.required),
		email: string().email(errorMessages.emailInvalid).required(errorMessages.required),
	});

	const defaultFormData: ISignInFormData = {
		email: initialEmail,
		password: "",
	};

	const onSubmit = useFormSubmit<ISignInFormData, typeof signIn, AccountErrorCode>({
		onSubmit: signIn,
		scope: "signIn",
		onSuccess,
		onError: ({ errors, formHelpers: { setErrors } }: any) => {
			const parsedErrors = errors.reduce((result: any, error: { code: any; field: any; }) => {
				const { code, field } = error;
				const parsedError = getParsedApiError(error);
 
				if (code === "INVALID_CREDENTIALS" && field === "email") {
					//  api will attribute invalid credentials error to
					// email but we'd rather highlight both fields
					return { ...result, email: parsedError.message, password: "" };
				}

				if (code === "INACTIVE") {
					// we don't really want to show anything here
					return result;
				}

				return { ...result, [field]: parsedError.message };
			}, {});

			setErrors(parsedErrors);
		},
	});

	const form = useForm<ISignInFormData>({
		initialValues: defaultFormData,
		onSubmit,
		validationSchema,
	});

	return form;
};
