import React from "react";
import SubscriberDetail from "./SubscriberDetail";

const SubscriberDetailExample = () => {
  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-8">Subscriber Detail Example</h2>

      <div className="max-w-xl">
        <SubscriberDetail
          name="Shradha Khapra"
          id="@shradhakhapra123"
          subscribers="4.9M"
          videos="550"
        />
      </div>

      <div className="mt-12 max-w-xl">
        <SubscriberDetail
          name="Code With Harry"
          id="@CodeWithHarry"
          subscribers="5.2M"
          videos="1.2K"
        />
      </div>
    </div>
  );
};

export default SubscriberDetailExample;
