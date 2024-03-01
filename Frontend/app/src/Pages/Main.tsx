const MainPage = (): JSX.Element => {
  const handleClick= () => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  };
  {/* <Menu/>
  <Banner/>
  <div description></div>
  <SliderList>
    {sliderCards.map(card => <SliderCard/>)}
  </SliderList>
  <Footer/> */}
    return (
      <div>
        <h1>Main page</h1> 
        <button onClick={handleClick}/>
      </div>
    );
};

export default MainPage;
