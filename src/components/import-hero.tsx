import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { json } from "@/lib/jsonType";
import { useHeroesActions } from "@/lib/store";

const stringToJSONSchema = z
	.string()
	.transform((str, ctx): z.infer<ReturnType<typeof json>> => {
		try {
			return JSON.parse(str);
		} catch (e) {
			ctx.addIssue({ code: "custom", message: "Invalid JSON" });
			return z.NEVER;
		}
	});

const FormSchema = z.object({
	hero: stringToJSONSchema.pipe(
		z.object({
			name: z.string(),
			profession: z.string(),
			adjectives: z.array(z.object({ value: z.string() })),
			drives: z.array(z.object({ value: z.string() })),
			gear: z.array(z.object({ value: z.string() })),
			health: z.object({
				max: z.number(),
				current: z.number(),
				armor: z.number(),
			}),
			morale: z.object({
				max: z.number(),
				current: z.number(),
				grit: z.number(),
			}),
			generalAbilities: z.array(
				z.object({ name: z.string(), max: z.number(), current: z.number() }),
			),
			socialAbilities: z.array(
				z.object({ name: z.string(), max: z.number(), current: z.number() }),
			),
			personalAbilities: z.array(
				z.object({ name: z.string(), max: z.number(), current: z.number() }),
			),
			allies: z.array(
				z.object({ max: z.number(), current: z.number(), name: z.string() }),
			),
			enemies: z.array(
				z.object({ max: z.number(), current: z.number(), name: z.string() }),
			),
		}),
	),
});

export function ImportHero() {
	const { addHero } = useHeroesActions();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		addHero(data.hero);
		toast({
			title: "Le hero à été importer correctement",
		});
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name="hero"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Pour utiliser l'application veuillez importer un personnage
								</FormLabel>
								<FormControl>
									{/* @ts-ignore */}
									<Textarea
										placeholder="Colle le JSON de ton personnage pour l'importer"
										className="resize-none h-44"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Importer</Button>
				</form>
			</Form>
		</div>
	);
}
