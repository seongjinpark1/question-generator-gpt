'use client';
const BackgroundVideo = () => {
  return (
    <video
      key={3}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      autoPlay
      muted
      loop
    >
      <source src="/videos/bg1.mp4" />
    </video>
  );
};

export default BackgroundVideo;
