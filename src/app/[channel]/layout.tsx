import { type ReactNode } from 'react';
import { executeGraphQL } from '@/lib/graphql';
import { ChannelsListDocument } from '@/gql/graphql';

export const generateStaticParams = async () => {
	// the `channels` query is protected
	// you can either hardcode the channels or use an app token to fetch the channel list here

	if (process.env.SALEOR_APP_TOKEN) {
		const channels = await executeGraphQL(ChannelsListDocument, {
			withAuth: false, // disable cookie-based auth for this call
			headers: {
				// and use app token instead
				Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
			},
			variables: undefined,
		});
		return (
			(channels as any).channels
				?.filter((channel: any) => channel.isActive)
				.map((channel: any) => ({ channel: channel.slug })) ?? []
		);
	} else {
		return [{ channel: 'default-channel' }];
	}
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
	return children;
}
