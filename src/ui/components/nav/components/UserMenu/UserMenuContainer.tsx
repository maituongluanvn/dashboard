import { UserIcon } from 'lucide-react';
import { UserMenu } from './UserMenu';
// import { CurrentUserDocument } from '@/gql/graphql';
// import { executeGraphQL } from '@/lib/graphql';
import { LinkWithChannel } from '@/ui/atoms/LinkWithChannel';

export async function UserMenuContainer() {
	// const { me: user } = await executeGraphQL(CurrentUserDocument, {
	// 	cache: 'no-cache',
	// 	variables: undefined,
	// });
	// console.log('🚀 ~ UserMenuContainer ~ user:', user);
	const user = null;
	if (user) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return <UserMenu user={user} />;
	} else {
		return (
			<LinkWithChannel href="/login" className="h-6 w-6 flex-shrink-0">
				<UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
				<span className="sr-only">Log in</span>
			</LinkWithChannel>
		);
	}
}
