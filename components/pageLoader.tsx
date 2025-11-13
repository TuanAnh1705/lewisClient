'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    // "Đóng rèm" (reset) ngay khi URL thay đổi
    // Tắt cảnh báo ESLint vì đây là hành vi mong muốn
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true); 

    // Đặt timer để "mở rèm"
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Delay 300ms của bạn

    return () => clearTimeout(timer);
    
  }, [pathname]); // Chạy lại mỗi khi pathname thay đổi

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Tấm rèm trái */}
          <motion.div
            key="curtain-left"
            className="fixed top-0 bottom-0 left-0 w-[50vw] bg-white z-100"
            // Chỉ giữ lại một thuộc tính 'initial'
            initial={{ x: 0 }} 
            exit={{ x: '-100%', transition: { duration: 1, ease: 'easeInOut' } }}
          />
          {/* Tấm rèm phải */}
          <motion.div
            key="curtain-right"
            className="fixed top-0 bottom-0 right-0 w-[50vw] bg-white z-100"
            // Chỉ giữ lại một thuộc tính 'initial'
            initial={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 1, ease: 'easeInOut' } }}
          />
        </>
      )}
    </AnimatePresence>
  );
}