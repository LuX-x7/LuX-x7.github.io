import { useEffect, useState } from "react";

export default function Avatar({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!failed || attempt >= 1) return;
    const retry = window.setTimeout(() => {
      setFailed(false);
      setAttempt(1);
    }, 1200);
    return () => window.clearTimeout(retry);
  }, [failed, attempt]);

  return <span className="avatar-frame">
    <span className="avatar-placeholder" aria-hidden="true">LX</span>
    <img
      className="profile-photo"
      src={attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=1`}
      alt="A golden retriever puppy in the snow"
      width="176"
      height="176"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      data-loaded={loaded}
      onLoad={() => { setLoaded(true); setFailed(false); }}
      onError={() => { setLoaded(false); setFailed(true); }}
    />
  </span>;
}
