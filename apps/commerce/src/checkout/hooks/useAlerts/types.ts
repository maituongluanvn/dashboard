import { type ErrorCode } from "@/checkout/lib/globalTypes";

export type AlertType = "error" | "success";

export interface IAlertErrorData {
	scope: CheckoutScope;
	code: ErrorCode;
	field: string;
}

export type CustomError =
	| Pick<AlertErrorData, "code">
	| Pick<AlertErrorData, "code" | "field">
	| { message: string };

export interface IAlert {
	message: string;
	id: string;
	type: AlertType;
}

export type CheckoutScope =
	| "paymentGatewaysInitialize"
	| "checkoutFinalize"
	| "checkoutShippingUpdate"
	| "checkoutCustomerAttach"
	| "checkoutBillingUpdate"
	| "checkoutAddPromoCode"
	| "checkoutDeliveryMethodUpdate"
	| "userAddressCreate"
	| "userAddressUpdate"
	| "userAddressDelete"
	| "checkoutPay"
	| "userRegister"
	| "requestPasswordReset"
	| "checkoutLinesUpdate"
	| "checkoutLinesDelete"
	| "checkoutEmailUpdate"
	| "resetPassword"
	| "signIn";
