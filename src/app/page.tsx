import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Stock listing dashboard overview and statistics.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Access frequently used functions and shortcuts.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View recent transactions and updates.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}