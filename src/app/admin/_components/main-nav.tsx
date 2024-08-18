import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { getSectionRoutes } from '@/components/constants';
import LinkItem from './link-item';

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const routeHomeSection = getSectionRoutes('home');
	const routeGeneralSection = getSectionRoutes('general');
	const routeSettingsSection = getSectionRoutes('settings');
	return (
		<aside
			className={cn(
				' fixed md:top-[4.8rem] shadow border-r top-0 bottom-0 ',
				className
			)}>
			<nav className="flex flex-col px-4 pt-8 flex-1 min-h-[600px]">
				<div className=" flex flex-col flex-1">
					<div className="flex flex-col gap-2 flex-1">
						{routeHomeSection.map((route, index) => (
							<LinkItem href={route.path} key={index}>
								<route.icon className="h-5 w-5 mr-2 text-[#0da5e9]" />
								{route.name}
							</LinkItem>
						))}
						{routeGeneralSection.map((route, index) => (
							<LinkItem href={route.path} key={index}>
								<route.icon className="h-5 w-5 mr-2 text-[#0da5e9]" />
								{route.name}
							</LinkItem>
						))}
					</div>

					<Separator className="mt-4" />
					<div className="flex py-6">
						<div className=" flex flex-1 items-end w-full">
							{routeSettingsSection.map((route, index) => (
								<LinkItem href={route.path} key={index}>
									<route.icon className="h-5 w-5 mr-2 text-[#0da5e9]" />
									{route.name}
								</LinkItem>
							))}
						</div>
					</div>
				</div>
			</nav>
		</aside>
	);
}
