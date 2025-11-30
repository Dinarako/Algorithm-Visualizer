const Header = () => {
  return (
    <header className="text-center py-8 md:py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
        Sorting Algorithm Visualizer
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
        Interactive visualization of popular sorting algorithms, built with React.js. 
        Adjust the array, speed, and watch the algorithms in action.
      </p>
    </header>
  );
};

export default Header;
