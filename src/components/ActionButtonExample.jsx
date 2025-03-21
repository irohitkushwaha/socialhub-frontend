import React from "react";
import ActionButton from "./ActionButton";

const ActionButtonExample = () => {
  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Action Button Examples</h2>

      <div className="flex flex-col gap-4 border rounded">
        <div>
          <h3 className="text-sm text-gray-500 px-4 pt-2">Material Icons</h3>
          <ActionButton icon="person" text="View Profile" iconType="material" />
          <ActionButton icon="edit" text="Edit Profile" iconType="material" />
        </div>

        <div>
          <h3 className="text-sm text-gray-500 px-4 pt-2">Font Awesome</h3>
          <ActionButton icon="fa-user" text="View Profile" iconType="fa" />
          <ActionButton icon="fa-pencil" text="Edit Profile" iconType="fa" />
        </div>
      </div>

      {/* Note: Make sure you have included the necessary CSS/JS files for the icons */}
      <div className="mt-4 text-sm text-gray-500">
        <p>For Material Icons: Include in your HTML head</p>
        <code className="block bg-gray-100 p-2 mt-1 text-xs">
          &lt;link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"&gt;
        </code>

        <p className="mt-2">For Font Awesome: Include in your HTML head</p>
        <code className="block bg-gray-100 p-2 mt-1 text-xs">
          &lt;link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"&gt;
        </code>
      </div>
    </div>
  );
};

export default ActionButtonExample;
