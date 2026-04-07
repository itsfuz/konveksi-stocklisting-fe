import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Purchase Orders</h2>
      <Card>
        <CardHeader>
          <CardTitle>PO Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">View and manage all purchase orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}