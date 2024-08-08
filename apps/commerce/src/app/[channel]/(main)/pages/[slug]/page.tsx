/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { notFound } from 'next/navigation';
// import { type Metadata } from 'next';
// import edjsHTML from 'editorjs-html';
// import xss from 'xss';

// const parser = edjsHTML();

// export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<void> => {
// const { page }: any = await executeGraphQL(PageGetBySlugDocument, {
// 	variables: { slug: params.slug },
// 	revalidate: 60,
// });
// return {
// 	title: `${page?.seoTitle || page?.title || 'Page'} · Saleor Storefront example`,
// 	description: page?.seoDescription || page?.seoTitle || page?.title,
// };
// };

export default async function Page() {
	// const { page }: any = await executeGraphQL(PageGetBySlugDocument, {
	// 	variables: { slug: params.slug },
	// 	revalidate: 60,
	// });

	// if (!page) {
	// 	notFound();
	// }

	// const { title, content } = page;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	// const contentHtml = content ? parser.parse(JSON.parse(content)) : null;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			{/* <h1 className="text-3xl font-semibold">{title}</h1>
			{contentHtml && (
				<div className="prose">
					{contentHtml.map(content => (
						<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
					))}
				</div>
			)} */}
		</div>
	);
}
