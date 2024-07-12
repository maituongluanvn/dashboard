/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { NavLink } from './NavLink';
import { executeGraphQL } from '@/lib/graphql';
import { MenuGetBySlugDocument } from '@/gql/graphql';

export const NavLinks = async ({ channel }: { channel: string }) => {
	const navLinks: any = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: 'navbar', channel },
		revalidate: 60 * 60 * 24,
	});

	return (
		<>
			<NavLink href="/products">All</NavLink>
			{navLinks.menu?.items?.map(
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
