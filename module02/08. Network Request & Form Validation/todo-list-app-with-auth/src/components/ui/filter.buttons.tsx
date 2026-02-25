import type { TFilter } from "@/model/filter.type";
import LinkButton from "./link.button";

type Props = {
	onChangeFilter: (filter: TFilter) => void;
};

const FilterButtons = ({ onChangeFilter }: Props) => (
	<div className={`flex w-full md:w-32 lg:w-40 justify-between `}>
		<LinkButton text="All" onClick={() => onChangeFilter("all")} />
		<LinkButton text="Active" onClick={() => onChangeFilter("active")} />
		<LinkButton text="Completed" onClick={() => onChangeFilter("completed")} />
	</div>
);

export default FilterButtons;
