/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import PropTypes from 'prop-types';
// mui imports
import { ListSubheader, styled, type Theme } from '@mui/material';

type NavGroupType = {
	navlabel?: boolean;
	subheader?: string;
};

interface IItemType {
	item: NavGroupType;
}

const NavGroup = ({ item }: IItemType) => {
	const ListSubheaderStyle: any = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
		({ theme }) => ({
			...theme.typography.overline,
			fontWeight: '700',
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(0),
			color: theme.palette.text.primary,
			lineHeight: '26px',
			padding: '3px 12px',
		}),
	);
	return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;
};

NavGroup.propTypes = {
	item: PropTypes.object,
};

export default NavGroup;
