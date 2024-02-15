import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Count } from "./ui/count";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const formSchema = z.object({
	name: z.string().min(1, { message: "Le nom de personnage est requis" }), // Add refine logic to check if name already exist in local storage
	profession: z.string(),
	health: z.number(),
	morale: z.number(),
	adjectives: z.array(
		z.object({
			value: z.string(),
		}),
	),
	gear: z.array(
		z.object({
			value: z.string(),
		}),
	),
	drives: z.array(
		z.object({
			value: z.string(),
		}),
	),
});

export function HeroCreationSettingsCard() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			profession: "",
			health: 0,
			morale: 0,
			adjectives: [
				{ value: "" },
				{ value: "" },
				{ value: "" },
				{ value: "" },
				{ value: "" },
			],
			gear: [
				{ value: "" },
				{ value: "" },
				{ value: "" },
				{ value: "" },
				{ value: "" },
			],
			drives: [{ value: "" }, { value: "" }, { value: "" }],
		},
	});

	const { fields: adjectiveFields } = useFieldArray({
		control: form.control,
		name: "adjectives",
	});

	const { fields: driveFields } = useFieldArray({
		control: form.control,
		name: "drives",
	});

	const { fields: gearFields } = useFieldArray({
		control: form.control,
		name: "gear",
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-wrap p-4 gap-4"
			>
				<div className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom</FormLabel>
								<FormControl>
									<Input placeholder="Kamoulox" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="profession"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Profession/Origine</FormLabel>
								<FormControl>
									<Input placeholder="Guerrier" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="border p-4 space-y-4 rounded-md">
						<Label>Adjectifs</Label>
						<div className="space-y-2">
							{adjectiveFields.map((field, index) => (
								<FormField
									control={form.control}
									key={field.id}
									name={`adjectives.${index}.value`}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder="Lunatique" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="border p-4 space-y-4 rounded-md">
						<Label>Qu'est ce qu'il y a de mieux dans la vie ?</Label>
						<div className="space-y-2">
							{driveFields.map((field, index) => (
								<FormField
									control={form.control}
									key={field.id}
									name={`drives.${index}.value`}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className="w-[540px]"
													placeholder="Écraser ses ennemis, les voir mourir devant soi et entendre les lamentations de leurs femmes"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
					</div>
					<FormField
						control={form.control}
						name="health"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Santé</FormLabel>
								<FormControl>
									<Count size={18} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="morale"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Moral</FormLabel>
								<FormControl>
									<Count size={18} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="border p-4 space-y-4 rounded-md">
					<Label>Équipement</Label>
					<div className="space-y-2">
						{gearFields.map((field, index) => (
							<FormField
								control={form.control}
								key={field.id}
								name={`gear.${index}.value`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-[800px]"
												placeholder="Une liste de mes ennemis vaincus"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>
				<Button type="submit" className="w-full">
					Créer
				</Button>
			</form>
		</Form>
	);
}
