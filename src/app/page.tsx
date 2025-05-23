import MapDisplay from "@/components/MapDisplay";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto flex h-[75vh]">
        <MapDisplay center={[32.109333, 34.855499]} />
      </div>
    </div>
  );
}
