import SearchBar from '../components/SearchBar.jsx';

function HomePage() {
  // 临时函数：先打印出来看看。6.3 再改成真的查天气
  async function searchCity(city) {
    // 1. 用 fetch 请求 `/api/weather?city=${city}`，结果存在 res 里
    //    记得加 await
    const res = await fetch(`/api/weather?city=${city}`);
  
    // 2. 用 res.json() 把结果转成数据，存在 data 里
    //    记得加 await
    const data = await res.json();
  
    // 3. console.log(data)
    console.log(data);
  }

  return (
    <main className="home-page">
      <SearchBar onSearch={searchCity} />
    </main>
  );
}

export default HomePage;