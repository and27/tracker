import { ResponsivePie } from "@nivo/pie";
import Button from "./Button";
import CategoryList from "./CategoryList";
import Subtitle from "./Subtitle";
import { BudgetInsight } from "../data/mocks/insightsMock";

interface CategorySectionProps {
  budgetData: BudgetInsight[];
  handleModal: () => void;
  handleRemoveCategory: (category: string) => void;
}

const CategorySection = ({
  budgetData,
  handleModal,
  handleRemoveCategory,
}: CategorySectionProps) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <div>
          <Subtitle title="Categories & Budget" />
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Manage your categories and budget for each category here.
          </p>
        </div>
        <Button onClick={handleModal}>Add Category</Button>
      </div>
      <div className="flex">
        <CategoryList handleRemoveCategory={handleRemoveCategory} />
        <div className="w-full md:w-1/2 h-96">
          <ResponsivePie
            data={budgetData.map((entry) => ({
              id: entry.name,
              label: entry.name,
              value: entry.value,
            }))}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "set2" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsTextColor="#fff"
            arcLinkLabelsSkipAngle={10}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateY: 40,
                itemWidth: 100,
                itemHeight: 14,
                symbolSize: 14,
                symbolShape: "circle",
                itemTextColor: "#fff",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
