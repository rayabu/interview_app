import React from 'react';
import {Error} from '@interviewApp/src/types';

const Error = (errorArg: any) => {
  return (
    <>
      {errorArg.isError && (
        <label className="text-color">Error: {errorArg.message}</label>
      )}
      <style jsx>{`
        .text-color {
          color: red;
        }
      `}</style>
    </>
  );
};

export default Error;
