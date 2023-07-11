const ContentWrapperHeader = ({ title, actions }) => {
  return (
    <div className="flex min-h-[88px] items-center justify-between py-6">
      <div className="text-lg font-semibold">{title}</div>
      {actions && <div className="flex justify-end">{actions}</div>}
    </div>
  );
};

export default ContentWrapperHeader;
