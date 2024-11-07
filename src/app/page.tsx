"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { DefaultPageLayout } from "../subframe/layouts/DefaultPageLayout";
import { Recipe } from "../models/models";

function RecipesHome() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>("http://localhost:8000/all-recipes");
        setRecipes(response.data);
        console.log(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <DefaultPageLayout>
    <div className="flex h-full w-full flex-col items-start gap-2">
      <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 bg-default-background py-12 mobile:flex-col mobile:gap-3 mobile:rounded-md mobile:border mobile:border-solid mobile:border-neutral-border mobile:bg-default-background mobile:px-6 mobile:py-12 mobile:shadow-sm">
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-wrap items-start gap-6 grid grid-cols-3 mobile:grid mobile:grid-cols-1">
            {recipes.length === 0 ? (
            <div>Loading...</div>
            ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipeData={recipe} />
            ))
            )}
          </div>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
        <div className="flex w-full flex-col items-center justify-center gap-4 px-12 py-12">
          <span className="text-heading-3 font-heading-3 text-default-font">
            Eat better, spend less.
          </span>
          {/* <Button
            variant="brand-secondary"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Contact Us
          </Button> */}
        </div>
      </div>
    </div>
    </DefaultPageLayout>
  );
}

export default RecipesHome;