import { useEffect, useState } from 'react';
import { useItemActive } from '@/hooks/useItemActive';
import { AnimatePresence, motion } from 'framer-motion';
import { BEERS } from '@/constants/beers';

const Page = () => {
  const { isActive, itemActive } = useItemActive();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoaded ? (
          <motion.div
            className='absolute top-0 left-0 z-10 p-6 w-36'
            layoutId='logo'>
            <img src='svg/logo.svg' alt='logo' />
          </motion.div>
        ) : (
          <motion.div
            className='absolute z-10 p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80'
            layoutId='logo'>
            <img src='svg/logo.svg' alt='logo' />
          </motion.div>
        )}
      </AnimatePresence>
      <div className='absolute z-10 flex flex-col h-screen p-6 pointer-events-none'>
        <div className='flex items-center flex-grow w-full ml-12'>
          <motion.div
            className='w-1/2 p-8 text-black bg-white opacity-25 rounded-3xl bg-opacity-40 backdrop-blur-md'
            animate={{ y: isActive ? 0 : 40, opacity: isActive ? 1 : 0 }}
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 130,
              damping: 10,
              mass: 1,
            }}>
            <AnimatePresence>
              {isActive && (
                <>
                  <motion.h1
                    className='text-6xl uppercase pointer-events-auto font-display'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {BEERS[itemActive?.name]?.title || ''}
                  </motion.h1>
                  <motion.p
                    className='max-w-2xl mt-4 pointer-events-auto font-body'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {BEERS[itemActive?.name]?.text || ''}
                  </motion.p>
                </>
              )}
            </AnimatePresence>
            <button className='px-6 py-2 mt-4 text-lg bg-teal-400 rounded-full pointer-events-auto font-display hover:bg-teal-200 transition-colors'>
              Buy now
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

Page.canvas = () => ({});

export default Page;