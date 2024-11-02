'use client';
import React, { useEffect, useRef } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation';

type Props = {
  onUpload: (e: string) => any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const uploaderRef = useRef<any>(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };

    const currentUploader = uploaderRef.current;
    if (currentUploader) {
      currentUploader.addEventListener('file-upload-success', handleUpload);
    }

    return () => {
      if (currentUploader) {
        currentUploader.removeEventListener('file-upload-success', handleUpload);
      }
    };
  }, [onUpload, router]);

  return (
    <div>
      <FileUploaderRegular
        ref={uploaderRef}
        sourceList="local, url, camera"
        classNameUploader="uc-dark"
        pubkey="e8a1ae37c26b62313900"
      />
    </div>
  );
};

export default UploadCareButton;