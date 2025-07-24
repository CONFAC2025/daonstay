const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-v4-surface/80 backdrop-blur-lg border-b border-black/10"
      role="banner"
      aria-label="동해 다온스테이 헤더"
    >
      <div className="mx-auto h-[60px] w-full max-w-container flex items-center justify-between text-v4-text px-4 sm:px-6">
        <a
          className="flex items-center gap-[10px]"
          href={`${import.meta.env.VITE_BASE}`}
          aria-label="동해 다온스테이 홈페이지로 이동"
        >
          <h1 className="text-[19.2px] font-bold">
            <span className="sr-only">홈페이지 제목: </span>
            POOL VILLA 펜션
          </h1>
        </a>
        <nav>
          <button
            onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-v4 py-2 px-5 text-sm"
          >
            투자 상담 신청
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
