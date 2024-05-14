/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode} from 'react';
import Navbar from '@components/navigation/Navbar';
// import { useRouter } from 'next/router';
// import { Store } from '@context/Store';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
};

const DashboardLayout = (props: Props) => {
//   const { state } = useContext(Store);
//   const { userInfo } = state;
//   const router = useRouter();

//   useEffect(() => {
//     if (userInfo?.role !== 'bus_admin') {
//       router.push('/');
//     }
//   }, [userInfo, router]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-col">
        <div className="nav">
          <Navbar />
        </div>
        {props.children}
      </div>
    </>
  );
};

export default DashboardLayout;