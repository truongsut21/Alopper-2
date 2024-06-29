import React from "react";
const RoomsChecked = ({ roomId }) => {
  return (
    <>
      <div className="flex items-center">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16.5C12.4183 16.5 16 12.9183 16 8.5C16 4.08172 12.4183 0.5 8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5ZM11.7071 7.20711C12.0976 6.81658 12.0976 6.18342 11.7071 5.79289C11.3166 5.40237 10.6834 5.40237 10.2929 5.79289L7 9.08579L5.70711 7.79289C5.31658 7.40237 4.68342 7.40237 4.29289 7.79289C3.90237 8.18342 3.90237 8.81658 4.29289 9.20711L6.29289 11.2071C6.68342 11.5976 7.31658 11.5976 7.70711 11.2071L11.7071 7.20711Z"
            fill="#059669"
          />
        </svg>

        <p className="mx-2 my-2 text-sm leading-5 font-normal text-gray-500">
          {roomId}
        </p>
      </div>
    </>
  );
};

export const ListRoomSelected = ({ listRoomsChecked }) => {
  return (
    <>
      {listRoomsChecked.map((item, index) => {
        return <RoomsChecked key={index} roomId={item.roomCode} />;
      })}
    </>
  );
};
