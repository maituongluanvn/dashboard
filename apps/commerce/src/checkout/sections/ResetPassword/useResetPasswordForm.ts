/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { object, string } from "yup";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { useForm } from "@/checkout/hooks/useForm";
import { useFormSubmit } from "@/checkout/hooks/useFormSubmit";
import { clearQueryParams, getQueryParams } from "@/checkout/lib/utils/url";

interface IResetPasswordFormData {
	password: string;
}

export const useResetPasswordForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const { errorMessages } = useErrorMessages();
	const { resetPassword } = useSaleorAuthContext();

	const validationSchema = object({
		password: string().required(errorMessages.required),
	});

	const onSubmit = useFormSubmit<IResetPasswordFormData, typeof resetPassword>({
		onSubmit: resetPassword,
		scope: "resetPassword",
		parse: ({ password }: any) => {
			const { passwordResetEmail, passwordResetToken }: any = getQueryParams();
			return { password, email: passwordResetEmail || "", token: passwordResetToken || "" };
		},
		onSuccess: () => {
			clearQueryParams("passwordResetToken", "passwordResetEmail");
			onSuccess();
		},
	});

	const initialValues: IResetPasswordFormData = { password: "" };

	const form = useForm<IResetPasswordFormData>({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return form;
};
