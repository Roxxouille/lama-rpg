import { Ability, useHero, useHeroesActions } from "@/lib/store";
import { ImportHero } from "./import-hero";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function HeroScreen() {
	const hero = useHero();
	const { updateMorale, updateHealth } = useHeroesActions();

	if (!hero) {
		return <ImportHero />;
	}

	return (
		<div>
			<div className="text-foreground text-2xl font-semibold leading-none tracking-tight p-4">
				{hero.name}
			</div>
			<div className="text-foreground text-2xl font-semibold leading-none tracking-tight p-4">
				{hero.profession}
			</div>
			<div className="space-y-1 p-4">
				<Label className="">Adjectifs</Label>
				<div className="border p-2 rounded-md">
					{hero.adjectives.map(({ value }) => (
						<div key={value}>{value}</div>
					))}
				</div>
			</div>
			<div className="space-y-1 p-4">
				<Label className="">Ce qu'il y a de mieux dans la vie</Label>
				<div className="border p-2 rounded-md">
					{hero.drives.map(({ value }) => (
						<div key={value}>{value}</div>
					))}
				</div>
			</div>
			<div className="space-y-1 p-4">
				<Label className="">Équipement</Label>
				<div className="border p-2 rounded-md">
					{hero.gear.map(({ value }) => (
						<div key={value}>{value}</div>
					))}
				</div>
			</div>
			<div className="flex">
				<AbilityHandler
					type="generalAbilities"
					abilities={hero.generalAbilities}
				/>
				<AbilityHandler
					type="socialAbilities"
					abilities={hero.socialAbilities}
				/>
				<AbilityHandler
					type="personalAbilities"
					abilities={hero.personalAbilities}
				/>
				<div className="space-y-1 p-4">
					<Label className="">Santé</Label>
					<div className="flex gap-2">
						<div>
							{hero.health.current}/{hero.health.max}
						</div>
						<Button
							className="max-w-6 h-6"
							onClick={() => updateHealth("decrement")}
						>
							-
						</Button>
						<Button
							className="max-w-6 h-6"
							variant="secondary"
							onClick={() => updateHealth("increment")}
						>
							+
						</Button>
					</div>
					<div>Armure: {hero.health.armor}</div>
				</div>
				<div className="space-y-1 p-4">
					<Label className="">Moral</Label>
					<div className="flex gap-2">
						<div>
							{hero.morale.current}/{hero.morale.max}
						</div>
						<Button
							className="max-w-6 h-6"
							onClick={() => updateMorale("decrement")}
						>
							-
						</Button>
						<Button
							className="max-w-6 h-6"
							variant="secondary"
							onClick={() => updateMorale("increment")}
						>
							+
						</Button>
					</div>
					<div>Cran: {hero.morale.grit}</div>
				</div>
			</div>
		</div>
	);
}

interface AbilityHandlerProps {
	abilities: Array<Ability>;
	type: "generalAbilities" | "socialAbilities" | "personalAbilities";
}

function AbilityHandler({ abilities, type }: AbilityHandlerProps) {
	const label =
		type === "generalAbilities"
			? "Compétences génerales"
			: type === "socialAbilities"
			  ? "Compétences sociales"
			  : "Compétence pro/origine";

	const { updateSkillValue } = useHeroesActions();

	return (
		<div className="space-y-1 p-4">
			<Label className="">{label}</Label>
			<div className="border p-2 rounded-md space-y-2">
				{abilities.map((value) => (
					<div className="flex gap-2" key={value.name}>
						{value.name}: {value.current}/{value.max}
						<Button
							className="max-w-6 h-6"
							onClick={() =>
								updateSkillValue({
									type,
									skill: value.name,
									operation: "decrement",
								})
							}
						>
							-
						</Button>
						<Button
							className="max-w-6 h-6"
							variant="secondary"
							onClick={() =>
								updateSkillValue({
									type,
									skill: value.name,
									operation: "increment",
								})
							}
						>
							+
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
