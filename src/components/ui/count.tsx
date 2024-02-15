import { forwardRef } from "react";
import { FieldPath, useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../hero-creation-settings-card";

type CountProps = React.InputHTMLAttributes<HTMLInputElement> & {
	size: number;
};

export const Count = forwardRef<HTMLInputElement, CountProps>((props, ref) => {
	const name = props.name as FieldPath<z.infer<typeof formSchema>>;
	const { register, setValue, getValues } =
		useFormContext<z.infer<typeof formSchema>>();

	return (
		<div className="flex gap-1">
			<input {...props} className="hidden" {...register(name)} ref={ref} />
			{Array(props.size)
				.fill(0)
				.map((_, i) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						onClick={() =>
							setValue(name, i === +getValues(name) - 1 ? 0 : i + 1)
						}
						className={`w-7 h-7 border rounded-full flex items-center justify-center ${
							i < +getValues(name)
								? "border-primary"
								: "border-primary-foreground"
						}`}
					>
						{i + 1}
					</div>
				))}
		</div>
	);
});
Count.displayName = "Count";
