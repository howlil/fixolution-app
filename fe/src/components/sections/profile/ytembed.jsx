export default function YoutubeEmbed({ videoId }) {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div className=" overflow-hidden ">
        <iframe
          width="560"
          height="315"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  }
  