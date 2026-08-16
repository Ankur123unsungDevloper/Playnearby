import Image from "next/image";
import Link from "next/link";

const DownloadApp = () => {
  return (
    <Link
      href="/download"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-4
        w-66.25 h-20.5
        rounded-2xl
        bg-black/70
        backdrop-blur-xl
        border border-white/20
        shadow-2xl
        overflow-hidden
        transition-all duration-300
        hover:scale-105 hover:bg-black/80
      "
    >
      {/* QR Code */}
      <div className="ml-3 shrink-0">
        <Image
          src="/qr-code.png"
          alt="Download App QR Code"
          width={65}
          height={65}
          className="rounded-sm"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center justify-center flex-1 pr-4">
        <span className="text-white text-xl font-bold leading-tight">
          DOWNLOAD
        </span>
        <span className="text-white text-xl font-bold leading-tight">
          THE APP
        </span>
      </div>
    </Link>
  );
};

export default DownloadApp;