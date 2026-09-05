const Heading = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-170 w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/Heading_bg.jpg')`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 w-full h-full space-y-4 text-primary text-start px-30">
        <div className="space-y-40 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-50">
            Turn Empty Courts Into <br />
            Full Ones
          </h1>
          <h3 className="text-base sm:text-xl md:text-xl font-medium">
            List your venue and reach thousands of players actively looking for a place to play.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Heading;
