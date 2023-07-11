import { twMerge } from "tailwind-merge";

import ContentWrapperBody from "./ContentWrapperBody";
import ContentWrapperHeader from "./ContentWrapperHeader";

const ContentWrapper = ({
  title,
  className,
  actions,
  children,
  isBlank,
  isBorder,
}) => {
  return (
    <div className={twMerge("mb-8 w-full px-8", className)}>
      <ContentWrapperHeader title={title} actions={actions} />
      <ContentWrapperBody isBlank={isBlank} isBorder={isBorder}>
        {children}
      </ContentWrapperBody>
    </div>
  );
};

export default ContentWrapper;
