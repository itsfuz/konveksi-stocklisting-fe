import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SetoranPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Setoran</h2>
      <Card>
        <CardHeader>
          <CardTitle>Deposit Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Track and manage all deposits and submissions.</p>
        </CardContent>
      </Card>
    </div>
  );
}