import { Label } from "../Label/Label";

type TCheckboxProps = {
	isChecked: boolean
	onClick:   () => void
	name:      string
	label:     string
}

export const Checkbox = ({
	isChecked,
	onClick,
	name,
	label,
}: TCheckboxProps) => {
	return (
		<div class={"group flex space-x-2"}>
			<input
				type="checkbox"
				checked={isChecked}
				class="hidden"
				name={name}
			/>
			<div
				class={`
					w-4
					h-4
					rounded
					border
					border-amber-400
					text-amber-400
					bg-amber-900
					group-hover:bg-amber-700
					flex
					justify-center
					items-center
					cursor-pointer
				`}
				onClick={onClick}
			>
				{isChecked ? "✓" : ""}
			</div>
			<Label
				name={name}
				onClick={onClick}
			>
				{label}
			</Label>
		</div>
	);
};