import { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  type ImageSourcePropType,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type LayoutChangeEvent,
} from "react-native";
import { Image } from "expo-image";

import { PlanDestinationCard } from "@/components/plan-destination-card";
import type { PlanDestination } from "@/constants/plan-destinations";

const ICON_FIRE = require("../assets/images/plan/fire.svg") as ImageSourcePropType;
const ICON_BOOKMARK =
  require("../assets/images/plan/bookmark.svg") as ImageSourcePropType;

interface PlanDestinationPagerProps {
  trending: PlanDestination[];
  saved: PlanDestination[];
  selectedIds: string[];
  pageIndex: number;
  onPageChange: (index: number) => void;
  onToggleDestination: (id: string) => void;
}

function PageDots({ activeIndex }: { activeIndex: number }) {
  return (
    <View className="h-6 w-[53px] flex-row items-center justify-end gap-2">
      {[0, 1].map((index) => (
        <View
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === activeIndex ? "bg-[#181c1d]" : "bg-[#d1d5db]"
          }`}
        />
      ))}
    </View>
  );
}

function DestinationPage({
  icon,
  iconWidth,
  iconHeight,
  label,
  pageIndex,
  destinations,
  selectedIds,
  onToggleDestination,
}: {
  icon: ImageSourcePropType;
  iconWidth: number;
  iconHeight: number;
  label: string;
  pageIndex: number;
  destinations: PlanDestination[];
  selectedIds: string[];
  onToggleDestination: (id: string) => void;
}) {
  return (
    <View className="w-full gap-6">
      <View className="w-full flex-row items-center justify-between pt-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconHeight }}
            contentFit="contain"
          />
          <Text className="text-sm font-poppins-semibold uppercase tracking-[1.4px] leading-5 text-[#444932]">
            {label}
          </Text>
        </View>
        <PageDots activeIndex={pageIndex} />
      </View>

      <View className="w-full gap-4">
        {destinations.map((destination) => (
          <PlanDestinationCard
            key={destination.id}
            destination={destination}
            selected={selectedIds.includes(destination.id)}
            onPress={() => onToggleDestination(destination.id)}
          />
        ))}
        {destinations.length === 0 ? (
          <Text className="py-8 text-center text-base font-poppins text-subtitle">
            No destinations match
          </Text>
        ) : null}
      </View>
    </View>
  );
}

/**
 * Horizontal paging between Trending and Saved destination lists.
 */
export function PlanDestinationPager({
  trending,
  saved,
  selectedIds,
  pageIndex,
  onPageChange,
  onToggleDestination,
}: PlanDestinationPagerProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [pageWidth, setPageWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    if (width > 0 && width !== pageWidth) {
      setPageWidth(width);
      if (pageIndex > 0) {
        scrollRef.current?.scrollTo({ x: width * pageIndex, animated: false });
      }
    }
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (pageWidth <= 0) {
      return;
    }
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    if (nextIndex !== pageIndex) {
      onPageChange(nextIndex);
    }
  };

  return (
    <View className="w-full" onLayout={handleLayout}>
      {pageWidth > 0 ? (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumEnd}
          decelerationRate="fast"
        >
          <View style={{ width: pageWidth }} className="px-0">
            <DestinationPage
              icon={ICON_FIRE}
              iconWidth={20}
              iconHeight={18}
              label="TRENDING"
              pageIndex={0}
              destinations={trending}
              selectedIds={selectedIds}
              onToggleDestination={onToggleDestination}
            />
          </View>
          <View style={{ width: pageWidth }}>
            <DestinationPage
              icon={ICON_BOOKMARK}
              iconWidth={15}
              iconHeight={20}
              label="SAVED"
              pageIndex={1}
              destinations={saved}
              selectedIds={selectedIds}
              onToggleDestination={onToggleDestination}
            />
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}
