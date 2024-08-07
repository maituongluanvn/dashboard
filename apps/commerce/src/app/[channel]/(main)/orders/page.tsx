/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LoginForm } from '@/ui/components/LoginForm';
import { OrderListItem } from '@/ui/components/OrderListItem';

export default async function OrderPage() {
	// const { me: user }: any = await executeGraphQL(CurrentUserOrderListDocument, {
	// 	cache: 'no-cache',
	// 	variables: undefined,
	// });
	let user: any;

	if (!user) {
		return <LoginForm />;
	}

	const orders = user.orders?.edges || [];

	return (
		<div className="mx-auto max-w-7xl p-8">
			<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
				{user.firstName ? user.firstName : user.email}&rsquo;s orders
			</h1>

			{orders.length === 0 ? (
				<div className="mt-8">
					<div className="rounded border border-neutral-100 bg-white p-4">
						<div className="flex items-center">No orders found</div>
					</div>
				</div>
			) : (
				<ul className="mt-8 space-y-6">
					{orders.map(({ node: order }: any) => {
						return <OrderListItem order={order} key={order.id} />;
					})}
				</ul>
			)}
		</div>
	);
}
