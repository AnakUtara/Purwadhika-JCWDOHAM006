import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
	title: string;
	body: string;
};

const GenericContentCard = ({ title, body }: Props) => {
	return (
		<Card>
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<Separator className="my-4" />
				<CardDescription>{body}</CardDescription>
			</CardContent>
		</Card>
	);
};

export default GenericContentCard;
