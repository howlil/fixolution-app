export default function YoutubeEmbed({ videoId }) {
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="overflow-hidden " style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 h-full w-full"
            ></iframe>
        </div>
    );
}
