/* eslint-disable @typescript-eslint/no-unsafe-call */
import Link from 'next/link';
import Image from "next/legacy/image";
// import {
// 	type ReactElement,
// 	type JSXElementConstructor,
// 	type ReactNode,
// 	type ReactPortal,
// 	type Key,
// } from 'react';
import { LinkWithChannel } from '../atoms/LinkWithChannel';
import FooterJSON from './footer.json';
import { ChannelSelect } from './ChannelSelect';

export async function Footer({}: { channel: string }) {
	const currentYear = new Date().getFullYear();
	const footerLinks: any = FooterJSON;
	let channels: any;

	return (
		<footer className="border-neutral-300 bg-neutral-50">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-3 gap-8 py-16">
					{footerLinks.menu?.items?.map((item: any) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map(
										(child: {
											category: { slug: any; name: any };
											id: string | null | undefined;
											collection: { slug: any; name: any };
											page: { slug: any; title: any };
											url: any;
											name: any;
										}) => {
											if (child.category) {
												return (
													<li key={child.id} className="text-sm">
														<LinkWithChannel href={`/categories/${child.category.slug}`}>
															{child.category.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.collection) {
												return (
													<li key={child.id} className="text-sm">
														<LinkWithChannel href={`/collections/${child.collection.slug}`}>
															{child.collection.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.page) {
												return (
													<li key={child.id} className="text-sm">
														<LinkWithChannel href={`/pages/${child.page.slug}`}>
															{child.page.title}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.url) {
												return (
													<li key={child.id} className="text-sm">
														<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
													</li>
												);
											}
											return null;
										},
									)}
								</ul>
							</div>
						);
					})}
				</div>

				{(channels as any)?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">Change currency:</span>{' '}
							<ChannelSelect channels={(channels as any).channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-neutral-200 py-10 sm:flex-row">
					<p className="text-sm text-neutral-500">Copyright &copy; {currentYear} Luan Mai Inc.</p>
					<p className="flex gap-1 text-sm text-neutral-500">
						Powered by{' '}
						<Link target={'_blank'} href={'https://github.com/maituongluanvn'}>
							Luan Mai
						</Link>{' '}
						<Link href={'https://github.com/maituongluanvn'} target={'_blank'} className={'opacity-30'}>
							<Image alt="Saleor github repository" height={20} width={20} src={'/github-mark.svg'} />
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
