import { type ICheckoutUpdateState } from "@/checkout/state/updateStateStore/updateStateStore";

export const areAnyRequestsInProgress = ({ updateState, loadingCheckout }: ICheckoutUpdateState) =>
	Object.values(updateState).some((status) => status === "loading") || loadingCheckout;

export const hasFinishedApiChangesWithNoError = ({ updateState, ...rest }: ICheckoutUpdateState) =>
	!areAnyRequestsInProgress({ updateState, ...rest }) &&
	Object.values(updateState).every((status) => status === "success");
