"use client";

import { Opportunity } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const DynamicMapDisplay = dynamic(() => import("@/components/MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center bg-gray-200">
      Loading map...
    </div>
  ),
});

async function fetchOpportunities(): Promise<Opportunity[]> {
  const res = await fetch("/api/opportunities");
  if (!res.ok) {
    throw new Error("Failed to fetch opportunities");
  }
  return res.json();
}

export default function FindOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<
    string | null
  >(null);

  useEffect(() => {
    async function loadOpportunities() {
      try {
        setIsLoading(true);
        const data = await fetchOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
    loadOpportunities();
  }, []);

  const mapMarkers: MapMarkerData[] = useMemo(() => {
    return opportunities
      .filter((op) => op.latitude != null && op.longitude != null)
      .map((op) => ({
        id: op.id,
        position: [op.latitude!, op.longitude!],
        title: op.title,
        popupContent: (
          <div>
            <h3 className="font-semibold">{op.title}</h3>
            <p className="truncate text-sm">
              {op.description.substring(0, 50)}...
            </p>
            <Link
              href={`/opportunities/${op.id}`}
              className="text-xs text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ),
      }));
  }, [opportunities]);

  const handleMarkerClick = (opportunityId: string) => {
    setSelectedOpportunityId(opportunityId);
    console.log("Marker clicked:", opportunityId);
  };

  const selectedOpportunityDetails = useMemo(() => {
    if (!selectedOpportunityId) {
      return null;
    }
    return opportunities.find((op) => op.id === selectedOpportunityId);
  }, [selectedOpportunityId, opportunities]);

  if (isLoading) {
    return <p className="p-4">Loading opportunities...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">
        Find Volunteering Opportunities
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DynamicMapDisplay
            center={[0, 0]}
            zoom={7}
            markers={mapMarkers}
            className="h-[60vh] w-full rounded-lg shadow-md"
            onMarkerClick={handleMarkerClick}
          />
        </div>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto md:col-span-1">
          {opportunities.length === 0 && !isLoading && (
            <p>No opportunities found.</p>
          )}
          {selectedOpportunityDetails && (
            <div className="rounded-lg border bg-white p-4 shadow">
              <h2 className="text-xl font-semibold">
                {selectedOpportunityDetails.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Address: {selectedOpportunityDetails.address}
              </p>
              <p className="mt-2">{selectedOpportunityDetails.description}</p>
              <Link
                href={`/opportunities/${selectedOpportunityDetails.id}`}
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                View Full Details & Apply
              </Link>
            </div>
          )}
          {!selectedOpportunityDetails && opportunities.length > 0 && (
            <p className="text-center text-gray-500">
              Click a marker on the map or an item below to see details.
            </p>
          )}
          {opportunities.map((op) => (
            <div
              key={op.id}
              className="cursor-pointer rounded-md border p-3 hover:shadow-lg"
              onClick={() => handleMarkerClick(op.id)}
            >
              <h3 className="font-semibold">{op.title}</h3>
              <p className="text-xs text-gray-500">{op.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
