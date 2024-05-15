/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { SelectItemProps } from "@utils/types";

type Props = {
  subCategory: SelectItemProps;
  setSelectedSubCategory: any;
  selectedSubCategory?: SelectItemProps;
  onClick?: any;
};

const SelectitemComponent = ({
  subCategory,
  setSelectedSubCategory,
  selectedSubCategory,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => {
        setSelectedSubCategory(subCategory);
        onClick;
      }}
      className={`${
        selectedSubCategory?._id === subCategory?._id
          ? "border-primary-original bg-primary-super_light text-primary-original "
          : "border-primary-super_light  "
      }flex flex-row items-center space-x-4 p-2 rounded-xl border-2 cursor-pointer font-medium text-sm bg-white`}
    >
      <div
        className={`${
          selectedSubCategory?._id === subCategory?._id
            ? "border-primary-original "
            : "border-zinc-200 "
        } h-4 w-4  rounded-full border-2 `}
      >
        {selectedSubCategory?._id === subCategory?._id && (
          <CheckCircleIcon className="text-primary-original" />
        )}
      </div>
      <p>{subCategory.name}</p>
    </div>
  );
};

export default SelectitemComponent;
