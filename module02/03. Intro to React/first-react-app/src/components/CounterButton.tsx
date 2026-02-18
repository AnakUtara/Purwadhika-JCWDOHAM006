import style from "./CounterButton.module.css";

type Props = {
	onCountChange: (count: number) => void;
	mode: "subtract" | "add";
	count: number;
};

const CounterButton = ({ onCountChange, count, mode }: Props) => (
	<button
		// Styling dengan CSS Module
		// class-nya didefinisikan di file CounterButton.module.css sebagai selektor .counterBtn
		className={style.counterBtn}
		onClick={() => onCountChange(mode === "add" ? count + 1 : count - 1)}
	>
		count is {count}
	</button>
);

export default CounterButton;
