"use client";

export default function SocialSection() {
  return (
    <section className="social-section">
      <div className="social-container">
        <h2 className="social-heading">Мы в соцсетях</h2>
        <div className="social-cards">
          <a
            href="https://vk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card vk"
          >
            <div className="social-icon"><i className="fab fa-vk" /></div>
            <div className="social-name">ВКонтакте</div>
            <div className="social-desc">Новости и анонсы</div>
            <div className="glow-border" />
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card tg"
          >
            <div className="social-icon"><i className="fab fa-telegram-plane" /></div>
            <div className="social-name">Telegram</div>
            <div className="social-desc">Оперативные обновления</div>
            <div className="glow-border" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card ig"
          >
            <div className="social-icon"><i className="fab fa-instagram" /></div>
            <div className="social-name">Instagram</div>
            <div className="social-desc">Визуальный контент</div>
            <div className="glow-border" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

        .social-section {
          width: 100%;
          padding: 60px 20px;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .social-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .social-heading {
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 50px;
          font-family: 'Segoe UI', sans-serif;
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
          letter-spacing: 1px;
        }

        .social-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }

        .social-card {
          position: relative;
          flex: 1 1 200px;
          max-width: 240px;
          padding: 30px 20px 25px;
          border-radius: 24px;
          text-decoration: none;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }

        .social-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .glow-border {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 26px;
          background: conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b);
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: rotateGlow 4s linear infinite;
        }

        .social-card:hover .glow-border {
          opacity: 1;
        }

        @keyframes rotateGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .social-icon i {
          font-size: 52px;
          display: inline-block;
          transition: transform 0.3s;
          animation: swing 2.5s ease-in-out infinite;
        }

        @keyframes swing {
          0% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
          100% { transform: rotate(-6deg); }
        }

        .tg .social-icon i {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .ig .social-icon i {
          animation: spinSlow 8s linear infinite;
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .social-card:hover .social-icon i {
          animation-play-state: paused;
        }

        .vk { background: rgba(76, 117, 163, 0.25); border-color: rgba(76, 117, 163, 0.5); }
        .tg { background: rgba(38, 165, 228, 0.25); border-color: rgba(38, 165, 228, 0.5); }
        .ig { background: rgba(214, 36, 159, 0.25); border-color: rgba(214, 36, 159, 0.5); }

        .social-name {
          font-size: 20px;
          font-weight: 700;
          margin: 12px 0 6px;
          font-family: 'Segoe UI', sans-serif;
        }

        .social-desc {
          font-size: 14px;
          opacity: 0.8;
        }

        @media (max-width: 700px) {
          .social-card {
            flex: 1 1 100%;
            max-width: 280px;
          }
          .social-section {
            padding: 40px 15px;
          }
          .social-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}