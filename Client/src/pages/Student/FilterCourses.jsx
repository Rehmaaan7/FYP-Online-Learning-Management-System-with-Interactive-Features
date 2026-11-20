import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  {
    id: "networking",
    label: "networking",
  },
  {
    id: "development",
    label: "development",
  },
  {
    id: "categor 03",
    label: "categor 03",
  },
  {
    id: "categor 04",
    label: "categor 04",
  },
  {
    id: "categor 05",
    label: "categor 05",
  },
  {
    id: "categor 06",
    label: "categor 06",
  },
  {
    id: "categor 07",
    label: "categor 07",
  },
];
const FilterCourses = ({ FilterCoursesHandler }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState("");

  const selectedCategoriesHandler = (categoryId) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      FilterCoursesHandler(newCategories, sort);
      return newCategories;
    });
  };
  const sortByPriceHandler = (selectedSort) => {
    setSort(selectedSort);
    FilterCoursesHandler(selectedCategories, selectedSort);
  };

  return (
    <div className="w-full lg:w-[280px] shrink-0 border rounded-lg p-4 bg-background">
      <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-semibold text-lg">Filter Options</h1>

          <Select onValueChange={sortByPriceHandler}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by Price</SelectLabel>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <h1 className="font-medium mb-3">Category</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {categories.map((category, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <Checkbox
                  className="border-2 border-gray-400 data-[state=checked]:border-primary"
                  id={category.id}
                  onCheckedChange={() => selectedCategoriesHandler(category.id)}
                />

                <Label className="text-sm font-medium leading-none cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className='w-full md:w-[20%]'>
  //     <div className='flex items-center justify-between'>
  //       <h1 className='font-semibold text-lg md:text-1xl'>
  //         filter options
  //       </h1>
  //       <Select onValueChange={sortByPriceHandler}>
  //         <SelectTrigger>
  //           <SelectValue placeholder={"sort by"}></SelectValue>

  //         </SelectTrigger>
  //         <SelectContent>
  //          <SelectGroup>
  //           <SelectLabel> sort by price</SelectLabel>
  //            <SelectItem value="low">low to high</SelectItem>
  //           <SelectItem value="high"> high to low</SelectItem>
  //          </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //       </div>
  //       <Separator className="my-4" />
  //       <div>
  //         <h1>Cateory</h1>
  //         {
  //           categories.map((category,index)=>
  //             <div className='flex items-center space-x-2 my-2' key={index}>
  //               <Checkbox id={category.id} onCheckedChange={()=>selectedCategoriesHandler(category.id)} />
  //                 <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
  //                   {category.label}
  //                 </Label>
  //             </div>

  //           )
  //         }

  //       </div>

  //   </div>
  // )
};

export default FilterCourses;
