import LinkButton from "./link.button";

const FilterButtons = () => (
	<div className={`flex w-full md:w-32 lg:w-40 justify-between `}>
		<LinkButton text="All" onClick={() => {}} />
		<LinkButton text="Active" onClick={() => {}} />
		<LinkButton text="Completed" onClick={() => {}} />
	</div>
);

export default FilterButtons;
