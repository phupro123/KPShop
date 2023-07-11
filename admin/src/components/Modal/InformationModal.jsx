import Button from "../Button/Button";
import Modal from "./Modal";

const InformationModal = ({
  isOpen,
  title,
  children,
  className,
  closeButtonText,
  onClose,
  ...props
}) => {
  const handleClickCloseButton = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      isShowHeader
      title={title}
      isShowFooter={false}
      isFormModal
      contentContainerClassName={className}
      onClose={onClose}
      {...props}
    >
      {children}
      <div className="-mx-10 -mb-8 flex items-center justify-end space-x-4 rounded-b-lg bg-gray-50 px-6 py-5">
        <Button
          type="button"
          size="sm"
          color="light"
          className="rounded-md border-2 border-gray-200 shadow-none ring-0"
          onClick={handleClickCloseButton}
        >
          {closeButtonText ?? "Close"}
        </Button>
      </div>
    </Modal>
  );
};

export default InformationModal;
