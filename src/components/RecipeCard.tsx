import { ListingCard } from "@/subframe/components/ListingCard";
import { Recipe } from "../models/models";
import Link from "next/link";

export default function RecipeCard({recipeData}: { recipeData: Recipe }) {
    return (
    <Link
      href={'/'+recipeData._id}
    >
        <ListingCard
            image={recipeData.image}
            title={recipeData.title}
            rating={recipeData.likes}
        />
    </Link>
    );
}