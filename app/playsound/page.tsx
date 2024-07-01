import { useEffect } from "react";

const PlaySoundPage = () => {
  useEffect(() => {
    const audio = new Audio("/sounds/beep.mp3");
    audio.play();
  }, []);

  return (
    <div>
      <h1>Playing Sound...</h1>
    </div>
  );
};

export default PlaySoundPage;
