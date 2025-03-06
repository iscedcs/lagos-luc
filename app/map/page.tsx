export const dynamic = "force-dynamic";

import PropertyMap from "@/components/property-map";
import { Sidebar } from "@/components/sidebar";

export default function MapPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <PropertyMap />
      </div>
    </div>
  );
}
