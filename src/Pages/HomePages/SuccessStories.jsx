import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SUCCESS_STORIES } from "../../data/successStories";

function StoryMedia({ story }) {
  if (!story.mediaUrl) {
    return (
      <div className="success-story-media-placeholder" aria-label="Media coming soon">
        <span>Media coming soon</span>
      </div>
    );
  }

  if (story.mediaType === "video") {
    return (
      <video
        className="success-story-media"
        src={story.mediaUrl}
        poster={story.posterUrl || undefined}
        controls
        playsInline
        preload="metadata"
        aria-label={story.alt || story.title}
      />
    );
  }

  if (story.mediaType === "embed") {
    return (
      <iframe
        className="success-story-media success-story-embed"
        src={story.mediaUrl}
        title={story.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <img
      className="success-story-media"
      src={story.mediaUrl}
      alt={story.alt || story.title}
      loading="lazy"
    />
  );
}

export default function SuccessStories() {
  return (
    <>
      <Helmet>
        <title>Success Stories | Langma International</title>
        <meta
          name="description"
          content="Explore images and videos from people and organisations sharing their experience with Langma International's language and global support."
        />
      </Helmet>

      <main className="success-stories-page">
        <style>{`
          .success-stories-page {
            min-height: 100vh;
            overflow-x: hidden;
            background: #f4feff;
            color: #0e2a46;
            font-family: Poppins, Arial, sans-serif;
          }
          .success-stories-hero {
            position: relative;
            overflow: hidden;
            padding: clamp(58px, 8vw, 86px) 24px clamp(46px, 7vw, 64px);
            background: #fff;
            color: #1b2b28;
          }
          .success-stories-container {
            box-sizing: border-box;
            width: min(1160px, 100%);
            margin: 0 auto;
          }
          .success-stories-eyebrow {
            margin: 0 0 14px;
            color: #2fc7a1;
            font-size: clamp(.68rem, 1.4vw, .78rem);
            font-weight: 700;
            letter-spacing: .16em;
            line-height: 1.4;
            text-transform: uppercase;
          }
          .success-stories-hero h1 {
            max-width: 760px;
            margin: 0;
            color: #296166;
            font-family: "Roboto", sans-serif;
            font-size: clamp(28px, 4vw, 44px);
            font-weight: 600;
            letter-spacing: -0.01em;
            line-height: 1.08;
            overflow-wrap: anywhere;
          }
          .success-stories-hero p {
            max-width: 650px;
            margin: 18px 0 0;
            color: #4c5c58;
            font-size: clamp(.9rem, 1.6vw, 1rem);
            line-height: 1.65;
          }
          .success-stories-toolbar {
            display: flex;
            justify-content: flex-end;
            padding: 28px 24px 0;
          }
          .success-stories-count {
            color: #296166;
            font-size: .9rem;
          }
          .success-stories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
            gap: clamp(16px, 2.2vw, 24px);
            align-items: stretch;
            padding: 30px 24px 80px;
          }
          .success-stories-empty {
            grid-column: 1 / -1;
            padding: 56px 24px;
            border: 1px dashed #b7dcd3;
            border-radius: 20px;
            background: #fff;
            color: #527477;
            text-align: center;
          }
          .success-story-card {
            min-width: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #d5ebe6;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 14px 34px rgba(14, 42, 70, .08);
          }
          .success-story-media-wrap {
            width: 100%;
            height: clamp(220px, 26vw, 350px);
            overflow: hidden;
            background: #e7f3f0;
          }
          .success-story-media,
          .success-story-media-placeholder {
            display: block;
            width: 100%;
            height: 100%;
            border: 0;
            object-fit: cover;
          }
          .success-story-media-placeholder {
            display: grid;
            place-items: center;
            color: #397477;
            font-size: .9rem;
            font-weight: 600;
          }
          .success-story-content {
            flex: 1;
            min-width: 0;
            padding: clamp(17px, 2vw, 22px);
          }
          .success-story-content h2 {
            margin: 0;
            color: #0e2a46;
            font-size: clamp(1.05rem, 1.8vw, 1.25rem);
            line-height: 1.3;
            overflow-wrap: anywhere;
          }
          .success-story-person {
            margin: 9px 0 0;
            color: #6a8083;
            font-size: .88rem;
          }
          .success-story-summary {
            margin: 16px 0 0;
            color: #4c6568;
            font-size: clamp(.9rem, 1.5vw, 1rem);
            line-height: 1.65;
          }
          .success-story-quote {
            margin: 18px 0 0;
            padding-left: 14px;
            border-left: 3px solid #2fc7a1;
            color: #296166;
            font-style: italic;
            line-height: 1.6;
          }
          .success-stories-footer {
            padding: 0 24px 70px;
            text-align: center;
          }
          .success-stories-home-link {
            display: inline-flex;
            max-width: 100%;
            border-radius: 999px;
            padding: 12px 20px;
            background: #296166;
            color: #fff;
            text-align: center;
            text-decoration: none;
            font-weight: 700;
          }
          @media (max-width: 1024px) {
            .success-stories-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 680px) {
            .success-stories-hero { padding: 54px 20px 44px; }
            .success-stories-toolbar { justify-content: flex-start; }
            .success-stories-toolbar,
            .success-stories-grid,
            .success-stories-footer { padding-left: 20px; padding-right: 20px; }
            .success-stories-grid { grid-template-columns: 1fr; padding-top: 22px; padding-bottom: 56px; }
            .success-story-media-wrap { height: clamp(210px, 70vw, 330px); }
          }
          @media (max-width: 390px) {
            .success-stories-hero { padding-right: 16px; padding-left: 16px; }
            .success-stories-toolbar,
            .success-stories-grid,
            .success-stories-footer { padding-left: 16px; padding-right: 16px; }
            .success-story-card { border-radius: 16px; }
          }
        `}</style>

        <section className="success-stories-hero">
          <div className="success-stories-container">
            <p className="success-stories-eyebrow">Langma International · Real experiences</p>
            <h1 className="langma-display-title">What People Say About Langma</h1>
            <p>
              Explore images and videos from people and organisations who have experienced
              Langma International's language learning, career preparation, and global support.
            </p>
          </div>
        </section>

        <div className="success-stories-container">
          <div className="success-stories-toolbar">
            <span className="success-stories-count">
              {SUCCESS_STORIES.length} {SUCCESS_STORIES.length === 1 ? "story" : "stories"}
            </span>
          </div>

          <section className="success-stories-grid" aria-live="polite">
            {SUCCESS_STORIES.length === 0 ? (
              <div className="success-stories-empty">
                Approved testimonials will appear here soon.
              </div>
            ) : (
              SUCCESS_STORIES.map((story) => (
                <article className="success-story-card" key={story.id}>
                  <div className="success-story-media-wrap">
                    <StoryMedia story={story} />
                  </div>
                  <div className="success-story-content">
                    <h2>{story.title}</h2>
                  {(story.name || story.role) && (
                    <p className="success-story-person">
                      {[story.name, story.role].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {story.summary && <p className="success-story-summary">{story.summary}</p>}
                  {story.quote && <blockquote className="success-story-quote">“{story.quote}”</blockquote>}
                </div>
              </article>
            ))
            )}
          </section>

          <div className="success-stories-footer">
            <Link className="success-stories-home-link" to="/">
              Back to Langma International
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
