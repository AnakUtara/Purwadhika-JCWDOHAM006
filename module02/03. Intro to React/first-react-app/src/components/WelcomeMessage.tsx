type Props = {
	name: string;
	message: string;
};

const WelcomeMessage = ({ name, message }: Props) => (
	<div>
		<h1 className="small-heading">Welcome {name}!</h1>
		<p>{message}</p>
	</div>
);

export default WelcomeMessage;
