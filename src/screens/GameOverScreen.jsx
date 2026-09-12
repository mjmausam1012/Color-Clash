import React, { useState, useRef } from 'react';
import bgImg from '../assets/bg-img.png';
import logoBlackVertical from '../assets/logo_black_vertical.png';
import { calculateAccuracy } from '../utils/gameUtils';

export default function GameOverScreen({
  playerName = 'Champion',
  isVictory = false,
  stageNumber = 1,
  difficulty = 'EASY',
  targetQuestions = 5,
  score = 0,
  correctAnswers = 0,
  wrongAnswers = 0,
  bestStreak = 0,
  isNewBestScore = false,
  bestScore = 0,
  nextStageAvailable = false,
  onPlayNextStage,
  onPlayAgain,
  onBackToLevels,
  onBackToHome
}) {
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef(null);
  const accuracy = calculateAccuracy(correctAnswers, wrongAnswers);

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Download Certificate as PNG using canvas
  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 800);

    // Subtle radial gradient background
    const bgGrad = ctx.createRadialGradient(600, 400, 100, 600, 400, 600);
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Ornate double border
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 1104, 704);

    // Corner decorative lines
    const drawCornerOrnament = (x, y, flipX, flipY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX, flipY);
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(50, 10);
      ctx.moveTo(10, 10);
      ctx.lineTo(10, 50);
      ctx.stroke();
      ctx.restore();
    };
    drawCornerOrnament(55, 55, 1, 1);
    drawCornerOrnament(1145, 55, -1, 1);
    drawCornerOrnament(55, 745, 1, -1);
    drawCornerOrnament(1145, 745, -1, -1);

    // Header Branding
    ctx.fillStyle = '#1e293b';
    ctx.font = '900 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('NEBULOID GAMES • COLOR CLASH', 600, 120);

    // Main Certificate Title
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 44px sans-serif';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 600, 190);

    // Gold accent line
    ctx.fillStyle = '#eab308';
    ctx.fillRect(450, 215, 300, 4);

    // Subtitle
    ctx.fillStyle = '#475569';
    ctx.font = '600 18px sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', 600, 270);

    // Player Name
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '900 54px sans-serif';
    ctx.fillText(playerName || 'CHAMPION', 600, 360);

    // Decorative underline for player name
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 385);
    ctx.lineTo(850, 385);
    ctx.stroke();

    // Achievement text
    ctx.fillStyle = '#334155';
    ctx.font = '500 20px sans-serif';
    ctx.letterSpacing = '0.5px';
    ctx.fillText(
      `For outstanding performance in conquering Color Clash - ${difficulty} Mode (Stage 0${stageNumber})`,
      600,
      440
    );

    // Stats Grid Box
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(250, 480, 700, 110, 16);
    ctx.fill();
    ctx.stroke();

    // Stat 1: Score
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('FINAL SCORE', 360, 520);
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 28px sans-serif';
    ctx.fillText(`${score} PTS`, 360, 560);

    // Stat 2: Accuracy
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('ACCURACY', 600, 520);
    ctx.fillStyle = '#16a34a';
    ctx.font = '900 28px sans-serif';
    ctx.fillText(`${accuracy}%`, 600, 560);

    // Stat 3: Best Streak
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('MAX STREAK', 840, 520);
    ctx.fillStyle = '#eab308';
    ctx.font = '900 28px sans-serif';
    ctx.fillText(`${bestStreak}x`, 840, 560);

    // Issue Date & Seal
    ctx.fillStyle = '#475569';
    ctx.font = '600 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Date: ${issueDate}`, 120, 680);

    // Verified Seal Right
    ctx.textAlign = 'right';
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '900 16px sans-serif';
    ctx.fillText('OFFICIAL VERIFIED MERIT', 1080, 670);
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('★ NEBULOID TECH CERTIFIED ★', 1080, 695);

    // Trigger download
    const link = document.createElement('a');
    link.download = `ColorClash_Certificate_${(playerName || 'Player').replace(/\s+/g, '_')}_Stage${stageNumber}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 select-none overflow-x-hidden font-sans"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Darkening tint */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* ================= TOP BRANDING: NEBULOID LOGO AT TOP ================= */}
      <div className="relative w-full max-w-5xl flex items-center justify-center z-20 pt-1 pb-2">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg transition-transform hover:scale-105">
          <img
            src={logoBlackVertical}
            alt="Nebuloid"
            className="h-7 sm:h-8 w-auto object-contain pointer-events-none"
          />
          <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <span className="text-[10px] font-black tracking-widest text-black uppercase">NEBULOID</span>
            <span className="text-[8px] font-bold tracking-wider text-neutral-600 uppercase">GAMES</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN RESULT CARD ================= */}
      <div className="relative w-full max-w-xl bg-white/85 backdrop-blur-xl sm:backdrop-blur-2xl rounded-3xl sm:rounded-[36px] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-5 py-6 sm:px-10 sm:py-8 flex flex-col items-center text-center z-10 animate-fade-in my-auto">
        
        {/* Status Badge */}
        {isVictory ? (
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-black tracking-widest uppercase mb-3 shadow-lg animate-bounce">
            <span>🏆</span>
            <span>STAGE 0{stageNumber} CLEARED!</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black tracking-widest uppercase mb-3 shadow-md">
            <span>✕</span>
            <span>STAGE 0{stageNumber} FAILED</span>
          </div>
        )}

        {/* Player Name Greeting */}
        <div className="text-xs font-extrabold tracking-wider uppercase text-neutral-500 mb-1">
          Player: <span className="text-black font-black">{playerName}</span>
        </div>

        {/* Score Callout */}
        <h2 className="text-5xl sm:text-6xl font-black text-black tracking-tight mb-1">
          {score}
          <span className="text-base sm:text-lg text-neutral-500 font-extrabold ml-1.5">PTS</span>
        </h2>

        {/* Message */}
        <p className="text-xs text-neutral-600 font-bold uppercase tracking-wider mb-5">
          {isVictory ? (
            nextStageAvailable ? (
              <span className="text-emerald-700 font-black">
                🎉 Next stage unlocked: Stage 0{stageNumber + 1}!
              </span>
            ) : (
              <span className="text-blue-900 font-black">
                👑 All stages cleared in {difficulty} level!
              </span>
            )
          ) : (
            <span>Target was {targetQuestions} questions • Try again!</span>
          )}
        </p>

        {/* Stats Grid */}
        <div className="w-full bg-neutral-50/90 border-2 border-black/80 rounded-2xl p-4 sm:p-5 mb-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {/* Correct Answers */}
            <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-neutral-300 shadow-xs">
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-wider">
                Correct
              </span>
              <span className="text-xl font-black text-emerald-600 mt-0.5">
                ✓ {correctAnswers}
              </span>
            </div>

            {/* Mistakes */}
            <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-neutral-300 shadow-xs">
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-wider">
                Mistakes
              </span>
              <span className="text-xl font-black text-rose-600 mt-0.5">
                ✕ {wrongAnswers}
              </span>
            </div>

            {/* Best Streak */}
            <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-neutral-300 shadow-xs">
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-wider">
                Best Streak
              </span>
              <span className="text-xl font-black text-amber-600 mt-0.5">
                🔥 {bestStreak}
              </span>
            </div>

            {/* Accuracy */}
            <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-neutral-300 shadow-xs">
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-wider">
                Accuracy
              </span>
              <span className="text-xl font-black text-black mt-0.5">
                {accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATE CLAIM BUTTON (ON VICTORY) ================= */}
        {isVictory && (
          <button
            onClick={() => setShowCertificate(true)}
            className="w-full relative flex items-center justify-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-150 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-2 border-amber-300 mb-3"
          >
            <span>🏆 VIEW & DOWNLOAD CERTIFICATE</span>
          </button>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Next Stage Button */}
          {isVictory && nextStageAvailable && (
            <button
              onClick={onPlayNextStage}
              className="w-full relative flex items-center justify-center py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 shadow-md hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <span>NEXT STAGE (S-{stageNumber + 1}) ▶</span>
            </button>
          )}

          {/* Replay Button */}
          <button
            onClick={onPlayAgain}
            className={`w-full relative flex items-center justify-center py-3 px-6 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 cursor-pointer ${
              !isVictory || !nextStageAvailable
                ? 'bg-black hover:bg-neutral-800 text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-black border-2 border-black/80'
            }`}
          >
            <span>🔄 REPLAY STAGE</span>
          </button>

          {/* Level Select Button */}
          <button
            onClick={onBackToLevels}
            className="w-full relative flex items-center justify-center py-3 px-6 rounded-xl bg-white hover:bg-neutral-100 text-black font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 border-2 border-black/80 shadow-xs cursor-pointer"
          >
            <span>☰ LEVEL SELECT</span>
          </button>

          {/* Home Button */}
          <button
            onClick={onBackToHome}
            className="w-full relative flex items-center justify-center py-2 px-6 rounded-xl text-neutral-600 hover:text-black font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            <span>Main Menu</span>
          </button>
        </div>
      </div>

      {/* ================= CERTIFICATE MODAL ================= */}
      {showCertificate && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto"
          onClick={() => setShowCertificate(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center border-4 border-amber-400 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            ref={certificateRef}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-black font-black text-sm flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Certificate Frame Content */}
            <div className="border-2 border-blue-900/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
              
              {/* Header Crest */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🎖️</span>
                <span className="text-[11px] font-black tracking-[0.3em] uppercase text-neutral-600">
                  NEBULOID GAMES OFFICIAL MERIT
                </span>
                <span className="text-2xl">🎖️</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-4xl font-black tracking-wide text-blue-950 uppercase mt-1 mb-2">
                Certificate of Achievement
              </h3>

              <div className="w-32 h-1 bg-amber-400 mx-auto rounded-full mb-5" />

              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                This is proudly presented to
              </p>

              {/* Player Name */}
              <h2 className="text-3xl sm:text-5xl font-black text-blue-900 tracking-wider capitalize my-3 drop-shadow-xs">
                {playerName || 'Champion'}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-700 font-medium max-w-md mx-auto leading-relaxed my-4">
                For demonstrating exceptional cognitive focus, reaction speed, and accuracy in conquering{' '}
                <b className="text-blue-950 font-bold">Color Clash {difficulty}</b> Stage 0{stageNumber}.
              </p>

              {/* Performance Stats Pill Grid */}
              <div className="grid grid-cols-3 gap-2 my-5 max-w-sm mx-auto">
                <div className="p-2.5 rounded-xl bg-white border border-neutral-300 shadow-xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500 block">Score</span>
                  <span className="text-base sm:text-lg font-black text-black">{score} <span className="text-[10px]">PTS</span></span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-neutral-300 shadow-xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500 block">Accuracy</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600">{accuracy}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-neutral-300 shadow-xs">
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500 block">Streak</span>
                  <span className="text-base sm:text-lg font-black text-amber-600">{bestStreak}x</span>
                </div>
              </div>

              {/* Date and Seal */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-6 text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">Issue Date</span>
                  <span className="text-xs font-bold text-neutral-700">{issueDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">Official Seal</span>
                  <span className="text-xs font-black text-blue-950">✓ VERIFIED BY NEBULOID</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Download & Print */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleDownloadCertificate}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📥</span>
                <span>DOWNLOAD CERTIFICATE (PNG)</span>
              </button>
              <button
                onClick={() => window.print()}
                className="py-3 px-5 rounded-xl border-2 border-neutral-300 hover:bg-neutral-100 text-black font-black text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🖨️</span>
                <span>PRINT / PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 pt-2 pb-1 text-center">
        <span className="text-[11px] font-bold text-white/85 tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Nebuloid Tech • Color Clash Stroop Challenge
        </span>
      </div>
    </div>
  );
}
