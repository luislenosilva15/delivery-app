export type DeliveryFeeType = "FIXED" | "DISTANCE_BASED";

export type FixedFee = {
  isFree: boolean;
  type: "FIXED";
  fixedFee: number;
};

export type DistanceTier = {
  maxKm: number;
  price: number;
  isFree: boolean;
  estimatedTime: number;
};

export type DistanceBasedFee = {
  isFree: boolean;
  type: "DISTANCE_BASED";
  estimatedTime: number;
  tiers: DistanceTier[];
};

export type DeliveryFee = FixedFee | DistanceBasedFee;

export type FormData = {
  type: DeliveryFeeType;
  fixedFee: FixedFee;
  distanceBasedFee: DistanceBasedFee;
};
