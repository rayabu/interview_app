import React from 'react';
import {Error} from '@interviewApp/src/types';
import Style from '@interviewApp/src/shared/components/atom/style';

const Error = (errorArg: any) => {
  return (
    <>
      {errorArg.isError && (
        <label className="text-color">Error: {errorArg.message}</label>
      )}
      <Style>{`
        .text-color {
          color: red;
        }
      `}</Style>
    </>
  );
};

export default Error;
