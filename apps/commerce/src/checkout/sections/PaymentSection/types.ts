import { type StripeGatewayId } from "./StripeElements/types";
import { type PaymentGatewayConfig } from "@/checkout/graphql";
import {
	type AdyenGatewayId,
	type IAdyenGatewayInitializePayload,
} from "@/checkout/sections/PaymentSection/AdyenDropIn/types";

export type PaymentGatewayId = AdyenGatewayId | StripeGatewayId;

export type ParsedAdyenGateway = IParsedPaymentGateway<AdyenGatewayId, IAdyenGatewayInitializePayload>;
export type ParsedStripeGateway = IParsedPaymentGateway<StripeGatewayId, {}>;

export type ParsedPaymentGateways = ReadonlyArray<ParsedAdyenGateway | ParsedStripeGateway>;

export interface IParsedPaymentGateway<ID extends string, TData extends Record<string, any>>
	extends Omit<PaymentGatewayConfig, "data" | "id"> {
	data: TData;
	id: ID;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
