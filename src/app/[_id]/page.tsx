"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/subframe/components/IconButton";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Accordion } from "@/subframe/components/Accordion";
import { FilterChip } from "@/subframe/components/FilterChip";
import { Table } from "@/subframe/components/Table";
import { Recipe } from "../../models/models";

// const recipeData: RecipeData = {
//   id: 1,
//   image: "https://res.cloudinary.com/subframe/image/upload/v1718999371/uploads/302/g5jou2tvabjzl7exoihk.png",
//   likes: 4.9,
//   name: "Spicy Chickpea Salad",
//   description: "This recipe for 'Spicy Chickpea Salad' is a perfect balance of flavors and nutrition. Loaded with protein-rich chickpeas, fresh vegetables, and a zesty dressing, it's a delightful and healthy meal option. Ready to tantalize your taste buds in just 20 minutes!"
// };

const RecipeDetailsPage = () => {
  const { _id } = useParams();
  console.log('_id:', _id);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  useEffect(() => {
    if (_id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get<Recipe>(`http://localhost:8000/recipe/${_id}`);
          setRecipeData(response.data);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };

      fetchRecipe();
    }
  }, [_id]);

  if (!recipeData) {
    return <DefaultPageLayout><div>Loading...</div></DefaultPageLayout>
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12 overflow-auto">
        <div className="flex w-full flex-wrap items-start gap-12">
          <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch">
            <img
              className="h-112 w-full flex-none rounded-md object-cover"
              src={recipeData.image}
            />
          </div>
          <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start justify-center gap-6 self-stretch">
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Meals for Less
                  </span>
                  <SubframeCore.Icon
                    className="text-body font-body text-brand-700"
                    name="FeatherCheckCircle"
                  />
                </div>
                {/* <IconButton
                  icon="FeatherApple"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                /> */}
              </div>
              <span className="text-heading-1 font-heading-1 text-default-font">
                {recipeData.title}
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-brand-700">
                    Loved by
                  </span>
                  <IconWithBackground icon="FeatherApple" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    {recipeData.likes}
                  </span>
                  <div className="flex items-end gap-2 pb-px">
                    <span className="text-body font-body text-subtext-color">
                      People
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-caption-bold font-caption-bold text-subtext-color">
              All ingredients on sale at Food Lion
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 px-6 py-6">
                  <span className="grow shrink-0 basis-0 text-heading-2 font-heading-2 text-default-font">
                    Recipe Information
                  </span>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 border-t border-solid border-neutral-border px-6 py-6">
                <span className="text-body font-body text-default-font">
                  {recipeData.summary}
                </span>
                <div className="flex flex-wrap items-center gap-6" />
              </div>
            </Accordion>
          </div>
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 px-6 py-6">
                  <div className="flex grow shrink-0 basis-0 items-center gap-4">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Ingredients
                    </span>
                  </div>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 border-t border-solid border-neutral-border px-6 py-6">
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell>Item</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Store</Table.HeaderCell>
                    </Table.HeaderRow>
                  }
                >
                  {recipeData.usedIngredients && recipeData.usedIngredients.map((ingredient) => (
                    <Table.Row key={ingredient.id}>
                      <Table.Cell>{ingredient.name}</Table.Cell>
                      <Table.Cell>{ingredient.amount}</Table.Cell>
                      <Table.Cell><a href={'https://foodlion.com/product-search/'+ingredient.name}>Food Lion</a></Table.Cell>
                    </Table.Row>
                  ))}
                  {recipeData.missedIngredients && recipeData.missedIngredients.map((ingredient) => (
                    <Table.Row key={ingredient.id}>
                      <Table.Cell>{ingredient.name}</Table.Cell>
                      <Table.Cell>{ingredient.amount}</Table.Cell>
                      <Table.Cell><a href={'https://foodlion.com/product-search/'+ingredient.name}>Food Lion</a></Table.Cell>
                    </Table.Row>
                  ))}
                </Table>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default RecipeDetailsPage;