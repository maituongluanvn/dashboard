import { type ReactElement, useState } from 'react';

interface IChildrenProps {
	displayAddressList: boolean;
	displayAddressEdit: boolean;
	displayAddressCreate: boolean;
	setDisplayAddressCreate: (display: boolean) => void;
	setDisplayAddressEdit: (id?: string) => void;
	editedAddressId: string | undefined;
}

interface IUserAddressSectionProps {
	children: (props: IChildrenProps) => ReactElement;
}

export const UserAddressSectionContainer = ({ children }: IUserAddressSectionProps) => {
	const [displayAddressCreate, setDisplayAddressCreate] = useState(false);

	const [editedAddressId, setDisplayAddressEdit] = useState<string | undefined>();

	const displayAddressEdit = !!editedAddressId;

	const displayAddressList = !displayAddressEdit && !displayAddressCreate;

	const childrenProps = {
		displayAddressList,
		displayAddressEdit,
		displayAddressCreate,
		setDisplayAddressCreate,
		setDisplayAddressEdit,
		editedAddressId,
	};

	return children(childrenProps);
};
