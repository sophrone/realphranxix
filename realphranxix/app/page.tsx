import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Hello! I am REALPHRANXIX!</h1>
      <Image 
        src="/image1.jpg" 
        alt="Artist Profile" 
        width={500}  
        height={500} 
        priority    
      />
      <p>Discover my music, my journey, and my message.</p>
    </div>
  );
}