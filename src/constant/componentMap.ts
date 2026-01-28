import React from "react";
import TickIcon from "@/assets/icons/TickIcon";
import LineIcon from "@/assets/icons/LineIcon";
const FilterCheckBox = React.lazy(
  () => import("@/components/Flight/Filters/FilterCheckBox/FilterCheckBox"),
);
const MobStopFilter = React.lazy(
  () => import("@/components/Flight/Filters/MobFilter/MobStopFilter"),
);
const FilterCheckBoxSelect = React.lazy(
  () =>
    import(
      "@/components/Flight/Filters/FilterCheckBoxSelect/FilterCheckBoxSelect"
    ),
);
const AirlineFilter = React.lazy(
  () => import("@/components/Flight/Filters/Airline/AirlineFilter"),
);
const DeprArrTime = React.lazy(
  () => import("@/components/Flight/Filters/DeprArrTime/DeprArrTime"),
);
const FareTypeFilter = React.lazy(
  () => import("@/components/Flight/Filters/FareType/FareTypeFilter"),
);
const LayoverFilter = React.lazy(
  () => import("@/components/Flight/Filters/Layover/LayoverFilter"),
);
const PopularFilter = React.lazy(
  () => import("@/components/Flight/Filters/PopularFilter/PopularFilter"),
);
const PriceRangeFilter = React.lazy(
  () => import("@/components/Flight/Filters/PriceRange/PriceRangeFilter"),
);
const StopFilter = React.lazy(
  () => import("@/components/Flight/Filters/Stop/StopFilter"),
);

export const filterComponentsMap: Record<string, any> = {
  popular: PopularFilter,
  airline: AirlineFilter,
  stops: StopFilter,
  fareType: FareTypeFilter,
  priceRange: PriceRangeFilter,
  departureTime: DeprArrTime,
  arrivalTime: DeprArrTime,
  layoverCity: LayoverFilter,
  checkbox: FilterCheckBoxSelect,
  single_checkbox: FilterCheckBox,
};
export const mobFilterComponentsMap: Record<string, any> = {
  popular: PopularFilter,
  airline: AirlineFilter,
  stops: MobStopFilter,
  fareType: FareTypeFilter,
  priceRange: PriceRangeFilter,
  departureTime: DeprArrTime,
  arrivalTime: DeprArrTime,
  layoverCity: LayoverFilter,
  checkbox: FilterCheckBoxSelect,
  single_checkbox: FilterCheckBox,
};
export const FARES_ICONS: Record<string, any> = {
  tick: TickIcon,
  dash: LineIcon,
};
