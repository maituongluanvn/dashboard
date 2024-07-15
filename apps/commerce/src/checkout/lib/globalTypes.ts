import { type ReactNode } from "react";
import { type TaxedMoney } from "@/checkout/graphql";

export interface IClasses {
	className?: string;
}

export interface IChildren {
	children: ReactNode | ReactNode[];
}

export type GrossMoney = Pick<TaxedMoney, "gross">;
export type GrossMoneyWithTax = Pick<TaxedMoney, "gross" | "tax">;

export interface IAriaLabel {
	ariaLabel: string;
}

export type GenericErrorCode = "invalid" | "required" | "unique";

export type ErrorCode =
	| GenericErrorCode
	| "quantityGreaterThanLimit"
	| "insufficientStock"
	| "invalidCredentials"
	| "emailInvalid"
	| PasswordErrorCode
	| CheckoutFinalizeErrorCode;

export type PasswordErrorCode =
	| "passwordTooShort"
	| "passwordTooSimilar"
	| "passwordTooCommon"
	| "passwordInvalid"
	| "passwordAtLeastCharacters";

export type CheckoutFinalizeErrorCode = "missingFields";

export interface IValidationError<TFormData> {
	type: ErrorCode;
	path: keyof TFormData;
	message: string;
}

export interface ICommonSectionProps {
	collapsed: boolean;
}

export type MightNotExist<TData> = TData | null | undefined;
