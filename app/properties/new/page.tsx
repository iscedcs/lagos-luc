import { AddPropertyForm } from "@/components/add-property-form";

export default function NewPropertyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <AddPropertyForm />
    </div>
  );
}
