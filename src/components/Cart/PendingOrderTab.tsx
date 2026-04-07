import { useAllUserOrderQuery } from '@/api/orderService';
import { Card, CardContent } from '../ui/card';
import HistoryCard from './HistoryCard';
import { IUserOrderHistory } from '@/@types/types';
import Loading from '../shared/Loading';

export default function PendingOrderTab() {
  const status = "pending";
  const { data, error, isLoading, isFetching } = useAllUserOrderQuery(status, {});
  return (
    <div className="w-full mx-auto py-4">
      <Card className="bg-gray-900/40 border-gray-800/50">
        <CardContent>
          {(isLoading && isFetching) ? (
            <Loading text="Fetching pending orders..." />
          ) : error ? (
            <p className="text-center text-red-400 py-4">Failed to load orders.</p>
          ) : data?.data?.length > 0 ? (
            <div className="space-y-4">
              {data.data.map((purchase: IUserOrderHistory, index: number) => (
                <HistoryCard purchase={purchase} key={index} showActions />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No pending orders.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
