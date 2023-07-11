import { FiTrash2 } from "react-icons/fi";
import { useCallback, useState } from "react";
import { InformationModal } from "../../../components/Modal";
import { isEmpty } from "lodash";
import { BsDatabaseExclamation } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const RatingDiscuss = ({ selectedRating }) => {
  const [isShowDiscussDetailModal, setIsShowDiscussDetailModal] =
    useState(false);

  const handleClickViewDiscuss = useCallback(() => {
    setIsShowDiscussDetailModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowDiscussDetailModal(false);
  }, []);

  return (
    <div className=" min-w-[100px]">
      <a className="text-blue-500" onClick={handleClickViewDiscuss}>
        {selectedRating.discuss.length} phản hồi
      </a>

      <InformationModal
        isOpen={isShowDiscussDetailModal}
        className="w-full"
        title={
          <div className="flex space-x-4 items-center">
            <span>Chi tiết phản hồi đánh giá</span>
            <span className="font-semibold text-red-500">
              {selectedRating._id}
            </span>
          </div>
        }
        onClose={handleCloseModal}
      >
        <div
          className={twMerge(
            "w-full text-base mx-auto border-2 rounded-xl px-6 text-center h-[300px]",
            !isEmpty(selectedRating.discuss) && "overflow-y-scroll"
          )}
        >
          {isEmpty(selectedRating.discuss) ? (
            <div className="flex flex-col items-center justify-center h-full text-xl">
              No data
              <BsDatabaseExclamation size={60} className="mt-4" />
            </div>
          ) : (
            <table>
              <thead className="font-bold text-gray-900">
                <td className="w-[100px]">ID</td>
                <td className="w-[150px]">User</td>
                <td className="w-[300px]">Content</td>
              </thead>
              <tbody>
                {selectedRating.discuss?.map((item, index) => {
                  return (
                    <tr key={index} className="w-full">
                      <td className="">
                        <p className="truncate w-[100px]">{item._id}</p>
                      </td>
                      <td className="text-gray-900 w-[150px] py-4">
                        <p className="font-medium whitespace-normal break-words">
                          {item.currentUser.fullname}
                        </p>
                      </td>
                      <td className="text-gray-900 w-[300px]">
                        <p className="whitespace-normal break-words">
                          {item.content}
                        </p>
                      </td>
                      <td className="text-gray-900 ">
                        <div className="text-red-500">
                          <FiTrash2 size={16} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </InformationModal>
    </div>
  );
};

export default RatingDiscuss;
