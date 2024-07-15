import React from 'react';
import { useSaleorAuthContext } from '@saleor/auth-sdk/react';
import { SignInFormContainer, type ISignInFormContainerProps } from '../Contact/SignInFormContainer';
import { Button } from '@/checkout/components/Button';
import { useUser } from '@/checkout/hooks/useUser';

interface ISignedInUserProps extends Pick<ISignInFormContainerProps, 'onSectionChange'> {
	onSignOutSuccess: () => void;
}

export const SignedInUser: React.FC<ISignedInUserProps> = ({ onSectionChange, onSignOutSuccess }) => {
	const { signOut } = useSaleorAuthContext();

	const { user } = useUser();

	const handleLogout = async () => {
		signOut();
		onSignOutSuccess();
	};

	return (
		<SignInFormContainer title="Account" onSectionChange={onSectionChange}>
			<div className="flex flex-row justify-between">
				<p className="text-base font-bold">{user?.email}</p>
				<Button ariaLabel="Sign out" variant="tertiary" onClick={handleLogout} label="Sign out" />
			</div>
		</SignInFormContainer>
	);
};
