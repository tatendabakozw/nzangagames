import React from 'react';

type Props = {
  page: string;
  sub_text: string;
  details: string;
};

const PageHeading = (props: Props) => {
  return (
    <div className="flex flex-col space-y-2 flex-1">
      <p className="heading-text font-bold text-3xl">
        {props.page}{' '}
        <span className="text-primary-original">{props.sub_text}</span>
      </p>
      <p className="text-sm font-medium text-slate-500">{props.details}</p>
    </div>
  );
};

export default PageHeading;
