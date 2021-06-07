import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotExist = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/ip/apple_tv/0007/james');
  }, [])

  return (
    <div className="not-found">
      <h1>Ooops...</h1>
      <h2>This Page Doesn't Exist</h2>
      <p>Redirect to the Apple TV Product Page Very Soon</p>
    </div>
  );
}
 
export default NotExist;