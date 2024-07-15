import React from 'react';
import { usePathname } from 'next/navigation';
import { Box, List } from '@mui/material';
import Menuitems from './MenuItems';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = ({ toggleMobileSidebar }: any) => {
	const pathname = usePathname();
	const pathDirect = pathname;

	return (
		<Box sx={{ px: 3 }}>
			<List sx={{ pt: 0 }} className="sidebarNav" component="div">
				{Menuitems.map(item => {
					// {/********SubHeader**********/}
					if (item.subheader) {
						return <NavGroup item={item} key={item.subheader} />;

						// {/********If Sub Menu**********/}
						/* eslint no-else-return: "off" */
					} else {
						return (
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							<NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />
						);
					}
				})}
			</List>
		</Box>
	);
};
export default SidebarItems;
