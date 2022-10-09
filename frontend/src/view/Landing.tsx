import React from "react";
import { useQuery } from "react-query";
import { init, items } from "../api";
import Button from "../components/Button";
import CommentsBlade from "../components/CommentsBlade";
import LineChart from "../components/LineChart";

const Landing = () => {
  const [currentItemId, setCurrentItemId] = React.useState<
    number | undefined
  >();
  const { data } = useQuery(["items"], items);

  const handleItemClick = (itemId?: number) => setCurrentItemId(itemId);
  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg m-4">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Tools</h3>
        </div>
        <div className="border-t border-gray-300 py-6 px-6">
          <Button onClick={init} disabled={!!data?.length}>
            Initialize database
          </Button>
        </div>
      </div>
      {data && (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg m-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Some cool title
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Such description
            </p>
          </div>
          <div className="border-t border-gray-300 py-6 pr-4">
            <LineChart
              onItemClick={handleItemClick}
              data={
                data?.map((d) => ({
                  ...d,
                  date: new Date(d.date).getTime(),
                })) ?? []
              }
            />
          </div>
        </div>
      )}
      <CommentsBlade itemId={currentItemId} />
    </>
  );
};

export default Landing;
