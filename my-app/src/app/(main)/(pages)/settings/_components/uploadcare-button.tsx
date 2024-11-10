// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
// import '@uploadcare/react-uploader/core.css';
// import { useRouter } from 'next/navigation';

// type Props = {
//   onUpload: (e: string) => Promise<void>;
// };

// const UploadCareButton = ({ onUpload }: Props) => {
//   const router = useRouter();
//   const uploaderRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleUpload = async (e: CustomEvent<{ cdnUrl: string }>) => {
//       await onUpload(e.detail.cdnUrl);
//       router.refresh();
//     };

//     const currentUploader = uploaderRef.current;
//     if (currentUploader) {
//       currentUploader.addEventListener('file-upload-success', (e) => handleUpload(e as CustomEvent<{ cdnUrl: string }>));
//     }

//     return () => {
//       if (currentUploader) {
//         currentUploader.removeEventListener('file-upload-success', handleUpload as unknown as EventListener);
//       }
//     };
//   }, [onUpload, router]);

//   return (
//     <div>
//     <div ref={uploaderRef}>
//       <FileUploaderRegular
//         sourceList="local, url, camera, dropbox, gdrive, onedrive"
//         classNameUploader="uc-dark"
//         pubkey="e8a1ae37c26b62313900"
//       />
//     </div>
//     </div>
//   );
// };

// export default UploadCareButton;