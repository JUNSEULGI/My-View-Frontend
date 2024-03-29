import React from 'react';
import PageSkeleton from '../PageSkeleton';

function LoadWrap({ content, loading }) {
  return loading ? <PageSkeleton /> : content;
}

export default LoadWrap;
