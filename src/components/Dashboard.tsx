"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Dashboard() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <div className="text-5xl">
      <p>Dashboard Content</p>
      <Map />
    </div>
  );
}
