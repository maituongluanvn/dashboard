import { type UrlObject } from 'url';
import Link from 'next/link';
import {
	type Key,
	type ReactElement,
	type JSXElementConstructor,
	type ReactNode,
	type ReactPortal,
	type PromiseLikeOfReactNode,
} from 'react';
import navLinks from '../../../../../public/menu.json';
import { NavLink } from './NavLink';
import type { IMenu } from '@/definition';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NavLinks = async ({}: { channel: string }) => {
	// const navLinks: Menu = await executeGraphQL(MenuGetBySlugDocument, {
	// 	variables: { slug: 'navbar', channel },
	// 	revalidate: 60 * 60 * 24,
	// });
	if (!navLinks) {
		console.log('🚀 ~ NavLinks ~ navLinks:', JSON.stringify(navLinks));
	}

	return (
		<>
			<NavLink href="/">Trang Chủ</NavLink>
			{(navLinks as unknown as IMenu).menu?.items?.map(
				(item: {
					category: { slug: any; name: string | JSX.Element };
					id: Key | null | undefined;
					collection: { slug: any; name: string | JSX.Element };
					page: { slug: any; title: string | JSX.Element };
					url: string | UrlObject;
					name:
						| string
						| number
						| boolean
						| ReactElement<any, string | JSXElementConstructor<any>>
						| Iterable<ReactNode>
						| ReactPortal
						| PromiseLikeOfReactNode
						| null
						| undefined;
				}) => {
					if (item.category) {
						return (
							<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
								{item.category.name}
							</NavLink>
						);
					}
					if (item.collection) {
						return (
							<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
								{item.collection.name}
							</NavLink>
						);
					}
					if (item.page) {
						return (
							<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
								{item.page.title}
							</NavLink>
						);
					}
					if (item.url) {
						return (
							<Link key={item.id} href={item.url}>
								{item.name}
							</Link>
						);
					}
					return null;
				},
			)}
		</>
	);
};
